'use client';

import { useState } from 'react';

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

const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all outline-none text-gray-900 placeholder:text-gray-400';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

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

  return (
    <section id="contact" className="bg-[#F3F1ED] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#D4A447] text-sm font-semibold uppercase tracking-[0.15em]">
            Get Started
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Ready to Build Your Dream?
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Request Received!</h3>
                <p className="text-gray-600 text-lg mb-1">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <p className="text-gray-500 mb-8">
                  Check your inbox — we&apos;ll be in touch soon.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="tel:5806652758"
                    className="bg-amber-500 text-white hover:bg-amber-600 rounded-lg px-6 py-3 font-semibold transition-colors"
                  >
                    📞 Call Us Now
                  </a>
                  <button
                    onClick={resetForm}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-3 font-medium transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input type="hidden" name="form-name" value="contact" />

                <div className="space-y-5">
                  {/* Row 1: Name + Phone */}
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

                  {/* Row 2: Email + Service */}
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

                  {/* Row 3: Message */}
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

                  {/* Row 4: Contact Method + Referral */}
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
                              className={`block text-center py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                formData.contactMethod === method
                                  ? 'border-amber-400 bg-amber-50 text-amber-700'
                                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
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
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-[#D4A447] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Your Request...
                      </>
                    ) : (
                      'Request Free Estimate →'
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400 pt-1">
                    Free consultation · No obligation · Response within 24 hours
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
            <div className="space-y-5">
              {/* Phone */}
              <a href="tel:5806652758" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                  <svg className="w-5 h-5 text-[#D4A447]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Phone</p>
                  <p className="font-bold text-gray-900 text-lg">(580) 665-2758</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:samuel.c.w.allison@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                  <svg className="w-5 h-5 text-[#D4A447]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                  <p className="font-bold text-gray-900">samuel.c.w.allison@gmail.com</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#D4A447]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Address</p>
                  <p className="font-bold text-gray-900">5473 Blair Rd Ste 100 PMB 476653</p>
                  <p className="text-gray-600">Dallas, TX 75231</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#D4A447]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Business Hours</p>
                  <p className="font-bold text-gray-900">Mon - Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <span className="font-heading text-lg font-bold tracking-[0.2em] text-gray-900">
                STRUCTURE1
              </span>
              <p className="text-gray-500 text-sm mt-2">
                Dallas-Fort Worth&apos;s trusted patio cover &amp; concrete experts.
                Licensed, insured, and backed by our 2-year workmanship warranty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
