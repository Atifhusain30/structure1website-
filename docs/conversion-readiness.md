# Conversion readiness: Structure1 Builds

Prepared on branch `fix/conversion-readiness`; not deployed. This is not a redesign: the layout, photos and copy stay as they were, except where noted.
RED/GREEN evidence is in [evidence/tdd-log.md](evidence/tdd-log.md).

## What changed

| Area | Before | Now |
|---|---|---|
| Field validation | `noValidate` and a single check that fields weren't empty, so `call me` / `pat@` went through | Explicit checks in `src/lib/lead-validation.ts`. Accepts US numbers with optional `+1`/`1`, any punctuation, and an `ext`/`x`/`#` extension, and normalizes them to `(214) 555-0123`. Uses a pragmatic email check. Trims everything. Each field gets its own message (`aria-invalid` + `aria-describedby`), focus moves to the first bad field, and a summary alert appears. Messages clear as the field is edited. |
| Double submit | Only the disabled button, which takes effect after a React re-render | `createLeadSubmitter` (`src/lib/lead-submit.ts`) keeps a plain in-flight/sent guard, so a second submit in the same tick is ignored |
| Failure handling | Generic error; a stalled POST left the button on "Sending…" forever | Any failure (HTTP error, network error, or no answer within 30 s, after which the fetch is aborted via `AbortController`) shows: "We could not confirm that your request went through", says the details are still in the form, and gives the phone number. It no longer claims the request was *not* sent, because a dropped connection or timeout does not prove Netlify never received it. The form returns to a retryable state, no Lead fires, and a response arriving after the timeout is ignored. |
| Photos | `slice(0,3)` silently dropped a 4th photo | Limits shown before choosing ("Up to 3 photos, 7 MB total. JPG, PNG, HEIC, WebP, or AVIF."). More than 3, over 7 MB, or non-photo files are refused with a message on the field. Nothing is truncated. Photos stay optional. Accepted: raster photo MIME types (JPEG incl. `.jfif`, PNG, WebP, GIF, HEIC/HEIF, AVIF) with a photo extension or no extension at all; a blank MIME type (common for iPhone HEIC) only with a photo extension. Refused: SVG (`image/svg+xml`), HTML, executables, and any photo MIME type on a non-photo extension such as `.html`. |
| Lead context | Only `referralSource=website` | Allowlisted, bounded attribution (`src/lib/attribution.ts`): `utm_source/medium/campaign/content/term`, `gclid`, `fbclid`, `offer`, `package`, `size`, `landing_page` (path only), `referrer_origin` (origin only), and `form_page`. Other query params are never read. UTM values containing `@` are dropped. Stored in sessionStorage, with an in-memory fallback when storage is blocked. A new source (utm/gclid/fbclid) replaces the stored touch entirely; an on-site `?offer=` link only updates the offer. `referralSource=website` is kept as the generic fallback. |
| Offer links | none | `/estimate?offer=patio-cover` or `?offer=patio-kitchen` shows "You're asking about: …" and preselects Patio Covers or Outdoor Living. Labels only: no prices, packages or terms. Unknown offers are ignored. `AttributionCapture` re-runs on query changes as well as path changes (`useSearchParams` inside a `Suspense` boundary around an invisible component, so pages and the form stay in the server HTML), and the open form follows it: a client-side link from `?offer=patio-cover` to `?offer=patio-kitchen` updates the notice and switches the project type to the new offer while keeping everything else typed; new UTMs on a query-only change are recorded. |
| Offer vs. request | — | The **selected project type is what the homeowner wants quoted**. The `offer` field is *originating context* (which ad or link they arrived from), kept on the lead for sales attribution even when they pick something else; it is not the final scope. The "You're asking about" notice hides as soon as the selected project type differs from the offer, and the lead subject names the offer only when it agrees with `service`. Example: arrive from `?offer=patio-kitchen`, choose Concrete → subject `New Estimate Lead: Pat — Concrete`, `service=Concrete`, `offer=patio-kitchen`. |
| Netlify contract | — | Every payload key is registered in `public/__forms.html`. A unit test fails if they drift. The form still POSTs multipart to `/__forms.html` with `form-name=contact` and the `bot-field` honeypot. |
| Privacy | No link at the forms. Policy listed `info@structure1.com`. | Every form (home hero card, /estimate, /contact) has "We use these details to reply about your project. Privacy policy". The policy uses `company.email` and discloses the lead-context fields: form page, landing page as a path only, referrer as a domain only, ad campaign labels, Google/Meta ad click identifiers and the requested offer; that they sit in the tab's sessionStorage until the form is sent; and that values are allowlisted, length-limited and email-like labels dropped, without claiming they can never contain personal information. The advanced-matching sentence is untouched (owner item 1). |
| Branding | `Structure1 Construction` in `company.name`, title default/template, OG siteName/alt, page descriptions, Terms, city/service copy, blog body text and featured-image alt text, `llms.txt` | `Structure1 Builds`. Layout metadata now derives from `company.name`. City intros read "We build custom patio covers…". Terms say "the Structure1 Builds website". `tests/unit/copy.test.mjs` fails on any remaining "Structure1 Construction" in `src/`, `content/` or `public/`, and on glued/awkward rename artifacts. The repo, package name, URLs and slugs are unchanged. |
| Mobile hero | Only "See the work"; the form sat below it | Phones get a primary "Get a free estimate" button (`#hero-estimate`, a plain anchor so focus follows), with "See the work" kept as the secondary action. Desktop is unchanged (`lg:hidden`). |
| Tracking | Lead fired after `res.ok` | Same rule, now tested: Lead fires once, only after an OK response. It never fires on validation failure, HTTP error, network error, or a repeat submit. Lead params are only the service name, never contact details. A phone `Contact` event records a tap, not a connected call. |

