# Structure1 Site Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild structure1builds.com's presentation and information architecture on the existing Next.js 14 app: typed content layer, new design system and component set, 7 service pages, 10 city pages, project case-study pages, `/estimate` and `/process`, generated internal links and SEO, optimized images, and a verification crawler. Every existing URL keeps working.

**Architecture:** Content lives in `src/content/*.ts` (typed) and `content/blog/*.md`. Page files under `src/app` are thin: they read content and compose components from `src/components`. Styling is Tailwind with a small token set; motion is CSS driven by one IntersectionObserver. framer-motion and Lenis are removed. Verification is `tsc` + `eslint` + `next build` + a Playwright crawler (`scripts/site-check.mjs`) that visits every sitemap URL, follows internal links, and asserts SEO/accessibility invariants at five viewports.

**Tech Stack:** Next.js 14.2 App Router, React 18, TypeScript 5 strict, Tailwind 3.4, next/font (Inter Tight + Inter), lucide-react, gray-matter/remark (existing), sharp 0.34 (dev), playwright-core (dev, drives installed Chrome), Netlify Forms.

**Spec:** `docs/superpowers/specs/2026-10-01-site-upgrade-design.md`

## Global Constraints

- No indexed URL changes: `/`, `/services`, `/services/patio-covers`, `/services/concrete`, `/projects`, `/projects/<9 slugs>`, `/service-areas`, `/service-areas/<plano|frisco|mckinney|arlington|fort-worth>`, `/about`, `/contact`, `/blog`, `/blog/<8 slugs>`, `/privacy`, `/terms`, `/thank-you` all return 200 after the work. `/thank-you` stays `noindex`.
- No invented facts. Trust claims limited to: Licensed & insured; DFW local, Dallas-based; 2-year workmanship warranty; 150+ projects completed; 4+ years in DFW; Permits & engineering handled; In-house crew. Five real testimonials only. Price ranges only where the existing FAQ/blog copy states them.
- Palette: `white #FFFFFF`, `offwhite #F7F6F3`, `black #0A0A0A`, `charcoal #1C1C1C`, `gray-700 #4A4A48`, `gray-500 #7A7975`, `gray-200 #E3E1DC`, `timber #9C7A5B` (active nav, focus ring, link hover, required asterisk only). No gold, no gradients except one bottom fade under text on photos, no shadows except `StickyBar`.
- Typography: Inter Tight (display, 600/700), Inter (body 400/500). No italics in headings.
- Radius 0 except inputs (4px) and the StickyBar container. Buttons 48px tall, 14px/500.
- Motion: CSS-only `data-reveal` fade-up (400ms, 16px), hover scale 1.02, menu/accordion 200–250ms. `prefers-reduced-motion` disables all. No framer-motion, no Lenis.
- CTA wording fixed: nav "Get a Free Estimate"; hero "Get My Free Estimate"; after projects "Get an Estimate"; after a service "Discuss Your Project"; after process "Start Your Project"; city pages "Get a Free Estimate in {City}". All link to `/estimate`.
- Every image renders through `Photo` from the catalog with real alt text; fixed aspect ratio on every slot.
- One `h1` per page; `alternates.canonical` on every page; BreadcrumbList JSON-LD on every inner page.
- The owner's dev server runs on :3000 from this checkout. Never run `npm run build` while it runs. `scripts/site-check.mjs` reuses :3000 when up, else starts `next dev -p 3100`.
- Commit after every task on branch `feat/site-upgrade`.

## Review Focus

1. **Estimate form with a photo attached** must reach Netlify Forms as a multipart submission; a wrong `enctype` or missing hidden-form field silently drops leads. Pinned in Task 7 Step 6 (grep) and Task 10 Step 7 (manual preview submit).
2. **Services dropdown keyboard path**: Tab into "Services", Tab through the 7 items, Escape closes and returns focus. Pinned in Task 2 Step 9.
3. **Old anchor links** `/#estimate` and `/#process` must land on a visible section of the home page. Pinned in Task 3 Step 4.
4. **City pages with no local projects** (Carrollton, Flower Mound, Prosper) must not render an empty grid or a misleading "projects in {City}" heading. Pinned in Task 6 Step 4.
5. **Horizontal overflow at 390px and 768px** across all routes after the layout rebuild. Pinned in Task 10 Step 4 (crawler asserts `scrollWidth <= innerWidth`).

---
### Task 1: Content layer and image optimization

**Files:**
- Create: `src/content/images.ts`, `src/content/types.ts`, `src/content/company.ts`, `src/content/trust.ts`, `src/content/services.ts`, `src/content/projects.ts`, `src/content/cities.ts`, `src/content/testimonials.ts`, `src/content/faqs.ts`, `src/content/process.ts`, `src/content/index.ts`
- Create: `scripts/optimize-images.mjs`
- Modify: `content/blog/*.md` (add `topic` to frontmatter), `src/lib/blog.ts` (read `topic`, add `getPostsByTopic`)
- Modify (binary): `public/images/**`; rename three PNGs to `.jpg`; delete `AI kitchen.jpg`, `new builds.jpg`

**Interfaces:**
- Produces: `photos`, `PhotoId`, `photo(id)`, `services`, `getService(slug)`, `projects`, `getProject(slug)`, `projectsForService(slug)`, `projectsForCity(slug)`, `relatedProjects(project)`, `cities`, `getCity(slug)`, `serviceAreaList`, `testimonials`, `testimonialsForCity(slug)`, `faqs`, `faqsFor(ids)`, `cityFaqs(city)`, `processSteps`, `company`, `trust`, `why`, types `ServiceSlug`, `CitySlug`, `Topic`, `Service`, `Project`, `City`, `Testimonial`, `Faq`; `getPostsByTopic(topic, limit)` from `@/lib/blog`.

- [ ] **Step 1: Branch**

```bash
cd "C:/Users/husai/Desktop/Construction website/structure1-construction"
git checkout -b feat/site-upgrade
```

- [ ] **Step 2: Write the failing type check**

Create `src/content/index.ts`:

```ts
export * from './types';
export * from './images';
export * from './company';
export * from './trust';
export * from './services';
export * from './projects';
export * from './cities';
export * from './testimonials';
export * from './faqs';
export * from './process';
```

Run: `npx tsc --noEmit 2>&1 | head -3`
Expected: `error TS2307: Cannot find module './types'` (and the others).

- [ ] **Step 3: Image optimization script and run**

Create `scripts/optimize-images.mjs`:

```js
// One-off. Backs up public/images/** to ../_image-originals/ (once), then rewrites in place:
// EXIF rotate, max 2400px long edge, JPEG q82 mozjpeg. Three .PNG files become real .jpg files.
// Deletes the two stock images the catalog no longer references.
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/images');
const BACKUP = path.resolve('..', '_image-originals');
const RENAME = { 'cover5.PNG': 'cover5.jpg', 'Concrete1.PNG': 'concrete1.jpg', 'concrete6.PNG': 'concrete6.jpg' };
const DELETE = new Set(['AI kitchen.jpg', 'new builds.jpg']);

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [];
for await (const f of walk(ROOT)) files.push(f);
let before = 0, after = 0;
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const base = path.basename(file);
  const rel = path.relative(ROOT, file);
  const backup = path.join(BACKUP, rel);
  await fs.mkdir(path.dirname(backup), { recursive: true });
  try { await fs.access(backup); } catch { await fs.copyFile(file, backup); }
  if (DELETE.has(base)) { await fs.unlink(file); console.log(`deleted ${rel}`); continue; }
  const input = await fs.readFile(file);
  before += input.length;
  const asJpeg = ext !== '.png' || base in RENAME;
  let p = sharp(input).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true });
  p = asJpeg ? p.jpeg({ quality: 82, mozjpeg: true }) : p.png({ compressionLevel: 9 });
  const out = await p.toBuffer();
  const target = base in RENAME ? path.join(path.dirname(file), RENAME[base]) : file;
  await fs.writeFile(target, out);
  if (target !== file) await fs.unlink(file);
  after += out.length;
  console.log(`${rel.padEnd(44)} ${(input.length / 1024).toFixed(0).padStart(6)} KB -> ${(out.length / 1024).toFixed(0).padStart(5)} KB${target !== file ? ` (renamed ${path.basename(target)})` : ''}`);
}
console.log(`\nTotal ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
```

Run: `node scripts/optimize-images.mjs | tail -3 && du -sk public/images && ls public/images/hero | grep -ciE "\.png$"`
Expected: `Total 86.x MB -> ≤ 12 MB`; `du` ≤ 12500; `1` (only `jeff1.png` stays PNG). `../_image-originals/hero` has 28 files.

- [ ] **Step 4: Photo catalog** — create `src/content/images.ts`:

```ts
export type Focal = 'center' | 'top' | 'bottom';
export type Photo = { src: string; alt: string; focal?: Focal };

export const photos = {
  'gable-mckinney-1': { src: '/images/hero/buckfin1-new.JPG', alt: 'Classic gable patio cover with cedar posts and white trusses in McKinney, Texas' },
  'gable-mckinney-2': { src: '/images/hero/buckfin1.JPG', alt: 'Gable patio cover with outdoor furniture in McKinney, Texas' },
  'gable-mckinney-ceiling': { src: '/images/hero/buckfin2.JPG', alt: 'Tongue-and-groove wood ceiling and fan inside a gable patio cover in McKinney, Texas' },
  'gable-mckinney-build': { src: '/images/hero/buckfin3.JPG', alt: 'Gable patio cover framing in progress in McKinney, Texas' },
  'pergola-plano-foundation': { src: '/images/hero/sashi1.JPG', alt: 'Concrete footings poured for a cedar pergola in Plano, Texas' },
  'pergola-plano-framing': { src: '/images/hero/sashi2.jpg', alt: 'Cedar pergola frame under construction in Plano, Texas' },
  'pergola-plano-complete': { src: '/images/hero/sashi3.JPG', alt: 'Completed cedar pergola with polycarbonate roof in Plano, Texas' },
  'pergola-plano-complete-2': { src: '/images/hero/sashi3-new.JPG', alt: 'Cedar pergola with polycarbonate roof panels in Plano, Texas' },
  'pergola-plano-fan': { src: '/images/hero/sashi4.JPG', alt: 'Polycarbonate pergola roof with ceiling fan in Plano, Texas' },
  'pergola-lewisville-1': { src: '/images/hero/cover1.JPG', alt: 'Free-standing modern cedar pergola with recessed lighting in Lewisville, Texas' },
  'pergola-lewisville-2': { src: '/images/hero/cover2.JPG', alt: 'Cedar pergola with tongue-and-groove ceiling and fans in Lewisville, Texas' },
  'pergola-fort-worth': { src: '/images/hero/cover3.JPG', alt: 'Cedar pergola with polycarbonate roof and ceiling fans in Fort Worth, Texas' },
  'pergola-midlothian': { src: '/images/hero/cover4.JPG', alt: 'Cedar pergola with a privacy back wall in Midlothian, Texas' },
  'pergola-midlothian-2': { src: '/images/hero/cover4-new.JPG', alt: 'Pergola with back wall build in Midlothian, Texas' },
  'patio-cover-dfw-1': { src: '/images/hero/cover5.jpg', alt: 'Custom patio cover with polycarbonate panels in Dallas-Fort Worth' },
  'gable-dfw': { src: '/images/hero/debrabuck.JPG', alt: 'Custom gable patio cover in Dallas-Fort Worth' },
  'gable-dallas-dusk': { src: '/images/hero/main-hero.jpg', alt: 'Cedar gable patio cover at dusk in Dallas, Texas' },
  'leanto-forney-1': { src: '/images/hero/jeff1.png', alt: 'Lean-to patio cover attached to the roofline in Forney, Texas' },
  'leanto-forney-2': { src: '/images/hero/jeff2.JPG', alt: 'Lean-to patio cover with dark wood ceiling, recessed lighting, and fan in Forney, Texas' },
  'leanto-forney-3': { src: '/images/hero/jeff3.JPG', alt: 'Lean-to patio cover detail in Forney, Texas' },
  'stamped-flagstone': { src: '/images/hero/concrete1.jpg', alt: 'Stamped concrete patio in a flagstone pattern' },
  'stamped-wood-plank': { src: '/images/hero/concrete2.jpg', alt: 'Wood-plank stamped concrete' },
  'concrete-slab-pour': { src: '/images/hero/concrete3.jpg', alt: 'Freshly poured concrete slab' },
  'stamped-tile': { src: '/images/hero/Concrete4.jpg', alt: 'Multi-tone tile-pattern stamped concrete' },
  'stamped-herringbone': { src: '/images/hero/Concrete5.jpg', alt: 'Herringbone brick-pattern stamped concrete' },
  'stamped-stone-texture': { src: '/images/hero/concrete6.jpg', alt: 'Flagstone-texture stamped concrete detail' },
  'stamped-driveway-dallas': { src: '/images/images V2/stamped concrete 2.jpeg', alt: 'Stamped concrete driveway with decorative border in Dallas, Texas' },
  'driveway-dallas': { src: '/images/images V2/concrete driveway.jpeg', alt: 'Concrete driveway in Dallas, Texas' },
  'stamped-patio-forney-1': { src: '/images/images V2/stamped concrete 3.jpeg', alt: 'Stamped concrete patio in a stone pattern in Forney, Texas' },
  'stamped-patio-forney-2': { src: '/images/images V2/stamped concrete 4.jpeg', alt: 'Stamped concrete patio under a patio cover in Forney, Texas' },
  'stamped-patio-forney-3': { src: '/images/images V2/stamped concrete 5.jpeg', alt: 'Stamped concrete patio surface detail in Forney, Texas' },
  'stamped-patio-forney-4': { src: '/images/images V2/stamped concrete 6.jpeg', alt: 'Stamped concrete patio in a slate pattern in Forney, Texas' },
  'carport-melissa-1': { src: '/images/images V2/andrew 2.jpeg', alt: 'Gable-style cedar carport with tongue-and-groove ceiling in Melissa, Texas' },
  'carport-melissa-2': { src: '/images/images V2/andrew1.jpeg', alt: 'Cedar carport with decorative metal brackets in Melissa, Texas' },
  'carport-melissa-3': { src: '/images/images V2/andrew3.jpeg', alt: 'Cedar carport detail in Melissa, Texas' },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
export const photo = (id: PhotoId): Photo => photos[id];
```

- [ ] **Step 5: Shared types** — create `src/content/types.ts`:

```ts
import type { PhotoId } from './images';

export type ServiceSlug =
  | 'patio-covers' | 'pergolas' | 'concrete' | 'stamped-concrete'
  | 'driveways-walkways' | 'outdoor-living' | 'remodeling';
export type CitySlug =
  | 'dallas' | 'fort-worth' | 'plano' | 'frisco' | 'mckinney'
  | 'arlington' | 'allen' | 'carrollton' | 'flower-mound' | 'prosper';
export type Topic = ServiceSlug | 'planning';

export type Faq = { id: string; question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  navLabel: string;
  navBlurb: string;
  seo: { title: string; description: string };
  hero: PhotoId;
  gallery: PhotoId[];
  lead: string;
  overview: string[];
  options: Array<{ name: string; blurb: string; range?: string }>;
  reasons: Array<{ title: string; blurb: string }>;
  construction: string[];
  faqIds: string[];
  relatedServices: ServiceSlug[];
  topic: Topic;
  ownerReview?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  service: ServiceSlug;
  city: CitySlug | null;
  location: string;
  cover: PhotoId;
  gallery: PhotoId[];
  overview: string;
  scope: string[];
  materials: string[];
  featured: boolean;
};

export type City = {
  slug: CitySlug;
  name: string;
  county: string;
  seo: { title: string; description: string };
  hero: PhotoId;
  intro: string[];
  permitNote: string;
  neighborhoods: string[];
  faqIds: string[];
  testimonialIds: number[];
};

export type Testimonial = {
  id: number; quote: string; author: string; project: string; location: string; rating: number;
  service: ServiceSlug; city: CitySlug | null;
};

export type ProcessStep = {
  number: string; title: string; summary: string; homeownerDoes: string; weDo: string; timing: string;
};
```

- [ ] **Step 6: Company, trust, testimonials, process**

`src/content/company.ts`:

```ts
export const company = {
  name: 'Structure1 Construction',
  brand: 'Structure1',
  tagline: 'DFW Residential Construction & Outdoor Living',
  phone: '(580) 665-2758', // owner to replace with a DFW number
  phoneRaw: '5806652758',
  email: 'samuel.c.w.allison@gmail.com', // owner to replace
  address: { street: '5473 Blair Rd Ste 100 PMB 476653', city: 'Dallas', state: 'TX', zip: '75231-4227' },
  hours: 'Mon – Fri, 8:00 AM – 6:00 PM',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61585877196113',
    instagram: 'https://www.instagram.com/structure1builds/',
  },
  url: 'https://structure1builds.com',
  googleReviewsUrl: null as string | null,
};
```

`src/content/trust.ts`:

```ts
export const trust = [
  { label: 'Licensed & insured', detail: 'Licensed and insured for residential construction in Texas.' },
  { label: 'DFW local', detail: 'Based in Dallas. Our crews work across the metroplex every week.' },
  { label: '2-year workmanship warranty', detail: 'Every structure and slab is covered for two years after completion.' },
  { label: '150+ projects completed', detail: 'Patio covers, pergolas, and concrete built for DFW homeowners since 2021.' },
  { label: '4+ years in DFW', detail: 'Founded in Dallas in 2021 and growing one referral at a time.' },
  { label: 'Permits & engineering handled', detail: 'Drawings, engineering, city submission, and inspections are included.' },
  { label: 'In-house crew', detail: 'The same lead carpenter from the first site visit to the final walk-through.' },
];

export const why = [
  { title: 'One crew, start to finish', blurb: 'We self-perform structures and concrete. No subcontractor relay, no hand-offs, one point of contact.' },
  { title: 'Permits and engineering included', blurb: 'Drawings, wind-load engineering, HOA packages, city submission, and inspections are part of every project.' },
  { title: 'Built for North Texas', blurb: 'Western Red Cedar, steel-anchored footings, roofing matched to your home, and slabs engineered for expansive clay soil.' },
  { title: 'Clear communication', blurb: 'A written, itemized estimate, a confirmed build date, daily progress updates, and a clean site at the end of every day.' },
];
```

`src/content/testimonials.ts` (the five existing quotes, verbatim):

```ts
import type { CitySlug, Testimonial } from './types';

export const testimonials: Testimonial[] = [
  { id: 1, quote: 'Structure1 transformed our backyard into an absolute paradise. The patio cover exceeded every expectation. Professional from start to finish.', author: 'Sarah & Michael Johnson', project: 'Patio Cover', location: 'Dallas, TX', rating: 5, service: 'patio-covers', city: 'dallas' },
  { id: 2, quote: "Our pergola project was seamless. The team was communicative, clean, and delivered ahead of schedule. We couldn't be happier with our new outdoor space.", author: 'Jennifer Martinez', project: 'Pergola', location: 'Frisco, TX', rating: 5, service: 'pergolas', city: 'frisco' },
  { id: 3, quote: 'From design to completion, Structure1 made our concrete patio a reality. Their attention to detail is unmatched in the industry.', author: 'Robert & Linda Chen', project: 'Concrete Patio', location: 'Plano, TX', rating: 5, service: 'concrete', city: 'plano' },
  { id: 4, quote: 'The concrete driveway looks incredible. They helped us choose the perfect finish and the result is absolutely stunning. Highly recommend!', author: 'David Thompson', project: 'Concrete Driveway', location: 'McKinney, TX', rating: 5, service: 'driveways-walkways', city: 'mckinney' },
  { id: 5, quote: "Best construction experience we've ever had. On time, on budget, and the patio cover quality is top notch. Our neighbors are jealous!", author: 'Amanda & Chris Davis', project: 'Patio Cover', location: 'Allen, TX', rating: 5, service: 'patio-covers', city: 'allen' },
];

export const testimonialsForCity = (city: CitySlug) => testimonials.filter((t) => t.city === city);
```

`src/content/process.ts`:

```ts
import type { ProcessStep } from './types';

