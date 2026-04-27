'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Loader2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': '',
        subject: `New Lead: ${formData.name} — ${formData.service || 'General Inquiry'}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        contactMethod: '',
        referralSource: '',
      }).toString();

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error('Failed to submit form');
      setIsSubmitted(true);
    } catch {
      setError('There was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-parchment border border-border text-rich-black placeholder:text-text-muted focus:border-gold focus:bg-warm-white transition-colors outline-none font-body';
  const labelClass = 'block text-[11px] font-body font-semibold uppercase tracking-[0.18em] text-text-secondary mb-2';

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-gold" strokeWidth={1.6} />
        </div>
        <h3 className="font-heading font-medium text-2xl text-rich-black mb-3">
          Message Sent
        </h3>
        <p className="text-text-secondary font-body mb-8">
          Thank you for reaching out. We&apos;ll be in touch within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
          }}
          className="text-gold hover:text-gold-dark font-body font-semibold uppercase tracking-[0.18em] text-[11px] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="hidden">
        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
      </p>
      <input type="hidden" name="form-name" value="contact" />

      {error && (
        <div className="border border-red-200 bg-red-50/50 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-body">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelClass}>
            Service
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="">Select a service...</option>
            <option value="Patio Cover">Patio Cover</option>
            <option value="Pergola">Pergola</option>
            <option value="Concrete">Concrete</option>
            <option value="Outdoor Kitchen">Outdoor Kitchen</option>
            <option value="Full Backyard Renovation">Full Backyard Renovation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Project Description
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project — size, style, timeline, budget…"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-300 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit Request
            <ArrowUpRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