Files: `src/components/forms/EstimateForm.tsx`, `src/components/home/Hero.tsx`, `src/components/ui/Button.tsx` (adds a `#` anchor case), `src/components/analytics/AttributionCapture.tsx` (new, mounted in `src/app/layout.tsx`), `src/lib/{attribution,lead-validation,lead-payload,lead-submit,offer}.ts` (new), `public/__forms.html`, `src/app/privacy/page.tsx`, branding in `src/content/{company,cities,services}.ts`, `content/blog/*.md`, `src/app/{layout,contact/page,terms/page}.tsx`, `public/llms.txt`, plus `package.json` scripts.

CSP: unchanged, because nothing new loads from a third party.

## How to verify

```
npm test                       # 61 unit tests (node:test + installed TypeScript, no new deps)
npm run lint                   # clean
npx tsc --noEmit -p .          # clean
npm run build                  # parent reran after pass 2: passes (54 generated routes)
npm run start -- -p 3211       # in another terminal
npm run test:e2e               # 20 browser tests (installed Chrome/Edge via playwright-core)
```
**Independent parent verification after pass 2:** 61/61 unit tests and 20/20 browser tests passed; production build, lint, TypeScript and `git diff --check` passed. The parent also ran eight independent local browser checks, including the previously reproduced offer/service subject mismatch, and fetched 47/47 sitemap pages with HTTP 200, one H1 and canonical per page and JSON-LD present. A synthetic nonexistent route returned 404. The local crawl accepts the established short `Structure1` branding and service-focused absolute titles; it rejects missing titles and the old `Structure1 Construction` name. A fresh read-only Opus review returned no security concerns or logic errors. The build reported an outdated Browserslist database warning, not a build failure; dependencies were not updated as part of this scope.
The browser tests abort every non-localhost request, answer `/__forms.html` POSTs with an in-test fixture, and swap the Meta Pixel for a recording stub. No real lead, pixel event or third-party request is sent.
`npm run check` (site-check) was **not** run: it writes reports to `../_site-check`, outside this repo.

## Known issues / not done