export const processSteps: ProcessStep[] = [
  {
    number: '01', title: 'Estimate',
    summary: 'Tell us about your project. We reply within one business day with next steps and a ballpark range, then walk the site with you.',
    homeownerDoes: 'Send the form or call. Share a few photos of the space and what you have in mind.',
    weDo: 'Site visit, measurements, and a written, itemized estimate that includes permits and engineering.',
    timing: 'Reply within one business day. Site visit within the week in most cases.',
  },
  {
    number: '02', title: 'Design',
    summary: 'Material selection and drawings tailored to your home, sized to its proportions and roofline.',
    homeownerDoes: 'Choose style, roofing, ceiling finish, lighting, and fans from samples we bring to you.',
    weDo: 'Architectural drawings, wind-load engineering where required, and the HOA package if your neighborhood needs one.',
    timing: 'Typically one to two weeks alongside the permit submission.',
  },
  {
    number: '03', title: 'Permit',
    summary: 'We handle every city permit and HOA submission so the build clears inspection on the first pass.',
    homeownerDoes: 'Sign the HOA form if your community requires an owner signature. That is usually all.',
    weDo: 'Submit plans, answer plan-review comments, and schedule inspections.',
    timing: 'Permit approval usually takes one to two weeks depending on the city.',
  },
  {
    number: '04', title: 'Build',
    summary: 'In-house crew, one lead carpenter, daily progress updates, and a clean site at the end of every day.',
    homeownerDoes: 'Keep the work area clear and enjoy watching it come together.',
    weDo: 'Footings, framing, roofing, ceiling, electrical rough-in coordination, finish work, and a final walk-through with you.',
    timing: 'Three to seven days on site for most patio covers; one to two weeks for larger outdoor living projects. Two to four weeks end to end.',
  },
];
```
- [ ] **Step 7: FAQs** — create `src/content/faqs.ts`. The `pc-*` and `con-*` items are the existing FAQ copy verbatim; `per-*`, `sc-*`, `dw-*`, `ol-*`, `rm-*`, `plan-*` are new, written only from facts already on the site.

```ts
import type { City, Faq } from './types';

export const faqs: Faq[] = [
  // Patio covers (existing copy)
  { id: 'pc-cost', question: 'How much does a patio cover cost in Dallas-Fort Worth in 2026?', answer: 'In the DFW market, most patio covers run $8,000 to $25,000+. A basic 12x12 lean-to (shed-style) cover starts around $8,000-$12,000, a mid-size gable cover with a shingled roof matched to your home typically lands between $14,000 and $20,000, and large custom designs with tongue-and-groove ceilings, lighting, and fans can exceed $25,000. Every Structure1 estimate is free, itemized, and includes permits and engineering.' },
  { id: 'pc-gable-vs-leanto', question: "What's the difference between a gable and a lean-to patio cover?", answer: "A lean-to (shed-style) cover attaches to your home with a single sloped roof — it's the most cost-effective option and works well under existing eaves. A gable cover has a peaked, A-frame roofline that adds height, airflow, and a more custom architectural look, and it's the better choice for taller ceilings or larger patios. Gable covers typically cost 20-35% more than a comparable lean-to." },
  { id: 'pc-permits', question: 'Do you handle patio cover permits in Dallas, Plano, Frisco, and other DFW cities?', answer: 'Yes. Nearly every city in the DFW metroplex — including Dallas, Fort Worth, Plano, Frisco, McKinney, and Arlington — requires a building permit for a patio cover. Structure1 handles the full permit process on every project: drawings, engineering letters where required, submission, and inspections. Permit approval usually takes 1-2 weeks depending on the city.' },
  { id: 'pc-roof-match', question: "Will my patio cover match my home's existing roof?", answer: 'Yes. On solid-roof covers we install architectural shingles color-matched to your existing roof so the addition looks original to the house, and we tie the new roofline into your home\'s structure correctly — flashing, drainage, and attachment points are where inexperienced builders cause leaks. Standing seam metal and polycarbonate panel roofs are also available.' },
  { id: 'pc-timeline', question: 'How long does patio cover installation take?', answer: "Construction itself takes 3-7 days for most patio covers once permits are approved and materials arrive. End to end — contract, permit approval (1-2 weeks), material procurement, and build — plan on 2-4 weeks. We confirm a build date before work starts and keep one crew on your project until it's finished." },
  { id: 'pc-with-concrete', question: 'Do you build patio covers with concrete included?', answer: "Yes, and it's the most cost-effective way to do a full outdoor living project. Because we self-perform both structures and concrete, we can pour a new stamped concrete patio and build the cover above it in one mobilization — one permit package, one crew, one timeline." },
  { id: 'pc-materials', question: 'What materials do you use for patio covers?', answer: "We primarily build with premium-grade Western Red Cedar and pressure-treated lumber, which are ideal for the Texas climate due to their natural resistance to warping, splitting, and insects. For roofing, we use architectural shingles matched to your home's existing roof, standing seam metal, or polycarbonate panels depending on your preference. All hardware is galvanized or stainless steel for long-term durability." },
  { id: 'pc-storms', question: 'Are your patio covers built to withstand Texas storms?', answer: 'Absolutely. Every patio cover we build is engineered to meet or exceed local building codes for wind resistance and structural load requirements. We use heavy-duty post anchors, hurricane ties, and proper footing depths to ensure your structure can withstand severe Texas weather including high winds and hail. Our 2-year workmanship warranty covers any structural issues, and our builds are designed to last 20+ years with minimal maintenance.' },
  { id: 'pc-value', question: "Will a patio cover increase my home's value?", answer: "Yes. A well-built patio cover typically provides a 50-80% return on investment and can increase your home's overall value by making your outdoor space functional year-round. In the competitive DFW real estate market, outdoor living spaces are one of the top features buyers look for. Beyond resale value, you'll enjoy immediate benefits like lower cooling costs (shading windows reduces solar heat) and expanded living space." },
  // Pergolas (new, from existing facts)
  { id: 'per-vs-cover', question: "What's the difference between a pergola and a patio cover?", answer: 'The roof. A patio cover has a solid roof (shingled, metal, or polycarbonate panels) that provides complete protection from sun and rain. A pergola has an open or slatted roof made of rafters and beams that provides partial shade while letting light through. For Texas weather, many homeowners prefer a solid cover for full protection, while pergolas with polycarbonate panels offer a bright middle ground.' },
  { id: 'per-cost', question: 'How much does a pergola cost in Dallas-Fort Worth?', answer: 'A cedar pergola with a polycarbonate roof typically runs $10,000 to $18,000 in DFW depending on size, post count, and extras like lighting and fans. Open-rafter pergolas without roofing cost less. Every estimate is free and itemized, and includes the permit package.' },
  { id: 'per-freestanding', question: 'Can a pergola be free-standing instead of attached to the house?', answer: 'Yes. We build both. Attached pergolas tie into your home\'s structure and work well over an existing patio; free-standing pergolas sit on their own steel-anchored footings and can be placed by a pool, over a dining area, or anywhere in the yard. Our Lewisville and Plano projects are free-standing builds.' },
  { id: 'per-permit', question: 'Do I need a permit for a pergola in DFW?', answer: 'Most DFW cities treat a pergola like any permanent accessory structure and require a building permit, and most HOAs require architectural approval. Structure1 prepares the drawings and handles both submissions on every project.' },
  // Concrete (existing copy)
  { id: 'con-cost', question: 'How much does stamped concrete cost in Dallas-Fort Worth?', answer: 'Stamped concrete in DFW typically runs $12 to $22 per square foot installed, depending on the pattern, number of colors, and site prep required. A standard 400 sq ft stamped patio usually lands between $5,000 and $8,500. Plain broom-finish concrete runs $7-$11 per square foot. Structure1 provides free itemized estimates so you can compare finishes side by side.' },
  { id: 'con-patterns', question: 'What stamped concrete patterns and colors do you offer?', answer: 'We install the most popular DFW patterns — ashlar slate, random stone, wood plank, herringbone brick, and cobblestone — in integral and antiqued color combinations that complement Texas home exteriors. During your estimate we bring pattern samples and photos of local installs so you can see exactly how a finish looks on a real project.' },
  { id: 'con-thickness', question: 'How thick should a concrete patio or driveway be in Texas?', answer: 'A patio slab should be a minimum of 4 inches thick over compacted base, and driveways should be 5-6 inches with steel reinforcement. North Texas clay soil moves with moisture changes, so proper base compaction, rebar (not just wire mesh), and correctly spaced control joints matter more here than in most markets. We engineer every pour for expansive soil.' },
  { id: 'con-cracks', question: 'Will my concrete crack?', answer: 'All concrete develops hairline cracks as it cures — the goal is controlling where. We cut control joints on a proper grid so movement happens at the joints instead of across the surface, use reinforcement suited to the slab\'s use, and pour at the right thickness over compacted base. Our 2-year workmanship warranty covers structural failures, and correctly installed slabs last 30+ years in DFW.' },
  { id: 'con-cure', question: 'How long before I can use my new concrete?', answer: 'You can walk on new concrete after 24-48 hours, place furniture after 7 days, and drive on a new driveway after 7-10 days. Full cure strength takes 28 days. For stamped and colored finishes we apply sealer after the slab has cured, which adds color depth and protects against stains and UV fading — resealing every 2-3 years keeps it looking new.' },
  { id: 'con-replace', question: 'Do you replace existing patios and driveways?', answer: 'Yes. Tear-out and replacement is a large share of our concrete work in Dallas-Fort Worth — we demo the old slab, haul it off, re-compact the base, and pour new. Replacement is usually the right call when a slab has settled, heaved at the joints, or has widespread cracking, since overlays on a failed slab inherit its problems.' },
  // Stamped concrete (new)
  { id: 'sc-vs-pavers', question: 'Is stamped concrete better than pavers?', answer: 'Stamped concrete is a single reinforced slab, so there are no joints for weeds or shifting, and it costs less per square foot than most paver installs. Pavers can be lifted and reset individually. On North Texas clay soil, a properly reinforced slab with control joints is the more stable choice for patios and pool surrounds.' },
  { id: 'sc-sealing', question: 'How often does stamped concrete need to be sealed?', answer: 'We seal every stamped slab after it cures. Resealing every 2-3 years keeps color depth and protects against stains and UV fading. It is a one-day job we can schedule for you.' },
  // Driveways & walkways (new)
  { id: 'dw-thickness', question: 'How thick is a Structure1 driveway?', answer: 'Driveways are poured 5-6 inches thick with steel rebar over compacted base, with control joints cut on a correct grid. That is the specification North Texas expansive soil needs; thinner slabs with wire mesh are where most driveway failures start.' },
  { id: 'dw-drive-on', question: 'When can I park on a new driveway?', answer: 'Walk on it after 24-48 hours and drive on it after 7-10 days. Full cure strength takes 28 days.' },
  { id: 'dw-finish', question: 'What finishes are available for driveways and walkways?', answer: 'Broom finish ($7-$11 per square foot) is the standard for driveways and walkways: clean, textured, and slip-resistant. Stamped borders or full stamped finishes ($12-$22 per square foot) add a decorative edge, and staining and sealing ($4-$10 per square foot) refresh existing slabs.' },
  // Outdoor living (new, no prices)
  { id: 'ol-scope', question: 'What does an outdoor living project include?', answer: 'Most outdoor living projects combine a covered structure (patio cover or pergola) with a new stamped or broom-finish concrete patio, plus lighting and ceiling fans. Because we self-perform both the structure and the concrete, the whole project runs on one permit package, one crew, and one timeline.' },
  { id: 'ol-phases', question: 'Can I build an outdoor living space in phases?', answer: 'Yes. Many homeowners pour the patio first and add the cover later, or build the cover now and add lighting and fans afterward. We design the first phase so the next one fits without rework.' },
  // Remodeling & new builds (new, no prices)
  { id: 'rm-scope', question: 'What kinds of remodeling and new-build work does Structure1 take on?', answer: 'Additions, full backyard makeovers, and interior remodels in select DFW markets, alongside our core patio cover and concrete work. Tell us about the project and we will let you know quickly whether it is a fit.' },
  { id: 'rm-permits', question: 'Do you handle permits for additions and remodels?', answer: 'Yes. Drawings, engineering, city submission, and inspections are part of every Structure1 project, including additions and remodels.' },
  // Planning (new, from existing process copy)
  { id: 'plan-start', question: 'How soon can a project start?', answer: 'Most projects begin 2-3 weeks after contract signing, which covers permit approval and material procurement. Fall and winter often have the shortest wait times.' },
  { id: 'plan-payment', question: 'How do payments work?', answer: 'We require a deposit to secure materials and scheduling, with the remaining balance due upon project completion and your satisfaction. Many clients phase larger projects to manage cost; we can discuss the right structure during your free estimate.' },
  { id: 'plan-warranty', question: 'What does the warranty cover?', answer: 'Every project carries a 2-year workmanship warranty covering structural issues with the structure or slab.' },
];

export const faqsFor = (ids: string[]): Faq[] => ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));

export const cityFaqs = (city: City): Faq[] => [
  { id: `${city.slug}-cost`, question: `How much does a patio cover cost in ${city.name}, TX?`, answer: `Patio covers in ${city.name} typically run $8,000 to $25,000+ depending on size, style, and finishes. A basic lean-to cover starts around $8,000-$12,000, while a custom gable design with a shingled roof matched to your home usually lands between $14,000 and $25,000. Stamped concrete patios run $12-$22 per square foot. Structure1 provides free, itemized on-site estimates anywhere in ${city.name}.` },
  { id: `${city.slug}-permit`, question: `Do I need a permit for a patio cover in ${city.name}?`, answer: city.permitNote },
  { id: `${city.slug}-services`, question: `What services does Structure1 offer in ${city.name}?`, answer: 'We build custom patio covers (gable, lean-to, and polycarbonate designs), cedar pergolas, and stamped or broom-finish concrete for patios, driveways, and walkways — all engineered for North Texas weather and backed by a 2-year workmanship warranty.' },
  { id: `${city.slug}-start`, question: `How soon can you start a project in ${city.name}?`, answer: `Most projects begin 2-3 weeks after contract signing, which covers permit approval and material procurement. Construction itself takes 3-7 days for most patio covers and 1-2 weeks for larger outdoor living projects. We serve ${city.name} year-round — fall and winter often have the shortest wait times.` },
  ...faqsFor(city.faqIds),
];
```
- [ ] **Step 8: Services** — create `src/content/services.ts`:

```ts
import type { Service, ServiceSlug } from './types';

