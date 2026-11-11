// Browser checks for the home page polish: header contrast in each state, the hero photo and crop, the early
// project proof, keyboard access and horizontal overflow. Needs a running build of this site, like
// conversion.e2e.mjs:
//   npm run build && npm run start -- -p 3211
//   npm run test:e2e            (runs this file and the conversion tests)
// Every request that is not to the local server is aborted, and any POST to the Netlify form endpoint is
// recorded and failed, so no lead or third-party call can leave the machine.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { loadTs } from '../helpers/load-ts.mjs';

const { HOME_PROOF, HERO_PHOTO } = await loadTs('src/content/home.ts');
const { getProject } = await loadTs('src/content/projects.ts');
const { photos } = await loadTs('src/content/images.ts');
const BASE = process.env.E2E_BASE ?? 'http://localhost:3211';
const BASE_HOST = new URL(BASE).host;
const WIDTHS = [360, 390, 768, 1440];

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

async function open(route, { width = 1440, height = 900 } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const posts = [];
  await ctx.route('**/*', (r) => (new URL(r.request().url()).host === BASE_HOST ? r.fallback() : r.abort()));
  await ctx.route('**/__forms.html', (r) => {
    if (r.request().method() !== 'POST') return r.fallback();
    posts.push(r.request().url());
    return r.abort();
  });
  await ctx.addInitScript(() => {
    window.fbq = () => {};
  });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  const close = async () => {
    assert.equal(posts.length, 0, 'no form was posted');
    await ctx.close();
  };
  return { page, close };
}

// WCAG relative luminance and contrast, with alpha composited over a given backdrop.
const parse = (c) => {
  const m = c.match(/rgba?\(([^)]+)\)/);
  const [r, g, b, a = 1] = m[1].split(',').map((x) => Number(x.trim()));
  return { r, g, b, a };
};
const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
const lum = ({ r, g, b }) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (x, y) => {
  const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (a + 0.05) / (b + 0.05);
};
const WHITE = { r: 255, g: 255, b: 255, a: 1 };

/** Background and text colors of the header and the given element inside it. */
const headerColors = (page, selector) =>
  page.evaluate((sel) => {
    const h = document.querySelector('header[data-header]');
    const el = h.querySelector(sel);
    return { bg: getComputedStyle(h).backgroundColor, fg: getComputedStyle(el).color };
  }, selector);

/** Worst case for the header text: the backdrop sitting over the brightest possible sky (pure white). */
function worstCaseContrast({ bg, fg }) {
  const ground = over(parse(bg), WHITE);
  return contrast(over(parse(fg), ground), ground);
}

test('desktop: the header over the hero has a dark, readable backdrop and turns white once scrolled', async () => {
  const { page, close } = await open('/');
  const top = await headerColors(page, 'nav[aria-label="Main"] > a');
  const bg = parse(top.bg);
  assert.ok(bg.a >= 0.7, `backdrop is mostly opaque (alpha ${bg.a})`);
  assert.ok(lum(bg) < 0.05, 'backdrop is dark');
  assert.ok(worstCaseContrast(top) >= 4.5, `nav text stays readable over a white sky (${worstCaseContrast(top).toFixed(2)}:1)`);
  const logo = await headerColors(page, 'a[aria-label="Structure1 home"]');
  assert.ok(worstCaseContrast(logo) >= 7, `logo contrast ${worstCaseContrast(logo).toFixed(2)}:1`);
  const phone = await headerColors(page, 'a[href^="tel:"]');
  assert.ok(worstCaseContrast(phone) >= 4.5, `phone contrast ${worstCaseContrast(phone).toFixed(2)}:1`);

  await page.mouse.wheel(0, 600);
  await page.waitForFunction(() => document.querySelector('header[data-header]').hasAttribute('data-scrolled'));
  await page.waitForTimeout(400);
  const scrolled = await headerColors(page, 'nav[aria-label="Main"] > a');
  assert.equal(scrolled.bg, 'rgb(255, 255, 255)', 'scrolled header is white');
  assert.ok(contrast(parse(scrolled.fg), WHITE) >= 4.5, 'scrolled nav text is dark');
  await close();
});

