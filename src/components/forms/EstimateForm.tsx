'use client';
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { services } from '@/content/services';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';
import { trackLead } from '@/lib/track';
import { ATTRIBUTION_EVENT, recordTouch, sessionStore, type Attribution } from '@/lib/attribution';
import { checkPhotos, FIELD_ORDER, PHOTO_TYPES, validateLead, type FieldErrors, type LeadField } from '@/lib/lead-validation';
import { buildLeadEntries } from '@/lib/lead-payload';
import { createLeadSubmitter, failureMessage } from '@/lib/lead-submit';
import { offerNotice, serviceForOffer } from '@/lib/offer';

const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', 'Just planning'];
const field = 'h-12 w-full rounded border border-gray-400 bg-white px-4 text-body text-black placeholder:text-gray-500 focus:border-black focus:outline-none aria-[invalid=true]:border-red-500';
const label = 'mb-1.5 block text-meta font-medium text-gray-700';

const currentAttribution = () => recordTouch(window.location.href, document.referrer, sessionStore());

/**
 * The lead form. The full version (the /estimate and /contact pages) asks for timeline and photos;
 * `compact` drops those, plus the trailing reply-time note, for the card inside the home-page hero,
 * whose intro already makes that promise. The root carries `data-estimate-form` so the mobile
 * StickyBar can stay out of the way while the form is on screen.
 *
 * Validation here is for the homeowner's benefit (typos, oversized photos); it is not a security
 * boundary. Submissions go to Netlify Forms as multipart POSTs to /__forms.html, whose field list
 * must match src/lib/lead-payload.ts.
 */
