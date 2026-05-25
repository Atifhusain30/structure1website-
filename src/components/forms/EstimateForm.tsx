'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

interface EstimateFormProps {
  /** Retained for backwards compat — form is always rendered as a white card. */
  variant?: 'inline' | 'dark' | 'card';
  heading?: string;
  subheading?: string;
  cta?: string;
}

const SERVICES = [
  'Patio Cover',
  'Pergola',
  'Outdoor Kitchen',
  'Stamped / Decorative Concrete',
  'Driveway / Walkway',
  'New Build or Remodel',
  'Other',
];

export default function EstimateForm({
  heading,
  subheading,
  cta = 'Request My Free Estimate',
}: EstimateFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    city: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': '',
        subject: `New Estimate Lead: ${form.name} — ${form.service || 'General'}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: `City: ${form.city}\n\n${form.message}`,
        contactMethod: '',
        referralSource: 'website',
      }).toString();

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Call (580) 665-2758 and we will help directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-4 py-3.5 bg-white border border-stone/20 text-rich-black placeholder:text-stone/45 ' +
    'focus:border-gold focus:ring-2 focus:ring-gold/15 focus:outline-none ' +
    'transition-all duration-200 font-sans text-[15px] rounded-sm';

  const labelCls = 'block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-stone mb-2';

  if (submitted) {
    return (
      <div className="bg-white border border-border p-12 lg:p-14 text-center shadow-subtle rounded-sm">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/40 bg-gold/5 flex items-center justify-center">
          <Check className="w-7 h-7 text-gold" strokeWidth={1.8} />
        </div>
        <h3 className="font-display text-[32px] font-medium text-rich-black leading-[1.1] mb-3">
          Request received.
        </h3>
        <p className="text-stone font-sans max-w-md mx-auto leading-[1.65]">
          A member of our team will reach out within one business day. For urgent projects, call{' '}
          <a href="tel:5806652758" className="text-gold font-semibold underline-offset-4 hover:underline">
            (580) 665-2758
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
      onSubmit={onSubmit}
      className="bg-white border border-border p-7 md:p-9 lg:p-10 shadow-subtle rounded-sm"
      noValidate
    >
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <input type="hidden" name="form-name" value="contact" />

      {(heading || subheading) && (
        <div className="mb-7 lg:mb-8 pb-7 border-b border-border">
          {heading && (
            <h3 className="font-display text-[26px] md:text-[30px] font-medium text-rich-black leading-[1.15] mb-2">
              {heading}
            </h3>
          )}
          {subheading && <p className="text-stone font-sans text-[15px] leading-[1.55]">{subheading}</p>}
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-3 px-4 py-3 border border-red-300 bg-red-50 rounded-sm">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-700 text-sm font-sans">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ef-name" className={labelCls}>
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="ef-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            placeholder="John Smith"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="ef-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="ef-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            placeholder="(555) 123-4567"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="ef-email" className={labelCls}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="ef-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="you@email.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="ef-city" className={labelCls}>
            City
          </label>
          <input
            id="ef-city"
            name="city"
            type="text"
            value={form.city}
            onChange={onChange}
            placeholder="Frisco, Plano, Dallas…"
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-service" className={labelCls}>
            Project Type
          </label>
          <select
            id="ef-service"
            name="service"
            value={form.service}
            onChange={onChange}
            className={`${inputCls} appearance-none cursor-pointer pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236E6A62' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ef-message" className={labelCls}>
            Project Notes
          </label>
          <textarea
            id="ef-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={onChange}
            placeholder="Size, style, timeline, budget — anything that helps us prepare."
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-rich-black hover:bg-gold hover:text-rich-black text-white px-7 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[12px] transition-all duration-300 disabled:opacity-70 group rounded-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              {cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-stone text-[12px] font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>
            We reply within 1 business day · No spam · Or call{' '}
            <a href="tel:5806652758" className="text-rich-black hover:text-gold font-semibold underline-offset-4 hover:underline">
              (580) 665-2758
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}

