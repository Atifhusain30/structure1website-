# TDD log: conversion readiness (fix/conversion-readiness)

These excerpts are copied from real runs on 2026-11-11 (Node v24.11.1, Windows). The shell sandbox
did not allow writing test output straight to files, so this log was assembled from what the console printed.
Each RED run was against a stub that had the right export but no behavior, so the failures are
assertion failures, not missing-import or syntax errors.

## Slice 1: field validation (`src/lib/lead-validation.ts`)
RED: `node --test tests/unit/lead-validation.test.mjs`
```
✖ a complete, normal submission has no errors and is trimmed   (+ '' - 'Pat Homeowner')
✖ common US phone formats are accepted and normalized          (normalized 2145550123: + '' - '(214) 555-0123')
✖ a phone extension is kept, not rejected
✖ phone numbers that cannot be a US number are rejected         (accepted 555-0123)
✖ malformed emails are rejected; ordinary ones accepted         (accepted pat)
✖ whitespace-only required fields are reported per field        (+ [] - ['city','email','name','phone','service'])
✔ timeline and message stay optional
ℹ pass 1  ℹ fail 6
```
GREEN: `ℹ pass 7  ℹ fail 0`

## Slice 2: photo limits (`checkPhotos`)
RED:
```
✖ the empty placeholder a blank file input submits is ignored
✖ a fourth photo is rejected with an error, not silently dropped  (did not match /up to 3/i)
✖ photos over 7 MB combined are rejected                          (did not match /7 MB/)
✖ non-image files are rejected by MIME type and extension
ℹ pass 3  ℹ fail 4
```
GREEN: `ℹ pass 14  ℹ fail 0` (whole unit suite)

## Slice 3: attribution (`src/lib/attribution.ts`)
RED: `ℹ pass 0  ℹ fail 8` (all assertion failures; one TypeError reading `.length` of a missing value)
GREEN: `ℹ pass 22  ℹ fail 0`

Follow-up regression (on-site `?offer=` link wiped the stored ad source):
```
✖ an on-site offer link adds the offer without discarding the ad source
  + undefined  - 'facebook'
ℹ pass 8  ℹ fail 1
```
GREEN: `ℹ pass 38  ℹ fail 0`

## Slice 4: Netlify payload contract (`src/lib/lead-payload.ts`, `public/__forms.html`)
RED (stub returned no entries): `ℹ pass 1  ℹ fail 5`
After the builder was implemented, the contract test still failed until the fields were registered:
```
✖ every field the form can send is registered in public/__forms.html
  unregistered fields would be silently dropped by Netlify: form_page, utm_source, utm_medium,
  utm_campaign, utm_content, utm_term, gclid, fbclid, offer, package, size, landing_page, referrer_origin
```
GREEN after registering them: `ℹ pass 28  ℹ fail 0`

## Slice 5: submit guard and Lead semantics (`src/lib/lead-submit.ts`)
RED:
```
✔ a successful response records exactly one Lead
✖ an HTTP error response records no Lead and reports failure
✖ a network failure records no Lead and reports failure instead of throwing   (TypeError: Failed to fetch)
✖ a retry after a failure can still succeed
✖ a second submit while the first is in flight is ignored (no double POST)
✖ submits after a success are ignored, so Lead never fires twice
✖ a broken tracker does not turn a delivered lead into an error               (Error: fbq blew up)
ℹ pass 1  ℹ fail 6
```
GREEN: `ℹ pass 35  ℹ fail 0`

## Slice 6: branding (`src/content/company.ts`)
RED: `✖ the public business name is Structure1 Builds  + 'Structure1 Construction' - 'Structure1 Builds'`
GREEN after the rename (metadata now derives from `company.name`).

## Browser suite (`tests/e2e/conversion.e2e.mjs`) against `next start` of a fresh build
RED, run before the UI changes (branding was already fixed by slice 6):
```
✔ public branding says Structure1 Builds
✖ privacy policy lists the configured company email, not an unconfigured inbox
✖ the / form links to the privacy policy
✖ the /estimate form links to the privacy policy
✖ the /contact form links to the privacy policy
✖ mobile hero leads with an estimate CTA that keyboard users can follow to the form
✖ an invalid phone is announced on the field, focused, and nothing is sent
✖ an invalid email is flagged and blocks the POST
✖ photo limits are stated up front and a fourth photo is refused, not dropped
✖ campaign context reaches the Netlify payload; double submit sends once and Lead fires once
✖ a plain visit falls back to the generic website source
✔ a server error keeps the entered data, shows the phone fallback, and fires no Lead; retry works
✔ a network failure fires no Lead
✔ a phone tap records Contact (a tap, not a completed call)
ℹ pass 4  ℹ fail 10
```
The three passing behavior tests describe existing behavior that had to be kept; they were never RED.
In the first GREEN run one test still failed because of a bug in the test itself (`/Pat/` matched the
"Patio Covers" service name in the Lead event), so the regex was tightened to real contact values.
`ad params on a non-form landing page survive client-side navigation` was added **after**
`AttributionCapture` was written, so it is a characterization test, not test-first.

