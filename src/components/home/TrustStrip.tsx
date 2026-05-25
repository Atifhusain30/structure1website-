'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

const stats = [
  { value: '150+', label: 'Projects Built' },
  { value: '4+', label: 'Years Local' },
  { value: '5.0★', label: 'Avg. Review' },
  { value: '2 yr', label: 'Warranty' },
];

const editorial = [
  '/images/hero/cover3.JPG',
  '/images/hero/cover4.JPG',
  '/images/images V2/stamped concrete 4.jpeg',
];

export default function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={ref} className="relative bg-parchment text-rich-black">
      <div className="max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Built for Texas homes
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em] text-rich-black"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                We build the kind of outdoor rooms
                <br />
                <span className="italic font-light text-stone">you actually use —</span> all year.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-7 max-w-xl text-stone text-[17px] leading-[1.65] font-sans">
                Structure1 is a Dallas–Fort Worth crew obsessed with permanence: real engineering on every cover,
                honest quotes, and the same lead carpenter from day one through final walk-through.
              </p>
            </Reveal>
          </div>

          {/* Stats grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 border-l border-t border-border">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  direction="up"
                  delay={0.1 + i * 0.08}
                  className="border-r border-b border-border p-7 lg:p-8 bg-sand/40"
                >
                  <div className="font-display text-[40px] lg:text-[52px] leading-[1] font-medium text-rich-black">
                    <AnimatedNumber value={s.value} />
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-stone">
                    {s.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial image strip — parallax */}
        <div className="mt-20 grid grid-cols-3 gap-3 lg:gap-5">
          {editorial.map((src, i) => {
            const y = i === 0 ? y1 : i === 1 ? y2 : y3;
            return (
              <motion.div
                key={src}
                style={{ y }}
                className={`relative ${i === 1 ? 'aspect-[3/4] mt-10' : 'aspect-[4/5]'} overflow-hidden`}
              >
                <Image src={src} alt="Recent project" fill sizes="33vw" className="object-cover" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
