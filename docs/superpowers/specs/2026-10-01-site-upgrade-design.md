# Structure1 Builds — Site Upgrade (Design Spec)

**Date:** 2026-10-01
**Site:** structure1builds.com (Next.js 14.2 App Router, Netlify, Netlify Forms)
**Supersedes:** `2026-09-30-visual-upgrade-design.md` (deleted; that spec froze copy and kept the serif identity, both of which this brief overrides)
**Brief:** the owner's "complete UI upgrade to industry standards" brief (2026-10-01), summarized in §1

## 1. Goal

Make structure1builds.com read as an established, premium Dallas–Fort Worth residential construction company capable of $25K–$100K+ projects: simple, fast, visual, local, trustworthy, conversion-focused. Not an agency showpiece, not a template.

Success means a homeowner landing from an ad understands within five seconds who Structure1 is, what it builds, where, what the work looks like, and how to get an estimate; and a homeowner searching "patio cover contractor Plano TX" lands on a relevant local page, sees relevant work, and can request an estimate in two taps.

Design principle: photography sells the work, typography organizes, whitespace creates confidence, navigation removes friction, copy explains value, CTAs capture the opportunity.

## 2. Audit findings (what exists today)

- **Routes (all indexed, all in the live sitemap):** `/`, `/services`, `/services/patio-covers`, `/services/concrete`, `/projects` + 9 project pages, `/service-areas` + 5 city pages (plano, frisco, mckinney, arlington, fort-worth), `/about`, `/contact`, `/blog` + 8 posts, `/privacy`, `/terms`, `/thank-you`.
- **Content:** services data has only patio-covers and concrete; 9 projects with 1–4 photos and one-line descriptions; 5 cities with real intros, permit notes, neighborhoods; 5 testimonials; 8 patio-cover blog guides with real price ranges; FAQ data for patio covers and concrete; 20-city service list.
- **Photography:** 37 real photos (88 MB; many 3–7 MB), two stock-looking images (`AI kitchen.jpg`, `new builds.jpg`). No before/after pairs.
- **Lead capture:** one Netlify form named `contact` posted to `/__forms.html` with fields `form-name, bot-field, subject, name, email, phone, service, message, contactMethod, referralSource`; `netlify/functions/contact.ts` behind `/api/contact` is unused by the UI.
- **Design debt:** serif display type (Fraunces), gold accent, grain overlays, parallax, hero rise-wipe, gradient section bridges, italic second-line headlines; four gallery components on an older rounded-card system; 18 unused component files; duplicate service tiles ("Patio Covers" twice); 24px horizontal overflow on `/services/concrete` at 390px; hero images served at 5–7 MB.
- **Owner-side gaps:** phone is still (580) 665-2758, email is a Gmail address, no verified Google rating, no license number on file.

## 3. Hard rules

- Every indexed URL above keeps working at the same path. No URL is renamed. Old `/#estimate` and `/#process` anchor links still land on a home section with that id (the estimate CTA and the process section), each of which links on to `/estimate` and `/process`.
- No fabricated statistics, reviews, staff, awards, project values, or history. Trust claims are limited to what the current site already states: licensed & insured, DFW local, 2-year workmanship warranty, 150+ projects, 4+ years, permits handled, in-house crew, 5 real testimonials.
- No new "team" section, no Google rating badge, no license number until the owner supplies them. Phone and email stay as-is in `company.ts` until the owner replaces them.
- Palette stays black/white/neutral. One warm neutral accent, used only for the active nav item, focus rings, and link hover. No gold, no decorative gradients, no glassmorphism, no glow, no floating cards, no shadows except the mobile sticky bar.
- Motion: CSS-only reveals, hover states, menu/accordion transitions. No parallax, no scroll hijacking, no sliders, no page-transition theatrics. `prefers-reduced-motion` disables all of it.
- Mobile is designed, not shrunk: 390px layouts are specified for every template; no horizontal overflow on any route.
- Everything the company will add later (project, city, service, testimonial, article, photo) is a data entry, not a layout edit.

