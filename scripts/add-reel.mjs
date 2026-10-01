// node scripts/add-reel.mjs <url-or-local-mp4> <id> "<title>" "<location>" [project-slug]
// Downloads a public Instagram/Facebook/YouTube reel (yt-dlp) or takes a local .mp4, re-encodes it to
// 720px-wide H.264 at a web-friendly bitrate with AAC audio, extracts a poster frame, and writes both to
// public/videos/<id>.mp4 + .jpg. Prints the `reels.ts` entry to paste.
import { spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import ffmpeg from 'ffmpeg-static';

const [src, id, title, location, project] = process.argv.slice(2);
if (!src || !id || !title || !location) {
  console.error('usage: node scripts/add-reel.mjs <url-or-mp4> <id> "<title>" "<location>" [project-slug]');
  process.exit(2);
}
const OUT = path.resolve('public/videos');
const TMP = path.resolve('..', '_reel-originals');
await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(TMP, { recursive: true });

let input = src;
if (/^https?:\/\//.test(src)) {
  input = path.join(TMP, `${id}.source.mp4`);
  const r = spawnSync('python', ['-m', 'yt_dlp', '-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b', '--merge-output-format', 'mp4', '--ffmpeg-location', ffmpeg, '-o', input, src], { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error('download failed; if the reel is private or Instagram blocks it, save the MP4 from the Instagram app and pass the file path instead');
    process.exit(1);
  }
}
const mp4 = path.join(OUT, `${id}.mp4`);
const jpg = path.join(OUT, `${id}.jpg`);
const enc = spawnSync(
  ffmpeg,
  ['-y', '-i', input, '-vf', "scale='min(720,iw)':-2", '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-t', '60', mp4],
  { stdio: 'inherit' },
);
if (enc.status !== 0) process.exit(1);
const pos = spawnSync(ffmpeg, ['-y', '-ss', '00:00:01', '-i', mp4, '-frames:v', '1', '-update', '1', '-q:v', '3', jpg], { stdio: 'inherit' });
if (pos.status !== 0) process.exit(1);
const size = (await fs.stat(mp4)).size;
console.log(`\nwrote ${path.relative(process.cwd(), mp4)} (${(size / 1048576).toFixed(1)} MB) and ${path.basename(jpg)}\n`);
console.log(`  { id: '${id}', src: '/videos/${id}.mp4', poster: '/videos/${id}.jpg', title: '${title.replace(/'/g, "\\'")}', location: '${location}'${project ? `, project: '${project}'` : ''}${/^https?:/.test(src) ? `, instagram: '${src}'` : ''} },`);
