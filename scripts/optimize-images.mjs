// One-off. Backs up public/images/** to ../_image-originals/ (once), then rewrites in place:
// Re-encodes from the backup when one exists (so re-runs never degrade): EXIF rotate, max 2000px long edge,
// JPEG q78 mozjpeg. Four .png/.PNG photos become real .jpg files.
// Deletes the two stock images the catalog no longer references.
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/images');
const BACKUP = path.resolve('..', '_image-originals');
const RENAME = { 'cover5.PNG': 'cover5.jpg', 'Concrete1.PNG': 'concrete1.jpg', 'concrete6.PNG': 'concrete6.jpg', 'jeff1.png': 'jeff1.jpg' };
const MAX_EDGE = 2000;
const QUALITY = 78;
const DELETE = new Set(['AI kitchen.jpg', 'new builds.jpg']);

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [];
for await (const f of walk(ROOT)) files.push(f);
let before = 0, after = 0;
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const base = path.basename(file);
  const rel = path.relative(ROOT, file);
  const backup = path.join(BACKUP, rel);
  await fs.mkdir(path.dirname(backup), { recursive: true });
  try { await fs.access(backup); } catch { await fs.copyFile(file, backup); }
  if (DELETE.has(base)) { await fs.unlink(file); console.log(`deleted ${rel}`); continue; }
  const input = await fs.readFile(backup); // originals are the source of truth
  before += input.length;
  const asJpeg = ext !== '.png' || base in RENAME;
  let p = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  p = asJpeg ? p.jpeg({ quality: QUALITY, mozjpeg: true }) : p.png({ compressionLevel: 9 });
  const out = await p.toBuffer();
  const target = base in RENAME ? path.join(path.dirname(file), RENAME[base]) : file;
  await fs.writeFile(target, out);
  if (target !== file) await fs.unlink(file);
  after += out.length;
  console.log(`${rel.padEnd(44)} ${(input.length / 1024).toFixed(0).padStart(6)} KB -> ${(out.length / 1024).toFixed(0).padStart(5)} KB${target !== file ? ` (renamed ${path.basename(target)})` : ''}`);
}
console.log(`\nTotal ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