export const services: Service[] = [
  {
    slug: 'patio-covers',
    name: 'Patio Covers',
    navLabel: 'Patio Covers',
    navBlurb: 'Gable, lean-to, and polycarbonate designs',
    seo: {
      title: 'Patio Cover Builder in Dallas-Fort Worth, TX | Free Estimates',
      description: 'Custom patio covers in Dallas-Fort Worth: gable, lean-to & polycarbonate designs. Permits handled, engineered for Texas wind, 2-year warranty. Free estimates.',
    },
    hero: 'gable-dfw',
    gallery: ['gable-mckinney-2', 'leanto-forney-2', 'gable-mckinney-ceiling'],
    lead: 'Covered outdoor rooms with roofing matched to your home, engineered for North Texas wind, and built by one in-house crew.',
    overview: [
      'Structure1 Construction is a patio cover builder serving the entire Dallas-Fort Worth metroplex — Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, and 20+ surrounding cities. We design and build gable covers with shingles matched to your existing roof, cost-effective lean-to designs, and polycarbonate-roof pergolas, all engineered for North Texas wind loads and built from Western Red Cedar on steel-anchored footings.',
      'Every project includes permits and engineering — we handle drawings, city submission, and inspections in every DFW municipality.',
    ],
    options: [
      { name: 'Lean-To (Shed)', blurb: 'Single slope attached to the home. Clean, low-profile. Best for smaller patios, budget-conscious builds, and low rooflines.', range: '$8,000 – $14,000' },
      { name: 'Gable (A-Frame)', blurb: 'Peaked roofline with shingles matched to your home. Custom and architectural. Best for larger patios, height, airflow, and resale value.', range: '$14,000 – $25,000+' },
      { name: 'Polycarbonate Pergola', blurb: 'Clear or tinted panels over cedar rafters. Open and bright. Rain protection without losing natural light.', range: '$10,000 – $18,000' },
    ],
    reasons: [
      { title: 'Usable outdoors in Texas heat', blurb: 'Shade over the patio and the windows behind it lowers surface temperatures and cooling costs.' },
      { title: 'Looks original to the house', blurb: 'Color-matched shingles, posts sized to the home, and a roofline tied in correctly with flashing and drainage.' },
      { title: 'Lighting, fans, and ceilings', blurb: 'Tongue-and-groove ceilings, recessed lighting, and ceiling fans turn a cover into a room.' },
      { title: 'Adds value', blurb: 'Outdoor living space is one of the top features DFW buyers look for.' },
    ],
    construction: [
      'Footings: steel-anchored posts set in engineered footings sized for North Texas soil and wind load.',
      'Structure: Western Red Cedar posts and beams, hurricane ties, and galvanized or stainless hardware.',
      'Roof: architectural shingles matched to your home, standing seam metal, or polycarbonate panels; flashed and tied into the existing roofline.',
      'Finish: tongue-and-groove ceilings, stain or paint, recessed lighting, and fan blocking as specified.',
      'Permits and inspections handled by us from drawings through final.',
    ],
    faqIds: ['pc-cost', 'pc-gable-vs-leanto', 'pc-permits', 'pc-roof-match', 'pc-timeline', 'pc-with-concrete', 'pc-materials', 'pc-storms'],
    relatedServices: ['pergolas', 'stamped-concrete', 'outdoor-living'],
    topic: 'patio-covers',
  },
  {
    slug: 'pergolas',
    name: 'Pergolas',
    navLabel: 'Pergolas',
    navBlurb: 'Cedar pergolas, attached or free-standing',
    seo: {
      title: 'Cedar Pergola Builder in Dallas-Fort Worth, TX | Structure1',
      description: 'Custom cedar pergolas in Dallas-Fort Worth, attached or free-standing, with open rafters or polycarbonate roofing. Permits included, 2-year warranty. Free estimates.',
    },
    hero: 'pergola-lewisville-1',
    gallery: ['pergola-plano-complete', 'pergola-fort-worth', 'pergola-midlothian'],
    lead: 'Open, bright structures in Western Red Cedar, with the option of polycarbonate roofing for rain protection without losing the light.',
    overview: [
      'A pergola gives you defined, partially shaded outdoor space with an open, airy feel. Structure1 builds cedar pergolas across Dallas-Fort Worth, attached to the home or free-standing on their own footings, with open rafters or clear and tinted polycarbonate panels.',
      'Our pergola projects in Plano, Fort Worth, Lewisville, and Midlothian include recessed lighting, ceiling fans, and privacy back walls. Every build is engineered for North Texas wind and includes the permit and HOA package.',
    ],
    options: [
      { name: 'Open-rafter pergola', blurb: 'Classic cedar rafters and beams for dappled shade and a defined outdoor room.' },
      { name: 'Polycarbonate-roof pergola', blurb: 'Clear or tinted panels over cedar rafters: rain protection with natural light.', range: '$10,000 – $18,000' },
      { name: 'Free-standing', blurb: 'Set on its own steel-anchored footings by a pool, dining area, or anywhere in the yard.' },
      { name: 'With back wall', blurb: 'A framed back wall adds privacy and wind protection, as on our Midlothian project.' },
    ],
    reasons: [
      { title: 'Light without the heat', blurb: 'Rafters and polycarbonate panels filter sun while keeping the space open.' },
      { title: 'Defines the space', blurb: 'A pergola turns an open slab into a dining room, lounge, or poolside retreat.' },
      { title: 'Grows with the yard', blurb: 'Add fans, lighting, or a privacy wall now or later without rework.' },
    ],
    construction: [
      'Footings: concrete piers with steel post anchors, sized for the span and North Texas soil.',
      'Frame: Western Red Cedar posts, beams, and rafters with galvanized or stainless hardware and hurricane ties.',
      'Roof: open rafters, or polycarbonate panels on purlins with proper drainage slope.',
      'Finish: stain or paint, recessed lighting and fan blocking as specified.',
      'Permit and HOA submissions handled by us.',
    ],
    faqIds: ['per-vs-cover', 'per-cost', 'per-freestanding', 'per-permit'],
    relatedServices: ['patio-covers', 'stamped-concrete', 'outdoor-living'],
    topic: 'pergolas',
  },
  {
    slug: 'concrete',
    name: 'Concrete',
    navLabel: 'Concrete',
    navBlurb: 'Patios, slabs, and replacements',
    seo: {
      title: 'Concrete Contractor in Dallas-Fort Worth, TX | Patios & Slabs',
      description: 'Concrete patios, slabs, driveways & replacements in Dallas-Fort Worth. Engineered for North Texas clay soil, 2-year warranty, free itemized estimates.',
    },
    hero: 'stamped-driveway-dallas',
    gallery: ['stamped-patio-forney-1', 'concrete-slab-pour', 'stamped-flagstone'],
    lead: 'Patios, slabs, driveways, and replacements built for expansive North Texas clay: compacted base, steel rebar, correct thickness, and control joints on a real grid.',
    overview: [
      'Structure1 Construction is a concrete contractor serving Dallas-Fort Worth — patios, driveways, walkways, and decorative finishes across Dallas, Plano, Frisco, McKinney, Arlington, Fort Worth, and the surrounding metroplex. North Texas clay soil expands and contracts with every wet-dry cycle, so we build for it: compacted base, steel reinforcement (rebar, not wire mesh), proper slab thickness, and control joints cut on a correct grid.',
      'Concrete also pairs naturally with our patio covers: one crew pours the slab and builds the structure above it, on one permit and one timeline.',
    ],
    options: [
      { name: 'Broom finish', blurb: 'Clean, textured, slip-resistant. Driveways, walkways, pool surrounds.', range: '$7 – $11 / sq ft' },
      { name: 'Stamped concrete', blurb: 'Stone, slate, brick, and wood-plank patterns. Patios, outdoor living areas, front entries.', range: '$12 – $22 / sq ft' },
      { name: 'Stained / sealed', blurb: 'Rich color depth on new or existing slabs. Refreshing patios and covered outdoor rooms.', range: '$4 – $10 / sq ft' },
      { name: 'Tear-out and replacement', blurb: 'Demo, haul-off, re-compacted base, and a new slab for settled, heaved, or cracked concrete.' },
    ],
    reasons: [
      { title: 'Built for clay soil', blurb: 'Base compaction, rebar, and joint spacing matter more in North Texas than almost anywhere.' },
      { title: 'One crew with the structure', blurb: 'Pour the patio and build the cover above it in one mobilization.' },
      { title: 'Lasts decades', blurb: 'Correctly installed slabs last 30+ years in DFW, backed by our 2-year workmanship warranty.' },
    ],
    construction: [
      'Excavation and base: remove organics, compact base material, set forms to drain away from the house.',
      'Reinforcement: steel rebar on chairs; 4-inch minimum for patios, 5-6 inches for driveways.',
      'Pour and finish: broom, stamped, or smooth; control joints cut on a proper grid.',
      'Cure and seal: walk after 24-48 hours, furniture after 7 days, vehicles after 7-10 days; sealer applied after cure on decorative finishes.',
    ],
    faqIds: ['con-cost', 'con-patterns', 'con-thickness', 'con-cracks', 'con-cure', 'con-replace'],
    relatedServices: ['stamped-concrete', 'driveways-walkways', 'patio-covers'],
    topic: 'concrete',
  },
  {
    slug: 'stamped-concrete',
    name: 'Stamped Concrete',
    navLabel: 'Stamped Concrete',
    navBlurb: 'Stone, slate, brick, and wood-plank patterns',
    seo: {
      title: 'Stamped Concrete Contractor in Dallas-Fort Worth, TX | Structure1',
      description: 'Stamped concrete patios, pool decks & entries in Dallas-Fort Worth. Ashlar slate, random stone, wood plank & brick patterns. $12–$22/sq ft. Free estimates.',
    },
    hero: 'stamped-patio-forney-1',
    gallery: ['stamped-flagstone', 'stamped-wood-plank', 'stamped-herringbone'],
    lead: 'The look of stone, slate, brick, or wood plank in a single reinforced slab, in integral and antiqued colors chosen to match your home.',
    overview: [
      'Stamped finishes are our concrete specialty. We install the most popular DFW patterns — ashlar slate, random stone, wood plank, herringbone brick, and cobblestone — in integral and antiqued color combinations that complement Texas home exteriors.',
      'During your estimate we bring pattern samples and photos of local installs so you can see exactly how a finish looks on a real project. Stamped patios are often poured together with a patio cover so the whole outdoor room is one job.',
    ],
    options: [
      { name: 'Ashlar slate', blurb: 'Large rectangular stones with a natural slate texture. The most popular DFW patio pattern.' },
      { name: 'Random stone / flagstone', blurb: 'Irregular stones for a natural, hand-laid look.' },
      { name: 'Wood plank', blurb: 'Board-width planks with grain texture, often used under covered areas.' },
      { name: 'Herringbone or running-bond brick', blurb: 'Classic brick layouts for entries, borders, and walkways.' },
    ],
    reasons: [
      { title: 'Stone look, slab performance', blurb: 'No joints for weeds or shifting; one reinforced slab engineered for clay soil.' },
      { title: 'Costs less than pavers or stone', blurb: 'Installed pricing of $12 to $22 per square foot, itemized in your free estimate.' },
      { title: 'Pairs with a cover', blurb: 'Pour the patio and build the structure above it in one project.' },
    ],
    construction: [
      'Base and reinforcement exactly as our standard concrete: compacted base, rebar, 4-inch minimum.',
      'Integral color mixed into the concrete, then a release color and the stamp pattern applied while the slab is plastic.',
      'Control joints placed to follow the pattern wherever possible.',
      'Sealer applied after cure; reseal every 2-3 years to keep color depth.',
    ],
    faqIds: ['con-cost', 'con-patterns', 'sc-vs-pavers', 'sc-sealing', 'con-cracks'],
    relatedServices: ['concrete', 'patio-covers', 'driveways-walkways'],
    topic: 'stamped-concrete',
  },
  {
    slug: 'driveways-walkways',
    name: 'Driveways & Walkways',
    navLabel: 'Driveways & Walkways',
    navBlurb: 'Replacement and new pours, broom or stamped',
    seo: {
      title: 'Concrete Driveways & Walkways in Dallas-Fort Worth, TX | Structure1',
      description: 'Concrete driveway and walkway installation and replacement in Dallas-Fort Worth. 5-6 inch reinforced slabs, broom or stamped finishes, 2-year warranty. Free estimates.',
    },
    hero: 'driveway-dallas',
    gallery: ['stamped-driveway-dallas', 'stamped-herringbone', 'concrete-slab-pour'],
    lead: 'New driveways, walkways, and replacements poured thick enough and reinforced correctly for North Texas soil.',
    overview: [
      'Driveways take vehicle loads on soil that moves with every wet-dry cycle, so we pour them 5-6 inches thick with steel rebar over compacted base and cut control joints on a correct grid. Walkways and front entries get the same base preparation at patio thickness.',
      'Tear-out and replacement is a large share of our concrete work in Dallas-Fort Worth: we demo the old slab, haul it off, re-compact the base, and pour new. Our Dallas driveway project adds a stamped border to a broom-finish drive.',
    ],
    options: [
      { name: 'Broom-finish driveway', blurb: 'The standard: clean, textured, slip-resistant.', range: '$7 – $11 / sq ft' },
      { name: 'Stamped border or full stamp', blurb: 'A decorative band or a full stone or brick pattern.', range: '$12 – $22 / sq ft' },
      { name: 'Walkways and entries', blurb: 'Front walks, side paths, and porch extensions matched to the house.' },
      { name: 'Driveway replacement', blurb: 'Demo, haul-off, re-compacted base, new reinforced slab.' },
    ],
    reasons: [
      { title: 'Stops the heaving', blurb: 'Correct thickness, rebar, and joints keep slabs from cracking across the surface.' },
      { title: 'Curb appeal', blurb: 'A clean new drive or a stamped border changes the front of the house.' },
      { title: 'Warranty-backed', blurb: '2-year workmanship warranty on every pour.' },
    ],
    construction: [
      'Demo and haul-off of the old slab where replacing.',
      'Compacted base, forms set to drain, rebar on chairs.',
      '5-6 inch pour for driveways, 4-inch for walkways; broom or stamped finish.',
      'Control joints cut on a proper grid; vehicles after 7-10 days.',
    ],
    faqIds: ['dw-thickness', 'dw-drive-on', 'dw-finish', 'con-replace', 'con-cracks'],
    relatedServices: ['concrete', 'stamped-concrete'],
    topic: 'driveways-walkways',
  },
  {
    slug: 'outdoor-living',
    name: 'Outdoor Living',
    navLabel: 'Outdoor Living',
    navBlurb: 'Cover, patio, lighting, and fans as one project',
    seo: {
      title: 'Outdoor Living Spaces in Dallas-Fort Worth, TX | Structure1',
      description: 'Complete outdoor living projects in Dallas-Fort Worth: patio cover or pergola, stamped concrete patio, lighting, and fans built by one crew on one timeline. Free estimates.',
    },
    hero: 'gable-mckinney-1',
    gallery: ['leanto-forney-2', 'stamped-patio-forney-2', 'pergola-lewisville-2'],
    lead: 'The whole backyard room, designed together: structure, slab, ceiling, lighting, and fans from one crew on one permit and one timeline.',
    overview: [
      'Most of our best projects are not a single item. They are a covered structure, a new stamped concrete patio underneath it, a finished ceiling, recessed lighting, and ceiling fans, planned as one outdoor room instead of pieced together over years.',
      'Because Structure1 self-performs both structures and concrete, the entire project runs on one permit package, one crew, and one schedule. Our Forney project pairs a lean-to cover with a stamped patio; our McKinney gable cover includes a tongue-and-groove ceiling and fan.',
    ],
    options: [
      { name: 'Cover + patio', blurb: 'A gable, lean-to, or polycarbonate structure over a new stamped or broom-finish slab.' },
      { name: 'Ceilings, lighting, fans', blurb: 'Tongue-and-groove ceilings, recessed lighting, and fan blocking coordinated with your electrician.' },
      { name: 'Privacy and wind walls', blurb: 'Framed back walls on pergolas and covers for shelter and privacy.' },
      { name: 'Phased builds', blurb: 'Patio now, cover later, designed so the second phase fits without rework.' },
    ],
    reasons: [
      { title: 'One design, one timeline', blurb: 'Structure and slab are engineered together so footings, drainage, and layout line up.' },
      { title: 'Year-round use', blurb: 'Shade, fans, and lighting make the space usable through Texas summers and evenings.' },
      { title: 'One point of contact', blurb: 'The same lead carpenter from estimate to final walk-through.' },
    ],
    construction: [
      'Site visit and a single drawing set covering the slab and the structure.',
      'Permit and HOA package submitted once for the whole project.',
      'Concrete poured and cured, then the structure built on it by the same crew.',
      'Ceiling, lighting, and fan finish work; final walk-through.',
    ],
    faqIds: ['ol-scope', 'ol-phases', 'pc-with-concrete', 'pc-timeline'],
    relatedServices: ['patio-covers', 'pergolas', 'stamped-concrete'],
    topic: 'outdoor-living',
    ownerReview: true,
  },
  {
    slug: 'remodeling',
    name: 'Remodeling & New Builds',
    navLabel: 'Remodeling & New Builds',
    navBlurb: 'Additions and remodels in select markets',
    seo: {
      title: 'Home Additions & Remodeling in Dallas-Fort Worth, TX | Structure1',
      description: 'Additions, backyard makeovers, and interior remodels in select Dallas-Fort Worth markets from the Structure1 crew. Permits and engineering handled. Free estimates.',
    },
    hero: 'gable-dallas-dusk',
    gallery: ['carport-melissa-1', 'gable-mckinney-build', 'pergola-plano-framing'],
    lead: 'Additions, full backyard makeovers, and interior remodels in select DFW markets, handled by the same in-house crew and permit process as our outdoor work.',
    overview: [
      'Alongside patio covers and concrete, Structure1 takes on additions, full backyard transformations, and interior remodels in select Dallas-Fort Worth markets. The approach is the same: drawings and engineering up front, permits handled by us, one crew on site, and a clean, communicative build.',
      'Tell us about the project. We will let you know quickly whether it is a fit and what the next step looks like.',
    ],
    options: [
      { name: 'Additions', blurb: 'Covered structures, carports, and room additions tied into the existing home.' },
      { name: 'Backyard transformations', blurb: 'Structure, concrete, lighting, and finishes planned as one project.' },
      { name: 'Interior remodels', blurb: 'Select interior work in markets where our crew is already active.' },
    ],
    reasons: [
      { title: 'Same crew, same standard', blurb: 'The lead carpenter and process you would get on a patio cover.' },
      { title: 'Permits and engineering included', blurb: 'Drawings, submission, and inspections are part of the job.' },
      { title: 'Honest scoping', blurb: 'If a project is not a fit for us, we say so at the first call.' },
    ],
    construction: [
      'Scoping call and site visit.',
      'Drawings, engineering, and permit submission.',
      'Build with one crew and daily updates.',
      'Final walk-through and warranty.',
    ],
    faqIds: ['rm-scope', 'rm-permits', 'plan-start', 'plan-payment'],
    relatedServices: ['outdoor-living', 'patio-covers', 'concrete'],
    topic: 'remodeling',
    ownerReview: true,
  },
];

export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug) as ServiceSlug[];
```
- [ ] **Step 9: Projects** — create `src/content/projects.ts` (same nine slugs; overview/scope/materials written only from the existing descriptions and what the photos show):

```ts
import type { CitySlug, Project, ServiceSlug } from './types';

