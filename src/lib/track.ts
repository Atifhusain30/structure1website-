// Meta Pixel helpers. Every call is a no-op until the pixel script has loaded,
// and on the server, so callers never need to guard.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1762435988348720';

type Fbq = (command: 'init' | 'track' | 'trackCustom', name: string, params?: Record<string, unknown>) => void;

function fbq(): Fbq | null {
  if (typeof window === 'undefined') return null;
  const fn = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fn === 'function' ? fn : null;
}

export function trackPageView() {
  fbq()?.('track', 'PageView');
}

/** A submitted estimate request. This is the event the Leads campaign optimizes for. */
export function trackLead(service?: string) {
  fbq()?.('track', 'Lead', service ? { content_name: service, content_category: 'estimate' } : undefined);
}

/** A tap on any tel: link (someone starting a phone call). */
export function trackCall(source: string) {
  fbq()?.('track', 'Contact', { content_name: 'phone', content_category: source });
}
