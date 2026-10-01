'use client';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { services } from '@/content/services';
import { company } from '@/content/company';

const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', 'Just planning'];
const field = 'h-12 w-full rounded border border-gray-200 bg-white px-4 text-body text-black placeholder:text-gray-500 focus:border-timber focus:outline-none';
const label = 'mb-1.5 block text-meta font-medium text-gray-700';

export default function EstimateForm({ cta = 'Request My Estimate' }: { cta?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const required = ['name', 'phone', 'email', 'city', 'service'];
    if (required.some((k) => !String(data.get(k) ?? '').trim())) {
      setError('Please fill in your name, phone, email, city, and project type.');
      return;
    }
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
      <div className="border border-gray-200 p-8 text-center" role="status">
        <Check className="mx-auto h-8 w-8" aria-hidden />
        <h2 className="mt-4 font-display text-h2">Request received</h2>
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
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" encType="multipart/form-data" onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" />
        </label>
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-name" className={label}>
            Name <span className="text-timber">*</span>
          </label>
          <input id="ef-name" name="name" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="ef-phone" className={label}>
            Phone <span className="text-timber">*</span>
          </label>
          <input id="ef-phone" name="phone" type="tel" autoComplete="tel" required className={field} />
        </div>
        <div>
          <label htmlFor="ef-email" className={label}>
            Email <span className="text-timber">*</span>
          </label>
          <input id="ef-email" name="email" type="email" autoComplete="email" required className={field} />
        </div>
        <div>
          <label htmlFor="ef-city" className={label}>
            Project address or city <span className="text-timber">*</span>
          </label>
          <input id="ef-city" name="city" type="text" autoComplete="address-level2" required placeholder="Frisco, Plano, Dallas…" className={field} />
        </div>
        <div>
          <label htmlFor="ef-service" className={label}>
            Project type <span className="text-timber">*</span>
          </label>
          <select id="ef-service" name="service" required defaultValue="" className={field}>
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
        <div>
          <label htmlFor="ef-timeline" className={label}>
            Timeline
          </label>
          <select id="ef-timeline" name="timeline" defaultValue="" className={field}>
            <option value="">When would you like to start?</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-message" className={label}>
            Project description
          </label>
          <textarea
            id="ef-message"
            name="message"
            rows={4}
            placeholder="Size, style, what you want to use the space for — anything that helps us prepare."
            className={`${field} h-auto py-3`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-photos" className={label}>
            Photos of the space (optional)
          </label>
          <input
            id="ef-photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-small text-gray-700 file:mr-4 file:h-10 file:border file:border-gray-200 file:bg-white file:px-4 file:text-sm file:font-medium"
          />
        </div>
      </div>
      {error && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-small text-red-700" role="alert" aria-live="polite">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex h-12 items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-white hover:bg-charcoal disabled:opacity-60"
        >
          {state === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            cta
          )}
        </button>
        <p className="text-meta text-gray-500">We reply within one business day. No spam, no obligation.</p>
      </div>
    </form>
  );
}