export const projects: Project[] = [
  {
    slug: 'classic-gable-patio-cover', title: 'Classic Gable Patio Cover', service: 'patio-covers', city: 'mckinney', location: 'McKinney, TX',
    cover: 'gable-mckinney-2', gallery: ['gable-mckinney-2', 'gable-mckinney-ceiling', 'gable-mckinney-build', 'gable-mckinney-1'],
    overview: 'A gable-style patio cover with cedar posts and white trusses, finished with a tongue-and-groove ceiling and fan, built as a backyard living room for a McKinney family.',
    scope: ['Gable roof structure attached to the home', 'Cedar posts on steel-anchored footings', 'Tongue-and-groove ceiling with fan', 'Permit drawings, submission, and inspections'],
    materials: ['Western Red Cedar posts', 'Painted white trusses', 'Tongue-and-groove ceiling'],
    featured: true,
  },
  {
    slug: 'lean-to-patio-cover', title: 'Lean-To Style Patio Cover', service: 'patio-covers', city: null, location: 'Forney, TX',
    cover: 'leanto-forney-2', gallery: ['leanto-forney-1', 'leanto-forney-3', 'leanto-forney-2'],
    overview: 'A modern lean-to patio cover attached to the existing roofline, with a dark-stained wood ceiling, recessed lighting, and a ceiling fan.',
    scope: ['Lean-to roof tied into the existing roofline with flashing', 'Dark-stained wood ceiling', 'Recessed lighting and ceiling fan', 'Permit package handled'],
    materials: ['Cedar framing', 'Dark-stained ceiling boards', 'Recessed LED fixtures'],
    featured: true,
  },
  {
    slug: 'pergola-with-polycarbonate', title: 'Pergola with Polycarbonate', service: 'pergolas', city: 'plano', location: 'Plano, TX',
    cover: 'pergola-plano-complete', gallery: ['pergola-plano-foundation', 'pergola-plano-framing', 'pergola-plano-complete', 'pergola-plano-fan'],
    overview: 'A custom cedar pergola with polycarbonate roofing and an integrated ceiling fan, documented from footings to finish, for year-round outdoor comfort in Plano.',
    scope: ['Concrete footings and steel post anchors', 'Cedar pergola frame', 'Polycarbonate roof panels', 'Ceiling fan installation'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels', 'Galvanized hardware'],
    featured: true,
  },
  {
    slug: 'pergola-with-back-wall', title: 'Pergola with Back Wall', service: 'pergolas', city: null, location: 'Midlothian, TX',
    cover: 'pergola-midlothian', gallery: ['pergola-midlothian', 'pergola-midlothian-2'],
    overview: 'A custom pergola design with a framed back wall for added privacy and wind protection.',
    scope: ['Cedar pergola structure', 'Framed privacy back wall', 'Permit drawings and inspections'],
    materials: ['Western Red Cedar', 'Framed and finished back wall'],
    featured: true,
  },
  {
    slug: 'concrete-driveway', title: 'Concrete Driveway', service: 'driveways-walkways', city: 'dallas', location: 'Dallas, TX',
    cover: 'stamped-driveway-dallas', gallery: ['stamped-driveway-dallas', 'driveway-dallas'],
    overview: 'A reinforced concrete driveway with a decorative stamped border and a premium stone-pattern finish.',
    scope: ['Compacted base and steel reinforcement', 'Reinforced driveway slab', 'Stamped decorative border', 'Control joints and sealer'],
    materials: ['Rebar-reinforced concrete', 'Stamped stone-pattern border', 'Sealer'],
    featured: true,
  },
  {
    slug: 'carport', title: 'Carport', service: 'remodeling', city: null, location: 'Melissa, TX',
    cover: 'carport-melissa-1', gallery: ['carport-melissa-1', 'carport-melissa-2', 'carport-melissa-3'],
    overview: 'A custom gable-style carport with cedar posts, a tongue-and-groove ceiling, and decorative metal bracket accents.',
    scope: ['Gable carport structure', 'Cedar posts on footings', 'Tongue-and-groove ceiling', 'Decorative metal brackets'],
    materials: ['Western Red Cedar', 'Tongue-and-groove ceiling', 'Decorative metal brackets'],
    featured: true,
  },
  {
    slug: 'pergola-with-polycarbonate-fort-worth', title: 'Pergola with Polycarbonate', service: 'pergolas', city: 'fort-worth', location: 'Fort Worth, TX',
    cover: 'pergola-fort-worth', gallery: ['pergola-fort-worth'],
    overview: 'A custom cedar pergola with polycarbonate roofing and ceiling fans for year-round outdoor comfort in Fort Worth.',
    scope: ['Cedar pergola frame', 'Polycarbonate roof panels', 'Ceiling fans'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels'],
    featured: false,
  },
  {
    slug: 'free-standing-modern-pergola', title: 'Free Standing Modern Pergola', service: 'pergolas', city: null, location: 'Lewisville, TX',
    cover: 'pergola-lewisville-1', gallery: ['pergola-lewisville-1', 'pergola-lewisville-2'],
    overview: 'A free-standing modern pergola with cedar posts, a finished ceiling, recessed lighting, and ceiling fans.',
    scope: ['Free-standing structure on its own footings', 'Finished ceiling', 'Recessed lighting and ceiling fans'],
    materials: ['Western Red Cedar', 'Tongue-and-groove ceiling', 'Recessed LED fixtures'],
    featured: false,
  },
  {
    slug: 'stamped-concrete-patio', title: 'Stamped Concrete Patio', service: 'stamped-concrete', city: null, location: 'Forney, TX',
    cover: 'stamped-patio-forney-1', gallery: ['stamped-patio-forney-1', 'stamped-patio-forney-2', 'stamped-patio-forney-3', 'stamped-patio-forney-4'],
    overview: 'A stamped concrete patio with a premium stone-pattern finish, installed under a custom patio cover.',
    scope: ['Compacted base and rebar', 'Stamped stone-pattern patio', 'Sealer after cure', 'Built together with the patio cover above'],
    materials: ['Rebar-reinforced concrete', 'Stone-pattern stamp with integral color', 'Sealer'],
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = (limit = 6) => projects.filter((p) => p.featured).slice(0, limit);
export const projectsForService = (slug: ServiceSlug, limit = 6) => {
  const direct = projects.filter((p) => p.service === slug);
  const siblings: Record<ServiceSlug, ServiceSlug[]> = {
    'patio-covers': ['pergolas', 'outdoor-living'], pergolas: ['patio-covers'], concrete: ['stamped-concrete', 'driveways-walkways'],
    'stamped-concrete': ['concrete'], 'driveways-walkways': ['concrete', 'stamped-concrete'], 'outdoor-living': ['patio-covers', 'pergolas', 'stamped-concrete'], remodeling: ['patio-covers'],
  };
  const extra = projects.filter((p) => siblings[slug].includes(p.service) && !direct.includes(p));
  return [...direct, ...extra].slice(0, limit);
};
export const projectsForCity = (slug: CitySlug) => projects.filter((p) => p.city === slug);
export const relatedProjects = (project: Project, limit = 3) =>
  [...projects.filter((p) => p.slug !== project.slug && p.service === project.service),
   ...projects.filter((p) => p.slug !== project.slug && p.service !== project.service && p.city !== null && p.city === project.city),
   ...projects.filter((p) => p.slug !== project.slug && p.service !== project.service && p.featured)]
    .filter((p, i, arr) => arr.indexOf(p) === i).slice(0, limit);
```

Note: "Stamped Concrete" project title becomes "Stamped Concrete Patio" (clarity; the slug is unchanged). The carport is filed under remodeling so that service has one real project; it was previously under patio-covers.
- [ ] **Step 10: Cities** — create `src/content/cities.ts`. The five existing cities keep their copy verbatim (`intro`, `permitNote`, `neighborhoods`); five new cities are added.

```ts
import type { City, CitySlug } from './types';

export const cities: City[] = [
  {
    slug: 'dallas', name: 'Dallas', county: 'Dallas County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Dallas, TX | Structure1', description: 'Dallas-based patio cover, pergola, and stamped concrete builder. Permits handled, 2-year warranty, free on-site estimates across Dallas neighborhoods.' },
    hero: 'gable-dallas-dusk',
    intro: [
      'Structure1 Construction is based in Dallas, and Dallas backyards are where a large share of our patio covers, pergolas, and concrete work gets built. From older neighborhoods in East Dallas and Lake Highlands with mature trees and established patios, to North Dallas and Far North Dallas homes with larger lots, we size each structure to the house and work around what you already love about the yard.',
      'Our Dallas work includes a reinforced driveway with a stamped stone-pattern border and a cedar gable cover photographed at dusk. Being local means short drives for site visits, quick follow-ups, and a crew that knows the city\'s permit process.',
    ],
    permitNote: 'The City of Dallas requires a building permit for patio covers, pergolas, and other permanent accessory structures, issued through Development Services. Structure1 prepares the drawings, submits the application, and schedules inspections — permits are included in every Dallas project.',
    neighborhoods: ['Lake Highlands', 'East Dallas', 'Preston Hollow', 'North Dallas', 'Far North Dallas', 'Oak Cliff'],
    faqIds: [], testimonialIds: [1],
  },
  {
    slug: 'fort-worth', name: 'Fort Worth', county: 'Tarrant County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Fort Worth, TX | Structure1', description: 'Custom patio covers, cedar pergolas, and stamped concrete in Fort Worth. Permits included, engineered for Texas wind, 2-year warranty. Free estimates.' },
    hero: 'pergola-fort-worth',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Fort Worth, TX — including a recent pergola with polycarbonate roofing, cedar posts, and ceiling fans for a Fort Worth family who wanted year-round outdoor comfort.',
      'From established neighborhoods near the Cultural District to growing communities in far north Fort Worth, our crews build the same way everywhere: Western Red Cedar, steel-anchored footings, and roofing matched to your home.',
    ],
    permitNote: 'The City of Fort Worth requires a building permit for patio covers, issued through Development Services. Structure1 prepares the drawings, submits the application, and schedules every inspection — permits are included in every Fort Worth project.',
    neighborhoods: ['Tanglewood', 'Fairmount', 'Alliance', 'Keller area', 'Benbrook area', 'West Fort Worth'],
    faqIds: [], testimonialIds: [5],
  },
  {
    slug: 'plano', name: 'Plano', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Plano, TX | Structure1', description: 'Patio cover contractor in Plano, TX. Gable, lean-to, and polycarbonate designs, cedar pergolas, stamped concrete. Permits handled, free estimates.' },
    hero: 'pergola-plano-complete',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Plano, TX — from established neighborhoods around Legacy and Willow Bend to newer builds in East Plano. Plano backyards tend to have mature trees and established landscaping, so we design structures that work around what you already love about your yard.',
      'We\'re based in Dallas, minutes down the tollway — Plano is one of our most active service areas, and our crews are in the city on projects nearly every week.',
    ],
    permitNote: 'The City of Plano requires a building permit for patio covers and permanent shade structures, with plan review through Building Inspections. Structure1 prepares the drawings, submits the application, and schedules inspections — the permit process is included in every Plano project.',
    neighborhoods: ['Legacy West', 'Willow Bend', 'Deerfield', 'Kings Ridge', 'East Plano', 'West Plano'],
    faqIds: [], testimonialIds: [3],
  },
  {
    slug: 'frisco', name: 'Frisco', county: 'Collin & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Frisco, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Frisco, TX. HOA and city permit packages handled. 2-year warranty. Free estimates.' },
    hero: 'pergola-lewisville-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Frisco, TX. Frisco\'s newer neighborhoods mean blank-slate backyards — the perfect starting point for a complete outdoor living space with a covered patio and stamped concrete designed together instead of pieced together over years.',
      'Most Frisco neighborhoods have active HOAs with architectural review requirements. We prepare the drawings and documentation your HOA needs alongside the city permit package, so both approvals move in parallel.',
    ],
    permitNote: 'The City of Frisco requires a building permit for patio covers and permanent structures, and most Frisco HOAs require architectural approval before construction. Structure1 handles the city permit end to end and prepares the plans and renderings your HOA review needs.',
    neighborhoods: ['Phillips Creek Ranch', 'Starwood', 'Richwoods', 'The Trails', 'Panther Creek', 'Newman Village'],
    faqIds: [], testimonialIds: [2],
  },
  {
    slug: 'mckinney', name: 'McKinney', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in McKinney, TX | Structure1', description: 'Patio cover builder in McKinney, TX. Gable covers with roofing matched to your home, cedar pergolas, stamped concrete. Permits handled, free estimates.' },
    hero: 'gable-mckinney-2',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout McKinney, TX — from historic districts near downtown to newer communities in Craig Ranch and Trinity Falls. One of our signature gable patio covers, with cedar posts and white trusses, was built for a McKinney family.',
      'McKinney\'s mix of home styles calls for structures that match — we color-match shingles to your existing roof, size posts and beams to your home\'s proportions, and engineer every build for North Texas wind.',
    ],
    permitNote: 'The City of McKinney requires a building permit for patio covers, issued through Development Services; engineering documentation is commonly requested for larger spans. Structure1 handles drawings, engineering, submission, and inspections on every McKinney project.',
    neighborhoods: ['Craig Ranch', 'Stonebridge Ranch', 'Trinity Falls', 'Adriatica', 'Historic Downtown', 'Eldorado'],
    faqIds: [], testimonialIds: [4],
  },
  {
    slug: 'arlington', name: 'Arlington', county: 'Tarrant County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Arlington, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Arlington, TX. Wind-load engineering, permits handled, 2-year warranty. Free estimates.' },
    hero: 'pergola-midlothian',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Arlington, TX. Sitting in the heart of the metroplex between Dallas and Fort Worth, Arlington homeowners get the same crews, the same cedar-and-steel construction, and the same 2-year workmanship warranty we deliver everywhere in DFW.',
      'Arlington\'s established neighborhoods often have larger lots — room for a full outdoor living project: covered patio and stamped concrete extension built as one job on one timeline.',
    ],
    permitNote: 'The City of Arlington requires a building permit for patio covers and permanent shade structures, with wind-load engineering per North Central Texas building codes. Structure1 handles the complete permit package — drawings, engineering, submission, and inspections.',
    neighborhoods: ['North Arlington', 'Dalworthington Gardens area', 'Southwest Arlington', 'Viridian', 'East Arlington', 'Pantego area'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'allen', name: 'Allen', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Allen, TX | Structure1', description: 'Custom patio covers, cedar pergolas, and stamped concrete in Allen, TX. HOA and city permits handled, 2-year warranty. Free on-site estimates.' },
    hero: 'gable-dfw',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Allen, TX. Allen sits between Plano and McKinney, two of our busiest service areas, so our crews are nearby most weeks. Allen neighborhoods such as Twin Creeks and Star Creek are largely HOA communities with established backyards, which usually means an architectural approval alongside the city permit.',
      'An Allen family\'s patio cover is one of our favorite reviews: on time, on budget, and built to the standard we bring to every DFW project.',
    ],
    permitNote: 'The City of Allen requires a building permit for patio covers and other permanent accessory structures, and most Allen HOAs require architectural approval before construction. Structure1 prepares the drawings, submits the city permit, and provides the HOA package.',
    neighborhoods: ['Twin Creeks', 'Star Creek', 'Watters Crossing', 'Bethany Lakes', 'Montgomery Farm', 'Cumberland Crossing'],
    faqIds: [], testimonialIds: [5],
  },
  {
    slug: 'carrollton', name: 'Carrollton', county: 'Dallas & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Carrollton, TX | Structure1', description: 'Patio covers, cedar pergolas, and stamped concrete for Carrollton, TX homes. Permits handled, engineered for Texas wind, 2-year warranty. Free estimates.' },
    hero: 'patio-cover-dfw-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Carrollton, TX. Carrollton is a short drive up the Dallas North Tollway from our base, and its mix of established 1980s–90s neighborhoods and newer developments near Castle Hills means we see everything from replacing a worn patio slab to adding a full covered outdoor room.',
      'Older Carrollton patios are often the right candidates for tear-out and replacement with a reinforced stamped slab before a cover goes up, so the whole project is done once and done right.',
    ],
    permitNote: 'The City of Carrollton requires a building permit for patio covers and permanent accessory structures, reviewed through its Building Inspection division. Structure1 prepares the drawings, submits the application, and schedules inspections on every Carrollton project.',
    neighborhoods: ['Castle Hills area', 'Indian Creek', 'Rosemeade', 'Old Downtown Carrollton', 'Hebron', 'Josey Ranch'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'flower-mound', name: 'Flower Mound', county: 'Denton County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Flower Mound, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Flower Mound, TX. HOA packages and town permits handled, 2-year warranty. Free estimates.' },
    hero: 'pergola-lewisville-2',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Flower Mound, TX. Flower Mound lots are often larger and more wooded than the rest of the metroplex, with homes set among mature trees, so we size structures to the house and design around the yard rather than clearing it.',
      'Our free-standing modern pergola in neighboring Lewisville, with cedar posts, recessed lighting, and ceiling fans, is the kind of build that fits Flower Mound backyards well.',
    ],
    permitNote: 'The Town of Flower Mound requires a building permit for patio covers and permanent accessory structures, and many Flower Mound HOAs require architectural approval. Structure1 handles the town permit end to end and prepares the drawings your HOA review needs.',
    neighborhoods: ['Bridlewood', 'Wellington', 'Tour 18', 'Lakeside', 'Wichita Chase', 'Canyon Falls area'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'prosper', name: 'Prosper', county: 'Collin & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Prosper, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete for new Prosper, TX homes. HOA and town permits handled, 2-year warranty. Free estimates.' },
    hero: 'gable-mckinney-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Prosper, TX. Prosper is one of the fastest-growing towns north of Frisco, and most of its homes are new builds with blank-slate backyards: a small builder-grade patio and a lot of lawn. That is the ideal starting point for a complete outdoor room designed as one project.',
      'Nearly every Prosper neighborhood has an active HOA with architectural review, so we prepare the HOA package alongside the town permit and keep both moving in parallel.',
    ],
    permitNote: 'The Town of Prosper requires a building permit for patio covers and permanent accessory structures, and Prosper HOAs require architectural approval before construction. Structure1 prepares the drawings, submits the permit, and provides the HOA package on every Prosper project.',
    neighborhoods: ['Windsong Ranch', 'Light Farms', 'Star Trail', 'Whitley Place', 'Lakes of Prosper', 'Gentle Creek'],
    faqIds: [], testimonialIds: [],
  },
];

export const getCity = (slug: string): City | undefined => cities.find((c) => c.slug === slug);
export const citySlugs = cities.map((c) => c.slug) as CitySlug[];

/** Full list for the hub footer and LocalBusiness areaServed. */
export const serviceAreaList = [
  'Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Allen', 'Richardson', 'Arlington', 'Garland', 'Irving',
  'Grand Prairie', 'Mesquite', 'Carrollton', 'Denton', 'Lewisville', 'Flower Mound', 'Mansfield', 'Cedar Hill', 'Rowlett', 'Wylie', 'Prosper',
];
```

- [ ] **Step 11: Blog topics** — add a `topic` line to each frontmatter in `content/blog/`:

| File | `topic` |
|---|---|
| patio-cover-cost-dallas-fort-worth | patio-covers |
| types-of-patio-covers-guide | patio-covers |
| best-patio-cover-materials-texas | patio-covers |
| patio-cover-ideas-dallas-fort-worth | patio-covers |
| patio-cover-maintenance-texas | patio-covers |
| patio-cover-increase-home-value-texas | patio-covers |
| patio-cover-vs-pergola | pergolas |
| patio-cover-permit-dallas-fort-worth | planning |

In `src/lib/blog.ts` add `topic: string` to `BlogPost`, read `topic: data.topic || 'patio-covers'` in `getPostBySlug`, and append:

```ts
const TOPIC_FALLBACK: Record<string, string[]> = {
  pergolas: ['pergolas', 'patio-covers'],
  'stamped-concrete': ['stamped-concrete', 'concrete', 'planning'],
  'driveways-walkways': ['driveways-walkways', 'concrete', 'planning'],
  concrete: ['concrete', 'planning'],
  'outdoor-living': ['outdoor-living', 'patio-covers', 'planning'],
  remodeling: ['remodeling', 'planning', 'patio-covers'],
};

export function getPostsByTopic(topic: string, limit = 3): BlogPost[] {
  const order = TOPIC_FALLBACK[topic] ?? [topic, 'planning', 'patio-covers'];
  const all = getAllPosts();
  const picked: BlogPost[] = [];
  for (const t of order) for (const p of all) if (p.topic === t && !picked.includes(p)) picked.push(p);
  for (const p of all) if (!picked.includes(p)) picked.push(p);
  return picked.slice(0, limit);
}
```

- [ ] **Step 12: Verify the content layer compiles and every reference resolves**

```bash
npx tsc --noEmit && node -e "
require('ts-node/register/transpile-only')" 2>/dev/null; npx tsx -e "
import { services, projects, cities, faqs, photos, testimonials } from './src/content';
const ids = new Set(faqs.map(f => f.id));
for (const s of services) for (const id of s.faqIds) if (!ids.has(id)) throw new Error('service ' + s.slug + ' faq ' + id);
for (const c of cities) for (const id of c.faqIds) if (!ids.has(id)) throw new Error('city ' + c.slug + ' faq ' + id);
const slugs = new Set(projects.map(p => p.slug));
for (const must of ['classic-gable-patio-cover','lean-to-patio-cover','pergola-with-polycarbonate','pergola-with-back-wall','concrete-driveway','carport','pergola-with-polycarbonate-fort-worth','free-standing-modern-pergola','stamped-concrete-patio']) if (!slugs.has(must)) throw new Error('missing project ' + must);
const fs = require('fs');
for (const [id, p] of Object.entries(photos)) if (!fs.existsSync('public' + p.src)) throw new Error('photo file missing ' + id + ' ' + p.src);
for (const t of testimonials) if (t.city && !cities.find(c => c.slug === t.city)) throw new Error('testimonial city ' + t.city);
console.log('content ok:', services.length, 'services,', projects.length, 'projects,', cities.length, 'cities,', Object.keys(photos).length, 'photos');
"
```

(`tsx` is run via `npx tsx` which downloads on first use; if offline, run the same checks with `node --experimental-strip-types` on Node 24.)
Expected: `content ok: 7 services, 9 projects, 10 cities, 35 photos`.

- [ ] **Step 13: Commit**

```bash
git add src/content src/lib/blog.ts content/blog scripts/optimize-images.mjs public/images
git commit -m "feat(content): typed content layer (services, projects, cities, faqs, process, photos) + optimized images"
```

---
### Task 2: Design system, primitives, and the site shell

**Files:**
- Modify: `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx` (full rewrites)
- Delete: `src/app/template.tsx`
- Create: `src/components/layout/Container.tsx`, `Section.tsx`, `Header.tsx`, `HeaderTheme.tsx`, `Footer.tsx`, `StickyBar.tsx`; `src/components/ui/Button.tsx`, `Eyebrow.tsx`, `Reveal.tsx`, `Photo.tsx`, `Breadcrumbs.tsx`; `src/components/seo/JsonLd.tsx`

**Interfaces:**
- Produces: `<Container>`, `<Section tone="white"|"offwhite"|"dark" id?>`, `<Button href|onClick variant="primary"|"secondary"|"link" tone="light"|"dark" type?>`, `<Eyebrow tone>`, `<Reveal delay? as? className?>`, `<Photo id ratio="4/3"|"3/4"|"1/1"|"21/9"|"16/9"|"fill" sizes priority? className?>`, `<Breadcrumbs items=[{label, href?}]>` (renders nav + BreadcrumbList JSON-LD), `<JsonLd data>`, `<HeaderTheme dark />` (client, marks the header transparent-over-dark while mounted). Old pages continue to compile until Task 9 deletes them; they look unstyled in the meantime because their old color classes no longer exist.

- [ ] **Step 1: Failing check** — `grep -c "timber" tailwind.config.ts` → `0`; `ls src/components/ui/Photo.tsx` → not found.

- [ ] **Step 2: `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        offwhite: '#F7F6F3',
        black: '#0A0A0A',
        charcoal: '#1C1C1C',
        gray: { 200: '#E3E1DC', 500: '#7A7975', 700: '#4A4A48' },
        timber: '#9C7A5B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '500' }],
        h1: ['clamp(2.375rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        lead: ['clamp(1.125rem, 1.4vw, 1.25rem)', { lineHeight: '1.5' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        meta: ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: { site: '1280px', prose: '65ch' },
      boxShadow: { bar: '0 -4px 16px rgba(0,0,0,0.08)' },
      transitionDuration: { 150: '150ms', 250: '250ms', 400: '400ms' },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --header-h: 80px;
  --header-h-compact: 64px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-padding-top: var(--header-h); }
