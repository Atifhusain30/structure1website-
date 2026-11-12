import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';
import { ROOT, loadTs } from '../helpers/load-ts.mjs';

const { photos, sourceFocalStyle } = await loadTs('src/content/images.ts');
const { projects, getProject } = await loadTs('src/content/projects.ts');
const { services } = await loadTs('src/content/services.ts');
const { HERO_PHOTO } = await loadTs('src/content/home.ts');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const pub = (src) => path.join(ROOT, 'public', src);
const hash = (src) => createHash('sha256').update(readFileSync(pub(src))).digest('hex');
const post = (slug) => matter(read(`content/blog/${slug}.md`)).data;
const pct = (focal) => Number(String(focal).replace('%', ''));

test('every registered photo points at a real file', () => {
  for (const [id, p] of Object.entries(photos)) assert.ok(existsSync(pub(p.src)), `${id}: ${p.src}`);
});

test('project pages lead with their selected finished-project cover, not a slab or detail thumbnail', () => {
  const mismatches = projects.filter((p) => p.gallery[0] !== p.cover).map((p) => ({ slug: p.slug, first: p.gallery[0], cover: p.cover }));
  assert.deepEqual(mismatches, []);
});

test('no project gallery shows a file that is byte-identical to a photo in another project', () => {
  const owner = new Map();
  for (const p of projects) {
    for (const id of p.gallery) {
      const h = hash(photos[id].src);
      const prev = owner.get(h);
      assert.ok(!prev || prev.slug === p.slug, `${p.slug} shows ${id}, the same file as ${prev?.id} in ${prev?.slug}`);
      owner.set(h, { slug: p.slug, id });
    }
  }
});

test('the misnamed Lewisville alias for a McKinney photo is gone, but the blog file it pointed at is kept', () => {
  assert.equal(photos['pergola-lewisville-2'], undefined);
  assert.deepEqual(getProject('free-standing-modern-patio-cover').gallery, ['pergola-lewisville-1']);
  assert.ok(existsSync(pub('/images/hero/cover2.JPG')), 'cover2.JPG stays for the materials blog post');
  assert.equal(post('best-patio-cover-materials-texas').featuredImage, '/images/hero/cover2.JPG');
});

test('the uncovered Forney slab photo is described as it looks and left out of the lean-to gallery', () => {
  const alt = photos['leanto-forney-1'].alt;
  assert.match(alt, /uncovered concrete patio/i);
  assert.match(alt, /home/i);
  assert.doesNotMatch(alt, /lean-to|patio cover|before|after/i);
  const g = getProject('lean-to-patio-cover').gallery;
  assert.ok(!g.includes('leanto-forney-1'));
  assert.deepEqual(g, ['leanto-forney-2', 'leanto-forney-3'], 'the full cover leads, then the detail photo');
});

test('the Plano "foundation" photo is described as the stamped slab it shows, with no footings photo claim', () => {
  const alt = photos['pergola-plano-foundation'].alt;
  assert.match(alt, /stamped concrete/i);
  assert.match(alt, /slab|patio/i);
  assert.doesNotMatch(alt, /footing/i);
  const plano = getProject('polycarbonate-patio-cover-plano');
  assert.doesNotMatch(plano.overview, /documented from footings to finish/i);
  assert.ok(plano.scope.includes('Concrete footings and steel post anchors'), 'construction scope unchanged');
});

test('the random-stone stamp photo is no longer labelled wood plank, and the stamped gallery shows distinct real patterns', () => {
  assert.equal(photos['stamped-wood-plank'], undefined);
  const rs = photos['stamped-random-stone'];
  assert.equal(rs.src, '/images/hero/concrete2.jpg');
  assert.match(rs.alt, /random[- ]stone/i);
  assert.doesNotMatch(rs.alt, /wood|plank/i);
  const s = services.find((x) => x.slug === 'stamped-concrete');
  assert.deepEqual(s.gallery, ['stamped-flagstone', 'stamped-tile', 'stamped-herringbone']);
  assert.equal(new Set(s.gallery.map((id) => hash(photos[id].src))).size, 3, 'three different files');
  assert.ok(s.options.some((o) => /wood plank/i.test(o.name) || /wood plank/i.test(o.blurb)) || /wood plank/i.test(s.lead), 'wood plank is still offered');
});

test('the rectangular stone-pattern photo is not called flagstone', () => {
  assert.equal(photos['stamped-stone-texture'].alt, 'Rectangular stone-pattern stamped concrete patio beneath a cedar cover');
});

test('the Forney stamped project keeps only the two photos of the covered patio, with alts that match each frame', () => {
  const p = getProject('stamped-concrete-patio');
  assert.deepEqual(p.gallery, ['stamped-patio-forney-1', 'stamped-patio-forney-3']);
  assert.equal(p.location, 'Forney, TX', 'location data unchanged');
  const open = photos['stamped-patio-forney-2'].alt;
  assert.doesNotMatch(open, /under|cover/i);
  assert.match(open, /open/i);
  assert.match(open, /medallion/i);
  assert.match(open, /rectangular/i);
  const wide = photos['stamped-patio-forney-3'].alt;
  assert.doesNotMatch(wide, /detail|close/i);
  assert.match(wide, /wide/i);
  assert.match(wide, /under/i);
});

