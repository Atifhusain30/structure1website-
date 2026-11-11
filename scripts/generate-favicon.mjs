// Regenerates src/app/favicon.ico (16/32/48/64/128/256 PNG entries) and src/app/apple-icon.png (180px):
// a plain black square with a white "S1" set in Arial Bold. No logo artwork, no external assets.
// Deterministic: same SVG + fixed PNG options -> same bytes. Run: node scripts/generate-favicon.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const ICO_SIZES = [16, 32, 48, 64, 128, 256];
export const APPLE_SIZE = 180;

const svg = (size) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256">` +
    '<rect width="256" height="256" fill="#000"/>' +
    '<text x="128" y="174" text-anchor="middle" fill="#fff" ' +
    'font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="128" letter-spacing="-4">S1</text>' +
    '</svg>',
);

const renderPng = (size) =>
  sharp(svg(size)).ensureAlpha().png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer();

// ICONDIR (6 bytes) + one 16-byte ICONDIRENTRY per image, then the PNG payloads back-to-back.
export function packIco(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const o = 6 + 16 * i;
    header[o] = size >= 256 ? 0 : size;
    header[o + 1] = size >= 256 ? 0 : size;
    header[o + 2] = 0; // palette colors
    header[o + 3] = 0; // reserved
    header.writeUInt16LE(1, o + 4); // planes
    header.writeUInt16LE(32, o + 6); // bits per pixel
    header.writeUInt32LE(png.length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((img) => img.png)]);
}

export async function buildIcons() {
  const images = await Promise.all(ICO_SIZES.map(async (size) => ({ size, png: await renderPng(size) })));
  return { ico: packIco(images), apple: await renderPng(APPLE_SIZE) };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { ico, apple } = await buildIcons();
  await writeFile('src/app/favicon.ico', ico);
  await writeFile('src/app/apple-icon.png', apple);
  console.log(`favicon.ico ${ico.length} B (${ICO_SIZES.join('/')}), apple-icon.png ${apple.length} B`);
}
