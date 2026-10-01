# Structure1 Builds — Visual & Conversion Upgrade (Design Spec)

**Date:** 2026-09-30
**Site:** structure1builds.com (Next.js 14, Netlify)
**Scope:** Design and experience upgrade only. No content, structure, or information-architecture changes.

## 1. Goal

Make the existing site read as an established, premium Dallas–Fort Worth construction and outdoor-living company capable of $30K–$150K+ residential projects. The visitor's reaction should be "this is a legitimate high-end builder." The site must still feel like a real construction company, not an architecture studio, a SaaS product, or a lead-gen template.

Success criteria:

- Every section, headline, paragraph, statistic, CTA, form field, testimonial, link, and route exists after the work exactly as it does today, in the same order.
- No gold anywhere in the UI. Palette is black / charcoal / off-white / concrete neutrals with one restrained warm accent.
- Motion is reduced to a small set of purposeful transitions.
- Every photo slot has a defined aspect ratio and reads from a single image catalog, so adding a photo is a one-line data change.
- Shipped image payload is cut by roughly 80–90% with no visible quality loss at display size.
- `npm run build`, `tsc --noEmit`, and `eslint .` pass. Netlify forms keep working.

## 2. Hard constraints (from the brief)

Preserve: all written content, headlines, subheadlines, service info, statistics, CTAs, contact info, form fields, testimonials, service-area info, section order, IA, SEO content (titles, metas, JSON-LD, llms.txt, sitemap), links, and functionality.

Do not: move, delete, or merge sections; rewrite copy (except obvious typo/formatting fixes); shorten content; invent testimonials, projects, awards, stats, certifications, locations, services, guarantees, staff, project values, or history.

Avoid: gradients as decoration, glassmorphism, glowing elements, floating cards, heavy rounded corners, heavy shadows, unnecessary animation, badge clutter, decorative UI without purpose, AI-looking graphics, gold.

## 3. Approach

**Restyle in place.** Keep every component and page file. Change design tokens, per-component class choices, motion, and image handling. Add an image catalog and an image optimization script. Remove dead component files. Nothing in `src/lib/data.ts`, `city-data.ts`, `faq-data.ts`, or `blog.ts` changes except the addition of image catalog references where needed.

## 4. Design system

### 4.1 Color tokens

Defined once in `tailwind.config.ts` and mirrored as CSS variables in `globals.css`. Old names (`gold`, `parchment`, `sand`, `warm-*`, `accent-warm*`) are removed from the config so any leftover usage fails the build, not the user.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#111111` | Dark section backgrounds, primary text on light |
| `charcoal` | `#1F1F1F` | Cards and panels on dark bands, nav when scrolled |
| `graphite` | `#5C5C58` | Secondary text on light |
| `ash` | `#8A8985` | Muted labels, eyebrows, placeholders |
| `concrete` | `#E6E4DF` | Hairline rules, subtle panels on light |
| `paper` | `#F6F5F2` | Light section backgrounds (replaces parchment) |
| `white` | `#FFFFFF` | Form cards, inset panels |
| `clay` | `#B5684A` | The single warm accent |
| `clay-dark` | `#9A5439` | Accent hover |

On dark bands, text uses `white` at 100 / 70 / 45 percent opacity. Rules on dark are `white/10`.

**Accent discipline.** `clay` is used only for: the primary CTA button background, the active nav link, focus-visible outlines, required-field asterisks, and the text-selection color. Nowhere else. Stars in testimonials are `ink` on light and `white` on dark, not colored.

### 4.2 Typography

Fonts stay: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (eyebrows, labels).

- **Headline treatment.** Section H2s keep their current sizes and copy. The roman-then-italic two-line pattern is kept in exactly three places: the home hero, the home closing CTA, and the footer's "Tell us about your project." Every other headline renders fully roman at `font-medium` with the same line breaks. The `<span className="italic font-light …">` wrappers are removed, not the words inside them.
- **Hero H1.** Fully roman, white, no colored line. Max width tightened so it reads as four crisp lines on desktop and three on mobile.
- **Eyebrows.** Mono, 11px, tracking 0.2em, `ash` on light and `white/45` on dark. The `//` prefixes, `No. 00x` labels, and the leading-dash `eyebrow-row::before` rule are removed. A plain uppercase label is enough.
- **Body.** Unchanged sizes. Color moves from warm stone to `graphite`.
- **Numerals.** Stats and process step numbers stay in Fraunces but render in `ink`/`white`, not accent.

### 4.3 Shape, depth, borders

- Border radius: 0 on sections, tiles, cards, and buttons. 2px on inputs. The floating phone pill and mobile bar buttons keep their pill shape because they are controls, not content.
- Shadows: none on cards or tiles. The floating phone pill keeps one soft shadow for separation from page content. Form card uses a 1px `concrete` border instead of a shadow.
- Rules: 1px hairlines in `concrete` (light) or `white/10` (dark) for stat grids, process grids, city grids, and testimonial cards.

