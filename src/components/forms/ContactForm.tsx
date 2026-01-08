'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2, AlertCircle } from 'lucide-react';
import { services } from '@/lib/data';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to Netlify Function
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('There was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            name="contact"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            {/* Honeypot field for spam protection */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary-black mb-2"
              >
                Full Name *
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
                placeholder="John Doe"
                animate={{
                  scale: focusedField === 'name' ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary-black mb-2"
              >
                Email Address *
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
                placeholder="john@example.com"
                animate={{
                  scale: focusedField === 'email' ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-primary-black mb-2"
              >
                Phone Number
              </label>
              <motion.input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none"
                placeholder="(555) 123-4567"
                animate={{
                  scale: focusedField === 'phone' ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-primary-black mb-2"
              >
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary-black mb-2"
              >
                Project Description *
              </label>
              <motion.textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-cream rounded-xl border-2 border-transparent focus:border-primary-black focus:bg-white transition-all outline-none resize-none"
                placeholder="Tell us about your project..."
                animate={{
                  scale: focusedField === 'message' ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-black text-white py-4 px-8 rounded-full font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-2 hover:shadow-xl transition-shadow disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-primary-black mb-4">
              Message Sent!
            </h3>
            <p className="text-text-gray mb-8">
              Thank you for contacting us. We&apos;ll get back to you within 24 hours.
            </p>
            <motion.button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  service: '',
                  message: '',
                });
              }}
              className="text-accent-warm hover:text-primary-black transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