export default function EstimateForm({ cta = 'Request My Estimate', compact = false }: { cta?: string; compact?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [offer, setOffer] = useState<string | undefined>();
  const [service, setService] = useState('');
  const offerRef = useRef<string | undefined>();
  const serviceRef = useRef<HTMLSelectElement>(null);
  // Created once per form, so its in-flight guard holds across re-renders.
  const [submit] = useState(() =>
    createLeadSubmitter<FormData>({
      post: (body, signal) => fetch('/__forms.html', { method: 'POST', body, signal }),
      onSent: (body) => trackLead(String(body.get('service') ?? '')),
    }),
  );
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  // For links like /estimate?offer=patio-kitchen, show and preselect what was asked for. The form
  // stays mounted through query-only navigation, so it also follows AttributionCapture's updates.
  useEffect(() => {
    const apply = (a: Attribution, initial: boolean) => {
      const select = serviceRef.current;
      const current = select?.value ?? '';
      const available = select ? Array.from(select.options, (o) => o.value).filter(Boolean) : [];
      const next = serviceForOffer({ previous: offerRef.current, next: a.offer, current, initial, available });
      if (select && next !== current) select.value = next;
      offerRef.current = a.offer;
      setOffer(a.offer);
      setService(next);
    };
    apply(currentAttribution(), true);
    const onTouch = (e: Event) => apply((e as CustomEvent<Attribution>).detail, false);
    window.addEventListener(ATTRIBUTION_EVENT, onTouch);
    return () => window.removeEventListener(ATTRIBUTION_EVENT, onTouch);
  }, []);
  const notice = offerNotice(offer, service);

  const invalid = (name: LeadField) => ({
    'aria-invalid': fieldErrors[name] ? true : undefined,
    'aria-describedby': fieldErrors[name] ? id(`${name}-error`) : undefined,
  });
  const fieldError = (name: LeadField) =>
    fieldErrors[name] ? (
      <p id={id(`${name}-error`)} className="mt-1.5 text-meta text-red-700">
        {fieldErrors[name]}
      </p>
    ) : null;

  // Clear a field's message once the visitor starts fixing it.
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as LeadField;
    if (name === 'service') setService(target.value);
    if (name === 'photos') {
      const files = Array.from(target.files ?? []);
      setFieldErrors((errs) => ({ ...errs, photos: checkPhotos(files).error }));
    } else if (fieldErrors[name]) {
      setFieldErrors((errs) => ({ ...errs, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const { values, errors } = validateLead(Object.fromEntries(data.entries()));
    const photoFiles = data.getAll('photos').filter((f): f is File => f instanceof File);
    const photos = checkPhotos(photoFiles);
    if (photos.error) errors.photos = photos.error;
    setFieldErrors(errors);
    const first = FIELD_ORDER.find((k) => errors[k]);
    if (first) {
      setError('Please check the highlighted field' + (Object.keys(errors).length > 1 ? 's.' : '.'));
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const body = new FormData();
    const entries = buildLeadEntries({ values, photos: photos.photos, botField: String(data.get('bot-field') ?? ''), attribution: currentAttribution(), formPage: window.location.pathname });
    for (const [k, v] of entries) {
      if (typeof v === 'string') body.append(k, v);
      else body.append(k, v, (v as File).name);
    }
    setError(null);
    setState('sending');
    const result = await submit(body);
    if (result === 'sent') setState('sent');
    else if (result === 'failed') {
      setState('idle');
      setError(failureMessage(company.phone));
    }
  };

  if (state === 'sent') {
    return (
      <div className={cn('border border-gray-200 text-center', compact ? 'p-6' : 'p-8')} role="status" data-estimate-form="">
        <Check className="mx-auto h-8 w-8" aria-hidden />
        {compact ? <h3 className="mt-4 font-display text-h3">Request received</h3> : <h2 className="mt-4 font-display text-h2">Request received</h2>}
        <p className="mt-3 text-body text-gray-700">
          We will reach out within one business day. For urgent projects, call{' '}
          <a href={`tel:${company.phoneRaw}`} className="font-medium underline underline-offset-4">
            {company.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      className={compact ? 'space-y-4' : 'space-y-5'}
      data-estimate-form=""
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {notice && (
        <p className="border-l-2 border-black pl-3 text-small text-gray-700">
          You&apos;re asking about: <span className="font-medium text-black">{notice}</span>
        </p>
      )}
      <p className="text-meta text-gray-500">Fields marked * are required.</p>
      <div className={cn('grid sm:grid-cols-2', compact ? 'gap-4' : 'gap-5')}>
        <div>
          <label htmlFor={id('name')} className={label}>
            Name <span className="text-gray-500">*</span>
          </label>
          <input id={id('name')} name="name" type="text" autoComplete="name" required className={field} {...invalid('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>
            Phone <span className="text-gray-500">*</span>
          </label>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} {...invalid('phone')} />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email <span className="text-gray-500">*</span>
          </label>
          <input id={id('email')} name="email" type="email" autoComplete="email" required className={field} {...invalid('email')} />
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor={id('city')} className={label}>
            {compact ? 'City' : 'Project address or city'} <span className="text-gray-500">*</span>
          </label>
          <input id={id('city')} name="city" type="text" autoComplete="address-level2" required placeholder="Frisco, Plano, Dallas…" className={field} {...invalid('city')} />
          {fieldError('city')}
        </div>
        <div className={compact ? 'sm:col-span-2' : undefined}>
          <label htmlFor={id('service')} className={label}>
            Project type <span className="text-gray-500">*</span>
          </label>
          <select ref={serviceRef} id={id('service')} name="service" required defaultValue="" className={field} {...invalid('service')}>
            <option value="" disabled>
              Select a project type
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {fieldError('service')}
        </div>
        {!compact && (
          <div>
            <label htmlFor={id('timeline')} className={label}>
              Timeline
            </label>
            <select id={id('timeline')} name="timeline" defaultValue="" className={field}>
              <option value="">When would you like to start?</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className={label}>
            Project description <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={compact ? 3 : 4}
            placeholder={compact ? 'What are you planning?' : 'Size, style, what you want to use the space for — anything that helps us prepare.'}
            className={cn(field, 'h-auto py-3')}
          />
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            <label htmlFor={id('photos')} className={label}>
              Photos of the space (optional)
            </label>
            <p id={id('photos-hint')} className="mb-2 text-meta text-gray-500">
              Up to 3 photos, 7 MB total. {PHOTO_TYPES}.
            </p>
            <input
              id={id('photos')}
              name="photos"
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              aria-invalid={fieldErrors.photos ? true : undefined}
              aria-describedby={fieldErrors.photos ? `${id('photos-hint')} ${id('photos-error')}` : id('photos-hint')}
              className="block w-full text-small text-gray-700 file:mr-4 file:h-10 file:border file:border-gray-200 file:bg-white file:px-4 file:text-sm file:font-medium"
            />
            {fieldError('photos')}
          </div>
        )}
      </div>
      {error && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-small text-red-700" role="alert" aria-live="polite">
          {error}
        </p>
      )}
      <div className={cn('flex flex-col gap-4', compact ? 'sm:gap-3' : 'sm:flex-row sm:items-center')}>
        <button
          type="submit"
          disabled={state === 'sending'}
          className={cn('inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-white hover:bg-charcoal disabled:opacity-60', compact && 'w-full')}
        >
          {state === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            cta
          )}
        </button>
        <p className="text-meta text-gray-500">
          {!compact && 'We reply within one business day. No spam, no obligation. '}
          We use these details to reply about your project.{' '}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy policy
          </Link>
        </p>
      </div>
    </form>
  );
}