## 4. Information architecture

### 4.1 Navigation

Desktop: `Structure1` wordmark · Services ▾ · Projects · Service Areas · About · Resources · Contact · **Get a Free Estimate** (solid button).

Services dropdown (single level, 7 items in this order): Patio Covers, Pergolas, Concrete, Stamped Concrete, Driveways & Walkways, Outdoor Living, Remodeling & New Builds. Opens on hover/focus on desktop, as an expandable group in the mobile sheet. Each item is name + one-line descriptor.

Mobile: wordmark, phone icon (click-to-call), hamburger. The sheet lists the seven primary links with Services expanded inline, phone number, and the estimate button. A sticky bottom bar (Call · Get a Free Estimate) appears after 600px of scroll on every page except `/estimate`.

Header is sticky, white on light pages, transparent over the home hero and page heroes, compacts from 80px to 64px after scrolling.

### 4.2 Routes

| Route | Status | Template |
|---|---|---|
| `/` | kept | Home |
| `/services` | kept | Services hub |
| `/services/patio-covers`, `/services/concrete` | kept | Service |
| `/services/pergolas`, `/services/stamped-concrete`, `/services/driveways-walkways`, `/services/outdoor-living`, `/services/remodeling` | new | Service |
| `/projects` | kept | Projects hub (filter by service and city) |
| `/projects/[slug]` (9 existing) | kept | Project |
| `/service-areas` | kept | Service Areas hub |
| `/service-areas/[city]` — plano, frisco, mckinney, arlington, fort-worth | kept | City |
| `/service-areas/dallas`, `/allen`, `/carrollton`, `/flower-mound`, `/prosper` | new | City |
| `/about` | kept | About |
| `/process` | new | Process |
| `/blog`, `/blog/[slug]` (8) | kept; nav label "Resources" | Resources hub / Article |
| `/contact` | kept | Contact (info + embedded estimate form) |
| `/estimate` | new | Estimate |
| `/privacy`, `/terms`, `/thank-you` | kept | Legal / Thank-you |
| `/#estimate`, `/#process` | kept as ids on home | home CTASection has `id="estimate"`, home process section has `id="process"`; both link on to the new pages |

Sitemap, robots, and breadcrumbs are generated from the content files. `/thank-you` stays `noindex`.

### 4.3 Internal linking (generated, never hand-placed)

- Project → its service page, its city page, 3 related projects (same service, then same city), 2 related guides (matching `topic`), `/estimate`.
- Service → projects tagged with that service (up to 6), FAQs for that service, guides with that topic, the 10 city pages, `/estimate`.
- City → projects in that city (or "recent work nearby" = featured projects when none), testimonials from that city, services list, guides, `/estimate`.
- Article → related articles (same topic), the service page matching its topic, `/estimate`.
- Home → every service, 6 featured projects, `/process`, `/service-areas`, `/estimate`.

## 5. Content model

All structured content lives in `src/content/` as typed TypeScript. Types are strict; a missing required field fails `tsc`. Markdown stays for articles.

