# Photo placement review: local corrections

Branch `fix/photo-placement-review`, based on deployed `main` (26f461c). These are local, uncommitted changes. Nothing was built, served, deployed, committed or pushed.

The parent reviewer visually inspected all 52 catalog entries and hashed the files. This change covers only the defects that inspection confirmed. Reused photos that are captioned correctly were left alone, because reuse by itself is not a defect.

## Changes

| # | Item | Change | Files |
|---|------|--------|-------|
| 1 | `pergola-lewisville-2` (`cover2.JPG`) is byte-identical to `buckfin1.JPG` / `debrabuck.JPG` (McKinney) | Removed from the `free-standing-modern-patio-cover` gallery. The registry alias was deleted because nothing else used it. `cover2.JPG` stays on disk because it is still the featured image of `best-patio-cover-materials-texas`. The McKinney service and project tiles are unchanged. | `src/content/images.ts`, `src/content/projects.ts` |
| 2 | `leanto-forney-1` (`jeff1.jpg`) shows no cover | Alt changed to "Uncovered concrete patio beside a home", with no city and no before/after claim. Removed from the `lean-to-patio-cover` gallery, which keeps `leanto-forney-3` and `leanto-forney-2`. | `images.ts`, `projects.ts` |
| 3 | `pergola-plano-foundation` (`sashi1.JPG`) shows a stamped slab, not footings | Alt changed to "Stamped concrete patio slab beside a two-story home in Plano, Texas". Removed "documented from footings to finish" from the Plano overview. The construction scope (including "Concrete footings and steel post anchors") is unchanged. The photo stays in the Plano gallery. | `images.ts`, `projects.ts` |
| 4 | `stamped-wood-plank` (`concrete2.jpg`) actually shows a random-stone stamp | Renamed the ID to `stamped-random-stone`, with alt "Random-stone pattern stamped concrete patio beside a cedar post". Its only caller was the stamped-concrete service gallery, which now uses `stamped-flagstone`, `stamped-tile` and `stamped-herringbone` (three different files). Wood plank is still offered in the service copy, SEO text and options. | `images.ts`, `src/content/services.ts` |
| 5 | `stamped-stone-texture` (`concrete6.jpg`) | Alt changed to "Rectangular stone-pattern stamped concrete patio beneath a cedar cover". It is still registered but not used anywhere. | `images.ts` |
| 6 | Forney stamped project: photos 2 and 4 show different properties | The `stamped-concrete-patio` gallery is now `[forney-1, forney-3]`, and its location is still "Forney, TX". Photo 2's alt is now "Open stamped concrete patio with a rectangular stone pattern and a center medallion" (no cover, no city). Photo 3's alt is now "Wide view of a stamped concrete patio under a cedar patio cover with a ceiling fan in Forney, Texas". I also changed photo 4's alt, which the brief did not explicitly ask for: it now reads "Curved stamped concrete patio in a slate pattern beside a brick home", with "in Forney, Texas" dropped so it makes no location claim for a removed photo. Photos 2 and 4 are no longer used anywhere; their registry IDs still contain "forney", but only internally. | `images.ts`, `projects.ts` |
| 7 | Blog alts | `patio-cover-cost-dallas-fort-worth` (`cover1.JPG`): "Cedar patio cover photographed at night with recessed lighting, built in Dallas-Fort Worth by Structure1 Builds", with no "gable". `patio-cover-ideas-dallas-fort-worth` (`cover4.JPG`): "Cedar gable patio cover beside a pool in a Midlothian, Texas backyard", with no back-wall or privacy claim. | `content/blog/*.md` (front matter only) |
| 8 | `patio-cover-increase-home-value-texas` used the `cover5.jpg` collage | Featured image is now `/images/projects/gable-watauga-wide.jpg`, with the registry's alt for that photo. I previewed it at the post page's 21:9 and the card's 4:3 center crops: the gable, the shed wing and the house are visible in both. The collage stays registered as `patio-cover-dfw-1` (not used anywhere), and its alt now says "Collage of several different patio covers built across Dallas-Fort Worth". The article body and `lastModified` are unchanged. | blog front matter, `images.ts` |
| 9 | Crops | The parent checked the actual 4:3, 16:9 and 21:9 frames. McKinney gable views and the identical `gable-dfw` file use 18%; the framing photo uses 10%; Midlothian uses 30%; the Melissa carport uses 5%. Initial 21%/15% choices still put the blog/carport apex at or above the crop edge, caught by source-dimension regressions and actual browser review before further correction. Original photos and homepage `HERO_PHOTO` were not changed. | `images.ts` |
| 10 | City heroes | `PageHero` has a new optional `caption` prop. When set, it renders a small line under the lead: `Photo: DFW project example`. Only `src/app/service-areas/[city]/page.tsx` passes it. City OG alt is now `Representative DFW project: <original photo alt>`, so the real location (e.g. Lewisville on Frisco) is kept. No geography or catalog locations were changed. | `src/components/layout/PageHero.tsx`, `src/app/service-areas/[city]/page.tsx` |
| 11 | Default OG image declared 1200x630 but pointed at a 1500x2000 portrait | New `scripts/generate-og-image.mjs` (uses sharp, which was already installed). It takes a full-width crop of `public/images/hero/buckfin1.JPG`, biased toward the top (`TOP_BIAS = 0.2`, so the apex sits about 40px below the top edge), resizes it to 1200x630 and writes JPEG q82 (mozjpeg). It adds no text and no generated pixels. Output: `public/images/social/og-default.jpg`, 1200x630, 99,087 B. Two runs produced the same sha256 (`39048896…c3bc9d`). `layout.tsx` OG metadata now points to it with alt "Cedar gable patio cover with white trusses and recessed lighting in McKinney, Texas, built by Structure1 Builds", and LocalBusiness schema `image` uses it too. | `scripts/generate-og-image.mjs`, `public/images/social/og-default.jpg`, `src/app/layout.tsx` |

