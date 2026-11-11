// Browser regression tests for the lead path. Needs a running build of this site:
//   npm run build && npm run start -- -p 3211
//   npm run test:e2e            (or E2E_BASE=http://localhost:PORT node --test tests/e2e/)
// Uses the installed Chrome (or Edge) through playwright-core. Every request that is not to the
// local server is aborted, Netlify form POSTs are answered by an in-test fixture, and the Meta
// Pixel is replaced by a recording stub, so no real lead, pixel event or third-party call is made.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { ROOT, loadTs } from '../helpers/load-ts.mjs';

const { company } = await loadTs('src/content/company.ts');
const BASE = process.env.E2E_BASE ?? 'http://localhost:3211';
const BASE_HOST = new URL(BASE).host;
const registered = new Set([...readFileSync(path.join(ROOT, 'public/__forms.html'), 'utf8').matchAll(/<input[^>]*\bname="([^"]+)"/g)].map((m) => m[1]));

let browser;
before(async () => {
  for (const channel of ['chrome', 'msedge']) {
    try {
      browser = await chromium.launch({ channel, headless: true });
      return;
    } catch {
      // try the next installed browser
    }
  }
  throw new Error('Chrome or Edge is required for the browser tests');
});
after(() => browser?.close());

/** A page with third parties blocked, the pixel stubbed and the Netlify form endpoint faked. */
async function open(route, { viewport = { width: 1280, height: 900 }, respond = () => ({ status: 200 }), clock = false } = {}) {
  const ctx = await browser.newContext({ viewport });
  const posts = [];
  await ctx.route('**/*', (r) => (new URL(r.request().url()).host === BASE_HOST ? r.fallback() : r.abort()));
  await ctx.route('**/__forms.html', async (r) => {
    if (r.request().method() !== 'POST') return r.fallback();
    posts.push(parseMultipart(r.request()));
    const res = await respond(posts.length);
    if (res === 'network-error') return r.abort('failed');
    // Never answer; the page is expected to give up on its own. Fulfilling later would throw.
    if (res === 'hang') return;
    if (res.delay) await new Promise((d) => setTimeout(d, res.delay));
    return r.fulfill({ status: res.status, body: 'ok' });
  });
  await ctx.addInitScript(() => {
    window.__fbq = [];
    window.fbq = (...a) => window.__fbq.push(a);
  });
  const page = await ctx.newPage();
  // A controllable clock lets the submit-timeout test skip 30 seconds without waiting for them.
  if (clock) await page.clock.install();
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  const leads = () => page.evaluate(() => window.__fbq.filter((c) => c[0] === 'track' && c[1] === 'Lead').length);
  return { ctx, page, posts, leads };
}

function parseMultipart(req) {
  const body = req.postDataBuffer()?.toString('latin1') ?? '';
  const fields = {};
  for (const m of body.matchAll(/name="([^"]+)"(?:; filename="[^"]*")?\r\n(?:Content-Type: [^\r]*\r\n)?\r\n([\s\S]*?)\r\n--/g)) fields[m[1]] = m[2];
  return { fields, raw: body };
}

const form = (page) => page.locator('form[data-estimate-form]').first();
async function fillValid(page, { phone = '(214) 555-0123', email = 'pat@example.com', pickService = true } = {}) {
  const f = form(page);
  await f.locator('[name="name"]').fill('Pat Homeowner');
  await f.locator('[name="phone"]').fill(phone);
  await f.locator('[name="email"]').fill(email);
  await f.locator('[name="city"]').fill('Plano');
  if (pickService) await f.locator('[name="service"]').selectOption({ index: 1 });
}

test('public branding says Structure1 Builds', async () => {
  const { ctx, page } = await open('/');
  assert.match(await page.title(), /Structure1 Builds/);
  assert.equal(await page.locator('meta[property="og:site_name"]').getAttribute('content'), 'Structure1 Builds');
  assert.doesNotMatch(await page.locator('body').innerText(), /Structure1 Construction/);
  const contact = await ctx.newPage();
  await contact.goto(`${BASE}/contact`);
  assert.match(await contact.title(), /\| Structure1 Builds$/);
  await ctx.close();
});

test('blog posts use the current brand in body text and featured image alt text', async () => {
  const { ctx, page } = await open('/blog/patio-cover-permit-dallas-fort-worth');
  assert.doesNotMatch(await page.locator('main').innerText(), /Structure1 Construction/);
  const alts = await page.locator('main img').evaluateAll((imgs) => imgs.map((i) => i.alt).join(' | '));
  assert.doesNotMatch(alts, /Structure1 Construction/);
  assert.match(alts, /Structure1 Builds/);
  await ctx.close();
});

