'use client';

import { useState } from 'react';
import { Send, Check, Loader2, AlertCircle } from 'lucide-react';

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

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-primary-black mb-4">
          Message Sent!
        </h3>
        <p className="text-text-gray mb-8">
          Thank you for contacting us. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
          }}
          className="text-accent-warm hover:text-primary-black transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <p className="hidden">
        <label>Don&apos;t fill this out: <input name="bot-field" /></label>
      </p>
      <input type="hidden" name="form-name" value="contact" />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-primary-black mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-primary-black mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-primary-black mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-sm font-medium text-primary-black mb-2">
          Service Interested In
        </label>
        <select
          id="contact-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none appearance-none cursor-pointer"
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

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-primary-black mb-2">
          Project Description
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-black text-white py-4 px-8 rounded-full font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-2 hover:shadow-xl transition-shadow disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
