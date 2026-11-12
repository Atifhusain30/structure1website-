// Regenerates public/images/social/og-default.jpg: a true 1200x630 social card cut from a real project photo
// (the McKinney gable cover, public/images/hero/buckfin1.JPG). The crop is deliberately top-biased so the roof
// apex stays in frame. No text, no overlays, no generated pixels; the source photo is only read, never changed.
// Deterministic: fixed crop box + fixed JPEG options -> same output. Run: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const SOURCE = 'public/images/hero/buckfin1.JPG';
export const OUTPUT = 'public/images/social/og-default.jpg';
export const WIDTH = 1200;
export const HEIGHT = 630;
/** Where the crop starts, as a fraction of the space above and below it: low = keep the top (roof apex). */
export const TOP_BIAS = 0.2;

export async function buildOgImage(source = SOURCE) {
  const img = sharp(source).rotate();
  const { width, height } = await img.metadata();
  const cropH = Math.round((width * HEIGHT) / WIDTH);
  const top = Math.round((height - cropH) * TOP_BIAS);
  return img
    .extract({ left: 0, top, width, height: cropH })
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await mkdir(path.dirname(OUTPUT), { recursive: true });
  const out = await buildOgImage();
  await writeFile(OUTPUT, out);
  const m = await sharp(OUTPUT).metadata();
  console.log(`${OUTPUT} ${m.width}x${m.height}, ${out.length} B`);
}
