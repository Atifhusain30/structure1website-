'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, ShieldCheck, MapPin, Hammer, Star } from 'lucide-react';

type Slide = {
  src: string;
  label: string;
  location: string;
  caption: string;
};

const SLIDES: Slide[] = [
  {
    src: '/images/hero/main-hero.jpg',
    label: 'No. 014',
    location: 'Dallas, TX',
    caption: 'Gable Patio Cover · Cedar · Dusk',
  },
  {
    src: '/images/hero/buckfin1-new.JPG',
    label: 'No. 002',
    location: 'McKinney, TX',
    caption: 'Classic Gable · Cedar Posts',
  },
  {
    src: '/images/hero/sashi3-new.JPG',
    label: 'No. 005',
    location: 'Plano, TX',
    caption: 'Pergola · Polycarbonate Roof',
  },
  {
    src: '/images/hero/cover4-new.JPG',
    label: 'No. 007',
    location: 'Midlothian, TX',
    caption: 'Pergola · Back Wall Build',
  },
];

const SLIDE_INTERVAL = 9000; // longer pause, less restless
const FADE_DURATION = 2.8; // long, gentle dissolve
const EASE = [0.45, 0, 0.55, 1] as const; // soft sigmoid — no overshoot, no snap

export default function Hero() {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const parallax = Math.min(scrollY * 0.12, 60); // gentler

  const slide = SLIDES[active];

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-rich-black text-white">
      {/* Background — all slides stacked, opacity-only crossfade */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translate3d(0, ${parallax}px, 0)`, willChange: 'transform' }}
      >
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.src}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: FADE_DURATION, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={s.src}
              alt={s.caption}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </div>

      {/* Unified blend overlay — same across every slide so they feel like one image world */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,13,13,0.62) 0%, rgba(28,28,26,0.32) 30%, rgba(28,28,26,0.45) 62%, rgba(13,13,13,0.94) 100%)',
          }}
        />
        <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'rgba(58, 42, 22, 0.2)' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(13,13,13,0.65) 0%, rgba(13,13,13,0.15) 45%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent to-parchment/95" />
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute inset-x-6 lg:inset-x-16 top-24 lg:top-28 bottom-32 border border-white/[0.06]" />
      </div>

      {/* Top labels — soft cross-fade with no movement */}
      <div className="hidden md:flex absolute top-28 left-0 right-0 z-10 justify-between px-10 lg:px-16 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
        <AnimatePresence mode="wait">
          <motion.span
            key={`left-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            {slide.label} — {slide.caption}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`right-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="text-gold"
          >
            {slide.location}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16 pb-24 lg:pb-32 pt-32">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="gold-rule" />
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold">
              Dallas · Fort Worth
            </span>
          </motion.div>

          <h1
            className="font-display font-medium text-white leading-[0.93] max-w-4xl"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            <RevealLine delay={0.1}>Patio covers,</RevealLine>
            <RevealLine delay={0.22}>concrete &amp;</RevealLine>
            <RevealLine delay={0.34}>
              <span className="italic font-light text-white/95">outdoor living,</span>
            </RevealLine>
            <RevealLine delay={0.46}>
              <span className="text-gold">built right.</span>
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-[17px] md:text-[19px] leading-[1.55] text-white/85 font-sans"
          >
            Custom patio covers, pergolas, stamped concrete, and outdoor kitchens by a local DFW crew that
            shows up, communicates, and finishes on time. Backed by a 2-year build warranty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/#estimate"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[12px] transition-colors duration-300 group"
            >
              Get My Free Estimate
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:5806652758"
              className="inline-flex items-center gap-3 text-white hover:text-gold transition-colors font-sans group"
            >
              <span className="w-10 h-10 rounded-full border border-white/30 group-hover:border-gold group-hover:bg-gold/10 flex items-center justify-center transition-colors duration-300">
                <Phone className="w-4 h-4" />
              </span>
              <span className="leading-tight">
                <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
                  Call direct
                </span>
                <span className="text-[15px] font-medium tracking-wide">(580) 665-2758</span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 lg:mt-20 pt-8 border-t border-white/15 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <TrustItem icon={<ShieldCheck className="w-4 h-4" />} label="Licensed & Insured" />
              <TrustItem icon={<MapPin className="w-4 h-4" />} label="DFW Local" />
              <TrustItem icon={<Hammer className="w-4 h-4" />} label="In-house Crew" />
              <TrustItem icon={<Star className="w-4 h-4" />} label="5-Star Reviewed" />
            </div>

            {/* Slide indicator — minimal: just a counter + 4 thin ticks */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`count-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55"
                >
                  {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <div className="flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show project ${i + 1}`}
                    className="relative h-[1px] w-10 bg-white/15 overflow-hidden hover:bg-white/30 transition-colors"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gold origin-left"
                      initial={false}
                      animate={{ scaleX: i === active ? 1 : i < active ? 1 : 0, opacity: i === active ? 1 : i < active ? 0.35 : 0 }}
                      transition={{ duration: i === active ? 1.4 : 0.8, ease: EASE }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-white/30"
        />
      </motion.div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: '60%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-white/85">
      <span className="text-gold">{icon}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
