// Where an estimate request came from, so sales can tell an ad lead from an organic one.
//
// Deliberately small: only the params below are read, every value is bounded, the landing page is
// stored as a path (no query string) and the referrer as an origin (no path or search terms).
// Nothing here is sent to analytics; it rides along with the form submission only.
// Kept free of project imports so tests can load it directly.

export const ATTRIBUTION_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'offer', 'package', 'size', 'landing_page', 'referrer_origin'] as const;
export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];
export type Attribution = Partial<Record<AttributionField, string>>;
type KV = { getItem(k: string): string | null; setItem(k: string, v: string): void };

/**
 * Generic intents an ad or link may request with `?offer=`. Labels describe the request only; no
 * prices or package terms live here. Add a new key only once the owner has approved the offer.
 */
export const OFFERS = {
  'patio-cover': { label: 'Patio cover', service: 'Patio Covers' },
  'patio-kitchen': { label: 'Patio cover + outdoor kitchen', service: 'Outdoor Living' },
} as const;
export type OfferKey = keyof typeof OFFERS;

const KEY = 's1_attribution';
// Fields that identify where a visitor came from. A visit carrying any of them starts a new touch.
const SOURCE_FIELDS: AttributionField[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
// What the visitor asked about. On-site links can set these without changing the source.
const INTENT_FIELDS: AttributionField[] = ['offer', 'package', 'size'];
const CAMPAIGN_FIELDS = [...SOURCE_FIELDS, ...INTENT_FIELDS];

const text = (max: number) => (v: string) => {
  const s = v.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
  // A campaign label never needs an "@": if one shows up it is probably someone's email.
  return s && !s.includes('@') ? s : undefined;
};
const pattern = (re: RegExp) => (v: string) => (re.test(v) ? v : undefined);
const RULES: Record<AttributionField, (v: string) => string | undefined> = {
  utm_source: text(100),
  utm_medium: text(100),
  utm_campaign: text(100),
  utm_content: text(100),
  utm_term: text(100),
  gclid: pattern(/^[A-Za-z0-9_.-]{1,255}$/),
  fbclid: pattern(/^[A-Za-z0-9_.-]{1,255}$/),
  offer: (v) => (Object.prototype.hasOwnProperty.call(OFFERS, v) ? v : undefined),
  package: pattern(/^[a-z0-9-]{1,32}$/),
  size: pattern(/^[a-z0-9-]{1,32}$/),
  landing_page: pattern(/^\/[^?#\s]{0,199}$/),
  referrer_origin: pattern(/^https?:\/\/[^/?#\s]{1,100}$/),
};

function sanitize(input: unknown): Attribution {
  const out: Attribution = {};
  if (!input || typeof input !== 'object') return out;
  for (const k of ATTRIBUTION_FIELDS) {
    const v = (input as Record<string, unknown>)[k];
    const ok = typeof v === 'string' ? RULES[k](v) : undefined;
    if (ok) out[k] = ok;
  }
  return out;
}

/** The attribution a single page view carries: allowlisted params, the path, and an external referrer's origin. */
export function readTouch(href: string, referrer: string): Attribution {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return {};
  }
  const raw: Record<string, string> = { landing_page: url.pathname };
  for (const k of CAMPAIGN_FIELDS) {
    const v = url.searchParams.get(k);
    if (v) raw[k] = v;
  }
  try {
    const ref = new URL(referrer);
    if ((ref.protocol === 'https:' || ref.protocol === 'http:') && ref.origin !== url.origin) raw.referrer_origin = ref.origin;
  } catch {
    // No referrer, or not a URL.
  }
  return sanitize(raw);
}

// Used when sessionStorage is unavailable (blocked cookies, private modes, sandboxed frames).
let memory: Attribution | undefined;

function load(storage: KV | null): Attribution | undefined {
  try {
    const raw = storage?.getItem(KEY);
    if (raw) return sanitize(JSON.parse(raw));
  } catch {
    // Blocked or corrupt storage: fall back to memory.
  }
  return memory;
}

function save(storage: KV | null, a: Attribution) {
  memory = a;
  try {
    storage?.setItem(KEY, JSON.stringify(a));
  } catch {
    // Storage blocked or full; the in-memory copy still covers this page session.
  }
}

/**
 * Records a page view and returns the session's attribution. The first touch of a session is
 * kept through ordinary navigation; a visit carrying any source param (utm_*, gclid, fbclid)
 * replaces it wholesale, so identifiers from two different campaigns are never mixed in one lead.
 * An offer/package/size param on its own only updates what was asked for.
 */
export function recordTouch(href: string, referrer: string, storage: KV | null): Attribution {
  const touch = readTouch(href, referrer);
  const stored = load(storage);
  if (SOURCE_FIELDS.some((k) => touch[k]) || !stored || !Object.keys(stored).length) {
    save(storage, touch);
    return touch;
  }
  if (!INTENT_FIELDS.some((k) => touch[k])) return stored;
  const next = { ...stored };
  for (const k of INTENT_FIELDS) delete next[k];
  for (const k of INTENT_FIELDS) if (touch[k]) next[k] = touch[k];
  save(storage, next);
  return next;
}

/** Fired on `window` with the session's attribution each time the URL (path or query) changes. */
export const ATTRIBUTION_EVENT = 's1:attribution';

/**
 * Records a page view and announces the result, so a form that stays mounted through a query-only
 * navigation (/estimate?offer=a → ?offer=b) can update what it shows.
 */
export function captureTouch(href: string, referrer: string, storage: KV | null, target: EventTarget | null): Attribution {
  const a = recordTouch(href, referrer, storage);
  target?.dispatchEvent(new CustomEvent(ATTRIBUTION_EVENT, { detail: a }));
  return a;
}

/** sessionStorage, or null when the browser blocks it (reading the property itself can throw). */
export function sessionStore(): KV | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}
