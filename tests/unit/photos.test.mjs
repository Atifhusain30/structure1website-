import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const { checkPhotos } = await loadTs('src/lib/lead-validation.ts');
const MB = 1024 * 1024;
const photo = (name, size = MB, type = 'image/jpeg') => ({ name, size, type });

test('no photos is fine: photos are optional', () => {
  assert.deepEqual(checkPhotos([]), { photos: [] });
});

test('the empty placeholder a blank file input submits is ignored', () => {
  assert.deepEqual(checkPhotos([{ name: '', size: 0, type: 'application/octet-stream' }]).photos, []);
});

test('up to three images within 7 MB are all kept', () => {
  const files = [photo('a.jpg'), photo('b.png', 2 * MB, 'image/png'), photo('c.heic', 3 * MB, '')];
  const r = checkPhotos(files);
  assert.equal(r.error, undefined);
  assert.equal(r.photos.length, 3);
});

test('a fourth photo is rejected with an error, not silently dropped', () => {
  const r = checkPhotos([photo('a.jpg'), photo('b.jpg'), photo('c.jpg'), photo('d.jpg')]);
  assert.match(r.error ?? '', /up to 3/i);
  assert.match(r.error ?? '', /4/);
  assert.equal(r.photos.length, 0);
});

test('photos over 7 MB combined are rejected', () => {
  const r = checkPhotos([photo('a.jpg', 4 * MB), photo('b.jpg', 3.5 * MB)]);
  assert.match(r.error ?? '', /7 MB/);
  assert.equal(r.photos.length, 0);
});

test('non-image files are rejected by MIME type and extension', () => {
  assert.match(checkPhotos([photo('quote.pdf', MB, 'application/pdf')]).error ?? '', /photo|image/i);
  assert.match(checkPhotos([photo('run.exe', MB, '')]).error ?? '', /photo|image/i);
  assert.match(checkPhotos([photo('fake.jpg', MB, 'text/html')]).error ?? '', /photo|image/i);
});

test('iPhone HEIC photos with a blank MIME type are accepted by extension', () => {
  assert.equal(checkPhotos([photo('IMG_0001.HEIC', MB, '')]).error, undefined);
});

test('genuine photos with less common names are accepted: .jfif, .avif and extensionless JPEGs', () => {
  for (const f of [photo('IMG_2041.jfif', MB, 'image/jpeg'), photo('shot.avif', MB, 'image/avif'), photo('image', MB, 'image/jpeg'), photo('Photo.JPEG', MB, 'image/jpeg')]) {
    assert.equal(checkPhotos([f]).error, undefined, `rejected ${f.name} (${f.type})`);
  }
});

test('vector and markup files are refused even when the browser calls them images', () => {
  assert.match(checkPhotos([photo('logo.svg', MB, 'image/svg+xml')]).error ?? '', /photo/i);
  assert.match(checkPhotos([photo('page.html', MB, 'text/html')]).error ?? '', /photo/i);
  assert.match(checkPhotos([photo('page.html', MB, 'image/jpeg')]).error ?? '', /photo/i, 'markup extension with a spoofed type');
  assert.match(checkPhotos([photo('image', MB, '')]).error ?? '', /photo/i, 'no name hint and no type');
  assert.match(checkPhotos([photo('run.exe', MB, 'application/x-msdownload')]).error ?? '', /photo/i);
});

test('the rejection message lists the accepted photo types, including AVIF', () => {
  assert.match(checkPhotos([photo('quote.pdf', MB, 'application/pdf')]).error ?? '', /JPG.*PNG.*HEIC.*WebP.*AVIF/);
});