body { background: #FFFFFF; color: #0A0A0A; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
img { display: block; max-width: 100%; }

::selection { background: #0A0A0A; color: #fff; }

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid #9C7A5B;
  outline-offset: 2px;
}

/* Reveal: one IntersectionObserver in ui/Reveal.tsx toggles .is-visible */
[data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 400ms ease-out, transform 400ms ease-out; transition-delay: var(--reveal-delay, 0ms); }
[data-reveal].is-visible { opacity: 1; transform: none; }

/* Image hover */
.photo-hover img { transition: transform 400ms ease-out; }
@media (hover: hover) { .photo-hover:hover img { transform: scale(1.02); } }

/* Article body */
.prose-article { max-width: 65ch; }
.prose-article h2 { font-family: var(--font-display); font-size: 1.75rem; line-height: 1.2; font-weight: 600; letter-spacing: -0.01em; margin: 2.5rem 0 1rem; }
.prose-article h3 { font-family: var(--font-display); font-size: 1.3125rem; line-height: 1.3; font-weight: 600; margin: 2rem 0 0.75rem; }
.prose-article p, .prose-article li { font-size: 1.0625rem; line-height: 1.7; color: #4A4A48; }
.prose-article p { margin-bottom: 1.25rem; }
.prose-article ul, .prose-article ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
.prose-article ul li { list-style: disc; } .prose-article ol li { list-style: decimal; }
.prose-article strong { color: #0A0A0A; font-weight: 600; }
.prose-article a { color: #0A0A0A; text-decoration: underline; text-underline-offset: 3px; }
.prose-article a:hover { color: #9C7A5B; }
.prose-article img { margin: 2rem 0; width: 100%; }
.prose-article blockquote { border-left: 2px solid #E3E1DC; padding-left: 1.25rem; margin: 2rem 0; color: #4A4A48; }
.prose-article table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.9375rem; }
.prose-article th { background: #0A0A0A; color: #fff; text-align: left; padding: 0.75rem 1rem; font-weight: 600; }
.prose-article td { padding: 0.75rem 1rem; border-bottom: 1px solid #E3E1DC; color: #4A4A48; }
.prose-article hr { border: 0; border-top: 1px solid #E3E1DC; margin: 2.5rem 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  [data-reveal] { opacity: 1; transform: none; }
}
```

- [ ] **Step 4: `src/app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { HeaderThemeProvider } from '@/components/layout/HeaderTheme';
import Footer from '@/components/layout/Footer';
import StickyBar from '@/components/layout/StickyBar';
import JsonLd from '@/components/seo/JsonLd';
import { company, serviceAreaList } from '@/content';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap', weight: ['400', '500', '600'] });
const display = Inter_Tight({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700'] });

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FFFFFF', colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: 'Structure1 Construction | Patio Covers, Pergolas & Concrete in Dallas-Fort Worth', template: '%s | Structure1 Construction' },
  description: "Dallas-Fort Worth's patio cover, pergola, and concrete builder. Permits and engineering handled, 2-year warranty, 150+ projects. Get a free estimate.",
  openGraph: { type: 'website', locale: 'en_US', url: company.url, siteName: 'Structure1 Construction', images: [{ url: '/images/hero/buckfin1.JPG', width: 1200, height: 630, alt: 'Classic gable patio cover in McKinney, Texas by Structure1 Construction' }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${company.url}/#business`,
  name: company.name,
  url: company.url,
  telephone: `+1${company.phoneRaw}`,
  email: company.email,
  address: { '@type': 'PostalAddress', streetAddress: company.address.street, addressLocality: company.address.city, addressRegion: company.address.state, postalCode: company.address.zip, addressCountry: 'US' },
  areaServed: serviceAreaList.map((name) => ({ '@type': 'City', name })),
  openingHours: 'Mo-Fr 08:00-18:00',
  sameAs: [company.social.facebook, company.social.instagram],
  image: `${company.url}/images/hero/buckfin1.JPG`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans text-body text-black bg-white min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2">Skip to main content</a>
        <HeaderThemeProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyBar />
        </HeaderThemeProvider>
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
```

Delete `src/app/template.tsx`.

- [ ] **Step 5: Primitives**

`src/components/layout/Container.tsx`:

```tsx
import { cn } from '@/lib/utils';
export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-site px-4 sm:px-6', className)}>{children}</div>;
}
```

`src/components/layout/Section.tsx`:

```tsx
import { cn } from '@/lib/utils';
import Container from './Container';

type Tone = 'white' | 'offwhite' | 'dark';
const tones: Record<Tone, string> = { white: 'bg-white text-black', offwhite: 'bg-offwhite text-black', dark: 'bg-black text-white' };

export default function Section({ children, tone = 'white', id, className, bleed = false }:
  { children: React.ReactNode; tone?: Tone; id?: string; className?: string; bleed?: boolean }) {
  return (
    <section id={id} className={cn(tones[tone], 'py-16 md:py-24', className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
```

`src/components/ui/Eyebrow.tsx`:

```tsx
import { cn } from '@/lib/utils';
export default function Eyebrow({ children, tone = 'light', className }: { children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return <p className={cn('text-eyebrow uppercase', tone === 'dark' ? 'text-white/70' : 'text-gray-500', className)}>{children}</p>;
}
```

`src/components/ui/Button.tsx`:

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'link';
  tone?: 'light' | 'dark';
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
};

const base = 'inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-medium tracking-[0.02em] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed';
const styles = {
  primary: { light: 'bg-black text-white hover:bg-charcoal', dark: 'bg-white text-black hover:bg-offwhite' },
  secondary: { light: 'border border-black text-black hover:bg-black hover:text-white', dark: 'border border-white text-white hover:bg-white hover:text-black' },
  link: { light: 'h-auto px-0 text-black underline-offset-4 hover:underline hover:text-timber', dark: 'h-auto px-0 text-white underline-offset-4 hover:underline' },
};

export default function Button({ children, href, onClick, type = 'button', variant = 'primary', tone = 'light', arrow = false, disabled, className }: Props) {
  const cls = cn(base, styles[variant][tone], className);
  const inner = <>{children}{arrow && <ArrowRight className="h-4 w-4" aria-hidden />}</>;
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>;
}
```

`src/components/ui/Photo.tsx`:

```tsx
import Image from 'next/image';
import { photos, type PhotoId } from '@/content/images';
import { cn } from '@/lib/utils';

const ratios = { '4/3': 'aspect-[4/3]', '3/4': 'aspect-[3/4]', '1/1': 'aspect-square', '21/9': 'aspect-[21/9]', '16/9': 'aspect-video', fill: 'absolute inset-0' } as const;
const focals = { center: 'object-center', top: 'object-top', bottom: 'object-bottom' } as const;

export default function Photo({ id, ratio = '4/3', sizes, priority = false, className, hover = false }:
  { id: PhotoId; ratio?: keyof typeof ratios; sizes: string; priority?: boolean; className?: string; hover?: boolean }) {
  const p = photos[id];
  return (
    <div className={cn('relative overflow-hidden bg-gray-200', ratios[ratio], hover && 'photo-hover', className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} loading={priority ? 'eager' : 'lazy'} quality={82} className={cn('object-cover', focals[p.focal ?? 'center'])} />
    </div>
  );
}
```

`src/components/ui/Reveal.tsx`:

```tsx
'use client';
import { useEffect, useRef } from 'react';

let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  if (!observer) observer = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); observer?.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  observer.observe(el);
}

export default function Reveal({ children, delay = 0, as: Tag = 'div', className }:
  { children: React.ReactNode; delay?: number; as?: 'div' | 'li' | 'article' | 'section'; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (ref.current) observe(ref.current); }, []);
  return <Tag ref={ref as React.RefObject<HTMLDivElement>} data-reveal="" style={{ ['--reveal-delay' as string]: `${delay}ms` }} className={className}>{children}</Tag>;
}
```

`src/components/seo/JsonLd.tsx`:

```tsx
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

`src/components/ui/Breadcrumbs.tsx`:

```tsx
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { company } from '@/content/company';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  const data = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: `${company.url}${c.href}` } : {}) })),
  };
  const muted = tone === 'dark' ? 'text-white/60' : 'text-gray-500';
  const strong = tone === 'dark' ? 'text-white' : 'text-black';
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-meta ${muted}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href && i < all.length - 1 ? <Link href={c.href} className="hover:text-timber transition-colors">{c.label}</Link> : <span className={strong} aria-current="page">{c.label}</span>}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
```
- [ ] **Step 6: Header theme context, Header, Footer, StickyBar**

`src/components/layout/HeaderTheme.tsx`:

```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext<{ dark: boolean; setDark: (v: boolean) => void }>({ dark: false, setDark: () => {} });

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  return <Ctx.Provider value={{ dark, setDark }}>{children}</Ctx.Provider>;
}

export const useHeaderTheme = () => useContext(Ctx);

/** Render inside any page whose top section is a dark photo hero. */
export default function HeaderTheme({ dark }: { dark: boolean }) {
  const { setDark } = useHeaderTheme();
  useEffect(() => { setDark(dark); return () => setDark(false); }, [dark, setDark]);
  return null;
}
```

`src/components/layout/Header.tsx`:

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { company } from '@/content/company';
import { services } from '@/content/services';
import { useHeaderTheme } from './HeaderTheme';

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { dark } = useHeaderTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const servicesBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); servicesBtn.current?.focus(); } };
    const onClick = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [menu]);

  const onDark = dark && !scrolled && !open;
  const text = onDark ? 'text-white' : 'text-black';
  const muted = onDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black';
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/')) || (href === '/blog' && pathname.startsWith('/blog'));

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-[background-color,height,box-shadow] duration-250', onDark ? 'bg-transparent' : 'bg-white border-b border-gray-200')}>
      <div className={cn('mx-auto flex max-w-site items-center justify-between px-4 sm:px-6 transition-[height] duration-250', scrolled ? 'h-16' : 'h-20')}>
        <Link href="/" className={cn('font-display text-xl font-bold tracking-tight', text)} aria-label="Structure1 home">
          Structure1
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          <div className="relative" ref={menuRef} onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <button
              ref={servicesBtn}
              type="button"
              aria-expanded={menu}
              aria-haspopup="true"
              onClick={() => setMenu((v) => !v)}
              className={cn('flex items-center gap-1 text-sm font-medium transition-colors', pathname.startsWith('/services') ? 'text-timber' : muted)}
            >
              Services <ChevronDown className={cn('h-4 w-4 transition-transform duration-150', menu && 'rotate-180')} aria-hidden />
            </button>
            <div className={cn('absolute left-0 top-full pt-4 transition-opacity duration-150', menu ? 'opacity-100' : 'pointer-events-none opacity-0')}>
              <ul className="w-[22rem] border border-gray-200 bg-white p-2 text-black" role="menu">
                {services.map((s) => (
                  <li key={s.slug} role="none">
                    <Link role="menuitem" href={`/services/${s.slug}`} tabIndex={menu ? 0 : -1} className="block px-4 py-3 hover:bg-offwhite">
                      <span className="block text-sm font-medium">{s.navLabel}</span>
                      <span className="block text-meta text-gray-500">{s.navBlurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={cn('text-sm font-medium transition-colors', isActive(l.href) ? 'text-timber' : muted)}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href={`tel:${company.phoneRaw}`} className={cn('text-sm font-medium', muted)}>{company.phone}</a>
          <Link href="/estimate" className={cn('inline-flex h-11 items-center px-5 text-sm font-medium transition-colors', onDark ? 'bg-white text-black hover:bg-offwhite' : 'bg-black text-white hover:bg-charcoal')}>
            Get a Free Estimate
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a href={`tel:${company.phoneRaw}`} aria-label={`Call ${company.phone}`} className={cn('flex h-11 w-11 items-center justify-center', text)}><Phone className="h-5 w-5" /></a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className={cn('flex h-11 w-11 items-center justify-center', text)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={cn('lg:hidden fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-gray-200 bg-white transition-opacity duration-250', open ? 'opacity-100' : 'pointer-events-none opacity-0')} aria-hidden={!open}>
        <nav className="px-4 py-4" aria-label="Mobile">
          <button type="button" onClick={() => setMobileServices((v) => !v)} aria-expanded={mobileServices} className="flex w-full items-center justify-between py-3 text-lg font-medium">
            Services <ChevronDown className={cn('h-5 w-5 transition-transform duration-150', mobileServices && 'rotate-180')} aria-hidden />
          </button>
          <ul className={cn('overflow-hidden transition-[max-height] duration-250', mobileServices ? 'max-h-[40rem]' : 'max-h-0')}>
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="block py-2.5 pl-4 text-base text-gray-700" tabIndex={open && mobileServices ? 0 : -1}>{s.navLabel}</Link></li>
            ))}
          </ul>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block border-t border-gray-200 py-3 text-lg font-medium" tabIndex={open ? 0 : -1}>{l.label}</Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/estimate" className="inline-flex h-12 items-center justify-center bg-black text-sm font-medium text-white" tabIndex={open ? 0 : -1}>Get a Free Estimate</Link>
            <a href={`tel:${company.phoneRaw}`} className="inline-flex h-12 items-center justify-center border border-black text-sm font-medium" tabIndex={open ? 0 : -1}>Call {company.phone}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

`src/components/layout/StickyBar.tsx`:

```tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { company } from '@/content/company';

export default function StickyBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (pathname === '/estimate') return null;
  return (
    <div className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white shadow-bar transition-transform duration-250 ${show ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex gap-2 p-3">
        <a href={`tel:${company.phoneRaw}`} className="flex h-12 w-14 items-center justify-center border border-black" aria-label={`Call ${company.phone}`}><Phone className="h-5 w-5" /></a>
        <Link href="/estimate" className="flex h-12 flex-1 items-center justify-center bg-black text-sm font-medium text-white">Get a Free Estimate</Link>
      </div>
    </div>
  );
}
```

`src/components/layout/Footer.tsx`:

```tsx
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import Container from './Container';
import { company } from '@/content/company';
import { services } from '@/content/services';
import { cities } from '@/content/cities';

const companyLinks = [
  { label: 'Projects', href: '/projects' }, { label: 'Our Process', href: '/process' }, { label: 'About', href: '/about' },
  { label: 'Resources', href: '/blog' }, { label: 'Contact', href: '/contact' }, { label: 'Get a Free Estimate', href: '/estimate' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="font-display text-xl font-bold">Structure1</Link>
            <p className="mt-4 max-w-xs text-small text-white/70">Dallas–Fort Worth patio covers, pergolas, concrete, and outdoor living. Designed, permitted, and built by one in-house crew.</p>
            <Link href="/estimate" className="mt-6 inline-flex h-12 items-center bg-white px-6 text-sm font-medium text-black hover:bg-offwhite">Get a Free Estimate</Link>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow uppercase text-white/50">Services</h2>
            <ul className="mt-4 space-y-2.5">{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-small text-white/80 hover:text-white">{s.navLabel}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow uppercase text-white/50">Company</h2>
            <ul className="mt-4 space-y-2.5">{companyLinks.map((l) => <li key={l.href}><Link href={l.href} className="text-small text-white/80 hover:text-white">{l.label}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow uppercase text-white/50">Service Areas</h2>
            <ul className="mt-4 space-y-2.5">{cities.map((c) => <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-small text-white/80 hover:text-white">{c.name}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow uppercase text-white/50">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-small text-white/80">
              <li><a href={`tel:${company.phoneRaw}`} className="hover:text-white">{company.phone}</a></li>
              <li><a href={`mailto:${company.email}`} className="break-all hover:text-white">{company.email}</a></li>
              <li>{company.address.street}<br />{company.address.city}, {company.address.state} {company.address.zip}</li>
              <li>{company.hours}</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"><Facebook className="h-4 w-4" /></a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-meta text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms of Service</Link></div>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 7: Make the old pages compile against the new shell**

Old pages still import old components (`PageHero`, `CTASection`, etc.), which still exist, so `tsc` passes. Nothing else to change here; they are replaced in Tasks 3–8 and deleted in Task 9.

- [ ] **Step 8: Typecheck, lint, dev render**

```bash
npx tsc --noEmit && npx eslint . && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: no errors; `200`. Open http://localhost:3000 and confirm the new header (Services dropdown) and footer render; the old page bodies look unstyled, which is expected until Task 3.

- [ ] **Step 9: Keyboard check for the dropdown (Review Focus 2)**

```bash
node -e "
const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); // skip link, logo
  await p.keyboard.press('Tab'); // Services button
  const label = await p.evaluate(() => document.activeElement?.textContent?.trim());
  await p.keyboard.press('Enter');
  const expanded = await p.evaluate(() => document.activeElement?.getAttribute('aria-expanded'));
  await p.keyboard.press('Tab');
  const first = await p.evaluate(() => document.activeElement?.getAttribute('href'));
  await p.keyboard.press('Escape');
  const back = await p.evaluate(() => document.activeElement?.textContent?.trim());
  console.log({ label, expanded, first, back });
  await b.close();
})();"
```

Expected: `{ label: 'Services', expanded: 'true', first: '/services/patio-covers', back: 'Services' }`.

- [ ] **Step 10: Commit**

```bash
git add -A src/app/layout.tsx src/app/globals.css tailwind.config.ts src/components/layout src/components/ui src/components/seo/JsonLd.tsx
git rm -q src/app/template.tsx
git commit -m "feat(shell): design tokens, primitives, header with services menu, footer, sticky mobile bar"
```

---
### Task 3: Home page and the shared section components

**Files:**
- Create: `src/components/home/Hero.tsx`, `src/components/sections/TrustBar.tsx`, `ServiceCard.tsx`, `ServiceGrid.tsx`, `ProjectCard.tsx`, `ProjectGrid.tsx`, `ProcessSteps.tsx`, `Testimonials.tsx`, `ServiceAreaGrid.tsx`, `CTASection.tsx`, `SectionHeader.tsx`
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Produces: `<TrustBar tone?>`, `<ServiceGrid services?>`, `<ProjectGrid projects columns?>`, `<ProcessSteps compact?>`, `<Testimonials items limit?>`, `<ServiceAreaGrid>`, `<CTASection id? tone heading text cta>`, `<SectionHeader eyebrow title text? tone? align?>`. Tasks 4–8 reuse all of these.

- [ ] **Step 1: Failing check** — `curl -s http://localhost:3000/ | grep -c "Outdoor spaces built like they belong"` → `0`.

- [ ] **Step 2: Section components**

`src/components/sections/SectionHeader.tsx`:

```tsx
import Eyebrow from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';

export default function SectionHeader({ eyebrow, title, text, tone = 'light', align = 'left', as: Tag = 'h2' }:
  { eyebrow?: string; title: string; text?: string; tone?: 'light' | 'dark'; align?: 'left' | 'center'; as?: 'h1' | 'h2' }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <Eyebrow tone={tone} className="mb-4">{eyebrow}</Eyebrow>}
      <Tag className={cn('font-display', Tag === 'h1' ? 'text-h1' : 'text-h2')}>{title}</Tag>
      {text && <p className={cn('mt-4 text-lead', tone === 'dark' ? 'text-white/70' : 'text-gray-700')}>{text}</p>}
    </div>
  );
}
```

`src/components/sections/TrustBar.tsx`:

```tsx
import { trust } from '@/content/trust';
import { cn } from '@/lib/utils';

export default function TrustBar({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const rule = tone === 'dark' ? 'border-white/15' : 'border-gray-200';
  return (
    <ul className={cn('grid grid-cols-2 gap-x-6 gap-y-3 border-y py-5 text-meta font-medium md:grid-cols-4 lg:flex lg:justify-between', rule, tone === 'dark' ? 'text-white/80' : 'text-gray-700', className)}>
      {trust.map((t) => <li key={t.label} className="flex items-center gap-2"><span className={cn('h-1.5 w-1.5 shrink-0', tone === 'dark' ? 'bg-white/60' : 'bg-black')} aria-hidden />{t.label}</li>)}
    </ul>
  );
}
```

`src/components/sections/ServiceCard.tsx` + `ServiceGrid.tsx`:

```tsx
// ServiceCard.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import type { Service } from '@/content/types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <Photo id={service.hero} ratio="4/3" sizes="(max-width: 768px) 100vw, 33vw" hover />
      <h3 className="mt-4 text-h3 font-display">{service.name}</h3>
      <p className="mt-1.5 text-small text-gray-700">{service.navBlurb}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-timber">Learn more <ArrowRight className="h-4 w-4" aria-hidden /></span>
    </Link>
  );
}

// ServiceGrid.tsx
import Reveal from '@/components/ui/Reveal';
import ServiceCard from './ServiceCard';
import { services as all } from '@/content/services';
import type { Service } from '@/content/types';

export default function ServiceGrid({ services = all }: { services?: Service[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => <Reveal as="li" key={s.slug} delay={Math.min(i, 5) * 60}><ServiceCard service={s} /></Reveal>)}
    </ul>
  );
}
```

`src/components/sections/ProjectCard.tsx` + `ProjectGrid.tsx`:

```tsx
// ProjectCard.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { getService } from '@/content/services';
import type { Project } from '@/content/types';

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw' }: { project: Project; sizes?: string }) {
  const service = getService(project.service);
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Photo id={project.cover} ratio="4/3" sizes={sizes} hover />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-h3 font-display">{project.title}</h3>
          <p className="mt-1 text-meta text-gray-500">{project.location}{service ? ` · ${service.name}` : ''}</p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium group-hover:text-timber">View Project <ArrowRight className="h-4 w-4" aria-hidden /></span>
      </div>
    </Link>
  );
}

// ProjectGrid.tsx
import Reveal from '@/components/ui/Reveal';
import ProjectCard from './ProjectCard';
import type { Project } from '@/content/types';

export default function ProjectGrid({ projects, columns = 3 }: { projects: Project[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {projects.map((p, i) => <Reveal as="li" key={p.slug} delay={Math.min(i, 5) * 60}><ProjectCard project={p} sizes={columns === 3 ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'} /></Reveal>)}
    </ul>
  );
}
```

`src/components/sections/ProcessSteps.tsx`:

```tsx
import { processSteps } from '@/content/process';

export default function ProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid gap-px border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s) => (
        <li key={s.number} className="bg-white p-6 md:p-8">
          <span className="text-meta font-medium text-gray-500">{s.number}</span>
          <h3 className="mt-3 text-h3 font-display">{s.title}</h3>
          <p className="mt-2 text-small text-gray-700">{s.summary}</p>
          {!compact && (
            <dl className="mt-5 space-y-3 text-small">
              <div><dt className="font-medium">You</dt><dd className="text-gray-700">{s.homeownerDoes}</dd></div>
              <div><dt className="font-medium">We</dt><dd className="text-gray-700">{s.weDo}</dd></div>
              <div><dt className="font-medium">Timing</dt><dd className="text-gray-700">{s.timing}</dd></div>
            </dl>
          )}
        </li>
      ))}
    </ol>
  );
}
```

`src/components/sections/Testimonials.tsx`:

```tsx
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { testimonials as all } from '@/content/testimonials';
import type { Testimonial } from '@/content/types';

export default function Testimonials({ items = all, limit = 3 }: { items?: Testimonial[]; limit?: number }) {
  const list = items.slice(0, limit);
  if (list.length === 0) return null;
  return (
    <ul className="grid gap-px border border-gray-200 bg-gray-200 md:grid-cols-3">
      {list.map((t, i) => (
        <Reveal as="li" key={t.id} delay={i * 60} className="bg-white p-6 md:p-8">
          <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-black text-black" aria-hidden />)}</div>
          <blockquote className="mt-4 text-body text-black">“{t.quote}”</blockquote>
          <p className="mt-5 text-small font-medium">{t.author}</p>
          <p className="text-meta text-gray-500">{t.project} · {t.location}</p>
        </Reveal>
      ))}
    </ul>
  );
}
```

`src/components/sections/ServiceAreaGrid.tsx`:

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cities, serviceAreaList } from '@/content/cities';

export default function ServiceAreaGrid({ showList = true }: { showList?: boolean }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-px border border-gray-200 bg-gray-200 md:grid-cols-5">
        {cities.map((c) => (
          <li key={c.slug} className="bg-white">
            <Link href={`/service-areas/${c.slug}`} className="group flex h-full flex-col justify-between p-5">
              <span><span className="block text-h3 font-display">{c.name}</span><span className="block text-meta text-gray-500">{c.county}</span></span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:text-timber">View {c.name} <ArrowRight className="h-4 w-4" aria-hidden /></span>
            </Link>
          </li>
        ))}
      </ul>
      {showList && <p className="mt-6 text-small text-gray-700"><span className="font-medium text-black">Also serving:</span> {serviceAreaList.filter((n) => !cities.some((c) => c.name === n)).join(', ')}, and surrounding communities.</p>}
    </>
  );
}
```

`src/components/sections/CTASection.tsx`:

```tsx
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import { company } from '@/content/company';

export default function CTASection({ id, tone = 'dark', heading = 'Ready to plan your project?', text = 'Tell us what you have in mind. We reply within one business day with next steps and a free, itemized estimate.', cta = 'Get a Free Estimate' }:
  { id?: string; tone?: 'dark' | 'offwhite'; heading?: string; text?: string; cta?: string }) {
  const dark = tone === 'dark';
  return (
    <Section id={id} tone={tone}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-display">{heading}</h2>
          <p className={`mt-4 text-lead ${dark ? 'text-white/70' : 'text-gray-700'}`}>{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/estimate" tone={dark ? 'dark' : 'light'} arrow>{cta}</Button>
          <a href={`tel:${company.phoneRaw}`} className={`inline-flex h-12 items-center justify-center px-2 text-sm font-medium ${dark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'}`}>or call {company.phone}</a>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Hero and home page**

`src/components/home/Hero.tsx`:

```tsx
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import HeaderTheme from '@/components/layout/HeaderTheme';
import { photos } from '@/content/images';
import { company } from '@/content/company';

export default function Hero() {
  const p = photos['gable-mckinney-1'];
  return (
    <section className="relative bg-black text-white">
      <HeaderTheme dark />
      <div className="relative h-[72svh] min-h-[520px] max-h-[820px] md:h-[82svh]">
        <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={82} className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-site px-4 pb-10 sm:px-6 md:pb-16">
            <Eyebrow tone="dark" className="mb-4">{company.tagline}</Eyebrow>
            <h1 className="max-w-3xl text-h1 font-display">Outdoor spaces built like they belong with your home.</h1>
            <p className="mt-5 max-w-xl text-lead text-white/80">Custom patio covers, pergolas, concrete, and outdoor living — designed, permitted, and built by one in-house crew across Dallas–Fort Worth.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/estimate" tone="dark" arrow>Get My Free Estimate</Button>
              <Button href="/projects" variant="secondary" tone="dark">View Our Work</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

`src/app/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import ServiceGrid from '@/components/sections/ServiceGrid';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/content/projects';
import { why } from '@/content/trust';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section className="py-0">
        <TrustBar className="border-t-0" />
      </Section>
      <Section className="pt-10 md:pt-14">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <Photo id="leanto-forney-2" ratio="3/4" sizes="33vw" />
          <Photo id="pergola-plano-complete" ratio="3/4" sizes="33vw" />
          <Photo id="stamped-patio-forney-1" ratio="3/4" sizes="33vw" />
        </div>
      </Section>
      <Section id="services" tone="offwhite">
        <SectionHeader eyebrow="Services" title="What we build" text="Seven services, one in-house crew. Every project includes drawings, engineering, permits, and a 2-year workmanship warranty." />
        <div className="mt-12"><ServiceGrid /></div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Why Structure1" title="Built to last, handled end to end" />
            <ul className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {why.map((w) => <li key={w.title} className="bg-white p-6"><h3 className="text-h3 font-display">{w.title}</h3><p className="mt-2 text-small text-gray-700">{w.blurb}</p></li>)}
            </ul>
          </div>
          <Reveal className="lg:col-span-5"><Photo id="gable-mckinney-ceiling" ratio="3/4" sizes="(max-width: 1024px) 100vw, 40vw" /></Reveal>
        </div>
      </Section>
      <Section tone="offwhite">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Projects" title="Recent work" />
          <Button href="/projects" variant="link" arrow>View all projects</Button>
        </div>
        <div className="mt-12"><ProjectGrid projects={featuredProjects(6)} /></div>
      </Section>
      <Section id="process">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Process" title="How it works" text="Four steps, one project manager, no surprises." />
          <Button href="/process" variant="link" arrow>See the full process</Button>
        </div>
        <div className="mt-12"><ProcessSteps compact /></div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Reviews" title="What homeowners say" />
        <div className="mt-12"><Testimonials /></div>
      </Section>
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Service areas" title="Serving Dallas–Fort Worth" text="Based in Dallas, building across the metroplex." />
          <Link href="/service-areas" className="text-sm font-medium underline-offset-4 hover:text-timber hover:underline">All service areas →</Link>
        </div>
        <div className="mt-12"><ServiceAreaGrid /></div>
      </Section>
      <CTASection id="estimate" />
    </>
  );
}
```

- [ ] **Step 4: Verify (includes Review Focus 3)**

```bash
npx tsc --noEmit && npx eslint . && curl -s http://localhost:3000/ | grep -oE 'id="(estimate|process|services)"' | sort -u && curl -s http://localhost:3000/ | grep -c "<h1"
```

Expected: no errors; the three ids printed; `1`.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/home/Hero.tsx src/components/sections
git commit -m "feat(home): hero, trust bar, services, why, projects, process, reviews, areas, CTA"
```

---
### Task 4: Services hub and the service template (7 pages)

**Files:**
- Create: `src/components/layout/PageHero.tsx` (replaces the old one at the same path), `src/components/sections/FAQ.tsx`, `src/components/sections/RelatedProjects.tsx`, `src/components/sections/RelatedGuides.tsx`, `src/components/sections/ArticleCard.tsx`, `src/app/services/[slug]/page.tsx`
- Modify: `src/app/services/page.tsx` (rewrite)
- Delete: `src/app/services/patio-covers/page.tsx`, `src/app/services/concrete/page.tsx` (served by `[slug]` now; same URLs)

**Interfaces:**
- Consumes: Task 1 content, Task 2 primitives, Task 3 sections.
- Produces: `<PageHero crumbs eyebrow title lead photo>` (dark photo hero + breadcrumbs + HeaderTheme), `<FAQ items heading?>` (client accordion + FAQPage JSON-LD), `<RelatedProjects projects heading cta?>`, `<RelatedGuides topic heading?>` (server; reads markdown), `<ArticleCard post>`.

- [ ] **Step 1: Failing check** — `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/services/pergolas` → `404`.

- [ ] **Step 2: PageHero**

`src/components/layout/PageHero.tsx`:

```tsx
import Image from 'next/image';
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import HeaderTheme from './HeaderTheme';
import { photos, type PhotoId } from '@/content/images';

export default function PageHero({ crumbs, eyebrow, title, lead, photo }: { crumbs: Crumb[]; eyebrow?: string; title: string; lead?: string; photo: PhotoId }) {
  const p = photos[photo];
  return (
    <section className="relative bg-black text-white">
      <HeaderTheme dark />
      <div className="relative min-h-[420px] md:min-h-[520px]">
        <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={80} className="object-cover opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-site px-4 pb-10 pt-32 sm:px-6 md:pb-14">
            <Breadcrumbs items={crumbs} tone="dark" />
            {eyebrow && <Eyebrow tone="dark" className="mt-8">{eyebrow}</Eyebrow>}
            <h1 className="mt-4 max-w-3xl text-h1 font-display">{title}</h1>
            {lead && <p className="mt-4 max-w-2xl text-lead text-white/80">{lead}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: FAQ, RelatedProjects, RelatedGuides, ArticleCard**

`src/components/sections/FAQ.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import type { Faq } from '@/content/types';

export default function FAQ({ items, heading = 'Questions, answered' }: { items: Faq[]; heading?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return (
    <div>
      <h2 className="text-h2 font-display">{heading}</h2>
      <ul className="mt-8 border-t border-gray-200">
        {items.map((f) => {
          const isOpen = open === f.id;
          return (
            <li key={f.id} className="border-b border-gray-200">
              <h3>
                <button type="button" onClick={() => setOpen(isOpen ? null : f.id)} aria-expanded={isOpen} aria-controls={`faq-${f.id}`} className="flex w-full items-center justify-between gap-6 py-5 text-left text-body font-medium">
                  {f.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
              </h3>
              <div id={`faq-${f.id}`} className={`grid transition-[grid-template-rows] duration-250 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><p className="pb-6 text-small text-gray-700">{f.answer}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
      <JsonLd data={schema} />
    </div>
  );
}
```

`src/components/sections/RelatedProjects.tsx`:

```tsx
import ProjectGrid from './ProjectGrid';
import SectionHeader from './SectionHeader';
import Button from '@/components/ui/Button';
import type { Project } from '@/content/types';

export default function RelatedProjects({ projects, eyebrow = 'Projects', heading, text }: { projects: Project[]; eyebrow?: string; heading: string; text?: string }) {
  if (projects.length === 0) return null;
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow={eyebrow} title={heading} text={text} />
        <Button href="/projects" variant="link" arrow>View all projects</Button>
      </div>
      <div className="mt-12"><ProjectGrid projects={projects} /></div>
    </>
  );
}
```

`src/components/sections/ArticleCard.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

export default function ArticleCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="photo-hover relative aspect-[4/3] overflow-hidden bg-gray-200">
        <Image src={post.featuredImage} alt={post.featuredImageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" priority={priority} className="object-cover" />
      </div>
      <p className="mt-4 text-meta text-gray-500">{post.category} · {post.readTime}</p>
      <h3 className="mt-1.5 text-h3 font-display group-hover:text-timber">{post.title}</h3>
      <p className="mt-2 text-small text-gray-700 line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
```

`src/components/sections/RelatedGuides.tsx`:

```tsx
import SectionHeader from './SectionHeader';
import ArticleCard from './ArticleCard';
import Button from '@/components/ui/Button';
import { getPostsByTopic } from '@/lib/blog';

export default function RelatedGuides({ topic, heading = 'Homeowner guides', limit = 3 }: { topic: string; heading?: string; limit?: number }) {
  const posts = getPostsByTopic(topic, limit);
  if (posts.length === 0) return null;
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow="Resources" title={heading} />
        <Button href="/blog" variant="link" arrow>All resources</Button>
      </div>
      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <li key={p.slug}><ArticleCard post={p} /></li>)}</ul>
    </>
  );
}
```

(`line-clamp-2` is built into Tailwind 3.3+.)

- [ ] **Step 4: Services hub** — `src/app/services/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ServiceGrid from '@/components/sections/ServiceGrid';
import TrustBar from '@/components/sections/TrustBar';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Outdoor Living & Concrete Contractor in Dallas-Fort Worth',
  description: 'Patio covers, pergolas, concrete, stamped concrete, driveways, outdoor living, and remodeling in Dallas-Fort Worth. One in-house crew, permits handled, free estimates.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Services' }]} eyebrow="Services" title="What Structure1 builds" lead="Patio covers, pergolas, and concrete are the core. Outdoor living projects combine them. Every job includes drawings, engineering, permits, and a 2-year workmanship warranty." photo="gable-dfw" />
      <Section><ServiceGrid /></Section>
      <Section className="py-0"><TrustBar /></Section>
      <CTASection tone="offwhite" heading="Not sure which service fits?" text="Describe the space and what you want from it. We will recommend the right structure, finish, and sequence during a free on-site estimate." cta="Discuss Your Project" />
    </>
  );
}
```

- [ ] **Step 5: Service template** — `src/app/services/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import RelatedProjects from '@/components/sections/RelatedProjects';
import RelatedGuides from '@/components/sections/RelatedGuides';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/seo/JsonLd';
import { services, getService, projectsForService, faqsFor, cities, company, photos } from '@/content';

export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: { absolute: s.seo.title }, description: s.seo.description, alternates: { canonical: `/services/${s.slug}` }, openGraph: { images: [{ url: photos[s.hero].src, alt: photos[s.hero].alt }] } };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const projects = projectsForService(s.slug);
  const faqs = faqsFor(s.faqIds);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.seo.description,
    url: `${company.url}/services/${s.slug}`, image: `${company.url}${photos[s.hero].src}`,
    provider: { '@id': `${company.url}/#business` }, areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
  };
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: s.name }]} eyebrow="Services" title={`${s.name} in Dallas–Fort Worth`} lead={s.lead} photo={s.hero} />
      <Section className="pb-0">
        <div className="grid grid-cols-3 gap-3 md:gap-6">{s.gallery.map((id, i) => <Reveal key={id} delay={i * 60}><Photo id={id} ratio="4/3" sizes="33vw" /></Reveal>)}</div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7"><SectionHeader eyebrow="Overview" title={`${s.name} built for North Texas`} />
            <div className="mt-6 space-y-5 text-body text-gray-700">{s.overview.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <p className="text-eyebrow uppercase text-gray-500">Related services</p>
              <ul className="mt-4 space-y-2">{s.relatedServices.map((r) => { const rs = getService(r)!; return <li key={r}><Link href={`/services/${r}`} className="text-small font-medium hover:text-timber">{rs.name} →</Link></li>; })}</ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Options" title="Types and options" />
        <ul className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {s.options.map((o) => <li key={o.name} className="bg-white p-6"><h3 className="text-h3 font-display">{o.name}</h3><p className="mt-2 text-small text-gray-700">{o.blurb}</p>{o.range && <p className="mt-3 text-meta font-medium">{o.range}</p>}</li>)}
        </ul>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeader eyebrow="Why build it" title="Why homeowners choose it" />
            <ul className="mt-8 space-y-6">{s.reasons.map((r) => <li key={r.title}><h3 className="text-h3 font-display">{r.title}</h3><p className="mt-1.5 text-small text-gray-700">{r.blurb}</p></li>)}</ul>
          </div>
          <div><SectionHeader eyebrow="Construction" title="How we build it" />
            <ol className="mt-8 space-y-4">{s.construction.map((c, i) => <li key={i} className="flex gap-4 text-small text-gray-700"><span className="shrink-0 font-medium text-black">{String(i + 1).padStart(2, '0')}</span><span>{c}</span></li>)}</ol>
          </div>
        </div>
      </Section>
      {projects.length > 0 && <Section tone="offwhite"><RelatedProjects heading={`${s.name} projects`} projects={projects} /></Section>}
      <Section><div className="max-w-3xl"><FAQ items={faqs} heading={`${s.name}: questions, answered`} /></div></Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Areas served" title={`${s.name} across Dallas–Fort Worth`} />
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">{cities.map((c) => <li key={c.slug}><Link href={`/service-areas/${c.slug}`} className="text-small font-medium underline-offset-4 hover:text-timber hover:underline">{c.name}</Link></li>)}</ul>
      </Section>
      <Section><RelatedGuides topic={s.topic} /></Section>
      <CTASection heading={`Planning ${s.name.toLowerCase()}?`} text="Tell us about the space. We reply within one business day and walk the site with you before quoting." cta="Discuss Your Project" />
      <JsonLd data={schema} />
    </>
  );
}
```

Delete `src/app/services/patio-covers/page.tsx` and `src/app/services/concrete/page.tsx`.

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit && npx eslint . && for s in patio-covers pergolas concrete stamped-concrete driveways-walkways outdoor-living remodeling; do printf "%s " $s; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/services/$s; done && curl -s http://localhost:3000/services/pergolas | grep -c '"@type":"FAQPage"'
```

Expected: no errors; seven `200`s; `1`.

- [ ] **Step 7: Commit**

```bash
git add -A src/app/services src/components/layout/PageHero.tsx src/components/sections
git commit -m "feat(services): hub + data-driven service template for 7 services with FAQ, projects, guides, schema"
```

---
### Task 5: Projects hub and project case-study template

**Files:**
- Create: `src/components/sections/ProjectGallery.tsx` (replaces `src/components/projects/ProjectGallery.tsx`, which is deleted), `src/components/sections/ProjectFilters.tsx`
- Modify: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` (rewrites)
- Delete: `src/components/projects/ProjectGallery.tsx`, `src/components/projects/ProjectFilter.tsx`

**Interfaces:**
- Produces: `<ProjectGallery photos cover title>` (client lightbox), `<ProjectFilters service city>` (server, link-based).

- [ ] **Step 1: Failing check** — `curl -s "http://localhost:3000/projects?service=pergolas" | grep -c "Pergola with Back Wall"` → `0` (old page ignores the param).

- [ ] **Step 2: ProjectGallery (lightbox)**

`src/components/sections/ProjectGallery.tsx`:

```tsx
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos, type PhotoId } from '@/content/images';

export default function ProjectGallery({ ids, title }: { ids: PhotoId[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => { opener.current = el; setIndex(i); };
  const close = useCallback(() => { setIndex(null); opener.current?.focus(); }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + ids.length) % ids.length)), [ids.length]);

  useEffect(() => {
    if (index === null) return;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'Tab') { e.preventDefault(); } };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [index, close, step]);

  const cover = photos[ids[0]];
  return (
    <>
      <button type="button" onClick={(e) => open(0, e.currentTarget)} className="relative block w-full aspect-[16/9] overflow-hidden bg-gray-200" aria-label={`Open photo 1 of ${ids.length}: ${cover.alt}`}>
        <Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" quality={85} className="object-cover" />
      </button>
      {ids.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 md:grid-cols-6">
          {ids.slice(1).map((id, i) => (
            <li key={id}><button type="button" onClick={(e) => open(i + 1, e.currentTarget)} className="photo-hover relative block aspect-square w-full overflow-hidden bg-gray-200" aria-label={`Open photo ${i + 2} of ${ids.length}: ${photos[id].alt}`}>
              <Image src={photos[id].src} alt="" fill sizes="(max-width: 768px) 25vw, 200px" className="object-cover" />
            </button></li>
          ))}
        </ul>
      )}
      {index !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${title} photos`} className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { if (touchX.current !== null) { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); } touchX.current = null; }}>
          <button ref={closeBtn} type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center text-white hover:text-white/70"><X className="h-6 w-6" /></button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image src={photos[ids[index]].src} alt={photos[ids[index]].alt} fill sizes="100vw" quality={88} className="object-contain" />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-meta text-white/70">{index + 1} / {ids.length}</p>
          {ids.length > 1 && (<>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white hover:text-white/70"><ChevronLeft className="h-7 w-7" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white hover:text-white/70"><ChevronRight className="h-7 w-7" /></button>
          </>)}
        </div>
      )}
    </>
  );
}
```

(Tab is trapped by preventing default while the dialog is open; the three controls are reachable with the arrow keys and Escape, and the close button has initial focus. This keeps focus inside the dialog without a focus-trap library.)

- [ ] **Step 3: Filters and hub**

`src/components/sections/ProjectFilters.tsx`:

```tsx
import Link from 'next/link';
import { services } from '@/content/services';
import { cities } from '@/content/cities';
import { cn } from '@/lib/utils';

export default function ProjectFilters({ service, city }: { service?: string; city?: string }) {
  const href = (s?: string, c?: string) => { const q = new URLSearchParams(); if (s) q.set('service', s); if (c) q.set('city', c); const qs = q.toString(); return `/projects${qs ? `?${qs}` : ''}`; };
  const chip = (active: boolean) => cn('inline-flex h-10 items-center border px-4 text-sm font-medium transition-colors', active ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-700 hover:border-black hover:text-black');
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-2" aria-label="Filter by service">
        <li><Link href={href(undefined, city)} className={chip(!service)}>All</Link></li>
        {services.map((s) => <li key={s.slug}><Link href={href(s.slug, city)} className={chip(service === s.slug)}>{s.name}</Link></li>)}
      </ul>
      <ul className="flex flex-wrap gap-2" aria-label="Filter by city">
        <li><Link href={href(service, undefined)} className={chip(!city)}>All cities</Link></li>
        {cities.filter((c) => ['dallas', 'fort-worth', 'plano', 'mckinney'].includes(c.slug)).map((c) => <li key={c.slug}><Link href={href(service, c.slug)} className={chip(city === c.slug)}>{c.name}</Link></li>)}
      </ul>
    </div>
  );
}
```

`src/app/projects/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ProjectFilters from '@/components/sections/ProjectFilters';
import ProjectGrid from '@/components/sections/ProjectGrid';
import CTASection from '@/components/sections/CTASection';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Patio Cover, Pergola & Concrete Projects in Dallas-Fort Worth',
  description: 'Browse completed Structure1 projects across Dallas-Fort Worth: gable and lean-to patio covers, cedar pergolas, stamped concrete patios, and driveways.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage({ searchParams }: { searchParams: { service?: string; city?: string } }) {
  const { service, city } = searchParams;
  const list = projects.filter((p) => (!service || p.service === service) && (!city || p.city === city));
  return (
    <>
      <PageHero crumbs={[{ label: 'Projects' }]} eyebrow="Projects" title="Our work across Dallas–Fort Worth" lead="Real projects, photographed on site. Filter by service or city." photo="gable-mckinney-2" />
      <Section>
        <ProjectFilters service={service} city={city} />
        <div className="mt-12">
          {list.length > 0 ? <ProjectGrid projects={list} /> : <p className="text-body text-gray-700">No projects match that filter yet. <a href="/projects" className="font-medium underline underline-offset-4">Show all projects</a>.</p>}
        </div>
      </Section>
      <CTASection heading="Like what you see?" text="Every project starts with a free on-site estimate and an itemized quote." cta="Get an Estimate" />
    </>
  );
}
```

- [ ] **Step 4: Project template** — `src/app/projects/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import ProjectGallery from '@/components/sections/ProjectGallery';
import RelatedProjects from '@/components/sections/RelatedProjects';
import RelatedGuides from '@/components/sections/RelatedGuides';
import CTASection from '@/components/sections/CTASection';
import { projects, getProject, relatedProjects, getService, getCity, photos } from '@/content';

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const service = getService(p.service)!;
  return { title: `${p.title} in ${p.location}`, description: p.overview, alternates: { canonical: `/projects/${p.slug}` }, openGraph: { images: [{ url: photos[p.cover].src, alt: photos[p.cover].alt }] }, keywords: [service.name, p.location] };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const service = getService(p.service)!;
  const city = p.city ? getCity(p.city) : undefined;
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-8">
        <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: p.title }]} />
        <Eyebrow className="mt-8">{service.name}</Eyebrow>
        <h1 className="mt-3 text-h1 font-display">{p.title}</h1>
        <p className="mt-3 text-lead text-gray-700">{p.location}</p>
      </Section>
      <Section className="pt-0"><ProjectGallery ids={p.gallery} title={p.title} /></Section>
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2 font-display">Overview</h2>
            <p className="mt-5 text-body text-gray-700">{p.overview}</p>
            <dl className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
              <div className="bg-white p-6"><dt className="text-eyebrow uppercase text-gray-500">Scope of work</dt><dd><ul className="mt-3 space-y-2 text-small text-gray-700">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
              <div className="bg-white p-6"><dt className="text-eyebrow uppercase text-gray-500">Materials</dt><dd><ul className="mt-3 space-y-2 text-small text-gray-700">{p.materials.map((m) => <li key={m}>{m}</li>)}</ul></dd></div>
            </dl>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <dl className="space-y-4 text-small">
                <div><dt className="text-eyebrow uppercase text-gray-500">Service</dt><dd className="mt-1"><Link href={`/services/${service.slug}`} className="font-medium hover:text-timber">{service.name} →</Link></dd></div>
                <div><dt className="text-eyebrow uppercase text-gray-500">Location</dt><dd className="mt-1">{city ? <Link href={`/service-areas/${city.slug}`} className="font-medium hover:text-timber">{p.location} →</Link> : p.location}</dd></div>
                <div><dt className="text-eyebrow uppercase text-gray-500">Warranty</dt><dd className="mt-1">2-year workmanship</dd></div>
              </dl>
              <Link href="/estimate" className="mt-6 inline-flex h-12 w-full items-center justify-center bg-black text-sm font-medium text-white hover:bg-charcoal">Get an Estimate</Link>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite"><RelatedProjects heading="Related projects" projects={relatedProjects(p)} /></Section>
      <Section><RelatedGuides topic={service.topic} limit={2} /></Section>
      <CTASection heading="Planning something similar?" text="Send a few photos of your space and we will reply within one business day with next steps." cta="Get an Estimate" />
    </>
  );
}
```

Delete `src/components/projects/ProjectGallery.tsx` and `src/components/projects/ProjectFilter.tsx`.

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx eslint . && curl -s "http://localhost:3000/projects?service=pergolas" | grep -c "Pergola with Back Wall" && curl -s "http://localhost:3000/projects?service=concrete&city=plano" | grep -c "No projects match" && for s in classic-gable-patio-cover carport stamped-concrete-patio; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/projects/$s; done
```

Expected: `1`, `1`, three `200`s.

- [ ] **Step 6: Commit**

```bash
git add -A src/app/projects src/components/sections src/components/projects
git commit -m "feat(projects): filterable hub + case-study template with lightbox gallery"
```

---
### Task 6: Service Areas hub and city template (10 pages)

**Files:**
- Modify: `src/app/service-areas/page.tsx`, `src/app/service-areas/[city]/page.tsx` (rewrites)

- [ ] **Step 1: Failing check** — `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/service-areas/dallas` → `404`.

- [ ] **Step 2: Hub** — `src/app/service-areas/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Service Areas | Patio Covers & Concrete Across Dallas-Fort Worth',
  description: 'Structure1 builds patio covers, pergolas, and concrete in Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, Allen, Carrollton, Flower Mound, Prosper, and 20+ DFW cities.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Service Areas' }]} eyebrow="Service areas" title="Serving Dallas–Fort Worth" lead="Based in Dallas and building across the metroplex. Pick your city for local projects, permit notes, and reviews." photo="pergola-fort-worth" />
      <Section><ServiceAreaGrid /></Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Permits" title="Permits handled in every city" text="Nearly every DFW city requires a building permit for a patio cover or pergola, and most HOAs require architectural approval. We prepare the drawings, submit both packages, and schedule inspections on every project." />
      </Section>
      <CTASection heading="Not sure if we cover your block?" text="Ask. If your home is within about 50 miles of Dallas, we almost certainly build there." />
    </>
  );
}
```

- [ ] **Step 3: City template** — `src/app/service-areas/[city]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import ProjectGrid from '@/components/sections/ProjectGrid';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import RelatedGuides from '@/components/sections/RelatedGuides';
import CTASection from '@/components/sections/CTASection';
import Button from '@/components/ui/Button';
import { cities, getCity, services, projectsForCity, featuredProjects, testimonialsForCity, cityFaqs, company, photos } from '@/content';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() { return cities.map((c) => ({ city: c.slug })); }

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const c = getCity(params.city);
  if (!c) return {};
  return { title: { absolute: c.seo.title }, description: c.seo.description, alternates: { canonical: `/service-areas/${c.slug}` }, openGraph: { images: [{ url: photos[c.hero].src, alt: photos[c.hero].alt }] } };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const c = getCity(params.city);
  if (!c) notFound();
  const local = projectsForCity(c.slug);
  const nearby = local.length === 0 ? featuredProjects(3) : [];
  const reviews = testimonialsForCity(c.slug);
  const faqs = cityFaqs(c);
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: `Patio covers, pergolas & concrete in ${c.name}, TX`, provider: { '@id': `${company.url}/#business` }, areaServed: { '@type': 'City', name: c.name }, url: `${company.url}/service-areas/${c.slug}` };
  return (
    <>
      <PageHero crumbs={[{ label: 'Service Areas', href: '/service-areas' }, { label: c.name }]} eyebrow={`${c.name} · ${c.county}`} title={`Patio Covers, Pergolas & Concrete in ${c.name}, TX`} lead={c.intro[0]} photo={c.hero} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Local" title={`Building in ${c.name}`} />
            <div className="mt-6 space-y-5 text-body text-gray-700">{c.intro.slice(1).map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <p className="text-eyebrow uppercase text-gray-500">Services in {c.name}</p>
              <ul className="mt-4 space-y-2">{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-small font-medium hover:text-timber">{s.name} →</Link></li>)}</ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Projects" title={local.length > 0 ? `Our work in ${c.name}` : 'Recent work nearby'} text={local.length > 0 ? undefined : `We have not published a ${c.name} project yet. These recent DFW builds show the same crew, materials, and standard.`} />
          <Button href="/projects" variant="link" arrow>View all projects</Button>
        </div>
        <div className="mt-12"><ProjectGrid projects={local.length > 0 ? local : nearby} /></div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeader eyebrow="Permits & HOA" title={`Permits in ${c.name}`} /><p className="mt-6 text-body text-gray-700">{c.permitNote}</p></div>
          <div><SectionHeader eyebrow="Neighborhoods" title="Where we build" /><ul className="mt-6 flex flex-wrap gap-2">{c.neighborhoods.map((n) => <li key={n} className="border border-gray-200 px-3 py-1.5 text-small text-gray-700">{n}</li>)}</ul></div>
        </div>
      </Section>
      {reviews.length > 0 && <Section tone="offwhite"><SectionHeader eyebrow="Reviews" title={`What ${c.name} homeowners say`} /><div className="mt-12"><Testimonials items={reviews} /></div></Section>}
      <Section><div className="max-w-3xl"><FAQ items={faqs} heading={`${c.name} questions, answered`} /></div></Section>
      <Section tone="offwhite"><RelatedGuides topic="planning" /></Section>
      <CTASection heading={`Ready to build in ${c.name}?`} text="Free on-site estimate, itemized quote, permits included." cta={`Get a Free Estimate in ${c.name}`} />
      <JsonLd data={schema} />
    </>
  );
}
```

- [ ] **Step 4: Verify (includes Review Focus 4)**

```bash
npx tsc --noEmit && npx eslint . && for c in dallas fort-worth plano frisco mckinney arlington allen carrollton flower-mound prosper; do printf "%s " $c; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/service-areas/$c; done && curl -s http://localhost:3000/service-areas/prosper | grep -c "Recent work nearby" && curl -s http://localhost:3000/service-areas/dallas | grep -c "Our work in Dallas"
```

Expected: ten `200`s; `1`; `1`.

- [ ] **Step 5: Commit**

```bash
git add -A src/app/service-areas
git commit -m "feat(service-areas): hub + city template for 10 cities with local projects, permits, FAQs, reviews"
```

---
### Task 7: Estimate, Process, Contact, About, legal, 404, thank-you

**Files:**
- Create: `src/components/forms/EstimateForm.tsx` (replaces the old file at the same path), `src/app/estimate/page.tsx`, `src/app/process/page.tsx`
- Modify: `src/app/contact/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx`, `src/app/thank-you/page.tsx`, `public/__forms.html`

- [ ] **Step 1: Failing check** — `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/estimate` → `404`.

- [ ] **Step 2: Netlify hidden form** — replace `public/__forms.html`:

```html
<html>
  <head><title>Forms</title></head>
  <body>
    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data" hidden>
      <input type="hidden" name="form-name" value="contact" />
      <input name="bot-field" />
      <input name="name" type="text" />
      <input name="phone" type="tel" />
      <input name="email" type="email" />
      <input name="city" type="text" />
      <input name="service" type="text" />
      <input name="timeline" type="text" />
      <input name="message" type="text" />
      <input name="photos" type="file" multiple />
      <input name="contactMethod" type="text" />
      <input name="referralSource" type="text" />
      <input name="subject" type="text" />
    </form>
  </body>
</html>
```

- [ ] **Step 3: EstimateForm** — `src/components/forms/EstimateForm.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { services } from '@/content/services';
import { company } from '@/content/company';

const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', 'Just planning'];
const field = 'h-12 w-full rounded border border-gray-200 bg-white px-4 text-body text-black placeholder:text-gray-500 focus:border-timber focus:outline-none';
const label = 'mb-1.5 block text-meta font-medium text-gray-700';

export default function EstimateForm({ cta = 'Request My Estimate' }: { cta?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!String(data.get('name')).trim() || !String(data.get('phone')).trim() || !String(data.get('email')).trim() || !String(data.get('city')).trim() || !String(data.get('service'))) {
      setError('Please fill in your name, phone, email, city, and project type.');
      return;
    }
    data.set('subject', `New Estimate Lead: ${data.get('name')} — ${data.get('service')}`);
    data.set('referralSource', 'website');
    setState('sending'); setError(null);
    try {
      const res = await fetch('/__forms.html', { method: 'POST', body: data });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
    } catch {
      setState('error');
      setError(`Something went wrong. Call ${company.phone} and we will help directly.`);
    }
  };

  if (state === 'sent') {
    return (
      <div className="border border-gray-200 p-8 text-center" role="status">
        <Check className="mx-auto h-8 w-8" aria-hidden />
        <h2 className="mt-4 text-h2 font-display">Request received</h2>
        <p className="mt-3 text-body text-gray-700">We will reach out within one business day. For urgent projects, call <a href={`tel:${company.phoneRaw}`} className="font-medium underline underline-offset-4">{company.phone}</a>.</p>
      </div>
    );
  }

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" encType="multipart/form-data" onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden"><label>Leave this empty: <input name="bot-field" /></label></p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="ef-name" className={label}>Name <span className="text-timber">*</span></label><input id="ef-name" name="name" type="text" autoComplete="name" required className={field} /></div>
        <div><label htmlFor="ef-phone" className={label}>Phone <span className="text-timber">*</span></label><input id="ef-phone" name="phone" type="tel" autoComplete="tel" required className={field} /></div>
        <div><label htmlFor="ef-email" className={label}>Email <span className="text-timber">*</span></label><input id="ef-email" name="email" type="email" autoComplete="email" required className={field} /></div>
        <div><label htmlFor="ef-city" className={label}>Project address or city <span className="text-timber">*</span></label><input id="ef-city" name="city" type="text" autoComplete="address-level2" required placeholder="Frisco, Plano, Dallas…" className={field} /></div>
        <div><label htmlFor="ef-service" className={label}>Project type <span className="text-timber">*</span></label>
          <select id="ef-service" name="service" required defaultValue="" className={field}>
            <option value="" disabled>Select a project type</option>
            {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Other">Other</option>
          </select></div>
        <div><label htmlFor="ef-timeline" className={label}>Timeline</label>
          <select id="ef-timeline" name="timeline" defaultValue="" className={field}>
            <option value="">When would you like to start?</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select></div>
        <div className="sm:col-span-2"><label htmlFor="ef-message" className={label}>Project description</label><textarea id="ef-message" name="message" rows={4} placeholder="Size, style, what you want to use the space for — anything that helps us prepare." className={`${field} h-auto py-3`} /></div>
        <div className="sm:col-span-2"><label htmlFor="ef-photos" className={label}>Photos of the space (optional)</label><input id="ef-photos" name="photos" type="file" accept="image/*" multiple className="block w-full text-small text-gray-700 file:mr-4 file:h-10 file:border file:border-gray-200 file:bg-white file:px-4 file:text-sm file:font-medium" /></div>
      </div>
      {error && <p className="border border-red-300 bg-red-50 px-4 py-3 text-small text-red-700" role="alert" aria-live="polite">{error}</p>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === 'sending'} className="inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-white hover:bg-charcoal disabled:opacity-60">
          {state === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</> : cta}
        </button>
        <p className="text-meta text-gray-500">We reply within one business day. No spam, no obligation.</p>
      </div>
    </form>
  );
}
```

- [ ] **Step 4: Estimate and Process pages**

`src/app/estimate/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EstimateForm from '@/components/forms/EstimateForm';
import { company } from '@/content/company';
import { trust } from '@/content/trust';

export const metadata: Metadata = {
  title: 'Get a Free Estimate | Patio Covers & Concrete in Dallas-Fort Worth',
  description: 'Request a free, itemized estimate for a patio cover, pergola, or concrete project in Dallas-Fort Worth. We reply within one business day.',
  alternates: { canonical: '/estimate' },
};

export default function EstimatePage() {
  return (
    <Section className="pt-28 md:pt-36">
      <Breadcrumbs items={[{ label: 'Get a Free Estimate' }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-h1 font-display">Get a free estimate</h1>
          <p className="mt-4 max-w-xl text-lead text-gray-700">Tell us about the project. We reply within one business day with next steps, then walk the site with you before quoting. No obligation.</p>
          <div className="mt-10"><EstimateForm /></div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-gray-200 p-6">
            <h2 className="text-eyebrow uppercase text-gray-500">Prefer to talk?</h2>
            <p className="mt-3 text-body"><a href={`tel:${company.phoneRaw}`} className="font-medium hover:text-timber">{company.phone}</a></p>
            <p className="mt-1 text-small text-gray-700"><a href={`mailto:${company.email}`} className="break-all hover:text-timber">{company.email}</a></p>
            <p className="mt-1 text-small text-gray-700">{company.hours}</p>
          </div>
          <ul className="mt-6 space-y-3 text-small text-gray-700">{trust.slice(0, 4).map((t) => <li key={t.label} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden /><span><span className="font-medium text-black">{t.label}.</span> {t.detail}</span></li>)}</ul>
        </aside>
      </div>
    </Section>
  );
}
```

`src/app/process/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ProcessSteps from '@/components/sections/ProcessSteps';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import { faqsFor } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'Our Process | From Estimate to Final Walk-Through',
  description: 'How a Structure1 project works: free estimate, design and drawings, permits handled, in-house build. Two to four weeks end to end for most patio covers.',
  alternates: { canonical: '/process' },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Our Process' }]} eyebrow="Process" title="From first call to final walk-through" lead="Four steps, one project manager, no surprise change orders." photo="gable-mckinney-build" />
      <Section><ProcessSteps /></Section>
      <Section tone="offwhite"><div className="max-w-3xl"><FAQ items={faqsFor(['plan-start', 'pc-timeline', 'pc-permits', 'plan-payment', 'plan-warranty'])} heading="Planning questions" /></div></Section>
      <CTASection heading="Ready to start?" text="Step one is a free estimate. We reply within one business day." cta="Start Your Project" />
    </>
  );
}
```

- [ ] **Step 5: Contact, About, legal, 404, thank-you**

`src/app/contact/page.tsx`:

```tsx
import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import EstimateForm from '@/components/forms/EstimateForm';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Structure1 Construction. Free estimates, one-business-day replies, serving the Dallas-Fort Worth metroplex.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Talk to a builder" lead="Call, email, or send the form. We reply within one business day." photo="leanto-forney-2" />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7"><h2 className="text-h2 font-display">Send a few details</h2><div className="mt-8"><EstimateForm cta="Send My Project" /></div></div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-gray-200 border-y border-gray-200 text-small">
              <div className="py-4"><dt className="text-eyebrow uppercase text-gray-500">Phone</dt><dd className="mt-1"><a href={`tel:${company.phoneRaw}`} className="text-body font-medium hover:text-timber">{company.phone}</a></dd></div>
              <div className="py-4"><dt className="text-eyebrow uppercase text-gray-500">Email</dt><dd className="mt-1"><a href={`mailto:${company.email}`} className="break-all hover:text-timber">{company.email}</a></dd></div>
              <div className="py-4"><dt className="text-eyebrow uppercase text-gray-500">Office</dt><dd className="mt-1 text-gray-700">{company.address.street}<br />{company.address.city}, {company.address.state} {company.address.zip}</dd></div>
              <div className="py-4"><dt className="text-eyebrow uppercase text-gray-500">Hours</dt><dd className="mt-1 text-gray-700">{company.hours}</dd></div>
              <div className="py-4"><dt className="text-eyebrow uppercase text-gray-500">Service area</dt><dd className="mt-1 text-gray-700">Dallas–Fort Worth metroplex, about 50 miles from Dallas</dd></div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
```

`src/app/about/page.tsx` keeps its existing copy (story paragraphs, four values, five milestones, three stats) and is restructured as: `PageHero` (crumbs About, eyebrow "About Structure1", title "Builders who care about what comes after.", lead = the existing description, photo `pergola-midlothian`) → Section with the two story paragraphs beside `<Photo id="pergola-plano-complete" ratio="3/4">` → `Section tone="offwhite"` values in the same `grid gap-px border` pattern as `why` on the home page (no icons) → `Section` with `<TrustBar />` → `Section tone="offwhite"` milestones as a simple list (year in `font-display text-h3`, title, description, hairline between) → `<CTASection />`. Remove the `lucide-react` value icons and the stats band (the stats already appear in TrustBar).

`src/app/privacy/page.tsx` and `src/app/terms/page.tsx`: keep every paragraph; wrap in `<Section className="pt-28 md:pt-36"><Breadcrumbs …/><h1 className="mt-8 text-h1 font-display">…</h1><div className="prose-article mt-8">…</div></Section>`; remove all old color classes.

`src/app/not-found.tsx`:

```tsx
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section className="pt-32 md:pt-44 min-h-[70vh]">
      <p className="text-eyebrow uppercase text-gray-500">Error 404</p>
      <h1 className="mt-4 text-h1 font-display">Page not found</h1>
      <p className="mt-4 max-w-md text-lead text-gray-700">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Button href="/">Back to home</Button><Button href="/projects" variant="secondary">View projects</Button><Button href="/estimate" variant="link" arrow>Get a Free Estimate</Button></div>
    </Section>
  );
}
```

`src/app/thank-you/page.tsx`: keep `metadata` (incl. `robots: { index: false, follow: true }`) and the copy; restyle as `Section className="pt-32 md:pt-44"` with `h1 "Thanks for reaching out. We're on it."`, paragraph, and two Buttons (`Call {phone}` primary via `href="tel:…"` rendered as an `<a className>` since Button's href goes through `Link`; use `<a href={`tel:${company.phoneRaw}`} className="inline-flex h-12 items-center bg-black px-6 text-sm font-medium text-white">`, and `Button href="/projects" variant="secondary"`).

- [ ] **Step 6: Verify (includes Review Focus 1 form contract)**

```bash
npx tsc --noEmit && npx eslint . && for r in estimate process contact about privacy terms thank-you nope-404; do printf "%s " $r; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/$r; done
grep -c 'enctype="multipart/form-data"' public/__forms.html; grep -cE 'name="(name|phone|email|city|service|timeline|message|photos)"' public/__forms.html
grep -c 'encType="multipart/form-data"' src/components/forms/EstimateForm.tsx; grep -c 'name="photos"' src/components/forms/EstimateForm.tsx
```

Expected: seven `200`s and one `404`; `1`, `8`, `1`, `1`.

- [ ] **Step 7: Commit**

```bash
git add -A src/app/estimate src/app/process src/app/contact src/app/about src/app/privacy src/app/terms src/app/not-found.tsx src/app/thank-you src/components/forms/EstimateForm.tsx public/__forms.html
git commit -m "feat(pages): estimate form with photo upload, process, contact, about, legal, 404, thank-you"
```

---
### Task 8: Resources hub and article template

**Files:**
- Modify: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` (rewrites)
- Modify: `src/components/blog/TableOfContents.tsx` (token swap only), `src/components/blog/RelatedPosts.tsx` (rewrite on ArticleCard)
- Delete: `src/components/blog/BlogCTA.tsx` (CTASection replaces it)

- [ ] **Step 1: Failing check** — `curl -s http://localhost:3000/blog | grep -c "Homeowner guides"` → `0`.

- [ ] **Step 2: Hub** — `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ArticleCard from '@/components/sections/ArticleCard';
import CTASection from '@/components/sections/CTASection';
import { getAllPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Resources | Homeowner Guides for DFW Patio Covers & Concrete',
  description: 'Cost guides, permit how-tos, material comparisons, and design ideas for patio covers, pergolas, and concrete in Dallas-Fort Worth.',
  alternates: { canonical: '/blog' },
};

const TOPICS = [{ slug: 'all', label: 'All' }, { slug: 'patio-covers', label: 'Patio Covers' }, { slug: 'pergolas', label: 'Pergolas' }, { slug: 'concrete', label: 'Concrete' }, { slug: 'planning', label: 'Planning & Permits' }];

export default function ResourcesPage({ searchParams }: { searchParams: { topic?: string } }) {
  const topic = searchParams.topic ?? 'all';
  const posts = getAllPosts().filter((p) => topic === 'all' || p.topic === topic || (topic === 'concrete' && ['stamped-concrete', 'driveways-walkways'].includes(p.topic)));
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources' }]} eyebrow="Resources" title="Homeowner guides for DFW projects" lead="Costs, permits, materials, timelines, and design ideas, written by the crew that builds the work." photo="gable-mckinney-ceiling" />
      <Section>
        <ul className="flex flex-wrap gap-2" aria-label="Filter by topic">
          {TOPICS.map((t) => <li key={t.slug}><Link href={t.slug === 'all' ? '/blog' : `/blog?topic=${t.slug}`} className={cn('inline-flex h-10 items-center border px-4 text-sm font-medium transition-colors', topic === t.slug ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-700 hover:border-black hover:text-black')}>{t.label}</Link></li>)}
        </ul>
        {posts.length > 0 ? (
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p, i) => <li key={p.slug}><ArticleCard post={p} priority={i === 0} /></li>)}</ul>
        ) : <p className="mt-12 text-body text-gray-700">No guides on that topic yet. <Link href="/blog" className="font-medium underline underline-offset-4">See all guides</Link>.</p>}
      </Section>
      <CTASection tone="offwhite" heading="Have a question the guides didn't answer?" text="Ask us directly. Free estimates include a site visit and straight answers." />
    </>
  );
}
```

- [ ] **Step 3: Article** — `src/app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { getAllPostSlugs, getPostWithHtml, getRelatedPosts } from '@/lib/blog';
import { getService, company } from '@/content';

export function generateStaticParams() { return getAllPostSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostWithHtml(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, keywords: post.keywords, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', publishedTime: post.date, modifiedTime: post.lastModified, images: [{ url: post.featuredImage, alt: post.featuredImageAlt }] } };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostWithHtml(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, post.category, 3);
  const service = getService(post.topic);
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, image: `${company.url}${post.featuredImage}`, datePublished: post.date, dateModified: post.lastModified ?? post.date, author: { '@type': 'Organization', name: company.name }, publisher: { '@id': `${company.url}/#business` }, mainEntityOfPage: `${company.url}/blog/${post.slug}` };
  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-8">
        <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: post.title }]} />
        <Eyebrow className="mt-8">{post.category} · {date} · {post.readTime}</Eyebrow>
        <h1 className="mt-4 max-w-4xl text-h1 font-display">{post.title}</h1>
        <p className="mt-4 max-w-2xl text-lead text-gray-700">{post.excerpt}</p>
      </Section>
      <Section className="pt-0 pb-8"><div className="relative aspect-[21/9] overflow-hidden bg-gray-200"><Image src={post.featuredImage} alt={post.featuredImageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" /></div></Section>
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3"><div className="lg:sticky lg:top-28"><TableOfContents headings={post.headings ?? []} />{service && <div className="mt-8 border border-gray-200 p-5"><p className="text-eyebrow uppercase text-gray-500">Related service</p><Link href={`/services/${service.slug}`} className="mt-2 block text-small font-medium hover:text-timber">{service.name} →</Link></div>}</div></aside>
          <article className="order-1 lg:order-2 lg:col-span-8 lg:col-start-5"><div className="prose-article" dangerouslySetInnerHTML={{ __html: post.htmlContent ?? '' }} /></article>
        </div>
      </Section>
      <Section tone="offwhite"><RelatedPosts posts={related} /></Section>
      <CTASection heading="Ready to plan your project?" text="Every guide ends the same way: with a free on-site estimate and an itemized quote." />
      <JsonLd data={schema} />
    </>
  );
}
```

Check the current `TableOfContents` props before editing: it takes `headings`; keep its API, replace color classes with `text-gray-700`, `hover:text-timber`, active `text-black font-medium`, rule `border-gray-200`.

`src/components/blog/RelatedPosts.tsx`:

```tsx
import SectionHeader from '@/components/sections/SectionHeader';
import ArticleCard from '@/components/sections/ArticleCard';
import type { BlogPost } from '@/lib/blog';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (<><SectionHeader eyebrow="Keep reading" title="Related guides" /><ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <li key={p.slug}><ArticleCard post={p} /></li>)}</ul></>);
}
```

Delete `src/components/blog/BlogCTA.tsx`.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx eslint . && curl -s "http://localhost:3000/blog?topic=planning" | grep -c "Permit for a Patio Cover" && curl -s http://localhost:3000/blog/patio-cover-cost-dallas-fort-worth | grep -c '"@type":"Article"'
```