- **Validation runs only in the browser.** Netlify Forms does not enforce phone/email format or photo rules. Anyone can POST directly to `/__forms.html`, so treat every submission as untrusted.
- **Without JavaScript** the form has no `action`, so it posts back to the page itself (same as before). Not changed.
- `contactMethod` is still registered in `__forms.html` but never sent. It's harmless and was left alone.
- **A retry after a timeout or network error can create a duplicate lead** if the first request did reach Netlify. The wording says "could not confirm" for that reason; sales should de-duplicate by name/phone.
- An offer remembered in the session is still preselected on a later full page load of another form page (e.g. `/contact`) when the project type is empty. The visitor can change it, and the notice hides once they do.
- `netlify/functions/contact.ts` (legacy Resend endpoint, still branded "Structure1 Construction", sends from `leads@structure1.com`) is not used by the form and was not changed.
- `docs/superpowers/*` historical docs still say "Structure1 Construction". Deliberately not edited.

## Owner must confirm (flagged, not rewritten)

1. **Privacy "hashed in your browser … shared with Meta" sentence.** The site code sends no contact details to Meta: `fbq('init')` has no advanced-matching data, and Lead carries only the service name. The sentence is true only if *automatic advanced matching* is turned on for pixel 1762435988348720 in Events Manager. Check that setting, then keep or remove the sentence.
2. **Universal claims** shown sitewide or in `llms.txt`: "We reply within one business day", "2-year workmanship warranty on every project", "150+ projects", "Licensed & insured", "Permits and engineering handled … in every DFW municipality", "most projects complete in 2–4 weeks", "Free estimate / free itemized estimate".
3. **Price ranges** in `src/content/services.ts`, `llms.txt` and the blog (for example patio covers $8,000–$25,000+, stamped concrete $12–$22/sq ft). These could be stale. They are not repeated anywhere new.
4. **Legal name in Terms of Service** now reads "Structure1 Builds". Confirm that is the right contracting entity.
5. **Offers.** Only `patio-cover` and `patio-kitchen` are allowed, as generic intents. Add others to `OFFERS` in `src/lib/attribution.ts` only after approval. `package`/`size` accept short slugs for sales context and show nothing to the visitor.
6. `company.ts` notes the phone and email are placeholders "owner to replace".

## Google Ads: not implemented on purpose

No AW conversion ID or label was supplied, and no ad spend was authorized, so there are no Google tags, gtag, conversion events or CAPI. The site is **not** Google-Ads-ready. What would be needed:
- A Google Ads account, a conversion action, and its `AW-XXXXXXXXX` ID plus label.
- gtag loaded with consent handling. The CSP in `netlify.toml` would need `https://www.googletagmanager.com` in `script-src`; `img-src`/`connect-src` already allow `https:`.
- A conversion fired in the same place as Meta Lead (`onSent` in `EstimateForm`), so it inherits the once-only, success-only behavior.
- Optional: offline conversion import using the `gclid` that is now saved with each Netlify submission.

## Live verification checklist (after owner approval and deploy — nothing here has been verified yet)

- [ ] Netlify → Forms → `contact` lists the new fields (`form_page`, `landing_page`, `referrer_origin`, `offer`, `package`, `size`, `utm_*`, `gclid`, `fbclid`). Netlify registers fields from `__forms.html` at deploy.
- [ ] One clearly-labelled, owner-approved test submission from the deploy preview arrives in Netlify and in the notification inbox (samuel.c.w.allison@gmail.com) with photos and attribution.
- [ ] A test with `?utm_source=test&offer=patio-cover` shows those values in Netlify. No PII in test URLs.
- [ ] Meta Events Manager → Test Events: one Lead per successful submit, none on a validation error; Contact on a phone tap.
- [ ] On a real phone, the home hero "Get a free estimate" scrolls to the form; the sticky bar still behaves.
- [ ] Privacy page shows the correct inbox, and the advanced-matching sentence is settled (item 1 above).
