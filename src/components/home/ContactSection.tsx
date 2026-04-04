'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/data';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  contactMethod: string;
  referralSource: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    contactMethod: '',
    referralSource: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

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
        contactMethod: formData.contactMethod,
        referralSource: formData.referralSource,
      }).toString();

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        'There was an error sending your request. Please try again or call us directly at (580) 665-2758.'
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      contactMethod: '',
      referralSource: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-card border border-border bg-warm-white font-body text-rich-black placeholder:text-text-muted focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 outline-none';
  const labelClass = 'block text-sm font-body font-medium text-text-secondary mb-1.5';

  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phoneRaw}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '5473 Blair Rd Ste 100 PMB 476653, Dallas, TX 75231',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: companyInfo.hours,
    },
  ];

  return (
    <section id="contact" className="bg-sand py-section">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="section-divider" />
            <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
              Get Started
            </span>
            <div className="section-divider" />
          </div>
          <h2 className="font-heading font-bold text-section text-rich-black mb-4">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="text-text-secondary font-body max-w-xl mx-auto">
            Drop us a few details and we&apos;ll reach out within 24 hours. No pressure, no obligation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-parchment rounded-card-xl p-6 md:p-8 border border-border"
          >
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-2xl text-rich-black mb-3">
                  Request Received!
                </h3>
                <p className="text-text-secondary font-body mb-1">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <p className="text-text-muted font-body text-sm mb-8">
                  Check your inbox &mdash; we&apos;ll be in touch soon.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`tel:${companyInfo.phoneRaw}`}
                    className="bg-gold text-white hover:bg-gold-dark rounded-full px-6 py-3 font-body font-semibold text-sm transition-colors"
                  >
                    Call Us Now
                  </a>
                  <button
                    onClick={resetForm}
                    className="border border-border text-text-secondary hover:bg-sand rounded-full px-6 py-3 font-body font-medium text-sm transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input type="hidden" name="form-name" value="contact" />

                <div className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Email + Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className={labelClass}>
                        Service Interested In
                      </label>
                      <select
                        id="service"
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

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="Describe what you're looking for — size, style, features, budget, timeline..."
                    />
                  </div>

                  {/* Contact Method + Referral */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Preferred Contact Method</label>
                      <div className="flex gap-2">
                        {['Call', 'Text', 'Email'].map((method) => (
                          <label key={method} className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method}
                              checked={formData.contactMethod === method}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span
                              className={`block text-center py-2.5 rounded-card border text-sm font-body font-medium transition-all duration-300 ${
                                formData.contactMethod === method
                                  ? 'border-gold bg-gold/10 text-gold-dark'
                                  : 'border-border bg-warm-white text-text-secondary hover:border-text-muted'
                              }`}
                            >
                              {method}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="referralSource" className={labelClass}>
                        How Did You Find Us?
                      </label>
                      <select
                        id="referralSource"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="">Select...</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Friend / Family Referral</option>
                        <option value="Nextdoor">Nextdoor</option>
                        <option value="Drove By Project">Drove By a Project</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Error */}
                  {status === 'error' && errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-card text-sm font-body flex items-start gap-3">
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-rich-black text-white font-body font-semibold text-base rounded-full hover:bg-warm-charcoal transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending Your Request...
                      </>
                    ) : (
                      'Request Free Estimate'
                    )}
                  </button>

                  <p className="text-xs text-center text-text-muted font-body pt-1">
                    Free consultation &middot; No obligation &middot; Response within 24 hours
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-heading font-bold text-subsection text-rich-black mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6">
              {contactItems.map((item) => {
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-gold/[0.08] border border-gold/[0.12] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/[0.15] transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted font-body font-semibold uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-body font-semibold text-rich-black text-[15px]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Branding */}
            <div className="mt-12 pt-8 border-t border-border">
              <span className="font-heading text-xl font-bold tracking-[0.15em] text-rich-black">
                STRUCTURE1
              </span>
              <p className="text-text-secondary font-body text-sm mt-3 leading-relaxed max-w-sm">
                Dallas-Fort Worth&apos;s trusted patio cover &amp; concrete experts.
                Licensed, insured, and backed by our 2-year workmanship warranty.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