Expected: `1`, `1`.

- [ ] **Step 5: Commit**

```bash
git add -A src/app/blog src/components/blog
git commit -m "feat(resources): topic-filtered hub + article template with TOC, related service, schema"
```

---
### Task 9: Cleanup, dependencies, sitemap, llms.txt, Netlify config

**Files:**
- Delete: `src/components/home/*` except `Hero.tsx`; `src/components/ui/{AnimatedNumber,AnimatedSection,AnimatedText,Button(old),Counter,FloatingCTA,FloatingPhone,MagneticButton,ProjectCard,RotatingBadge,ScrollProgress,ServiceCard}.tsx` — note `ui/Button.tsx` and `ui/Reveal.tsx` were overwritten in Task 2 and stay; `src/components/services/*`; `src/components/forms/ContactForm.tsx`; `src/components/layout/{SmoothScroll,Navbar}.tsx`; `src/components/seo/{BreadcrumbSchema,ServiceSchema,StructuredData}.tsx`; `src/lib/{data,city-data,faq-data,animations}.ts`
- Modify: `package.json` (remove `framer-motion`, `lenis`, `@studio-freight/react-lenis`), `src/app/sitemap.ts`, `public/llms.txt`, `netlify.toml`, `src/components/seo/StructuredData.tsx` is deleted (LocalBusiness now lives in `layout.tsx`)

