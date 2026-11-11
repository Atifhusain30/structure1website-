import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const ICO = 'src/app/favicon.ico';
const APPLE = 'src/app/apple-icon.png';
// create-next-app's default black circle / white triangle favicon.
const PLACEHOLDER_SHA256 = '2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932';
const SIZES = [16, 32, 48, 64, 128, 256];
const PNG_SIG = '89504e470d0a1a0a';

function readIco(buf) {
  assert.equal(buf.readUInt16LE(0), 0, 'ICO reserved field');
  assert.equal(buf.readUInt16LE(2), 1, 'ICO type must be 1 (icon)');
  const count = buf.readUInt16LE(4);
  return Array.from({ length: count }, (_, i) => {
    const o = 6 + 16 * i;
    const size = buf.readUInt32LE(o + 8);
    const offset = buf.readUInt32LE(o + 12);
    return {
      width: buf[o] || 256,
      height: buf[o + 1] || 256,
      planes: buf.readUInt16LE(o + 4),
      bpp: buf.readUInt16LE(o + 6),
      size,
      offset,
      data: buf.subarray(offset, offset + size),
    };
  });
}

const ico = readFileSync(ICO);

test('favicon is no longer the default Next.js placeholder', () => {
  assert.notEqual(createHash('sha256').update(ico).digest('hex'), PLACEHOLDER_SHA256);
});

test('favicon is a valid ICO with PNG entries at 16/32/48/64/128/256', async () => {
  const entries = readIco(ico);
  assert.deepEqual(entries.map((e) => e.width), SIZES);
  let expectedOffset = 6 + 16 * entries.length;
  for (const e of entries) {
    assert.equal(e.height, e.width);
    assert.equal(e.planes, 1);
    assert.equal(e.bpp, 32);
    assert.equal(e.offset, expectedOffset, 'entries are packed back-to-back');
    assert.equal(e.data.length, e.size, 'entry data lies within the file');
    assert.equal(e.data.subarray(0, 8).toString('hex'), PNG_SIG);
    const meta = await sharp(e.data).metadata();
    assert.equal(meta.width, e.width);
    assert.equal(meta.height, e.height);
    expectedOffset += e.size;
  }
  assert.equal(expectedOffset, ico.length, 'no trailing bytes');
});

test('favicon renders a black square with white monogram glyphs', async () => {
  const big = readIco(ico).find((e) => e.width === 256);
  const { data, info } = await sharp(big.data).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => data.subarray((y * info.width + x) * info.channels, (y * info.width + x) * info.channels + 3);
  for (const [x, y] of [[0, 0], [255, 0], [0, 255], [255, 255]]) assert.deepEqual([...px(x, y)], [0, 0, 0]);
  let white = 0;
  for (let i = 0; i < data.length; i += info.channels) if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) white++;
  const share = white / (info.width * info.height);
  assert.ok(share > 0.05 && share < 0.5, `white glyph coverage ${share.toFixed(3)} should look like text`);
});

test('apple-icon.png is a 180px PNG', async () => {
  assert.ok(existsSync(APPLE), `${APPLE} exists`);
  const meta = await sharp(readFileSync(APPLE)).metadata();
  assert.equal(meta.format, 'png');
  assert.equal(meta.width, 180);
  assert.equal(meta.height, 180);
});

test('regeneration script reproduces the committed icons byte-for-byte', async () => {
  const { buildIcons } = await import('../../scripts/generate-favicon.mjs');
  const built = await buildIcons();
  assert.ok(built.ico.equals(ico), 'favicon.ico matches script output');
  assert.ok(built.apple.equals(readFileSync(APPLE)), 'apple-icon.png matches script output');
});