test('blog feature alts describe what the photo actually shows', () => {
  const cost = post('patio-cover-cost-dallas-fort-worth');
  assert.equal(cost.featuredImage, '/images/hero/cover1.JPG');
  assert.doesNotMatch(cost.featuredImageAlt, /gable/i);
  assert.match(cost.featuredImageAlt, /night/i);
  assert.match(cost.featuredImageAlt, /recessed light/i);
  const ideas = post('patio-cover-ideas-dallas-fort-worth');
  assert.equal(ideas.featuredImage, '/images/hero/cover4.JPG');
  assert.doesNotMatch(ideas.featuredImageAlt, /back wall|privacy/i);
  assert.match(ideas.featuredImageAlt, /gable/i);
  assert.match(ideas.featuredImageAlt, /pool/i);
});

test('the home-value post features one real project photo, not the multi-project collage', () => {
  const p = post('patio-cover-increase-home-value-texas');
  assert.notEqual(p.featuredImage, '/images/hero/cover5.jpg');
  assert.ok(existsSync(pub(p.featuredImage)), p.featuredImage);
  const reg = Object.values(photos).find((x) => x.src === p.featuredImage);
  assert.ok(reg, 'uses a photo that is in the project registry');
  assert.equal(p.featuredImageAlt, reg.alt, 'and its registry description');
  if (photos['patio-cover-dfw-1']) assert.match(photos['patio-cover-dfw-1'].alt, /collage/i);
});

test('tall gable and carport photos crop high enough to keep the roof peak', async () => {
  for (const id of ['gable-mckinney-1', 'gable-mckinney-2', 'gable-mckinney-build', 'gable-dfw']) {
    const f = pct(photos[id].focal ?? '50%');
    const size = await sharp(pub(photos[id].src)).metadata();
    for (const ratio of [4 / 3, 16 / 9, 21 / 9]) {
      const start = (size.height - size.width / ratio) * f / 100;
      assert.ok(start <= 260, `${id} at ${ratio.toFixed(2)} starts at ${start.toFixed(1)}px, too near or below its approximately 300px apex`);
    }
  }
  assert.equal(photos['gable-mckinney-2'].focal, photos['gable-dfw'].focal, 'identical files share one crop');
  const c = pct(photos['carport-melissa-1'].focal);
  const size = await sharp(pub(photos['carport-melissa-1'].src)).metadata();
  // The actual source apex is approximately 90px below the top. CSS object-position
  // offsets the excess image height, not the source's absolute height.
  const cropStart = (size.height - size.width / (16 / 9)) * c / 100;
  assert.ok(cropStart <= 74, `carport crop begins at ${cropStart.toFixed(1)}px, clipping its roof apex or safety margin`);
  assert.equal(HERO_PHOTO.id, 'reno-pergola-turf-wide', 'home hero untouched');
});

test('blog heroes and cards reuse safe source crops, including the byte-identical legacy gable filename', () => {
  assert.equal(typeof sourceFocalStyle, 'function');
  assert.deepEqual(sourceFocalStyle('/images/hero/buckfin1.JPG'), { objectPosition: `50% ${photos['gable-mckinney-2'].focal}` });
  assert.deepEqual(sourceFocalStyle('/images/hero/cover2.JPG'), sourceFocalStyle('/images/hero/buckfin1.JPG'));
  assert.deepEqual(sourceFocalStyle('/images/hero/cover4.JPG'), { objectPosition: '50% 30%' });
  assert.equal(sourceFocalStyle('/images/not-in-registry.jpg'), undefined);
  for (const rel of ['src/app/blog/[slug]/page.tsx', 'src/components/sections/ArticleCard.tsx']) {
    assert.match(read(rel), /style=\{sourceFocalStyle\(post.featuredImage\)\}/, rel);
  }
});

test('city heroes carry a visible "DFW project example" caption; other page heroes do not', () => {
  const hero = read('src/components/layout/PageHero.tsx');
  assert.match(hero, /caption\?: string/, 'optional caption prop');
  assert.match(hero, /\{caption && /, 'rendered only when given');
  const city = read('src/app/service-areas/[city]/page.tsx');
  assert.match(city, /caption="DFW project example"/);
  for (const rel of ['src/app/about/page.tsx', 'src/app/contact/page.tsx', 'src/app/services/[slug]/page.tsx', 'src/app/projects/page.tsx']) {
    assert.doesNotMatch(read(rel), /caption=/, rel);
  }
});

test('city social-image alt says the photo is a representative DFW project and keeps its real description', () => {
  const city = read('src/app/service-areas/[city]/page.tsx');
  const og = city.match(/openGraph:\s*\{[^\n]*\}/)?.[0] ?? '';
  assert.match(og, /Representative DFW project/);
  assert.match(og, /photos\[c\.hero\]\.alt/);
});

test('default social image is a true 1200x630 derivative of a real photo, declared truthfully', async () => {
  const OG = '/images/social/og-default.jpg';
  assert.ok(existsSync(pub(OG)));
  const m = await sharp(pub(OG)).metadata();
  assert.deepEqual([m.width, m.height], [1200, 630]);
  assert.ok(existsSync(path.join(ROOT, 'scripts/generate-og-image.mjs')), 'generator script is kept');
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /url: '\/images\/social\/og-default\.jpg', width: 1200, height: 630/);
  assert.doesNotMatch(layout, /buckfin1\.JPG', width: 1200/);
  assert.match(layout, /image: `\$\{company\.url\}\/images\/social\/og-default\.jpg`/);
});
