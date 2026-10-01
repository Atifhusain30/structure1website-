/**
 * Short vertical clips from the job site. Add one entry per reel after running
 * `node scripts/add-reel.mjs <instagram-or-mp4-url> <id> "<title>" "<location>" [project-slug]`,
 * which downloads, re-encodes to 720p H.264, writes the poster frame, and prints the entry.
 */
import type { ServiceSlug } from './types';

export type Reel = {
  id: string;
  src: string; // /videos/<id>.mp4
  poster: string; // /videos/<id>.jpg
  title: string;
  location: string;
  project?: string; // project slug, links the caption to its case study
  service?: ServiceSlug; // or a service page, when the clip has no project page
  instagram?: string; // original public reel URL
};

export const reels: Reel[] = [
  {
    id: 'leanto-560',
    src: '/videos/leanto-560.mp4',
    poster: '/videos/leanto-560.jpg',
    title: '560 sq ft lean-to patio cover, walkthrough',
    location: 'Dallas–Fort Worth',
    service: 'patio-covers',
    instagram: 'https://www.instagram.com/reel/DYnb5L4CC5N/',
  },
  {
    id: 'gable-leanto-posts',
    src: '/videos/gable-leanto-posts.mp4',
    poster: '/videos/gable-leanto-posts.jpg',
    title: 'Gable and lean-to cover: 10x10 posts, 4x12 beam',
    location: 'Dallas–Fort Worth',
    service: 'patio-covers',
    instagram: 'https://www.instagram.com/reel/Dd5B74ZgIxY/',
  },
  {
    id: 'home-extension-640',
    src: '/videos/home-extension-640.mp4',
    poster: '/videos/home-extension-640.jpg',
    title: '640 sq ft home extension',
    location: 'Dallas–Fort Worth',
    service: 'remodeling',
    instagram: 'https://www.instagram.com/reel/DcRbd1AvHxS/',
  },
];