test('privacy policy lists the configured company email, not an unconfigured inbox', async () => {
  const { ctx, page } = await open('/privacy');
  const text = await page.locator('main').innerText();
  assert.ok(text.includes(company.email), `privacy contact shows ${company.email}`);
  assert.doesNotMatch(text, /info@structure1\.com/);
  assert.match(text, /session storage/i);
  assert.match(text, /click identifiers/i);
  await ctx.close();
});

for (const route of ['/', '/estimate', '/contact']) {
  test(`the ${route} form links to the privacy policy`, async () => {
    const { ctx, page } = await open(route);
    const link = form(page).locator('a[href="/privacy"]');
    assert.equal(await link.count(), 1);
    assert.ok(await link.isVisible());
    await ctx.close();
  });
}

test('mobile hero leads with an estimate CTA that keyboard users can follow to the form', async () => {
  const { ctx, page } = await open('/', { viewport: { width: 390, height: 844 } });
  const hero = page.locator('section[data-dark-hero]');
  const cta = hero.getByRole('link', { name: /free estimate/i });
  assert.equal(await cta.count(), 1);
  const box = await cta.boundingBox();
  assert.ok(box && box.y + box.height <= 844, 'estimate CTA is on the first screen');
  const work = hero.getByRole('link', { name: 'See the work' });
  assert.equal(await work.getAttribute('href'), '/projects', 'gallery stays as the secondary action');
  const order = await hero.evaluate((h) => {
    const links = [...h.querySelectorAll('a')].map((a) => a.textContent.trim());
    return [links.findIndex((t) => /free estimate/i.test(t)), links.indexOf('See the work')];
  });
  assert.ok(order[0] > -1 && order[0] < order[1], 'estimate CTA comes before the gallery link');
  const href = await cta.getAttribute('href');
  assert.ok(href.startsWith('#') && (await page.locator(href).count()) === 1, `CTA target ${href} exists`);
  await cta.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  const nameBox = await form(page).locator('[name="name"]').boundingBox();
  assert.ok(nameBox && nameBox.y >= 0 && nameBox.y + nameBox.height <= 844, 'form is scrolled into view');
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
    if (await page.evaluate(() => document.activeElement?.getAttribute('name') === 'name')) break;
  }
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'name', 'Tab continues into the form');
  await ctx.close();
});

