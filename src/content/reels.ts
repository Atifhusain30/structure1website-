/**
 * Short vertical clips from the job site. Add one entry per reel after running
 * `node scripts/add-reel.mjs <instagram-or-mp4-url> <id> "<title>" "<location>" [project-slug]`,
 * which downloads, re-encodes to 720p H.264, writes the poster frame, and prints the entry.
 */
export type Reel = {
  id: string;
  src: string; // /videos/<id>.mp4
  poster: string; // /videos/<id>.jpg
  title: string;
  location: string;
  project?: string; // project slug, links the caption to its case study
  instagram?: string; // original public reel URL
};

export const reels: Reel[] = [];