test('desktop: the services dropdown still opens from the keyboard and closes on Escape', async () => {
  const { page, close } = await open('/');
  const btn = page.locator('header button[aria-controls="services-menu"]');
  await btn.focus();
  await page.keyboard.press('Enter');
  assert.equal(await btn.getAttribute('aria-expanded'), 'true');
  const menu = await page.locator('#services-menu').evaluate((el) => getComputedStyle(el).backgroundColor);
  assert.equal(menu, 'rgb(255, 255, 255)', 'dropdown stays white with black text');
  await page.keyboard.press('Escape');
  assert.equal(await btn.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-controls')), 'services-menu', 'focus returns to the button');
  await close();
});

test('focus rings are visible (white) on the dark header and the hero actions', async () => {
  const { page, close } = await open('/');
  await page.keyboard.press('Tab');
  // Skip anything before the logo (e.g. a skip link) until a header link has focus.
  for (let i = 0; i < 3 && !(await page.evaluate(() => !!document.activeElement?.closest('header'))); i++) await page.keyboard.press('Tab');
  const ringOf = (el) => {
    const s = getComputedStyle(el);
    return { visible: el.matches(':focus-visible'), color: s.outlineColor, style: s.outlineStyle };
  };
  const ring = await page.evaluate(`(${ringOf})(document.activeElement)`);
  assert.ok(ring.visible, 'header link shows :focus-visible');
  assert.equal(ring.style, 'solid');
  assert.equal(ring.color, 'rgb(255, 255, 255)', 'header focus ring is white on the dark backdrop');
  // Reach the hero action and the first form field by keyboard, so :focus-visible genuinely applies.
  const tabTo = async (match) => {
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      if (await page.evaluate(match)) return page.evaluate(`(${ringOf})(document.activeElement)`);
    }
    throw new Error('focus never reached the target');
  };
  const heroRing = await tabTo(() => document.activeElement?.textContent?.trim() === 'See the work');
  assert.ok(heroRing.visible && heroRing.style === 'solid');
  assert.equal(heroRing.color, 'rgb(255, 255, 255)', 'hero action focus ring is white');
  // Form fields show focus with a black border (their outline is suppressed); the white ring must not leak in.
  const formRing = await tabTo(() => document.activeElement?.getAttribute('name') === 'name');
  assert.ok(formRing.visible);
  assert.notEqual(formRing.color, 'rgb(255, 255, 255)', 'no white ring inside the white estimate card');
  assert.equal(await page.evaluate(() => getComputedStyle(document.activeElement).borderTopColor), 'rgb(14, 14, 14)', 'focused field border is black');
  await close();
});

test('mobile: logo and icons are readable at the top, the menu opens white and Escape closes it back to the button', async () => {
  const { page, close } = await open('/', { width: 390, height: 844 });
  for (const sel of ['a[aria-label="Structure1 home"]', 'a[aria-label^="Call"]', 'button[aria-controls="mobile-menu"]']) {
    const c = await headerColors(page, sel);
    assert.ok(worstCaseContrast(c) >= 4.5, `${sel} contrast ${worstCaseContrast(c).toFixed(2)}:1`);
  }
  const burger = page.locator('button[aria-controls="mobile-menu"]');
  await burger.click();
  assert.equal(await burger.getAttribute('aria-expanded'), 'true');
  await page.waitForTimeout(400);
  const openColors = await headerColors(page, 'a[aria-label="Structure1 home"]');
  assert.equal(openColors.bg, 'rgb(255, 255, 255)', 'open header is white');
  assert.ok(contrast(parse(openColors.fg), WHITE) >= 7, 'open header logo is black');
  const menu = page.locator('#mobile-menu');
  assert.equal(await menu.getAttribute('aria-hidden'), 'false');
  assert.ok(await menu.getByRole('link', { name: 'Get a Free Estimate' }).isVisible());
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'no horizontal overflow with the menu open');
  await page.keyboard.press('Escape');
  assert.equal(await burger.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-controls')), 'mobile-menu', 'focus returns to the menu button');
  assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'page scroll is restored');
  await close();
});

for (const [width, height, key] of [
  [1440, 900, 'lg'],
  [390, 844, 'base'],
]) {
  test(`hero at ${width}px: one eager photo, the wide renovation shot, cropped for this width`, async () => {
    const { page, close } = await open('/', { width, height });
    const imgs = page.locator('section[data-dark-hero] img');
    assert.equal(await imgs.count(), 1, 'one hero image, not separate desktop and mobile copies');
    const info = await imgs.first().evaluate((img) => ({
      src: img.currentSrc || img.src,
      loading: img.getAttribute('loading'),
      priority: img.getAttribute('fetchpriority'),
      sizes: img.getAttribute('sizes'),
      position: getComputedStyle(img).objectPosition,
      fit: getComputedStyle(img).objectFit,
      alt: img.alt,
    }));
    assert.match(decodeURIComponent(info.src), /pergola-turf-wide\.jpg/);
    assert.equal(info.alt, photos[HERO_PHOTO.id].alt);
    assert.equal(info.loading, 'eager');
    assert.equal(info.priority, 'high');
    assert.equal(info.sizes, '100vw');
    assert.equal(info.fit, 'cover');
    assert.equal(info.position, HERO_PHOTO.position[key]);
    await close();
  });
}

test('hero copy: label, headline and supporting line, with both actions kept', async () => {
  const { page, close } = await open('/');
  const hero = page.locator('section[data-dark-hero]');
  assert.match(await hero.innerText(), /Patio covers & outdoor living · Dallas–Fort Worth/);
  assert.equal((await hero.locator('h1').innerText()).trim(), 'Make more room for life outside.');
  assert.match(await hero.innerText(), /Custom patio covers and outdoor kitchens planned around your home and how you want to use the space\./);
  assert.equal(await hero.getByRole('link', { name: 'See the work' }).getAttribute('href'), '/projects');
  assert.ok(await hero.locator('form[data-estimate-form]').isVisible(), 'desktop lead form stays in the hero');
  await close();
});

