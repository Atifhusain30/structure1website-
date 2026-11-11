import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const fresh = () => loadTs('src/lib/attribution.ts');
const SITE = 'https://structure1builds.com';
const memoryStorage = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) };
};
const stored = (s) => JSON.parse(s.getItem('s1_attribution'));

test('keeps only allowlisted campaign params and the landing path, never the raw query', async () => {
  const { readTouch } = await fresh();
  const t = readTouch(`${SITE}/services/patio-covers?utm_source=facebook&utm_medium=paid_social&utm_campaign=spring&email=pat%40example.com&name=Pat&phone=2145550123&foo=bar#x`, '');
  assert.deepEqual(t, { utm_source: 'facebook', utm_medium: 'paid_social', utm_campaign: 'spring', landing_page: '/services/patio-covers' });
});

test('records only the origin of an external referrer', async () => {
  const { readTouch } = await fresh();
  assert.equal(readTouch(`${SITE}/`, 'https://www.google.com/search?q=patio+covers+plano').referrer_origin, 'https://www.google.com');
  assert.equal(readTouch(`${SITE}/`, `${SITE}/projects?x=1`).referrer_origin, undefined, 'same-site referrer');
  assert.equal(readTouch(`${SITE}/`, 'android-app://com.example/').referrer_origin, undefined, 'non-web referrer');
  assert.equal(readTouch(`${SITE}/`, 'not a url').referrer_origin, undefined);
});

test('bounds values and drops anything that looks like an email or an invalid click id', async () => {
  const { readTouch } = await fresh();
  const t = readTouch(`${SITE}/?utm_source=${'a'.repeat(500)}&utm_term=pat@example.com&gclid=abc<script>&fbclid=IwAR0_ab-C.d`, '');
  assert.equal(t.utm_source.length, 100);
  assert.equal(t.utm_term, undefined);
  assert.equal(t.gclid, undefined);
  assert.equal(t.fbclid, 'IwAR0_ab-C.d');
});

test('offer is limited to approved intents; package and size must be short slugs', async () => {
  const { readTouch } = await fresh();
  assert.equal(readTouch(`${SITE}/estimate?offer=patio-kitchen`, '').offer, 'patio-kitchen');
  assert.equal(readTouch(`${SITE}/estimate?offer=patio-cover`, '').offer, 'patio-cover');
  assert.equal(readTouch(`${SITE}/estimate?offer=free-kitchen-999`, '').offer, undefined);
  const t = readTouch(`${SITE}/estimate?package=gable-12x20&size=Big%20One!`, '');
  assert.equal(t.package, 'gable-12x20');
  assert.equal(t.size, undefined);
});

test('first touch in a session survives later plain navigation', async () => {
  const { recordTouch } = await fresh();
  const s = memoryStorage();
  recordTouch(`${SITE}/?utm_source=facebook&utm_campaign=spring&fbclid=AbC`, 'https://l.facebook.com/', s);
  const later = recordTouch(`${SITE}/estimate`, `${SITE}/`, s);
  assert.equal(later.utm_source, 'facebook');
  assert.equal(later.fbclid, 'AbC');
  assert.equal(later.landing_page, '/');
});

test('a new campaign replaces the old one entirely instead of mixing identifiers', async () => {
  const { recordTouch } = await fresh();
  const s = memoryStorage();
  recordTouch(`${SITE}/?utm_source=facebook&utm_campaign=spring&fbclid=AbC`, '', s);
  const now = recordTouch(`${SITE}/services/concrete?utm_source=google&gclid=XyZ`, 'https://www.google.com/', s);
  assert.deepEqual(now, { utm_source: 'google', gclid: 'XyZ', landing_page: '/services/concrete', referrer_origin: 'https://www.google.com' });
});

test('an on-site offer link adds the offer without discarding the ad source', async () => {
  const { recordTouch } = await fresh();
  const s = memoryStorage();
  recordTouch(`${SITE}/?utm_source=facebook&fbclid=AbC`, 'https://l.facebook.com/', s);
  const now = recordTouch(`${SITE}/estimate?offer=patio-cover`, `${SITE}/`, s);
  assert.equal(now.utm_source, 'facebook');
  assert.equal(now.fbclid, 'AbC');
  assert.equal(now.offer, 'patio-cover');
  assert.equal(now.landing_page, '/');
  assert.equal(recordTouch(`${SITE}/contact`, '', s).offer, 'patio-cover', 'offer is remembered for the session');
});

test('blocked storage does not throw and still remembers the touch in memory', async () => {
  const { recordTouch } = await fresh();
  const blocked = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
  };
  recordTouch(`${SITE}/?utm_source=facebook`, '', blocked);
  assert.equal(recordTouch(`${SITE}/estimate`, '', blocked).utm_source, 'facebook');
  assert.equal(recordTouch(`${SITE}/estimate`, '', null).utm_source, 'facebook');
});

test('each captured URL change is recorded and announced, so an open form sees query-only navigation', async () => {
  const { captureTouch, ATTRIBUTION_EVENT } = await fresh();
  const s = memoryStorage();
  const target = new EventTarget();
  const heard = [];
  target.addEventListener(ATTRIBUTION_EVENT, (e) => heard.push(e.detail));
  captureTouch(`${SITE}/estimate?offer=patio-cover`, '', s, target);
  captureTouch(`${SITE}/estimate?offer=patio-kitchen`, '', s, target);
  captureTouch(`${SITE}/estimate?offer=patio-kitchen&utm_source=google&gclid=G2`, '', s, target);
  assert.deepEqual(heard.map((a) => a.offer), ['patio-cover', 'patio-kitchen', 'patio-kitchen']);
  assert.equal(heard[2].utm_source, 'google', 'new UTMs on a query-only change are picked up');
  assert.equal(heard[2].gclid, 'G2');
  assert.equal(stored(s).utm_source, 'google', 'and stored for the submit');
});

test('capturing without an event target (server, old browsers) still records the touch', async () => {
  const { captureTouch } = await fresh();
  const s = memoryStorage();
  assert.equal(captureTouch(`${SITE}/?utm_source=facebook`, '', s, null).utm_source, 'facebook');
  assert.equal(stored(s).utm_source, 'facebook');
});

test('tampered stored data is re-filtered to the allowlist', async () => {
  const { recordTouch } = await fresh();
  const s = memoryStorage();
  s.setItem('s1_attribution', JSON.stringify({ utm_source: 'facebook', email: 'pat@example.com', landing_page: 42 }));
  assert.deepEqual(recordTouch(`${SITE}/estimate`, '', s), { utm_source: 'facebook' });
  s.setItem('s1_attribution', '{not json');
  assert.deepEqual(recordTouch(`${SITE}/estimate`, '', s), { landing_page: '/estimate' });
});
