'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section ref={ref} className="relative bg-rich-black text-white overflow-hidden">
      {/* Top fade from sand */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/40 to-transparent pointer-events-none z-[1] opacity-70" />

      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/hero/cover1.JPG"
          alt="Custom patio cover, DFW"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-rich-black via-rich-black/85 to-rich-black/40" />
      <div className="absolute inset-0 grain-overlay opacity-50" />

      <div className="relative max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-36 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                  Ready when you are
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[0.98] tracking-[-0.025em]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
              >
                Build something
                <br />
                <span className="italic font-light text-white/85">that lasts.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-8 max-w-lg text-white/65 text-[17px] leading-[1.65] font-sans">
                One conversation. A clear quote. An honest timeline. That&apos;s how every Structure1 project starts.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.35} className="lg:col-span-4">
            <div className="flex flex-col items-start lg:items-end gap-5">
              <Link
                href="/#estimate"
                className="inline-flex items-center gap-2 bg-gold hover:brightness-95 text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[12px] transition-all duration-300 group"
              >
                Start My Estimate
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:5806652758"
                className="inline-flex items-center gap-3 text-white hover:text-gold transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-white/30 group-hover:border-gold flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="leading-tight">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
                    Or call
                  </span>
                  <span className="text-[16px] font-medium tracking-wide">(580) 665-2758</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