### 4.4 Buttons

Three variants, all 0 radius, uppercase mono-ish sans label at 12px / 0.16em tracking, 48px tall:

- **Primary:** `clay` background, white text, `clay-dark` on hover.
- **Dark:** `ink` background, white text; on hover background `charcoal`.
- **Ghost:** 1px border `currentColor`, transparent; on hover fills with `ink` (light) or `white` (dark).

Every existing button maps to one of these. The home hero and the sticky nav use Primary. Section CTAs on dark use Ghost. Form submit uses Dark.

### 4.5 Motion

Allowed:

- One `Reveal` fade-up per section header and per grid, 0.6s, 24px travel, stagger ≤ 0.08s between siblings, triggered once.
- Hero crossfade between slides, 1.2s, 7.5s interval. Thumbnail strip stays as the slide control.
- Image hover scale 1.03 over 0.6s on tiles.
- Color/opacity transitions ≤ 0.3s on links and buttons.
- Nav background transition on scroll.
- Page template fade (existing `template.tsx`) reduced to opacity only, 0.25s.

Removed:

- Hero rise-wipe, glowing seam line, Ken Burns scale/pan, hero scroll parallax, "Scroll" indicator.
- All `useScroll` / `useTransform` parallax (TrustStrip, RecentWork, CTASection, and any inner-page use).
- `grain-overlay` everywhere.
- Section-to-section gradient fades (the 32px `bg-gradient-to-b` bridges). Sections meet at a hard edge.
- `ScrollProgress` top bar.
- Rotating badge, magnetic button, animated text components (already unused; files deleted).

`prefers-reduced-motion` continues to disable everything.

### 4.6 Photography system

A new file `src/lib/images.ts` is the single catalog:

```ts
export type Photo = {
  src: string;          // public path, unchanged filenames
  alt: string;          // real description
  focal?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  tags: Array<'patio-cover' | 'pergola' | 'concrete' | 'carport' | 'site' | 'new-build'>;
  location?: string;    // only where already known from data.ts
};
export const photos: Record<string, Photo>;   // keyed by short id, e.g. 'gable-mckinney-1'
export const slots = { heroSlides: string[], trustStrip: string[], servicesGrid: Record<string,string>, ... };
```

Slots are arrays or maps of photo ids. Components look up `photos[id]` and render with a fixed ratio class and `object-position` from `focal`. Adding a photo = add one `photos` entry and one id to a slot.

Fixed ratios per slot type:

| Slot | Ratio |
|---|---|
| Home hero, page heroes, closing CTA background | fills viewport, `object-cover` |
| Service feature tiles, project tiles, blog cards | 4:3 |
| Portrait editorial images (TrustStrip, InlineEstimate, About story) | 3:4 |
| Wide project tile (RecentWork bottom row) | 21:9 |
| Gallery thumbnails | 1:1 |

Treatment: no color filters, no duotone. Overlays on photos are limited to a single bottom-to-top `ink` gradient at ≤ 70% where text sits on an image, so the photos stay honest.

**Image optimization.** A one-off script `scripts/optimize-images.mjs` (uses the already-installed `sharp`) rewrites every file in `public/images/**` in place: apply EXIF rotation, resize to max 2400px long edge, JPEG quality 82 with mozjpeg. The three `.PNG` files referenced in code (`cover5.PNG`, `Concrete1.PNG`, `concrete6.PNG`) are re-encoded as JPEG data but keep their existing filenames and extensions, since browsers sniff the real format and no path in code has to change. Other PNGs are kept as optimized PNG. Filenames and extensions referenced in code do not change. Originals are copied to `C:/Users/husai/Desktop/Construction website/_image-originals/` (outside the repo) before overwriting.

Hero slide images get `priority` only on the first slide; all other images are lazy.

The two stock/AI-looking images (`AI kitchen.jpg`, `new builds.jpg`) stay in place because no real replacement exists. They are flagged in the catalog with a `// TODO replace with real project photo` comment.

## 5. Component-level treatment

Home sections, in order (none move):