```ts
// src/content/company.ts
export const company = {
  name: 'Structure1 Construction',
  brand: 'Structure1',
  tagline: 'DFW Residential Construction & Outdoor Living',
  phone: '(580) 665-2758', phoneRaw: '5806652758',     // owner to replace
  email: 'samuel.c.w.allison@gmail.com',               // owner to replace
  address: { street: '5473 Blair Rd Ste 100 PMB 476653', city: 'Dallas', state: 'TX', zip: '75231-4227' },
  hours: 'Mon – Fri, 8:00 AM – 6:00 PM',
  social: { facebook: string, instagram: string },
  url: 'https://structure1builds.com',
};

// src/content/trust.ts
export const trust: Array<{ label: string; detail: string }>;  // exactly: Licensed & insured; DFW local, Dallas-based;
  // 2-year workmanship warranty; 150+ projects completed; 4+ years in DFW; Permits & engineering handled; In-house crew

// src/content/images.ts
export type Photo = { src: string; alt: string; width: number; height: number; focal?: 'center'|'top'|'bottom' };
export const photos: Record<PhotoId, Photo>;   // one entry per real photo; stock images excluded

// src/content/services.ts
export type Service = {
  slug: 'patio-covers'|'pergolas'|'concrete'|'stamped-concrete'|'driveways-walkways'|'outdoor-living'|'remodeling';
  name: string;                 // "Patio Covers"
  navLabel: string;             // "Patio Covers"
  navBlurb: string;             // ≤ 60 chars for the dropdown
  seo: { title: string; description: string };
  hero: PhotoId;
  gallery: PhotoId[];           // 3–6
  overview: string[];           // 1–3 paragraphs
  options: Array<{ name: string; blurb: string; range?: string }>;   // "types / options"; range only where a blog guide states it
  reasons: Array<{ title: string; blurb: string }>;                  // "why homeowners build it", 3–4
  construction: string[];       // "how we build it", 3–5 short paragraphs
  faqIds: string[];             // keys into faqs.ts
  relatedServices: Service['slug'][];
  topic: Topic;                 // links guides
};

// src/content/projects.ts
export type Project = {
  slug: string; title: string;
  service: Service['slug']; city: CitySlug | null; location: string;   // "McKinney, TX"
  cover: PhotoId; gallery: PhotoId[];
  overview: string;             // 2–4 sentences, written from the existing description + visible photo details
  scope: string[];              // 3–6 bullets
  materials: string[];          // 2–5 bullets, only what is visible or already stated
  featured: boolean;
};

// src/content/cities.ts
export type City = {
  slug: CitySlug; name: string; county: string;
  seo: { title: string; description: string };
  hero: PhotoId;
  intro: string[];              // 2 paragraphs, city-specific
  permitNote: string;           // city permit / HOA reality
  neighborhoods: string[];      // 5–6
  faqIds: string[];             // 2–4 local FAQs
  testimonialIds: number[];
};
// CitySlug = 'dallas'|'fort-worth'|'plano'|'frisco'|'mckinney'|'arlington'|'allen'|'carrollton'|'flower-mound'|'prosper'
// serviceAreaList: the existing 20-city string list for the hub footer and schema areaServed

// src/content/testimonials.ts — existing 5, unchanged, plus optional `service` and `city` keys for filtering
// src/content/faqs.ts — existing patio-cover + concrete FAQs re-keyed by id, plus new per-service and per-city items
// src/content/process.ts — 4 steps: { number, title, summary, homeownerDoes, weDo, timeline }
// content/blog/*.md — unchanged bodies; frontmatter gains `topic`
// Topic = 'patio-covers'|'pergolas'|'concrete'|'stamped-concrete'|'driveways-walkways'|'outdoor-living'|'remodeling'|'planning'
```

Content rules for the new pages:

- Service copy for pergolas, stamped concrete, driveways & walkways is drafted from the existing patio-cover/concrete copy, FAQ data, and the blog guides (which already state cedar/aluminum/polycarbonate materials, permit facts, and price ranges such as lean-to $8K–$14K, gable $14K–$25K+, polycarbonate pergola $10K–$18K). Outdoor living and remodeling pages describe the service in plain terms with no price ranges and no project claims; they reuse existing photos and carry an `ownerReview: true` flag that renders nothing but is listed in the plan's handoff.
- The five existing city pages keep their copy verbatim. The five new cities get two honest intro paragraphs (location, housing stock, how Structure1 serves it), a permit note written from each city's published building-permit requirement for accessory structures, 5–6 real neighborhood names, 2–3 local FAQs, and whichever existing projects/testimonials match (Dallas: concrete-driveway project + Johnson testimonial; Allen: Davis testimonial; Carrollton, Flower Mound, Prosper: none, so the page shows "Recent work nearby").
- Project overviews, scope, and materials are written only from what the existing descriptions say and what the photos show (e.g. cedar posts, white trusses, polycarbonate panels, tongue-and-groove ceiling, recessed lighting, ceiling fans, stamped stone pattern). No dimensions, costs, or dates are invented.

