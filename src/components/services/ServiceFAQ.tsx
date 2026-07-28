'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqItem } from '@/lib/faq-data';

interface ServiceFAQProps {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
}

export default function ServiceFAQ({
  items,
  eyebrow = 'Questions',
  title,
  italicWord,
  description,
}: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-sand/40 py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-wide mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  {eyebrow}
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-5"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                {title}
                {italicWord && (
                  <>
                    <br />
                    <span className="italic font-light text-stone">{italicWord}</span>
                  </>
                )}
              </h2>
              {description && (
                <p className="text-stone text-[15px] leading-[1.7] font-sans max-w-md">{description}</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`bg-parchment border transition-colors duration-300 ${
                    openIndex === index ? 'border-gold/40' : 'border-border hover:border-gold/30'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                    aria-expanded={openIndex === index}
                    aria-controls={`service-faq-${index}`}
                  >
                    <span className="font-display font-medium text-rich-black pr-4 text-[16px] leading-[1.35]">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openIndex === index ? 'text-gold' : 'text-stone'
                        }`}
                      />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        id={`service-faq-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-stone font-sans leading-[1.7] text-[15px] border-t border-border pt-4">
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
