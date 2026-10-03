'use client';
import { useId, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { services } from '@/content/services';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', 'Just planning'];
const field = 'h-12 w-full rounded border border-gray-200 bg-white px-4 text-body text-black placeholder:text-gray-500 focus:border-black focus:outline-none';
const label = 'mb-1.5 block text-meta font-medium text-gray-700';

/**
 * The lead form. The full version (the /estimate and /contact pages) asks for timeline and photos;
 * `compact` drops those, plus the trailing reply-time note, for the card inside the home-page hero,
 * whose intro already makes that promise. The root carries `data-estimate-form` so the mobile
 * StickyBar can stay out of the way while the form is on screen.
 */
export default function EstimateForm({ cta = 'Request My Estimate', compact = false }: { cta?: string; compact?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const required = ['name', 'phone', 'email', 'city', 'service'];
    if (required.some((k) => !String(data.get(k) ?? '').trim())) {
      setError('Please fill in your name, phone, email, city, and project type.');
      return;
    }
    const files = (data.getAll('photos') as File[]).filter((f) => f && f.size > 0).slice(0, 3);
    data.delete('photos');
    const total = files.reduce((n, f) => n + f.size, 0);
    if (total > 7 * 1024 * 1024) {
      setError('Photos add up to more than 7 MB. Please pick fewer or smaller photos, or send them after we reply.');
      return;
    }
    files.forEach((f, i) => data.set(`photo${i + 1}`, f));
    data.set('subject', `New Estimate Lead: ${data.get('name')} — ${data.get('service')}`);
    data.set('referralSource', 'website');
    setState('sending');
    setError(null);
    try {
      const res = await fetch('/__forms.html', { method: 'POST', body: data });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
    } catch {
      setState('error');
      setError(`Something went wrong. Call ${company.phone} and we will help directly.`);
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
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" encType="multipart/form-data" onSubmit={onSubmit} noValidate className={compact ? 'space-y-4' : 'space-y-5'} data-estimate-form="">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>
      <div className={cn('grid sm:grid-cols-2', compact ? 'gap-4' : 'gap-5')}>
        <div>
          <label htmlFor={id('name')} className={label}>
            Name <span className="text-gray-500">*</span>
          </label>
          <input id={id('name')} name="name" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>
            Phone <span className="text-gray-500">*</span>
          </label>
          <input id={id('phone')} name="phone" type="tel" autoComplete="tel" required className={field} />
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email <span className="text-gray-500">*</span>
          </label>
          <input id={id('email')} name="email" type="email" autoComplete="email" required className={field} />
        </div>
        <div>
          <label htmlFor={id('city')} className={label}>
            {compact ? 'City' : 'Project address or city'} <span className="text-gray-500">*</span>
          </label>
          <input id={id('city')} name="city" type="text" autoComplete="address-level2" required placeholder="Frisco, Plano, Dallas…" className={field} />
        </div>
        <div className={compact ? 'sm:col-span-2' : undefined}>
          <label htmlFor={id('service')} className={label}>
            Project type <span className="text-gray-500">*</span>
          </label>
          <select id={id('service')} name="service" required defaultValue="" className={field}>
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
            Project description
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
              Photos of the space (optional, up to 3)
            </label>
            <input
              id={id('photos')}
              name="photos"
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-small text-gray-700 file:mr-4 file:h-10 file:border file:border-gray-200 file:bg-white file:px-4 file:text-sm file:font-medium"
            />
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
        {!compact && <p className="text-meta text-gray-500">We reply within one business day. No spam, no obligation.</p>}
      </div>
    </form>
  );
}