test('an invalid phone is announced on the field, focused, and nothing is sent', async () => {
  const { ctx, page, posts, leads } = await open('/estimate');
  await fillValid(page, { phone: 'call me' });
  await form(page).locator('button[type="submit"]').click();
  const phone = form(page).locator('[name="phone"]');
  assert.equal(await phone.getAttribute('aria-invalid'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'phone');
  const describedBy = await phone.getAttribute('aria-describedby');
  assert.ok(describedBy, 'phone has a described-by error');
  assert.match(await page.locator(`[id="${describedBy.split(' ')[0]}"]`).innerText(), /phone/i);
  assert.equal(await form(page).locator('[name="name"]').inputValue(), 'Pat Homeowner', 'entered data kept');
  assert.equal(posts.length, 0);
  assert.equal(await leads(), 0);
  await ctx.close();
});

test('an invalid email is flagged and blocks the POST', async () => {
  const { ctx, page, posts } = await open('/estimate');
  await fillValid(page, { email: 'pat@example' });
  await form(page).locator('button[type="submit"]').click();
  assert.equal(await form(page).locator('[name="email"]').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'email');
  assert.equal(posts.length, 0);
  await ctx.close();
});

test('photo limits are stated up front and a fourth photo is refused, not dropped', async () => {
  const { ctx, page, posts } = await open('/estimate');
  const input = form(page).locator('input[type="file"]');
  const hint = await page.locator(`[id="${(await input.getAttribute('aria-describedby')).split(' ')[0]}"]`).innerText();
  assert.match(hint, /3 photos/i);
  assert.match(hint, /7 MB/);
  await fillValid(page);
  const img = (n) => ({ name: `p${n}.jpg`, mimeType: 'image/jpeg', buffer: Buffer.alloc(1024, n) });
  await input.setInputFiles([img(1), img(2), img(3), img(4)]);
  assert.match(await form(page).innerText(), /up to 3 photos/i);
  await form(page).locator('button[type="submit"]').click();
  assert.equal(posts.length, 0);
  assert.equal(await input.getAttribute('aria-invalid'), 'true');
  await input.setInputFiles([img(1), img(2), img(3)]);
  await form(page).locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  assert.equal(posts.length, 1);
  assert.deepEqual(['photo1', 'photo2', 'photo3'].map((k) => k in posts[0].fields), [true, true, true]);
  await ctx.close();
});

test('campaign context reaches the Netlify payload; double submit sends once and Lead fires once', async () => {
  const q = 'offer=patio-kitchen&utm_source=facebook&utm_medium=paid_social&utm_campaign=spring&fbclid=AbC123&email=leak%40example.com&secret=abc';
  const { ctx, page, posts, leads } = await open(`/estimate?${q}`, { respond: () => ({ status: 200, delay: 400 }) });
  assert.match(await page.locator('main').innerText(), /Patio cover \+ outdoor kitchen/);
  assert.equal(await form(page).locator('[name="service"]').inputValue(), 'Outdoor Living', 'offer preselects the project type');
  await fillValid(page, { pickService: false });
  await form(page).evaluate((f) => {
    f.requestSubmit();
    f.requestSubmit();
  });
  await page.getByText('Request received').waitFor();
  await page.waitForTimeout(300);
  assert.equal(posts.length, 1, 'one POST');
  assert.equal(await leads(), 1, 'one Lead');
  const f = posts[0].fields;
  assert.equal(f['form-name'], 'contact');
  assert.equal(f.utm_source, 'facebook');
  assert.equal(f.utm_campaign, 'spring');
  assert.equal(f.fbclid, 'AbC123');
  assert.equal(f.offer, 'patio-kitchen');
  assert.equal(f.landing_page, '/estimate');
  assert.equal(f.form_page, '/estimate');
  assert.equal(f.referralSource, 'website');
  assert.equal(f.phone, '(214) 555-0123');
  assert.doesNotMatch(posts[0].raw, /leak@example\.com|secret/);
  const unregistered = Object.keys(f).filter((k) => !registered.has(k));
  assert.deepEqual(unregistered, [], 'every posted field is registered with Netlify');
  const leadCall = await page.evaluate(() => window.__fbq.find((c) => c[1] === 'Lead'));
  assert.doesNotMatch(JSON.stringify(leadCall), /Pat Homeowner|pat@example\.com|555-0123|Plano/, 'no contact details sent to Meta');
  await ctx.close();
});

test('query-only client navigation to a new offer updates the open form, keeps typed details and picks up new UTMs', async () => {
  const { ctx, page, posts } = await open('/estimate?offer=patio-cover');
  const f = form(page);
  assert.match(await f.innerText(), /asking about: Patio cover\b(?! \+)/);
  assert.equal(await f.locator('[name="service"]').inputValue(), 'Patio Covers');
  await fillValid(page, { pickService: false });
  // Marker proves the form element survives the navigation (no remount), which is the case the bug needs.
  await f.evaluate((el) => (el.dataset.marker = 'same'));
  await page.evaluate(() => window.next.router.push('/estimate?offer=patio-kitchen&utm_source=google&utm_campaign=kitchen'));
  await page.waitForURL('**/estimate?offer=patio-kitchen*');
  await f.getByText('Patio cover + outdoor kitchen').waitFor();
  assert.equal(await f.getAttribute('data-marker'), 'same', 'form was not remounted');
  assert.equal(await f.locator('[name="service"]').inputValue(), 'Outdoor Living', 'project type follows the new offer');
  assert.equal(await f.locator('[name="name"]').inputValue(), 'Pat Homeowner', 'typed details are kept');
  await f.locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  const p = posts[0].fields;
  assert.deepEqual([p.offer, p.service, p.utm_source, p.utm_campaign], ['patio-kitchen', 'Outdoor Living', 'google', 'kitchen']);
  assert.match(p.subject, /Outdoor Living \(Patio cover \+ outdoor kitchen\)/);
  await ctx.close();
});

test('choosing a different project type than the ad offer hides the offer claim and the service wins', async () => {
  const { ctx, page, posts } = await open('/estimate?offer=patio-kitchen&utm_source=facebook');
  const f = form(page);
  assert.match(await f.innerText(), /outdoor kitchen/);
  await fillValid(page, { pickService: false });
  await f.locator('[name="service"]').selectOption('Concrete');
  assert.doesNotMatch(await f.innerText(), /asking about|outdoor kitchen/i);
  await f.locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  const p = posts[0].fields;
  assert.equal(p.service, 'Concrete');
  assert.equal(p.offer, 'patio-kitchen', 'original ad context kept for sales');
  assert.equal(p.utm_source, 'facebook');
  assert.doesNotMatch(p.subject, /kitchen/i);
  await ctx.close();
});

test('a stalled request times out into a retryable state with honest wording and no Lead', async () => {
  const { ctx, page, posts, leads } = await open('/estimate', { clock: true, respond: (n) => (n === 1 ? 'hang' : { status: 200 }) });
  await fillValid(page);
  await form(page).locator('button[type="submit"]').click();
  await form(page).getByText('Sending…').waitFor();
  await page.clock.fastForward(31_000);
  const alert = page.getByRole('alert').filter({ hasText: /could not confirm/i });
  await alert.waitFor();
  assert.doesNotMatch(await alert.innerText(), /not sent/i);
  assert.match(await alert.innerText(), /580/);
  assert.equal(await leads(), 0);
  assert.equal(await form(page).locator('[name="email"]').inputValue(), 'pat@example.com');
  assert.equal(await form(page).locator('button[type="submit"]').isEnabled(), true);
  await form(page).locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  assert.equal(posts.length, 2);
  assert.equal(await leads(), 1);
  await ctx.close();
});

test('AVIF and JFIF photos are accepted; SVG is refused', async () => {
  const { ctx, page } = await open('/estimate');
  const input = form(page).locator('input[type="file"]');
  await input.setInputFiles([
    { name: 'shot.avif', mimeType: 'image/avif', buffer: Buffer.alloc(1024, 1) },
    { name: 'IMG_1.jfif', mimeType: 'image/jpeg', buffer: Buffer.alloc(1024, 2) },
  ]);
  assert.equal(await input.getAttribute('aria-invalid'), null);
  await input.setInputFiles([{ name: 'logo.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>') }]);
  assert.equal(await input.getAttribute('aria-invalid'), 'true');
  await ctx.close();
});

