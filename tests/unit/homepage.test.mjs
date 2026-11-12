import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, loadTs } from '../helpers/load-ts.mjs';

const { HERO_PHOTO, HOME_FEATURE, HOME_PROOF, homeProofProjects } = await loadTs('src/content/home.ts');
const { photos } = await loadTs('src/content/images.ts');
const { projects, getProject } = await loadTs('src/content/projects.ts');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const POSITION = /^\d{1,3}% \d{1,3}%$/;

test('the hero uses the wide outdoor-renovation photo that shows the cover, kitchen and house together', () => {
  assert.equal(HERO_PHOTO.id, 'reno-pergola-turf-wide');
  const p = photos[HERO_PHOTO.id];
  assert.ok(p, 'photo is in the registry');
  assert.ok(existsSync(path.join(ROOT, 'public', p.src)), `${p.src} exists`);
  assert.match(p.alt, /outdoor kitchen/i);
  assert.match(p.alt, /home/i);
});

test('the hero crop is set per breakpoint and keeps the roofline and cover in frame on wide screens', () => {
  assert.match(HERO_PHOTO.position.base, POSITION);
  assert.match(HERO_PHOTO.position.lg, POSITION);
  const lgY = Number(HERO_PHOTO.position.lg.split(' ')[1].replace('%', ''));
  assert.ok(lgY >= 10 && lgY <= 35, `desktop crop sits high enough for the cover (got ${lgY}%)`);
});

test('the registry crop for the hero photo is unchanged, so its project card elsewhere keeps its framing', () => {
  assert.equal(photos['reno-pergola-turf-wide'].focal, '36%');
});

test('three real projects are shown as early proof, each with a location and scope', () => {
  const list = homeProofProjects();
  assert.equal(list.length, 3);
  assert.deepEqual(list.map((p) => p.slug), HOME_PROOF);
  assert.equal(new Set(HOME_PROOF).size, 3, 'no duplicates');
  for (const p of list) {
    assert.ok(getProject(p.slug), `${p.slug} exists`);
    assert.ok(p.location.trim(), `${p.slug} has a location`);
    assert.ok(p.scope.length > 0, `${p.slug} has scope`);
  }
});

test('owner-selected Watauga and patio-kitchen projects lead Recent projects', () => {
  const list = homeProofProjects();
  assert.ok(getProject(HOME_FEATURE), 'feature project exists');
  assert.deepEqual(HOME_PROOF.slice(0, 2), ['gable-home-extension-watauga', 'backyard-concrete-patio-kitchen-turf']);
  assert.ok(list.every((p) => photos[p.cover]), 'every selected project has an existing real cover photo');
});

test('proof projects keep their catalog location text verbatim (no invented cities)', () => {
  for (const p of homeProofProjects()) {
    assert.equal(p.location, projects.find((x) => x.slug === p.slug).location);
  }
});

test('home page order: hero, then project proof before services; the long Recent work grid is consolidated away', () => {
  const src = read('src/app/page.tsx');
  const hero = src.indexOf('<Hero');
  const proof = src.indexOf('<HomeProof');
  const services = src.indexOf('id="services"');
  const reels = src.indexOf('<ReelStrip');
  assert.ok(hero > -1 && proof > hero, 'proof follows the hero');
  assert.ok(proof < services && proof < reels, 'proof comes before services and reels');
  assert.doesNotMatch(src, /<ProjectGrid/);
  assert.doesNotMatch(src, /title="Recent work"/);
  assert.match(src, /<ProjectFeature/, 'the big feature stays');
  assert.match(src, /<Testimonials/, 'testimonials stay where they were');
});

test('hero copy uses the approved hierarchy and keeps both actions', () => {
  const src = read('src/components/home/Hero.tsx');
  assert.match(src, /Patio covers &amp; outdoor living · Dallas–Fort Worth|Patio covers & outdoor living · Dallas–Fort Worth/);
  assert.match(src, /Make more room for life outside\./);
  assert.match(src, /Custom patio covers and outdoor kitchens planned around your home and how you want to use the space\./);
  assert.match(src, /See the work/);
  assert.match(src, /href="#hero-estimate"/);
  assert.match(src, /\bpriority\b/, 'hero photo stays the eager LCP image');
});

test('the dark-hero header gets a mostly opaque dark backdrop instead of transparent', () => {
  const css = read('src/app/globals.css');
  const rule = css.split('\n').find((l) => l.includes('body:has([data-dark-hero]) header[data-header]:not([data-scrolled]):not([data-open])') && l.includes('--hdr-bg'));
  assert.ok(rule, 'dark-hero header rule exists');
  const bg = rule.match(/--hdr-bg:\s*([^;]+);/)[1].trim();
  assert.notEqual(bg, 'transparent');
  const m = bg.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  assert.ok(m, `backdrop is an rgba colour (got ${bg})`);
  const [r, g, b, a] = m.slice(1).map(Number);
  assert.ok(Math.max(r, g, b) <= 40, 'backdrop is dark');
  assert.ok(a >= 0.7, `backdrop is at least 70% opaque (got ${a})`);
});

test('focus rings switch to white on the dark header and hero copy', () => {
  const css = read('src/app/globals.css');
  assert.match(css, /outline:\s*2px solid var\(--focus/);
  assert.match(css, /--focus:\s*#FFFFFF/i);
});

test('the optional project description is labelled optional', () => {
  const text = read('src/components/forms/EstimateForm.tsx').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  assert.match(text, /Project description \(optional\)/);
});