## 6. Design system

### 6.1 Tokens (`tailwind.config.ts` + CSS variables)

| Token | Value | Use |
|---|---|---|
| `white` | `#FFFFFF` | page background, cards |
| `offwhite` | `#F7F6F3` | alternate section background, form fields |
| `black` | `#0A0A0A` | primary text, dark sections, primary button |
| `charcoal` | `#1C1C1C` | dark cards, header when solid over dark |
| `gray-700` | `#4A4A48` | secondary text |
| `gray-500` | `#7A7975` | metadata, eyebrows, placeholders |
| `gray-200` | `#E3E1DC` | borders, rules |
| `timber` | `#9C7A5B` | active nav item, focus ring, link hover, required asterisk. Nowhere else. |

Dark surfaces use `white` at 100 / 70 / 50 % and rules at `white/15`.

### 6.2 Typography

- Display/headings: **Inter Tight** 600 (H2/H3) and 700 (H1), tracking −0.02em, line-height 1.05–1.15.
- Body: **Inter** 400/500, line-height 1.6. Both via `next/font/google`, `display: swap`, subset latin.
- Scale (desktop / mobile): eyebrow 12/12px uppercase tracking 0.14em `gray-500`; H1 56/38px; H2 40/30px; H3 24/20px; lead 20/18px; body 17/16px; supporting 15/15px; metadata 13/13px; buttons 14px/500 tracking 0.02em, no uppercase.
- Max measure 65ch for body text. Headlines are roman; no italics, no two-tone words.

### 6.3 Shape, depth, borders

Radius 0 everywhere except form inputs (4px) and the mobile sticky bar container. 1px `gray-200` borders for cards and rules on light; `white/15` on dark. No box shadows except the mobile sticky bar (`0 -4px 16px rgba(0,0,0,.08)`).

### 6.4 Buttons

Height 48px (44px in the compact header), padding 0 24px, 14px/500 label, 0 radius, 150ms color transition.

- **Primary**: `black` background, white label; hover `charcoal`. On dark surfaces: white background, black label; hover `offwhite`.
- **Secondary**: 1px `black` border, transparent; hover `black` fill. On dark: `white` border; hover white fill.
- **Text link**: label + arrow, underline on hover, `timber` on hover.

CTA wording is fixed: nav and hero "Get a Free Estimate" / "Get My Free Estimate"; after projects "Get an Estimate"; after a service "Discuss Your Project"; after process "Start Your Project"; on city pages "Get a Free Estimate in {City}". All go to `/estimate`.

### 6.5 Layout

Container 1280px max, 24px side padding (16px at 390px). Section vertical padding 96px desktop / 64px mobile. 12-column grid, 24px gutters. Photo ratios: hero fills 100svh max 820px; project/service cards 4:3; editorial portraits 3:4; gallery thumbnails 1:1; wide feature 21:9.

### 6.6 Motion

- `Reveal`: a `data-reveal` attribute + one IntersectionObserver; opacity 0→1 and translateY 16px→0 over 400ms ease-out, once, stagger ≤ 60ms between siblings via `--reveal-delay`.
- Image hover: scale 1.02 over 400ms on cards.
- Header compact, mobile sheet slide, dropdown fade, accordion height: 200–250ms.
- `framer-motion`, `lenis`, and `@studio-freight/react-lenis` are removed from `package.json`.