- [ ] **Step 1: Failing check** — `grep -rl "framer-motion\|@/lib/data" src | wc -l` → greater than `0`.

- [ ] **Step 2: Delete and uninstall**

```bash
git rm -rq src/components/services src/components/forms/ContactForm.tsx src/components/layout/SmoothScroll.tsx src/components/layout/Navbar.tsx src/components/seo/BreadcrumbSchema.tsx src/components/seo/ServiceSchema.tsx src/components/seo/StructuredData.tsx src/lib/data.ts src/lib/city-data.ts src/lib/faq-data.ts src/lib/animations.ts
git rm -q src/components/home/CTASection.tsx src/components/home/CommitmentBlock.tsx src/components/home/ContactSection.tsx src/components/home/FAQSection.tsx src/components/home/FeaturedProjects.tsx src/components/home/InlineEstimate.tsx src/components/home/PortfolioSection.tsx src/components/home/Process.tsx src/components/home/RecentProjectsStrip.tsx src/components/home/RecentWork.tsx src/components/home/ServiceAreaSection.tsx src/components/home/ServicesGrid.tsx src/components/home/ServicesSection.tsx src/components/home/Testimonials.tsx src/components/home/TrustStrip.tsx src/components/home/WhyUs.tsx
git rm -q src/components/ui/AnimatedNumber.tsx src/components/ui/AnimatedSection.tsx src/components/ui/AnimatedText.tsx src/components/ui/Counter.tsx src/components/ui/FloatingCTA.tsx src/components/ui/FloatingPhone.tsx src/components/ui/MagneticButton.tsx src/components/ui/ProjectCard.tsx src/components/ui/RotatingBadge.tsx src/components/ui/ScrollProgress.tsx src/components/ui/ServiceCard.tsx
npm uninstall framer-motion lenis @studio-freight/react-lenis
grep -rlE "framer-motion|lenis|@/lib/data|@/lib/city-data|@/lib/faq-data|components/home/(?!Hero)" src ; echo "exit $?"
```

