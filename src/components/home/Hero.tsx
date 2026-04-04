'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Counter from '@/components/ui/Counter';

const heroImages = [
  {
    src: '/images/hero/sashi3.JPG',
    alt: 'Custom pergola with polycarbonate roofing and ceiling fan in Plano Texas',
  },
  {
    src: '/images/hero/buckfin1.JPG',
    alt: 'Classic gable patio cover with cedar posts in McKinney Texas',
  },
  {
    src: '/images/images V2/stamped concrete 2.jpeg',
    alt: 'Decorative stamped concrete driveway in Dallas Texas',
  },
  {
    src: '/images/hero/cover3.JPG',
    alt: 'Beautiful patio cover illuminated at night in Fort Worth Texas',
  },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const ios =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsMobile(mobile);
      setIsIOS(ios);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const imgQuality = isIOS ? 60 : isMobile ? 70 : 80;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-parchment hero-section overflow-hidden">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">

        {/* ── Top: Headline + Sub ── */}
        <div className="max-w-4xl mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="section-divider" />
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.25em]">
              DFW&apos;s Most Trusted Outdoor Builders
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-display text-rich-black mb-5"
          >
            Outdoor Living,{' '}
            <span className="italic text-gold">Done Right.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
          >
            Custom patio covers, pergolas &amp; concrete across Dallas-Fort Worth.
            150+ backyards transformed — yours could be next.
          </motion.p>
        </div>

        {/* ── Bento Image Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          {/* Desktop: asymmetric bento */}
          <div className="hidden sm:grid grid-cols-12 grid-rows-2 gap-2.5 h-[420px] md:h-[500px] lg:h-[560px]">
            {/* Large left image — spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="col-span-5 row-span-2 group relative rounded-card-xl overflow-hidden editorial-frame cursor-pointer"
              onClick={() => scrollTo('portfolio')}
            >
              <Image
                src={heroImages[0].src}
                alt={heroImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo md:group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 42vw, 35vw"
                quality={imgQuality}
                priority
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/40 via-transparent to-transparent hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-600 ease-out-expo origin-left" />
            </motion.div>

            {/* Top-middle image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="col-span-3 row-span-1 group relative rounded-card-xl overflow-hidden editorial-frame cursor-pointer"
              onClick={() => scrollTo('portfolio')}
            >
              <Image
                src={heroImages[1].src}
                alt={heroImages[1].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo md:group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 25vw, 20vw"
                quality={imgQuality}
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/40 via-transparent to-transparent hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-600 ease-out-expo origin-left" />
            </motion.div>

            {/* Right image — spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="col-span-4 row-span-2 group relative rounded-card-xl overflow-hidden editorial-frame cursor-pointer"
              onClick={() => scrollTo('portfolio')}
            >
              <Image
                src={heroImages[3].src}
                alt={heroImages[3].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo md:group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 33vw, 28vw"
                quality={imgQuality}
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/40 via-transparent to-transparent hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-600 ease-out-expo origin-left" />
            </motion.div>

            {/* Bottom-middle image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="col-span-3 row-span-1 group relative rounded-card-xl overflow-hidden editorial-frame cursor-pointer"
              onClick={() => scrollTo('portfolio')}
            >
              <Image
                src={heroImages[2].src}
                alt={heroImages[2].alt}
                fill
                className="object-cover transition-transform duration-700 ease-out-expo md:group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 25vw, 20vw"
                quality={imgQuality}
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/40 via-transparent to-transparent hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-600 ease-out-expo origin-left" />
            </motion.div>
          </div>

          {/* Mobile: 2x2 grid */}
          <div className="grid sm:hidden grid-cols-2 gap-2 h-[380px]">
            {heroImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="group relative rounded-card-lg overflow-hidden editorial-frame cursor-pointer"
                onClick={() => scrollTo('portfolio')}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-600 ease-out-expo group-hover:scale-105"
                  sizes="48vw"
                  quality={isIOS ? 55 : 65}
                  priority={i < 2}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out-expo origin-left" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom: CTAs + Stats ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="bg-rich-black text-white px-8 py-4 rounded-full font-body font-medium tracking-wider uppercase text-sm hover:bg-warm-charcoal hover:shadow-card transition-all duration-500 ease-out-expo"
            >
              Get a Free Estimate
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="border border-rich-black/20 text-rich-black px-8 py-4 rounded-full font-body font-medium tracking-wider uppercase text-sm hover:border-rich-black hover:bg-rich-black hover:text-white transition-all duration-500 ease-out-expo"
            >
              See Our Work
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-10 sm:gap-12 lg:gap-14"
          >
            {[
              { target: 150, suffix: '+', label: 'Projects' },
              { target: 4, suffix: '+', label: 'Years' },
              { target: 100, suffix: '%', label: 'Satisfied' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <span className="block font-heading font-bold text-3xl sm:text-4xl text-rich-black tabular-nums">
                  <Counter target={stat.target} suffix={stat.suffix} duration={stat.target > 10 ? 2 : 1.5} />
                </span>
                <span className="text-text-muted font-body text-[10px] uppercase tracking-[0.2em] mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