### 6.7 Accessibility

Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with headings); one H1 per page; heading order never skips; visible focus (2px `timber` outline, 2px offset) on every interactive element; 44px minimum targets; form labels bound to inputs with error text in `aria-live`; dropdown and mobile sheet keyboard-operable with Escape to close and focus return; lightbox traps focus; all images from the catalog carry descriptive alt; decorative images get `alt=""`; color contrast ≥ 4.5:1 for text (`gray-500` is used only at ≥ 13px uppercase or as placeholder).

## 7. Components (`src/components/`)

| Component | Responsibility |
|---|---|
| `layout/Header` | sticky header, Services dropdown, compact on scroll, mobile sheet, click-to-call |
| `layout/Footer` | wordmark + description, Services, Company, Service Areas (10), Contact, estimate button, socials, Privacy/Terms/©. Four columns desktop, stacked mobile. |
| `layout/StickyBar` | mobile bottom bar (Call · Get a Free Estimate), hidden on `/estimate` |
| `layout/Container`, `layout/Section` | width, padding, light/offwhite/dark surface variants |
| `ui/Button` | primary / secondary / link variants, `as` Link or button |
| `ui/Eyebrow`, `ui/Heading` | typographic primitives |
| `ui/Reveal` | data-attribute reveal (client, 1 observer) |
| `ui/Breadcrumbs` | visible crumbs + BreadcrumbList JSON-LD |
| `ui/Photo` | `next/image` wrapper fed by `PhotoId`, fixed ratio, sizes, focal |
| `home/Hero` | full-bleed photo, eyebrow, H1, lead, two CTAs |
| `sections/TrustBar` | the 7 trust items as a single hairline row (icons optional, 16px, monochrome) |
| `sections/ServiceCard` + `ServiceGrid` | photo 4:3, name, blurb, link |
| `sections/ProjectCard` + `ProjectGrid` | photo 4:3, title, city, service label, "View Project →" |
| `sections/ProjectGallery` | masonry-free grid of 1:1 / 4:3 thumbs, lightbox with keyboard + swipe |
| `sections/ProcessSteps` | 4 numbered steps |
| `sections/Testimonials` | quote, author, project · city; 5-star row in black |
| `sections/ServiceAreaCard` + `ServiceAreaGrid` | city name, county, "View {City} →" |
| `sections/FAQ` | accordion + FAQPage JSON-LD |
| `sections/CTASection` | heading, line, primary + phone; light and dark variants |
| `sections/RelatedProjects`, `sections/RelatedGuides`, `sections/ArticleCard` | generated links |
| `forms/EstimateForm` | the estimate form (see §8.6) |
| `seo/JsonLd` | LocalBusiness (site), Service, FAQPage, Article, BreadcrumbList helpers |

Deleted: every component under `src/components/home/*`, `ui/*`, `services/*Gallery.tsx`, `projects/ProjectFilter.tsx`, `forms/ContactForm.tsx`, `layout/SmoothScroll.tsx`, `ui/ScrollProgress.tsx`, and `src/lib/animations.ts`, `src/lib/data.ts` (replaced by `src/content/*`), `src/lib/city-data.ts`, `src/lib/faq-data.ts` (migrated into `src/content`). `src/lib/blog.ts` stays.

## 8. Page templates

Each template is a server component reading from `src/content`; only Header, StickyBar, ProjectGallery, FAQ, EstimateForm, and Reveal are client components.