Expected: last grep prints nothing (`exit 1`). If `ls src/components/home` shows anything besides `Hero.tsx`, delete it too.

- [ ] **Step 3: Sitemap** — `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { services, projects, cities, company } from '@/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page('', 1, 'weekly'), page('/services', 0.9), page('/projects', 0.9, 'weekly'), page('/service-areas', 0.8), page('/estimate', 0.9), page('/process', 0.7),
    page('/about', 0.6), page('/contact', 0.7), page('/blog', 0.8, 'weekly'), page('/privacy', 0.2), page('/terms', 0.2),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    ...cities.map((c) => page(`/service-areas/${c.slug}`, 0.8)),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.6)),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.lastModified || p.date), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
```

- [ ] **Step 4: llms.txt** — read `public/llms.txt`; in its page list add the five new service URLs, five new city URLs, `/estimate`, and `/process` with one-line descriptions matching each page's `seo.description`. Keep everything else.

- [ ] **Step 5: Netlify** — in `netlify.toml` set `NODE_VERSION = "20"`. No other change.

- [ ] **Step 6: Repo-wide grep gates**

```bash
npx tsc --noEmit && npx eslint .
grep -rnE "gold|parchment|rich-black|accent-warm|grain-overlay|useScroll|useTransform|framer-motion|lenis|font-heading|italic" src ; echo "exit $?"
grep -rnE "rounded-(md|lg|xl|2xl|3xl|full)|shadow-(sm|md|lg|xl|2xl|card|heavy)" src | grep -v StickyBar ; echo "exit $?"
grep -rn "text-timber\|border-timber" src | grep -vE "Header.tsx|EstimateForm.tsx|hover:text-timber|focus:border-timber" ; echo "exit $?"
```

Expected: all three greps print nothing and `exit 1`. (`rounded` with no suffix is allowed only on form fields: `rounded` = 4px.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove legacy components/data, drop framer-motion + lenis, regenerate sitemap, update llms.txt, Node 20"
```

---
### Task 10: Verification crawler, production build, screenshots, review

**Files:**
- Create: `scripts/site-check.mjs`
- Modify: `package.json` (add `playwright-core` devDependency; add script `"check": "node scripts/site-check.mjs"`)
- Output (outside repo): `../_site-check/shots/<viewport>/*.png`, `../_site-check/report.json`

- [ ] **Step 1: Install playwright-core**

```bash
npm install --save-dev playwright-core@1.47.2
```

- [ ] **Step 2: Crawler** — `scripts/site-check.mjs`:

```js
// node scripts/site-check.mjs [--base http://localhost:3000] [--no-shots]
// Reads /sitemap.xml, visits every URL + /estimate, /process, and a 404 route; follows every same-origin link once;
// asserts: status 200 (404 for the 404 route), exactly one h1, a canonical link, JSON-LD present (except 404),
// no console errors, no hydration warnings, no horizontal overflow; screenshots at 5 viewports.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const argv = (k, d) => { const i = args.indexOf(k); return i === -1 ? d : args[i + 1]; };
const NO_SHOTS = args.includes('--no-shots');
const OUT = path.resolve('..', '_site-check');
const VIEWPORTS = [['1920', 1920, 1080], ['1440', 1440, 900], ['1280', 1280, 800], ['768', 768, 1024], ['390', 390, 844]];

async function up(u) { try { const r = await fetch(u, { signal: AbortSignal.timeout(3000) }); return r.status < 500; } catch { return false; } }
async function server() {
  const pref = argv('--base', 'http://localhost:3000');
  if (await up(pref)) return { base: pref, child: null };
  const child = spawn('npx', ['next', 'dev', '-p', '3100'], { shell: true, stdio: 'ignore' });
  for (let i = 0; i < 120; i++) { if (await up('http://localhost:3100')) return { base: 'http://localhost:3100', child }; await new Promise((r) => setTimeout(r, 1000)); }
  throw new Error('no server');
}
const stop = (c) => { if (!c) return; process.platform === 'win32' ? spawnSync('taskkill', ['/PID', String(c.pid), '/T', '/F'], { stdio: 'ignore' }) : c.kill(); };

const { base, child } = await server();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const fromSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seeds = [...new Set([...fromSitemap, '/estimate', '/process', '/projects?service=pergolas', '/blog?topic=planning'])];
const queue = [...seeds];
const seen = new Set(queue);
const results = [];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error' || /hydrat/i.test(m.text())) consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push(String(e)));

while (queue.length) {
  const route = queue.shift();
  consoleErrors.length = 0;
  const res = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
  const status = res?.status() ?? 0;
  const info = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    canonical: Boolean(document.querySelector('link[rel="canonical"]')),
    jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h && h.startsWith('/') && !h.startsWith('//')),
  }));
  for (const l of info.links) { const p = l.split('#')[0]; if (p && !seen.has(p)) { seen.add(p); queue.push(p); } }
  const problems = [];
  if (status !== 200) problems.push(`status ${status}`);
  if (info.h1 !== 1) problems.push(`h1 count ${info.h1}`);
  if (!info.canonical) problems.push('no canonical');
  if (info.jsonld === 0) problems.push('no JSON-LD');
  if (info.overflow > 0) problems.push(`overflow +${info.overflow}px @1440`);
  if (consoleErrors.length) problems.push(`console: ${consoleErrors.slice(0, 2).join(' | ')}`);
  results.push({ route, status, problems });
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${route}${problems.length ? '  ' + problems.join('; ') : ''}`);
}
// deliberate 404
const r404 = await page.goto(`${base}/this-page-does-not-exist`, { waitUntil: 'networkidle' });
const h1404 = await page.evaluate(() => document.querySelectorAll('h1').length);
results.push({ route: '/this-page-does-not-exist', status: r404?.status(), problems: r404?.status() === 404 && h1404 === 1 ? [] : [`404 route status ${r404?.status()} h1 ${h1404}`] });
await ctx.close();

if (!NO_SHOTS) {
  for (const [label, w, h] of VIEWPORTS) {
    const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const p = await c.newPage();
    const dir = path.join(OUT, 'shots', label);
    await fs.mkdir(dir, { recursive: true });
    for (const route of seeds) {
      await p.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
      await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 0) { results.push({ route, status: 200, problems: [`overflow +${over}px @${label}`] }); console.log(`FAIL ${route} overflow +${over}px @${label}`); }
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
```

Add to `package.json` scripts: `"check": "node scripts/site-check.mjs"`.

- [ ] **Step 3: Run the crawler against the dev server (fast, no screenshots)**

```bash
npm run check -- --no-shots 2>&1 | tail -60
```

Expected: every route `ok`, `… 0 with problems`. Fix anything reported in the owning file and re-run.

- [ ] **Step 4: Full run with screenshots (Review Focus 5)**

```bash
npm run check 2>&1 | tail -20
```

Expected: `shots @1920 … @390 done`, `0 with problems`. Then open `../_site-check/shots/390/home.png`, `services_patio-covers.png`, `projects_classic-gable-patio-cover.png`, `service-areas_prosper.png`, `estimate.png`, and the same five at `1440`, with the Read tool and confirm: header and sticky bar correct, no empty photo boxes, no text over busy photo areas, consistent spacing, form fields full width on mobile.

- [ ] **Step 5: Production build**

Stop the dev server first (ask the owner, or if this session started it, stop the background task), confirm nothing listens on :3000, then:

```bash
npm run build 2>&1 | tail -40
```

Expected: build succeeds; route list shows `/services/[slug]` (7), `/service-areas/[city]` (10), `/projects/[slug]` (9), `/blog/[slug]` (8) as static (●/○), `/projects` and `/blog` as dynamic (ƒ) because they read `searchParams`.

- [ ] **Step 6: Crawl the production server, then restart dev for the owner**

```bash
npx next start -p 3000 &
sleep 5 && npm run check -- --no-shots 2>&1 | tail -8
# then stop `next start` (taskkill its PID) and run `npm run dev` in the background again
```

Expected: `0 with problems`.

- [ ] **Step 7: Push and hand off the two manual checks**

```bash
git add -A
git commit -m "chore: site-check crawler + screenshots"
git push -u origin feat/site-upgrade
```

Tell the owner: (1) open the Netlify deploy preview for `feat/site-upgrade`, submit the estimate form once with a photo attached, and confirm it appears under Netlify → Forms → contact (Review Focus 1); (2) tab through the header, Services menu, mobile sheet, and a project lightbox with the keyboard; (3) merge into `main` when satisfied. List the owner-side items from spec §12.

---

## Self-review notes

- **Spec coverage:** §4 IA/nav → Tasks 2, 9 (sitemap); §4.2 routes → Tasks 3–8; §4.3 generated linking → `relatedProjects`, `projectsForService`, `projectsForCity`, `getPostsByTopic` (Task 1) consumed in Tasks 4–8; §5 content model → Task 1; §6 design system → Task 2; §7 components → Tasks 2–5; §8 templates → Tasks 3–8; §9 SEO → `JsonLd` + `Breadcrumbs` (Task 2), Service/FAQ/Article schema (Tasks 4, 6, 8), sitemap/llms (Task 9); §10 performance → Task 1 images, Task 9 dependency removal, `next/font` in Task 2; §11 verification → Task 10; §12 owner items → Task 10 handoff.
- **Deviations from spec, deliberate:** `Photo` type has no `width/height` (every slot uses `fill` inside a fixed-ratio box, so dimensions are unnecessary); the PNG→JPG rename changes three image filenames (never linked externally; the catalog is the only reference); the carport project is filed under Remodeling & New Builds so that service has one real project; the "Stamped Concrete" project title becomes "Stamped Concrete Patio" (slug unchanged).
- **Type consistency:** `Photo` props (`id, ratio, sizes, priority, hover, className`) are used identically in Tasks 3–8; `Section` (`tone, id, className`), `Button` (`href, variant, tone, arrow`), `SectionHeader` (`eyebrow, title, text, tone, align, as`), `CTASection` (`id, tone, heading, text, cta`), `FAQ` (`items, heading`), `RelatedProjects` (`projects, heading, text, eyebrow`), `RelatedGuides` (`topic, heading, limit`), `ProjectGallery` (`ids, title`), `PageHero` (`crumbs, eyebrow, title, lead, photo`) match between definition and every call site.
- **Review Focus pins:** 1 → Task 7 Step 6 + Task 10 Step 7; 2 → Task 2 Step 9; 3 → Task 3 Step 4; 4 → Task 6 Step 4; 5 → Task 10 Step 4.