1. **Hero.** Crossfade slides. Roman white H1. Primary CTA + phone link. Trust row of four items stays, icons in `white/70`. Top label strip keeps caption and location in `white/60`, no color.
2. **TrustStrip.** Heading roman. Stat grid becomes a hairline grid in `concrete` on `paper`, numerals `ink`. Editorial image strip stays, parallax removed, all three at 3:4 aligned to one baseline.
3. **ServicesGrid.** Headings and copy unchanged. Feature tiles: photo 4:3 with bottom `ink` gradient, title white, index label plain `01`. Standard cards: `white` background, 1px `concrete` border, no hover border color, photo 4:3.
4. **InlineEstimate.** `ink` band, hard edges. Form card `white` with `concrete` border. Inputs 2px radius, focus ring `clay`. Portrait image 3:4.
5. **RecentWork.** Same grid; tiles keep ratios listed in 4.6; location labels `white/60`; no parallax.
6. **Process.** `ink` band. Numerals in `white`, 64–80px, light weight. Icons `white/40`. Hairline grid `white/10`.
7. **Testimonials.** Cards `white` on `paper` with `concrete` border, quote mark icon `ash`, stars `ink`. First card keeps its larger quote size.
8. **ServiceAreaSection.** City grid hairlines in `concrete`, hover background `white`. "TX" label `ash`.
9. **CTASection.** Background photo at 45% under an `ink` left-to-right gradient. Ghost button on dark + phone link.

Shared:

- **Navbar.** Wordmark "Structure1" all white, no colored "1". Links `white/80`, active `clay`. Phone in mono `white/70`. "Free Estimate" Primary. Scrolled state `ink/90` with blur retained (it is functional, not decorative). Mobile drawer unchanged in structure.
- **Footer.** Same four columns. Add the full address from `companyInfo.address` under the "Dallas-Fort Worth, TX" line in the Contact column, since it already exists in data. Social icons `white/60`, hover `white`. Hover color on links `white`, not accent.
- **PageHero / ServiceHero.** Photo at 45% under `ink` gradient, roman H1, eyebrow `white/50`, breadcrumb `white/50` with current item `white`.
- **EstimateForm / ContactForm.** Labels `graphite`, inputs per 4.4, submit button Dark, trust line icon `ash`. Error state unchanged.
- **FloatingCTA.** Mobile bar: phone button `white/10`, estimate button Primary. Desktop pill `ink`, icon `white/70`.
- **Buttons across inner pages** map to the three variants.
- **Blog typography** in `globals.css`: link color `ink` underlined, hover `clay`; blockquote rule `concrete`; table header `ink`.
- **not-found, thank-you, privacy, terms**: token swap only.

Inner pages (`services/*`, `projects/*`, `about`, `contact`, `service-areas/*`, `blog/*`) receive the same token mapping, headline de-italicizing, hairline grids, and 4:3 or 3:4 image ratios. Their section order and copy are untouched. Comparison tables, FAQ accordions, and galleries keep their behavior.

## 6. Housekeeping

Delete unused files (zero imports verified by grep on 2026-09-30):

```
src/components/forms/ContactForm.tsx      (contact page uses EstimateForm; ContactForm has no imports)
src/components/home/CommitmentBlock.tsx
src/components/home/ContactSection.tsx
src/components/home/FAQSection.tsx
src/components/home/FeaturedProjects.tsx
src/components/home/PortfolioSection.tsx
src/components/home/RecentProjectsStrip.tsx
src/components/home/ServicesSection.tsx
src/components/home/WhyUs.tsx
src/components/projects/ProjectFilter.tsx
src/components/services/ServiceProjects.tsx
src/components/ui/AnimatedText.tsx
src/components/ui/Button.tsx
src/components/ui/FloatingPhone.tsx
src/components/ui/MagneticButton.tsx
src/components/ui/RotatingBadge.tsx
src/components/ui/ServiceCard.tsx
src/components/ui/ScrollProgress.tsx      (removed from layout as part of 4.5)
```

Remove the unused `navigation` export from `data.ts` (no imports found). Remove unused Tailwind keyframes/animations (`rotate-slow`, `marquee`, `reveal`, `slide-up`) and the `.rotating-badge`, `.grain-overlay`, `.gold-rule`, `.section-divider` CSS rules.

## 7. Out of scope

- Any copy, heading, or content change beyond typo fixes.
- New sections, pages, services, or testimonials.
- Replacing the (580) phone number or Gmail address (owner-side items).
- Replacing the two stock-looking "new builds" images.
- Logo artwork (wordmark stays typographic).
- Backend / Netlify function changes.

## 8. Verification

- `npx tsc --noEmit`, `npx eslint .`, `npm run build` all clean (build run only while the dev server is stopped).
- `grep -rE "gold|parchment|sand|grain-overlay|useScroll|useTransform" src` returns nothing.
- Headless screenshots (desktop 1440 and mobile 390) of every route before and after; a side-by-side diff review confirms each section is present in the same order with the same text.
- Text-content diff: a script extracts visible text per route before and after and asserts equality (whitespace-normalized), proving no copy changed.
- Lighthouse on `/` shows LCP image under 300KB and no CLS from images.
- Estimate form posts successfully to Netlify forms on a deploy preview.