### 8.1 Home
1. **Hero** — one still photo (`gable-mckinney-cedar`), bottom fade only, eyebrow "DFW Residential Construction & Outdoor Living", H1 "Outdoor spaces built like they belong with your home.", lead "Custom patio covers, pergolas, concrete, and outdoor living — designed, permitted, and built by one in-house crew across Dallas–Fort Worth.", CTAs "Get My Free Estimate" (primary) and "View Our Work" (secondary). Mobile: photo 3:4 crop, text below the fold line, CTAs stacked full-width.
2. **TrustBar** — 7 items in one row (2×4 grid on mobile).
3. **Featured photography** — three 3:4 photos in a row, no text.
4. **Core services** — H2 "What we build", 7 ServiceCards (3-2-2 on desktop, 1-col mobile).
5. **Why Structure1** — H2 "Built to last, handled end to end", four short statements from `trust.ts` detail text (one crew, permits & engineering, warranty, communication) in a 2×2 hairline grid with one 3:4 photo.
6. **Featured projects** — H2 "Recent work", 6 ProjectCards, link "View all projects".
7. **Process** — H2 "How it works", 4 ProcessSteps, link "See the full process".
8. **Reviews** — H2 "What homeowners say", 3 testimonials, link to Google profile only if `company.googleReviewsUrl` is set (it is not today).
9. **Service areas** — H2 "Serving Dallas–Fort Worth", 10 ServiceAreaCards + the 20-city line.
10. **CTASection** (dark) — "Ready to plan your project?", "Get a Free Estimate", phone.

### 8.2 Services hub
PageHero (eyebrow "Services", H1 "What Structure1 builds", lead) → 7 ServiceCards with 2-line blurbs → TrustBar → CTASection.

### 8.3 Service (×7)
PageHero (crumbs Home / Services / {Service}; H1 = service name + " in Dallas–Fort Worth") → gallery strip (3 photos) → overview → options grid (name, blurb, range if present) → reasons (3–4) → "How we build it" (numbered paragraphs) → RelatedProjects → FAQ (with schema) → "Areas served" (10 city links) → CTASection "Discuss Your Project".

### 8.4 Projects hub
PageHero → filter bar (All · 7 services | city select) implemented with URL search params so filtered views are shareable and crawlable → ProjectGrid → CTASection "Get an Estimate".

### 8.5 Project (×9)
Breadcrumbs (Home / Projects / {Title}) → title, location, service link → ProjectGallery (cover large, thumbs 1:1) → overview → scope + materials (two columns, hairline) → RelatedProjects (3) → RelatedGuides (2) → CTASection "Planning something similar? Get an estimate".

### 8.6 Estimate
Breadcrumbs → H1 "Get a free estimate" → lead (one business day reply, no-obligation) → two columns: form (left, 7/12) and trust/contact (right, 5/12: phone, email, hours, 4 trust items). Form fields: Name*, Phone*, Email*, Project address or city*, Project type (select: the 7 services + Other)*, Timeline (select: As soon as possible / 1–3 months / 3–6 months / Just planning), Project description (textarea), Photos (file input, multiple, optional, accept images). Submits to Netlify Forms as form `contact` with the existing field names (`name, email, phone, service, message, subject, referralSource`) plus new `city`, `timeline`, and `photos` (Netlify file upload); `public/__forms.html` gains the new fields so detection works. Success replaces the form in place with the "Request received" state. Error state keeps the phone fallback.

### 8.7 Process
PageHero → 4 steps, each: number, title, what happens, what the homeowner does, typical timing (from existing copy: one-business-day reply, site visit, drawings, permits handled, in-house build; durations only where the existing site states them, e.g. 2–4 weeks for patio covers) → FAQ (planning questions) → CTASection "Start Your Project".

### 8.8 Service Areas hub
PageHero → 10 ServiceAreaCards → "Also serving" 20-city list → permit note summary → CTASection.

### 8.9 City (×10)
PageHero (H1 "{Service summary} in {City}, TX", e.g. "Patio Covers, Pergolas & Concrete in Plano, TX") → intro → services offered (7 links) → local projects (ProjectGrid filtered by city, or "Recent work nearby" with featured projects) → permit & HOA note → neighborhoods → local FAQ (schema) → city testimonials → RelatedGuides → CTASection "Get a Free Estimate in {City}".

### 8.10 About
PageHero → story (existing copy, two paragraphs) → values (existing four) → TrustBar → milestones (existing five) → CTASection. No team section.

