import { ATTRIBUTION_FIELDS, type Attribution } from './attribution';
import type { LeadValues } from './lead-validation';
import { matchingOfferLabel } from './offer';

export type LeadInput = { values: LeadValues; photos: Blob[]; botField: string; attribution: Attribution; formPage: string };

/**
 * The exact fields POSTed to Netlify Forms. Built from validated values rather than the raw form, so
 * nothing unregistered leaks in. Every key here must also appear in public/__forms.html, or Netlify
 * drops it silently (tests/unit/lead-payload.test.mjs checks this).
 *
 * `service` is what the homeowner asked for. The `offer` field is the ad or link they arrived from,
 * kept for attribution even when they then chose something else; the subject names the offer only
 * when it agrees with the service.
 */
export function buildLeadEntries({ values, photos, botField, attribution, formPage }: LeadInput): [string, string | Blob][] {
  const offer = matchingOfferLabel(attribution.offer, values.service);
  const entries: [string, string | Blob][] = [
    ['form-name', 'contact'],
    ['bot-field', botField],
    ['name', values.name],
    ['phone', values.phone],
    ['email', values.email],
    ['city', values.city],
    ['service', values.service],
    ['timeline', values.timeline],
    ['message', values.message],
    ['subject', `New Estimate Lead: ${values.name} — ${values.service}${offer ? ` (${offer})` : ''}`],
    ['referralSource', 'website'],
    ['form_page', formPage],
  ];
  photos.forEach((p, i) => entries.push([`photo${i + 1}`, p]));
  for (const k of ATTRIBUTION_FIELDS) {
    const v = attribution[k];
    if (v) entries.push([k, v]);
  }
  return entries;
}
