# Home page UI polish (local preview)

Branch `feat/homepage-ui-polish`, from `main` at b99b1e5. Owner approved publication after reviewing the local preview. No new dependencies, external project images, offers, prices, guarantees, review claims or credentials.

## Changes

| Area | Before | Now |
|---|---|---|
| Header over the hero | `--hdr-bg: transparent` with white text, so the bright sky washed out the desktop nav and the phone logo and icons | At the top of a dark-hero page, while closed, the header is a near-black bar (`rgba(14,14,14,0.82)`, hairline `rgba(255,255,255,0.12)`), with no blur or gradient. Worst case, over a pure white sky, the nav text is about 9:1. Once scrolled or opened it switches to the existing white header, and the mobile menu and services dropdown stay white with black text. |
| Focus rings | Always `#0E0E0E`, which can't be seen on the dark bar or the hero photo | `outline: 2px solid var(--focus, #0E0E0E)`. `--focus` is white on the dark header and in the hero copy, and black again in `#services-menu`. The white estimate card is unchanged. |
| Hero photo | `reno-kitchen-pergola-turf` at focal 28%. The crop was mostly roof underside, sky and posts. | `reno-pergola-turf-wide` (`/images/outdoor-renovation/pergola-turf-wide.jpg`). It is the only existing photo that shows the whole free-standing cover, the stacked-stone kitchen island, the patio and the house behind it in one frame. There is one `<img>` with one preload, still `priority`/eager with `sizes="100vw"`. The crop is set per breakpoint through a new optional `position` prop on `Photo`: `45% 20%` below `lg`, which keeps the kitchen end and both front posts in on phones, and `50% 24%` from `lg` up, which keeps the rooflines and the full cover in frame rather than the lawn. The photo's registry focal (36%) is untouched, so the project card that uses it keeps its framing. |
| Hero copy | "Outdoor spaces built like they belong with your home." | Label "Patio covers & outdoor living · Dallas–Fort Worth". Headline "Make more room for life outside." Supporting line "Custom patio covers and outdoor kitchens planned around your home and how you want to use the space." The phone "Get a free estimate" jump, "See the work" and the desktop form card are unchanged. Concrete is still in the services mosaic and the nav. |
| Early proof | 7-card "Recent work" grid after the big Watauga feature, far down the page | A "Recent projects" section right after the hero and trust strip, before services and reels. It shows three catalog projects: Gable Patio Cover (Midlothian, TX), Free-Standing Patio Cover, Pavers & Walkway (Dallas–Fort Worth) and Classic Gable Patio Cover (McKinney, TX). Each card has the cover photo, location · service, the first two scope lines from `projects.ts`, and a "View project" link (accessible name "View project: {title}"). The photo is a mouse-only duplicate link. The section also has an "All projects" link. The lower "Recent work" grid is removed, so the projects aren't repeated. The Watauga feature, testimonials (left where they were) and every other section stay. |
| Form (all forms) | Field borders `#E4E2DC` (about 1.2:1 against white), description not marked optional | Field borders `gray-400` `#8F8D87` (about 3.3:1, a new token used only here), a "Fields marked * are required." line, and "Project description (optional)". Required fields, field order, payload, success state, tracking and the privacy line are unchanged. |
| `npm run test:e2e` | `tests/e2e/conversion.e2e.mjs` only | `"tests/e2e/*.e2e.mjs"`, which runs the conversion tests **and** the new `homepage-ui.e2e.mjs` |

Files: `src/app/globals.css`, `src/app/page.tsx`, `src/components/home/Hero.tsx`, `src/components/home/HomeProof.tsx` (new), `src/content/home.ts` (new: `HERO_PHOTO`, `HOME_FEATURE`, `HOME_PROOF`), `src/components/ui/Photo.tsx` (optional `position`), `src/components/layout/Header.tsx` (comment only), `src/components/forms/EstimateForm.tsx`, `tailwind.config.ts`, `package.json` (e2e script), `tests/unit/homepage.test.mjs` (new), `tests/e2e/homepage-ui.e2e.mjs` (new).

## Tests run here

- `node --test tests/unit/homepage.test.mjs` was **RED** first. The module was missing; then, after `src/content/home.ts`, 5 failures for page order, hero copy, header backdrop, focus variable and optional label. It went **GREEN** after the implementation.
- Parent verification: `npm test` passes 77/77 tests, including the new homepage and favicon tests.
- `npm run lint`: no warnings or errors.
- `npx tsc --noEmit`: clean.
- `npm run build`: passes. In the prerendered `/` HTML there is one hero `<img>` (`pergola-turf-wide.jpg`, `fetchPriority="high"`, `loading="eager"`, `sizes="100vw"`, `--pos:45% 20%;--pos-lg:50% 24%`) and one image preload, `data-home-proof` is present, and "Recent work" is absent.
- `node --check tests/e2e/homepage-ui.e2e.mjs`: syntax OK.

## Completed: parent on localhost

The parent independently ran all 35 browser tests against localhost: **35 passed, 0 failed**. Responsive checks passed at 360, 390, 768 and 1440px. Chrome visual review verified desktop/mobile composition, project proof and intended Inter/Inter Tight fonts after a clean rebuild resolved an initial generated-build font mismatch. No real leads were submitted. To reproduce:

```
npm run build && npm run start -- -p 4173
E2E_BASE=http://127.0.0.1:4173 npm run test:e2e
```

`homepage-ui.e2e.mjs` aborts every non-localhost request, and any POST to `/__forms.html` is aborted and fails the test. It covers:
- header colors at the top, scrolled and open, with worst-case contrast over white
- dropdown keyboard and Escape
- the mobile menu, Escape and focus return
- focus-ring colors
- the hero image count, eager/high priority, `sizes`, and `object-position` at 1440 and 390
- hero copy
- the 360px estimate jump
- proof order, links and 200s
- keyboard reach of the proof links
- no horizontal overflow at 360/390/768/1440
- form border contrast, required fields and order, and the optional label

Visual checks for the parent: the desktop and mobile hero crop (does 24% on wide screens read well behind the headline and card?), how the dark header bar sits against the photo, the proof cards at 768 (three columns), and the outdoor-living mosaic tile, which still uses the old hero file at its own 58% crop.

## Caveats

- Additional favicon files: `scripts/generate-favicon.mjs`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `tests/unit/favicon.test.mjs`. The new black square/white S1 icon replaces the starter icon; the local served ICO was verified to match source. Five favicon tests passed. Byte-identical regeneration assumes the same installed fonts/rendering environment and may need matching Arial fonts on another OS.

- The proof's Free-Standing card and the services mosaic's "Pavers & Pathways" tile link to the same project, with different photos.
- The hero photo is a portrait shot (1206×1513) shown full-bleed, so wide desktops upscale it, as the previous hero did.
- The form changes (border, required note, optional label) apply on `/estimate` and `/contact` as well as the home card.