Forms, tracking, pricing, offers, routes, the favicon and conversion behavior were not touched.

## Additional parent corrections

- Blog heroes and ArticleCard now use `sourceFocalStyle` so Markdown file paths inherit the reviewed registry crops. The byte-identical legacy `cover2.JPG` path resolves to the canonical gable crop rather than a separate project. Unknown paths retain the default crop.
- Plano and lean-to project galleries now lead with their selected completed-cover photo rather than an uncovered slab or ceiling detail. A regression test checks that every project's first gallery image equals its selected cover.

## Initial implementation tests

The new file is `tests/unit/photo-placement.test.mjs`, with 14 tests. It covers: all registry files exist; no file appears in two projects' galleries (checked by hash); one test per item 1–11; and that the OG file's real pixel dimensions match what the layout declares.

- RED: before the fix, 13 of the 14 failed, each for the defect it targets. For example: `free-standing-modern-patio-cover shows pergola-lewisville-2, the same file as gable-mckinney-2 in classic-gable-patio-cover`. The file-existence check passed from the start.
- GREEN: 14/14 pass.
- Full unit suite (`node --test "tests/unit/*.test.mjs"`): 91/91 pass (the 77 existing plus 14 new).
- `tsc --noEmit`: clean. `next lint`: no warnings or errors.
- Not run: the e2e suite (35 tests), `next build` and any server, because the brief does not allow a server or build. These still need to be checked after the parent's clean build.

Note on process: the tests were written as one RED batch and then fixed in one GREEN pass, not as strict one-slice-at-a-time cycles.

## Final independent parent acceptance

- Final production build, lint and TypeScript checks passed.
- Final unit suite: **93 passed, 0 failed**. Browser regression suite: **35 passed, 0 failed**.
- All **47 sitemap pages** checked at desktop and mobile widths, both on the live baseline and the corrected local version. No unloaded construction photographs or horizontal overflow remained. Third-party map tiles were intentionally blocked and excluded from construction-photo failures.
- The four initially slow/lazy blog images loaded correctly when revisited after fonts and lazy-image decoding settled; they were not broken assets.
- All **12 project galleries** exercised at both widths: **72 photo-open checks** passed, including exact photo source/alt, uncropped object-contain lightbox rendering, Escape and focus return.
- Native Chrome review confirmed the carport peak, wide blog crop, mobile city caption and intended fonts. The true 1200x630 social derivative was visually inspected.
- Corrected version remains local at http://localhost:4173. No commit, push, PR or deployment was performed for this pass.

## Questions for the owner

1. **Forney stamped gallery.** Photos 2 (`stamped concrete 4.jpeg`) and 4 (`stamped concrete 6.jpeg`) show different properties from the covered Forney patio. Which jobs and cities are they from? They are now unused, and their alts carry no location.
2. **Uncovered slab (`jeff1.jpg`).** Is this the Forney lean-to job before the cover went up, or another job? It is removed from the lean-to gallery until you confirm.
3. **Exact cities for reused photos.** City pages use DFW-wide example photos (e.g. the Lewisville cover on the Frisco page), now labelled "DFW project example". Confirm the cities for: `cover1.JPG` (Lewisville), `cover2.JPG`, `buckfin1.JPG` / `debrabuck.JPG` (McKinney), and `concrete1–6`. These were not relabelled.
4. **Wood-plank proof.** No photo in the reviewed website catalog visibly demonstrates wood-plank stamping. The service is still offered; please send a project photo if you have one.
5. **Interior remodeling proof.** The remodeling service shows outdoor work (the carport, the McKinney framing, the Plano framing). It also advertises outdoor additions, so these photos are not presented as proof of interior remodeling. Do you have real interior remodel photos?
6. **`stamped-random-stone` / `stamped-stone-texture`.** Both are registered but now unused. Keep them for future use, or delete them?