test('mobile at 360px: the estimate button is on the first screen and jumps to the form', async () => {
  const { page, close } = await open('/', { width: 360, height: 740 });
  const cta = page.locator('section[data-dark-hero]').getByRole('link', { name: /free estimate/i });
  const box = await cta.boundingBox();
  assert.ok(box && box.y + box.height <= 740, 'estimate CTA is on the first screen');
  await cta.click();
  await page.waitForTimeout(600);
  const nameBox = await page.locator('#hero-estimate [name="name"]').boundingBox();
  assert.ok(nameBox && nameBox.y >= 0 && nameBox.y + nameBox.height <= 740, 'form is scrolled into view');
  await close();
});

test('three real projects follow the hero, before services, each linking to its project page', async () => {
  const { page, close } = await open('/');
  const order = await page.evaluate(() => {
    const all = [...document.querySelectorAll('main section, main [data-home-proof]')];
    const at = (el) => (el ? all.indexOf(el) : -1);
    return {
      hero: at(document.querySelector('section[data-dark-hero]')),
      proof: at(document.querySelector('[data-home-proof]')),
      services: at(document.getElementById('services')),
    };
  });
  assert.ok(order.hero > -1 && order.proof > order.hero && order.proof < order.services, JSON.stringify(order));
  const proof = page.locator('[data-home-proof]');
  const cards = proof.locator('[data-proof-card]');
  assert.equal(await cards.count(), 3);
  for (const [i, slug] of HOME_PROOF.entries()) {
    const p = getProject(slug);
    const card = cards.nth(i);
    const text = await card.innerText();
    assert.match(text, new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(text.includes(p.location), `${slug} shows ${p.location}`);
    const link = card.getByRole('link', { name: new RegExp(`View project.*${p.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) });
    assert.equal(await link.count(), 1, `${slug} has one named View project link`);
    assert.equal(await link.getAttribute('href'), `/projects/${slug}`);
    const res = await page.request.get(BASE + `/projects/${slug}`);
    assert.equal(res.status(), 200, `/projects/${slug} resolves`);
  }
  assert.equal(await proof.getByRole('link', { name: /all projects/i }).getAttribute('href'), '/projects');
  assert.equal(await page.getByRole('heading', { name: 'Recent work' }).count(), 0, 'the old grid is not repeated lower down');
  assert.equal(await page.locator('a[href="/projects/gable-home-extension-watauga"]').first().isVisible(), true, 'the big feature project is still on the page');
  await close();
});

test('keyboard users reach every View project link in order after the hero form', async () => {
  const { page, close } = await open('/');
  const expected = HOME_PROOF.map((s) => `/projects/${s}`);
  const seen = [];
  for (let i = 0; i < 80 && seen.length < expected.length; i++) {
    await page.keyboard.press('Tab');
    const href = await page.evaluate(() => (document.activeElement?.closest('[data-home-proof]') ? document.activeElement.getAttribute('href') : null));
    if (href && expected.includes(href) && !seen.includes(href)) seen.push(href);
  }
  assert.deepEqual(seen, expected);
  await close();
});

for (const width of WIDTHS) {
  test(`no horizontal overflow on the home page at ${width}px`, async () => {
    const { page, close } = await open('/', { width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const { sw, vw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: window.innerWidth }));
    assert.ok(sw <= vw, `scrollWidth ${sw} <= viewport ${vw}`);
    await close();
  });
}

test('estimate form: field borders meet 3:1 against white, required fields unchanged, description marked optional', async () => {
  const { page, close } = await open('/');
  const f = page.locator('#hero-estimate form[data-estimate-form]');
  const border = await f.locator('[name="name"]').evaluate((el) => getComputedStyle(el).borderTopColor);
  assert.ok(contrast(parse(border), WHITE) >= 3, `input border contrast ${contrast(parse(border), WHITE).toFixed(2)}:1`);
  const required = await f.locator('[required]').evaluateAll((els) => els.map((e) => e.getAttribute('name')));
  assert.deepEqual(required, ['name', 'phone', 'email', 'city', 'service']);
  const names = await f.locator('input:not([type="hidden"]):not([name="bot-field"]), select, textarea').evaluateAll((els) => els.map((e) => e.getAttribute('name')));
  assert.deepEqual(names, ['name', 'phone', 'email', 'city', 'service', 'message'], 'compact field order unchanged');
  const msgLabel = await f.locator('label[for]').filter({ hasText: /Project description/ }).innerText();
  assert.match(msgLabel, /optional/i);
  assert.equal(await f.locator('a[href="/privacy"]').count(), 1);
  await close();
});