### 8.11 Resources hub + Article
Hub: PageHero (eyebrow "Resources", H1 "Homeowner guides for DFW projects") → topic filter chips → ArticleCards. Article: breadcrumbs, title, date/read time, hero image 21:9, body (`.prose` styles), related articles, CTASection. Article schema stays.

### 8.12 Contact
PageHero → EstimateForm (same component) + contact details. `/contact` remains for the people who look for it; the nav CTA goes to `/estimate`.

### 8.13 Legal, 404, Thank-you
Token swap on existing copy. 404 links to home, projects, estimate.

## 9. SEO

- Per-page `title`/`description` from content (`seo` fields), 50–60 / 140–160 chars; one H1 per page; canonical on every page via `alternates.canonical`.
- JSON-LD: `LocalBusiness` (HomeAndConstructionBusiness) in the root layout with `areaServed` = 20 cities; `Service` on service pages; `FAQPage` wherever an FAQ renders; `BreadcrumbList` on every inner page; `Article` on posts (existing); `ImageObject` not needed beyond alt text.
- OpenGraph/Twitter image per page = the page's hero photo (1200×630 crop handled by `next/image` metadata route is out of scope; the existing static OG image approach continues, using the page hero `src`).
- `robots.ts` unchanged (AI crawlers allowed); `sitemap.ts` built from `services`, `projects`, `cities`, posts, and the static list including `/estimate` and `/process`. `llms.txt` updated with the new service and city URLs.
- Redirects: none. No path changes; fragments are preserved as section ids on the home page.

## 10. Performance

- `scripts/optimize-images.mjs` (sharp): copies `public/images/**` to `../_image-originals/` once, then rewrites in place — EXIF rotate, max 2400px long edge, JPEG q82 mozjpeg. The three `.PNG` files are converted to real JPEG files with `.jpg` names and the catalog points at the new names (old `.PNG` paths are only referenced by code, never by external links). Target: `public/images` ≤ 12 MB.
- `next/image` everywhere with explicit `sizes`; hero `priority`; all else lazy; every slot has a fixed aspect ratio (zero image CLS).
- Fonts via `next/font` (self-hosted, swap). No third-party scripts. framer-motion and Lenis removed.
- Netlify `NODE_VERSION` bumped to 20 (Next 14.2 supports it; sharp 0.34 requires ≥ 18.17).

## 11. Verification

- `npx tsc --noEmit`, `npx eslint .`, `npm run build` clean.
- `scripts/site-check.mjs` (playwright-core driving installed Chrome): reads `/sitemap.xml`, visits every URL plus `/estimate`, `/process`, and a 404; follows every same-origin link once and fails on any non-200 (except the deliberate 404 route); screenshots at 1920, 1440, 1280, 768, 390 (full page); asserts `scrollWidth <= innerWidth`, zero console errors, zero hydration warnings, exactly one `h1`, a `canonical` link, and a JSON-LD block on every page; runs once with `reducedMotion: 'reduce'` to confirm content is visible without animation.
- `grep` gates: no `gold|parchment|framer-motion|lenis|grain|useScroll` in `src`; no `rounded-(lg|xl|2xl|3xl)`; no `shadow-` except `StickyBar`.
- Manual: submit the estimate form on the Netlify deploy preview and confirm the submission (with a photo) appears in Netlify Forms; tab through header, dropdown, mobile sheet, and lightbox with a keyboard.

## 12. Owner-side items (handed back, not invented)

1. Replace phone `(580) 665-2758` and the Gmail address in `src/content/company.ts`.
2. Provide the Google Business Profile reviews URL and rating if it should be shown.
3. Provide license/registration numbers if they should be printed.
4. Supply real photos for Outdoor Living and Remodeling & New Builds; those pages currently reuse patio/concrete photos.
5. Review the drafted copy on the five new service pages and five new city pages.

## 13. Out of scope

New blog articles; logo artwork (wordmark stays typographic); a CMS; before/after pairs; analytics/conversion-tracking setup beyond preserving what exists; changes to the Netlify function at `/api/contact`.
