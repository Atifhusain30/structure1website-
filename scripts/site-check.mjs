// node scripts/site-check.mjs [--base http://localhost:3000] [--no-shots]
// Reads /sitemap.xml, visits every URL + /estimate, /process, and a 404 route; follows every same-origin link once;
// asserts: status 200 (404 for the 404 route), exactly one h1, a canonical link, JSON-LD present,
// no console errors, no hydration warnings, no horizontal overflow; screenshots at 5 viewports.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const argv = (k, d) => {
  const i = args.indexOf(k);
  return i === -1 ? d : args[i + 1];
};
const NO_SHOTS = args.includes('--no-shots');
const OUT = path.resolve('..', '_site-check');
const VIEWPORTS = [
  ['1920', 1920, 1080],
  ['1440', 1440, 900],
  ['1280', 1280, 800],
  ['768', 768, 1024],
  ['390', 390, 844],
];

async function up(u) {
  try {
    const r = await fetch(u, { signal: AbortSignal.timeout(3000) });
    return r.status < 500;
  } catch {
    return false;
  }
}
async function server() {
  const pref = argv('--base', 'http://localhost:3000');
  if (await up(pref)) return { base: pref, child: null };
  const child = spawn('npx', ['next', 'dev', '-p', '3100'], { shell: true, stdio: 'ignore' });
  for (let i = 0; i < 120; i++) {
    if (await up('http://localhost:3100')) return { base: 'http://localhost:3100', child };
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('no server');
}
const stop = (c) => {
  if (!c) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(c.pid), '/T', '/F'], { stdio: 'ignore' });
  else c.kill();
};
const settle = async (p) => {
  await p.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await p.waitForTimeout(800);
};

const { base, child } = await server();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const fromSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seeds = [...new Set([...fromSitemap, '/estimate', '/process', '/projects?service=patio-covers', '/blog?topic=planning'])];
const queue = [...seeds];
const seen = new Set(queue);
const results = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const LIMIT = Number(argv('--limit', '0')) || Infinity;
let visited = 0;

while (queue.length && visited < LIMIT) {
  const route = queue.shift();
  visited++;
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || /hydrat/i.test(m.text())) consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  let res = null;
  let navError = null;
  try {
    res = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await settle(page);
  } catch (e) {
    navError = String(e.message).split('\n')[0];
  }
  const status = res?.status() ?? 0;
  const info = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    canonical: Boolean(document.querySelector('link[rel="canonical"]')),
    jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h && h.startsWith('/') && !h.startsWith('//')),
  }));
  for (const l of info.links) {
    const p = l.split('#')[0];
    if (p && !seen.has(p)) {
      seen.add(p);
      queue.push(p);
    }
  }
  const problems = [];
  if (navError) problems.push(`navigation: ${navError}`);
  if (status !== 200) problems.push(`status ${status}`);
  if (info.h1 !== 1) problems.push(`h1 count ${info.h1}`);
  if (!info.canonical) problems.push('no canonical');
  if (info.jsonld === 0) problems.push('no JSON-LD');
  if (info.overflow > 0) problems.push(`overflow +${info.overflow}px @1440`);
  if (consoleErrors.length) problems.push(`console: ${consoleErrors.slice(0, 2).join(' | ')}`);
  results.push({ route, status, problems });
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${route}${problems.length ? '  ' + problems.join('; ') : ''}`);
  await page.close();
}
const page = await ctx.newPage();
const r404 = await page.goto(`${base}/this-page-does-not-exist`, { waitUntil: 'domcontentloaded' });
const h1404 = await page.evaluate(() => document.querySelectorAll('h1').length);
const ok404 = r404?.status() === 404 && h1404 === 1;
results.push({ route: '/this-page-does-not-exist', status: r404?.status(), problems: ok404 ? [] : [`404 route status ${r404?.status()} h1 ${h1404}`] });
console.log(`${ok404 ? 'ok  ' : 'FAIL'} /this-page-does-not-exist (expects 404)`);
await ctx.close();

if (!NO_SHOTS) {
  for (const [label, w, h] of VIEWPORTS) {
    const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await c.newPage();
    const dir = path.join(OUT, 'shots', label);
    await fs.mkdir(dir, { recursive: true });
    for (const route of seeds) {
      try {
        await p.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 180000 });
        await settle(p);
      } catch (e) {
        results.push({ route, status: 0, problems: [`navigation @${label}: ${String(e.message).split('\n')[0]}`] });
        console.log(`FAIL ${route} navigation @${label}`);
        continue;
      }
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 0) {
        results.push({ route, status: 200, problems: [`overflow +${over}px @${label}`] });
        console.log(`FAIL ${route} overflow +${over}px @${label}`);
      }
      await p.screenshot({ path: path.join(dir, (route === '/' ? 'home' : route.slice(1).replace(/[\/?=&]/g, '_')) + '.png'), fullPage: true });
    }
    await c.close();
    console.log(`shots @${label} done`);
  }
}
await browser.close();
stop(child);
await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(path.join(OUT, 'report.json'), JSON.stringify(results, null, 2));
const bad = results.filter((r) => r.problems.length);
console.log(`\n${results.length} routes checked, ${bad.length} with problems`);
if (bad.length) process.exitCode = 1;
