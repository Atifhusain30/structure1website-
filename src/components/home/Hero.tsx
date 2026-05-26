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
  {
    src: '/images/hero/main-hero.jpg',
    label: 'No. 014',
    location: 'Dallas, TX',
    caption: 'Gable Patio Cover · Cedar · Dusk',
  },
];

const SLIDE_INTERVAL = 7500;
const WIPE_DURATION = 1.5;
const EASE = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setActive((current) => {
        setPrev(current);
        return (current + 1) % SLIDES.length;
      });
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const parallax = Math.min(scrollY * 0.1, 50);

  const goTo = (i: number) => {
    if (i === active) return;
    setActive((current) => {
      setPrev(current);
      return i;
    });
  };

  const slide = SLIDES[active];
  const totalDuration = (SLIDE_INTERVAL + WIPE_DURATION * 1000) / 1000;

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-rich-black text-white">
      {/* Background — image-first: vertical rise wipe + ken-burns push */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translate3d(0, ${parallax}px, 0)`, willChange: 'transform' }}
      >
        {/* All slides mounted (so loads stay instant); the prev one is what shows underneath the wipe */}
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0"
            style={{ opacity: i === prev ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Active slide — wipes in from the bottom over the previous one */}
        <motion.div
          key={`wipe-${active}`}
          initial={prev === null ? false : { clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: WIPE_DURATION, ease: EASE }}
          className="absolute inset-0 z-[1]"
        >
          <motion.div
            key={`kb-${active}`}
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: 1.08, x: -18 }}
            transition={{ duration: totalDuration, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.caption}
              fill
              priority
              sizes="100vw"
              quality={92}
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>

        {/* Gold horizon seam — rides the leading edge of the wipe */}
        {prev !== null && (
          <motion.div
            key={`seam-${active}`}
            className="absolute left-0 right-0 h-px bg-gold z-[2] pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.55)]"
            initial={{ top: '100%', opacity: 0.95 }}
            animate={{ top: '0%', opacity: 0 }}
            transition={{ duration: WIPE_DURATION, ease: EASE }}
          />
        )}
      </div>

      {/* Image-first overlay — much lighter than before */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {/* Light top fade for the label strip */}
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{ background: 'linear-gradient(180deg, rgba(13,13,13,0.55) 0%, transparent 100%)' }}
        />
        {/* Bottom darkening — only where the headline + content live */}
        <div
          className="absolute inset-x-0 bottom-0 h-[58%]"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(13,13,13,0.22) 28%, rgba(13,13,13,0.75) 78%, rgba(13,13,13,0.96) 100%)',
          }}
        />
        {/* Soft left edge to support the left-aligned headline */}
        <div
          className="absolute inset-y-0 left-0 w-2/3"
          style={{ background: 'linear-gradient(90deg, rgba(13,13,13,0.35) 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 grain-overlay opacity-50" />
      </div>

      {/* Top labels */}
      <div className="hidden md:flex absolute top-28 left-0 right-0 z-10 justify-between px-10 lg:px-16 font-mono text-[10px] uppercase tracking-[0.28em] text-white/75">
        <AnimatePresence mode="wait">
          <motion.span
            key={`left-${active}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {slide.label} — {slide.caption}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`right-${active}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.9, ease: EASE }}
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
            className="mt-14 lg:mt-20 pt-8 border-t border-white/15"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <TrustItem icon={<ShieldCheck className="w-4 h-4" />} label="Licensed & Insured" />
              <TrustItem icon={<MapPin className="w-4 h-4" />} label="DFW Local" />
              <TrustItem icon={<Hammer className="w-4 h-4" />} label="In-house Crew" />
              <TrustItem icon={<Star className="w-4 h-4" />} label="5-Star Reviewed" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thumbnail filmstrip — floating bottom-right, all projects visible at all times */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex absolute bottom-10 right-8 lg:right-14 z-10 items-end gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/55 mr-2 mb-1.5">
          {String(active + 1).padStart(2, '0')} <span className="text-white/30">/</span>{' '}
          {String(SLIDES.length).padStart(2, '0')}
        </span>
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => goTo(i)}
            aria-label={`Show ${s.caption}`}
            className="group relative overflow-hidden transition-all duration-700 ease-out"
            style={{
              width: i === active ? 104 : 60,
              height: i === active ? 68 : 42,
            }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="104px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            />
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? 'opacity-0' : 'bg-rich-black/55 group-hover:bg-rich-black/30'
              }`}
            />
            <div
              className={`absolute inset-0 ring-1 transition-colors duration-500 ${
                i === active ? 'ring-gold' : 'ring-white/20 group-hover:ring-white/60'
              }`}
            />
            {/* progress bar on active thumbnail */}
            {i === active && !reduced && (
              <motion.div
                key={`tprog-${active}`}
                className="absolute bottom-0 left-0 h-[2px] bg-gold origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                style={{ width: '100%' }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Scroll indicator */}
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
  // pb / -mb pair: gives the overflow-hidden mask room for descenders (g, y, p)
  // without altering the visible line spacing of the headline.
  return (
    <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
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
