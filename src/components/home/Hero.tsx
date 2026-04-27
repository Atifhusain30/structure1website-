'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const heroImages = [
  '/images/hero/buckfin1.JPG',
  '/images/hero/cover3.JPG',
  '/images/hero/sashi3.JPG',
  '/images/hero/cover4.JPG',
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-rich-black">
      {/* Layered hero photographs (cross-fade) */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt="Premium DFW residential construction by Structure1"
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </div>
      ))}

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rich-black/85 via-rich-black/55 to-rich-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-rich-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-10 min-h-screen flex flex-col justify-end pt-32 pb-24 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="block w-10 h-px bg-gold" />
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
              DFW Residential Construction
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-semibold text-white leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Built Right.
            <br />
            <span className="italic text-white/95">Built to Last.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-7 text-white/75 font-body text-base sm:text-lg leading-relaxed max-w-xl"
          >
            Custom patio covers, pergolas, interior remodeling, kitchens, bathrooms, and
            concrete craftsmanship — proudly serving the Dallas-Fort Worth area.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-500 ease-out-expo"
            >
              Request Estimate
            </Link>
            <Link
              href="/#portfolio"
              onClick={(e) => { e.preventDefault(); scrollTo('portfolio'); }}
              className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs hover:bg-white hover:text-rich-black transition-all duration-500 ease-out-expo"
            >
              See Our Work
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute right-6 lg:right-10 bottom-32 hidden sm:flex flex-col gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-8 w-px transition-colors duration-500 ${
                i === active ? 'bg-gold' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
