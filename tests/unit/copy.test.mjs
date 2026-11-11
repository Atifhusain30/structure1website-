import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../helpers/load-ts.mjs';

// Public source and content only. URLs, historical docs (docs/) and the unused legacy Resend
// handler (netlify/functions/contact.ts) are deliberately out of scope.
const PUBLIC_DIRS = ['src', 'content', 'public'];
const TEXT = /\.(tsx?|mdx?|txt|html|json)$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : TEXT.test(name) ? [p] : [];
  });
}
const files = PUBLIC_DIRS.flatMap((d) => walk(path.join(ROOT, d))).map((p) => ({ rel: path.relative(ROOT, p).replace(/\\/g, '/'), text: readFileSync(p, 'utf8') }));
const hits = (re) => files.flatMap((f) => f.text.split('\n').map((line, i) => (re.test(line) ? `${f.rel}:${i + 1}` : null)).filter(Boolean));
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');

test('no public source, blog post or image alt text still says Structure1 Construction', () => {
  assert.ok(files.some((f) => f.rel.startsWith('content/blog/')), 'blog posts are scanned');
  assert.deepEqual(hits(/Structure1 Construction/), []);
});

test('the rename left no glued sentences, awkward possessives or "Builds builds"', () => {
  assert.deepEqual(hits(/Structure1 Builds\.[A-Za-z]/), [], 'missing space after the name');
  assert.deepEqual(hits(/Structure1 Builds's/), [], 'use "the Structure1 Builds website"');
  assert.deepEqual(hits(/Structure1 Builds builds/i), []);
});

test('terms refer to "the Structure1 Builds website"', () => {
  assert.match(read('src/app/terms/page.tsx'), /materials on the Structure1 Builds website/);
});

test('privacy policy discloses the stored campaign context accurately', () => {
  const src = read('src/app/privacy/page.tsx').replace(/\s+/g, ' ');
  assert.match(src, /sessionStorage|session storage/i, 'says where it is kept before submission');
  assert.match(src, /click identifier/i, 'names the ad click identifiers');
  assert.match(src, /path/i, 'landing page is kept as a path only');
  assert.match(src, /without the rest of the address|not the full address|domain only|site name only/i, 'referrer kept as origin only');
  assert.doesNotMatch(src, /(cannot|never) contain (any )?(personal|PII)/i, 'no categorical no-PII claim');
});

test('privacy policy keeps the owner-pending advanced matching sentence unchanged', () => {
  const src = read('src/app/privacy/page.tsx').replace(/\s+/g, ' ');
  assert.match(src, /are hashed in your browser before being shared with Meta to match ad results/);
});
