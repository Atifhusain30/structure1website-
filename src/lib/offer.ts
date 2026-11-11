// How an `?offer=` link relates to what the visitor actually asks for. The offer records where they
// came from (kept for sales attribution); the project type they select is what they want quoted.
import { OFFERS, type OfferKey } from './attribution';

const known = (offer: string | undefined): offer is OfferKey => !!offer && Object.prototype.hasOwnProperty.call(OFFERS, offer);

/**
 * The offer label to show above the form, or null. Hidden once the selected project type differs,
 * so a visitor from a kitchen ad who picks Concrete is not told they are asking about a kitchen.
 */
export function offerNotice(offer: string | undefined, service: string): string | null {
  if (!known(offer)) return null;
  return !service || service === OFFERS[offer].service ? OFFERS[offer].label : null;
}

/** The offer label only when it agrees with the selected service; used for the lead subject. */
export function matchingOfferLabel(offer: string | undefined, service: string): string | undefined {
  return known(offer) && OFFERS[offer].service === service ? OFFERS[offer].label : undefined;
}

/**
 * The project type to select after the offer is (re)read. On first load an offer only fills an
 * empty select. Following a link to a different offer is a deliberate choice, so the select follows
 * it; any other navigation leaves the visitor's own choice alone.
 */
export function serviceForOffer({ previous, next, current, initial, available }: { previous: string | undefined; next: string | undefined; current: string; initial: boolean; available: string[] }): string {
  if (!known(next)) return current;
  const target = OFFERS[next].service;
  if (!available.includes(target)) return current;
  if (initial) return current || target;
  return next !== previous ? target : current;
}
