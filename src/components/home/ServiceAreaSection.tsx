'use client';

import { MapPin } from 'lucide-react';
import { serviceAreas } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';

export default function ServiceAreaSection() {
  return (
    <section id="areas" className="relative bg-sand/40 text-rich-black">
      <div className="max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Service area
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.5rem)' }}
              >
                Building across
                <br />
                <span className="italic font-light text-stone">the Metroplex.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.25}>
              <p className="mt-5 text-stone text-[16px] leading-[1.7] font-sans max-w-md">
                We serve Dallas, Fort Worth, and the surrounding counties. Not sure if we cover your block? Ask us.
              </p>
              <div className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark">
                <MapPin className="w-3.5 h-3.5" /> 20 + cities served
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-border">
              {serviceAreas.map((city, i) => (
                <motion.li
                  key={city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: (i % 12) * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-r border-b border-border px-4 py-5 bg-parchment/60 hover:bg-parchment transition-colors group flex items-center justify-between"
                >
                  <span className="font-display text-[18px] lg:text-[20px] font-medium text-rich-black">
                    {city}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone group-hover:text-gold transition-colors">
                    TX
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
