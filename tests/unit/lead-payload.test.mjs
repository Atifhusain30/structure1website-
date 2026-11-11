import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { loadTs, ROOT } from '../helpers/load-ts.mjs';

const { buildLeadEntries } = await loadTs('src/lib/lead-payload.ts');
const { ATTRIBUTION_FIELDS } = await loadTs('src/lib/attribution.ts');

// Netlify only keeps fields declared in the static form it detected at deploy time.
const formsHtml = readFileSync(path.join(ROOT, 'public/__forms.html'), 'utf8');
const registered = new Set([...formsHtml.matchAll(/<(?:input|textarea|select)[^>]*\bname="([^"]+)"/g)].map((m) => m[1]));

const values = { name: 'Pat Homeowner', phone: '(214) 555-0123', email: 'pat@example.com', city: 'Plano', service: 'Outdoor Living', timeline: '1–3 months', message: 'Cover plus kitchen' };
const everyAttribution = Object.fromEntries(ATTRIBUTION_FIELDS.map((k) => [k, k === 'offer' ? 'patio-kitchen' : 'x']));
const photo = (n) => new File([new Uint8Array(10)], `p${n}.jpg`, { type: 'image/jpeg' });

test('the static Netlify form is named contact and has the honeypot', () => {
  assert.match(formsHtml, /<form[^>]*name="contact"[^>]*netlify-honeypot="bot-field"/);
  assert.ok(registered.has('bot-field'));
});

test('every field the form can send is registered in public/__forms.html', () => {
  const entries = buildLeadEntries({ values, photos: [photo(1), photo(2), photo(3)], botField: '', attribution: everyAttribution, formPage: '/estimate' });
  const keys = entries.map(([k]) => k);
  assert.ok(keys.length > 10, 'payload is populated');
  const missing = keys.filter((k) => !registered.has(k));
  assert.deepEqual(missing, [], `unregistered fields would be silently dropped by Netlify: ${missing.join(', ')}`);
});

test('the payload carries contact fields, form-name, honeypot and the website fallback source', () => {
  const m = new Map(buildLeadEntries({ values, photos: [], botField: '', attribution: {}, formPage: '/' }));
  assert.equal(m.get('form-name'), 'contact');
  assert.equal(m.get('bot-field'), '');
  for (const k of ['name', 'phone', 'email', 'city', 'service', 'timeline', 'message']) assert.equal(m.get(k), values[k]);
  assert.equal(m.get('referralSource'), 'website');
  assert.equal(m.get('form_page'), '/');
  assert.match(m.get('subject'), /^New Estimate Lead: Pat Homeowner — Outdoor Living/);
  assert.ok(!m.has('photo1'), 'no empty photo entries');
});

test('attribution and offer context ride along, and the subject names the offer', () => {
  const m = new Map(buildLeadEntries({ values, photos: [], botField: '', attribution: { utm_source: 'facebook', fbclid: 'AbC', offer: 'patio-kitchen', landing_page: '/estimate' }, formPage: '/estimate' }));
  assert.equal(m.get('utm_source'), 'facebook');
  assert.equal(m.get('fbclid'), 'AbC');
  assert.equal(m.get('offer'), 'patio-kitchen');
  assert.equal(m.get('landing_page'), '/estimate');
  assert.match(m.get('subject'), /Patio cover \+ outdoor kitchen/);
  assert.ok(!m.has('gclid'), 'absent attribution is not sent as blank noise');
});

test('photos are numbered photo1..photo3 in order', () => {
  const ps = [photo(1), photo(2)];
  const m = new Map(buildLeadEntries({ values, photos: ps, botField: '', attribution: {}, formPage: '/estimate' }));
  assert.equal(m.get('photo1'), ps[0]);
  assert.equal(m.get('photo2'), ps[1]);
  assert.ok(!m.has('photo3'));
});

test('a filled honeypot is passed through so Netlify can flag the bot', () => {
  const m = new Map(buildLeadEntries({ values, photos: [], botField: 'spam', attribution: {}, formPage: '/' }));
  assert.equal(m.get('bot-field'), 'spam');
});
