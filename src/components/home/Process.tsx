'use client';

import { Phone, PencilRuler, ScrollText, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Estimate',
    body: 'Tell us about your project. We respond within one business day with next steps and a transparent ballpark price.',
  },
  {
    number: '02',
    icon: PencilRuler,
    title: 'Design',
    body: 'On-site walk, measurements, material selection, and architectural drawings tailored to your home.',
  },
  {
    number: '03',
    icon: ScrollText,
    title: 'Permit',
    body: 'We handle every HOA submission and city permit so the build clears inspection on the first pass.',
  },
  {
    number: '04',
    icon: Hammer,
    title: 'Build',
    body: 'In-house crew, dedicated lead carpenter, daily progress updates, and a clean site at the end of every day.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-rich-black text-white overflow-hidden">
      {/* Top fade from parchment */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-parchment to-transparent pointer-events-none z-[1] opacity-50" />
      <div className="absolute inset-0 grain-overlay opacity-30" />

      <div className="relative max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 lg:mb-20 items-end">
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                  The signature process
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                From first call
                <br />
                <span className="italic font-light text-white/70">to final walk-through.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.3}>
              <p className="text-white/65 text-[16px] leading-[1.7] font-sans max-w-md">
                Four steps. One project manager from start to finish. No subcontractor relay, no surprise change orders.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="bg-rich-black p-8 lg:p-10 relative group"
              >
                <div className="flex items-start justify-between mb-10">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.12 + 0.2, duration: 0.8 }}
                    className="font-display text-[64px] lg:text-[80px] font-light text-gold leading-[0.85]"
                  >
                    {s.number}
                  </motion.span>
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-white mb-4">{s.title}</h3>
                <p className="text-white/55 text-sm leading-[1.65]">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade into parchment Testimonials */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-parchment pointer-events-none z-[1]" />
    </section>
  );
}