test('ad params on a non-form landing page survive client-side navigation to the form', async () => {
  const { ctx, page, posts } = await open('/services/patio-covers?utm_source=google&utm_medium=cpc&gclid=Gc1');
  await page.locator('main a[href="/estimate"]').first().click();
  await page.waitForURL('**/estimate');
  await fillValid(page);
  await form(page).locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  const f = posts[0].fields;
  assert.deepEqual([f.utm_source, f.utm_medium, f.gclid, f.landing_page, f.form_page], ['google', 'cpc', 'Gc1', '/services/patio-covers', '/estimate']);
  await ctx.close();
});

test('a plain visit falls back to the generic website source', async () => {
  const { ctx, page, posts } = await open('/contact');
  await fillValid(page);
  await form(page).locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  const f = posts[0].fields;
  assert.equal(f.referralSource, 'website');
  assert.equal(f.form_page, '/contact');
  assert.equal(f.utm_source, undefined);
  await ctx.close();
});

test('a server error keeps the entered data, shows the phone fallback, and fires no Lead; retry works', async () => {
  const { ctx, page, posts, leads } = await open('/estimate', { respond: (n) => ({ status: n === 1 ? 500 : 200 }) });
  await fillValid(page);
  await form(page).locator('button[type="submit"]').click();
  await page.getByRole('alert').filter({ hasText: /580/ }).waitFor();
  assert.equal(await leads(), 0);
  assert.equal(await form(page).locator('[name="email"]').inputValue(), 'pat@example.com');
  await form(page).locator('button[type="submit"]').click();
  await page.getByText('Request received').waitFor();
  assert.equal(posts.length, 2);
  assert.equal(await leads(), 1);
  await ctx.close();
});

test('a network failure fires no Lead', async () => {
  const { ctx, page, leads } = await open('/estimate', { respond: () => 'network-error' });
  await fillValid(page);
  await form(page).locator('button[type="submit"]').click();
  await page.getByRole('alert').filter({ hasText: /580/ }).waitFor();
  assert.equal(await leads(), 0);
  await ctx.close();
});

test('a phone tap records Contact (a tap, not a completed call)', async () => {
  const { ctx, page } = await open('/estimate');
  await page.evaluate(() => window.addEventListener('click', (e) => e.target.closest?.('a[href^="tel:"]') && e.preventDefault(), true));
  await page.locator('main a[href^="tel:"]').first().click();
  const contacts = await page.evaluate(() => window.__fbq.filter((c) => c[1] === 'Contact').length);
  assert.equal(contacts, 1);
  assert.equal(await page.evaluate(() => window.__fbq.filter((c) => c[1] === 'Lead').length), 0);
  await ctx.close();
});
