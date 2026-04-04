'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '@/lib/faq-data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-section bg-sand overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header (sticky on desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="section-divider" />
                <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
                  FAQ
                </span>
              </div>
              <h2 className="font-heading font-bold text-section text-rich-black mb-4">
                Frequently Asked
                <br className="hidden lg:block" />
                Questions
              </h2>
              <p className="text-text-secondary font-body leading-relaxed">
                Everything you need to know about our patio cover and concrete services
                in Dallas-Fort Worth.
              </p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`bg-parchment rounded-card-lg border transition-all duration-400 ${
                    openIndex === index
                      ? 'border-gold/20 shadow-subtle'
                      : 'border-border hover:border-border/80'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-heading font-semibold text-rich-black pr-4 text-[15px]">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openIndex === index ? 'text-gold' : 'text-text-muted'
                        }`}
                      />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-5 text-text-secondary font-body leading-relaxed text-[15px] border-t border-border pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