Final GREEN: `npm run test:e2e` gave `ℹ tests 15  ℹ pass 15  ℹ fail 0`

---

# Pass 2 (corrective, after independent review), 2026-11-11

Excerpts copied from the console. Unit RED runs were against the real pre-fix code, except where a
new helper did not exist yet (noted as `TypeError: … is not a function`).

## Copy and branding (`tests/unit/copy.test.mjs`, new)
RED:
```
✖ no public source, blog post or image alt text still says Structure1 Construction
  + 'content/blog/best-patio-cover-materials-texas.md:9', … 17 lines across 8 blog posts
✖ the rename left no glued sentences, awkward possessives or "Builds builds"
  + [ 'src/app/contact/page.tsx:9', 'src/app/privacy/page.tsx:8' ]
✖ terms refer to "the Structure1 Builds website"
✖ privacy policy discloses the stored campaign context accurately   (expected /sessionStorage|session storage/i)
✔ privacy policy keeps the owner-pending advanced matching sentence unchanged
ℹ pass 1  ℹ fail 4
```
The passing test is a guard that the owner-pending hashing sentence is left alone; it was never meant to go RED.
GREEN: `ℹ pass 5  ℹ fail 0`

## Photo compatibility (`tests/unit/photos.test.mjs`)
RED:
```
✖ genuine photos with less common names are accepted: .jfif, .avif and extensionless JPEGs
  AssertionError: rejected IMG_2041.jfif (image/jpeg)
✔ vector and markup files are refused even when the browser calls them images
✖ the rejection message lists the accepted photo types, including AVIF
ℹ pass 8  ℹ fail 2
```
The SVG/HTML test already passed: it guards against the relaxation letting unsafe types through.
GREEN: `ℹ pass 10  ℹ fail 0`

## Stalled request timeout and wording (`tests/unit/lead-submit.test.mjs`)
Uses injected manual timers, so no real 30 s wait.
RED:
```
✖ a request that never answers times out, aborts the fetch, records no Lead and can be retried
  TypeError: Cannot read properties of undefined (reading 'ms')      (no timer was ever set)
✖ the timeout timer is cleared when the request settles, so it cannot fire later
  actual: 0                                                            (no timer to clear)
ℹ pass 6  ℹ fail 2
```
The "late answer" and "failure message" tests did not report in that run: the late-answer test awaits a
submit that never settles without a timeout, so the runner ended with it pending. GREEN after the change:
`ℹ pass 11  ℹ fail 0`

## Offer context vs. selected service (`tests/unit/offer.test.mjs`, new; `src/lib/offer.ts`)
RED (empty `offer.ts` stub; real `lead-payload.ts`):
```
✖ (7 offerNotice / serviceForOffer tests)   TypeError: offerNotice / serviceForOffer is not a function
✖ the selected service is authoritative: a conflicting ad offer is not named in the subject
  actual: 'New Estimate Lead: Pat Homeowner — Concrete (Patio cover + outdoor kitchen)'
✔ a matching offer is still named in the subject
ℹ pass 1  ℹ fail 8
```
GREEN: full suite `ℹ tests 59  ℹ pass 59  ℹ fail 0`

## Query-only navigation plumbing (`captureTouch` in `tests/unit/attribution.test.mjs`)
RED: `✖ each captured URL change is recorded and announced…  TypeError: captureTouch is not a function` (2 tests)
GREEN: `ℹ pass 11  ℹ fail 0`

## Final pass-2 checks
```
npm test               ℹ tests 61  ℹ pass 61  ℹ fail 0
npm run lint           ✔ No ESLint warnings or errors
npx tsc --noEmit -p .  (no output, clean)
node --check tests/e2e/conversion.e2e.mjs   OK (syntax only)
```
**Not run:** `next build` and `npm run test:e2e`. The parent's preview server was serving a stale
build and was not to be stopped or tested. The new browser tests (query-only offer navigation with a
no-remount marker, offer/service conflict, stalled request via `page.clock`, AVIF/JFIF/SVG photos,
blog branding, privacy email compared to `company.email`) have **no RED or GREEN run yet**. The
component wiring in `EstimateForm` and `AttributionCapture` is covered only by those browser tests.
