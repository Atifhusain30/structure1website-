'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { serviceAreas } from '@/lib/data';

type ServiceTile = {
  index: string;
  title: string;
  body: string;
  href: string;
  image: string;
  /** Tailwind classes describing the desktop grid placement. */
  span: string;
  /** Visual emphasis for the title scale on this tile. */
  scale: 'hero' | 'large' | 'standard';
  /** Optional override for image fit/position. */
  imageClass?: string;
};

const tiles: ServiceTile[] = [
  {
    index: '01',
    title: 'Patio Covers',
    body: 'Custom gable, lean-to, and freestanding covers — engineered for Texas heat and finished in cedar.',
    href: '/services/patio-covers',
    image: '/images/hero/cover3.JPG',
    span: 'lg:col-span-7 lg:row-span-2',
    scale: 'hero',
  },
  {
    index: '02',
    title: 'Pergolas & Pavilions',
    body: 'Open-air structures with cedar posts, lighting, and integrated fans.',
    href: '/services/patio-covers',
    image: '/images/hero/sashi3.JPG',
    span: 'lg:col-span-5 lg:row-span-1',
    scale: 'large',
  },
  {
    index: '03',
    title: 'Interior Remodeling',
    body: 'Full-home renovations — flooring, trim, paint, and tasteful finishes throughout.',
    href: '/contact',
    image: '/images/hero/flooring 1.jpg',
    span: 'lg:col-span-5 lg:row-span-1',
    scale: 'large',
  },
  {
    index: '04',
    title: 'Kitchens & Bathrooms',
    body: 'Cabinetry, countertops, and fixtures specified to last.',
    href: '/contact',
    image: '/images/hero/kitchen remodel 1.jpg',
    span: 'lg:col-span-4 lg:row-span-1',
    scale: 'standard',
  },
  {
    index: '05',
    title: 'Concrete Work',
    body: 'Driveways, patios, walkways. Built strong, finished right.',
    href: '/services/concrete',
    image: '/images/images V2/concrete driveway.jpeg',
    span: 'lg:col-span-4 lg:row-span-1',
    scale: 'standard',
  },
  {
    index: '06',
    title: 'Stamped Concrete',
    body: 'Decorative patterns — flagstone, tile, brick, and wood plank finishes.',
    href: '/services/concrete',
    image: '/images/images V2/stamped concrete 1.jpeg',
    span: 'lg:col-span-4 lg:row-span-1',
    scale: 'standard',
  },
  {
    index: '07',
    title: 'Custom Design',
    body: 'Thoughtful planning and design from sketch to finished build.',
    href: '/contact',
    image: '/images/images V2/andrew1.jpeg',
    span: 'lg:col-span-12 lg:row-span-1',
    scale: 'large',
    imageClass: 'object-cover object-[center_75%]',
  },
];

const titleScale: Record<ServiceTile['scale'], string> = {
  hero: 'text-[clamp(2rem,4.2vw,3.6rem)]',
  large: 'text-[clamp(1.5rem,2.4vw,2.1rem)]',
  standard: 'text-[clamp(1.25rem,1.8vw,1.6rem)]',
};

export default function ServicesGrid() {
  return (
    <section id="services" className="relative bg-rich-black py-section overflow-hidden">
      {/* Atmospheric backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(197,160,78,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_85%,rgba(197,160,78,0.06),transparent_60%)]" />

      <div className="relative max-w-wide mx-auto px-6 lg:px-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-gold" />
              <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
                Our Services
              </span>
            </div>
            <h2
              className="font-heading text-warm-white font-medium tracking-[-0.02em] leading-[0.98]"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
            >
              Full-service residential
              <br />
              <span className="italic text-warm-white/85">construction.</span>
            </h2>
          </div>
          <p className="text-warm-white/60 font-body text-[15px] leading-relaxed max-w-md">
            Seven disciplines, one team. From a stamped concrete driveway to a top-to-bottom
            interior remodel — designed, built, and finished by craftsmen who live where they build.
          </p>
        </motion.div>

        {/* Image-led mosaic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[min(34vw,360px)] gap-3 lg:gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${t.span} min-h-[280px] sm:min-h-[320px]`}
            >
              <Link
                href={t.href}
                className="group relative block h-full w-full overflow-hidden bg-stone"
              >
                {/* Photo */}
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  quality={82}
                  className={`${t.imageClass ?? 'object-cover'} scale-[1.02] transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]`}
                />

                {/* Cinematic gradient — bottom-weighted, with right-side falloff for hero tile */}
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/95 via-rich-black/50 to-rich-black/10" />
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    t.scale === 'hero'
                      ? 'bg-gradient-to-r from-rich-black/55 via-transparent to-transparent'
                      : ''
                  }`}
                />

                {/* Hover wash */}
                <div className="absolute inset-0 bg-rich-black/0 group-hover:bg-rich-black/15 transition-colors duration-500" />

                {/* Top-left index */}
                <div className="absolute top-5 left-6 lg:top-7 lg:left-8 flex items-center gap-3">
                  <span className="font-heading italic text-gold/80 text-base lg:text-lg">
                    {t.index}
                  </span>
                  <span className="block w-7 h-px bg-gold/40" />
                </div>

                {/* Bottom-left content */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col">
                  <h3
                    className={`font-heading font-medium text-warm-white tracking-[-0.015em] leading-[1.05] ${titleScale[t.scale]}`}
                  >
                    {t.title}
                  </h3>

                  {/* Reveal body + arrow on hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-expo">
                    <div className="overflow-hidden">
                      <p
                        className={`text-warm-white/75 font-body leading-relaxed mt-3 max-w-md transition-all duration-500 delay-75 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 ${
                          t.scale === 'hero' ? 'text-[15px]' : 'text-[13.5px]'
                        }`}
                      >
                        {t.body}
                      </p>
                    </div>
                  </div>

                  {/* Footer row: arrow + draw-in line */}
                  <div className="mt-5 lg:mt-6 flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-warm-white/30 text-warm-white transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-rich-black">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                    </span>
                    <span className="relative flex-1 h-px overflow-hidden">
                      <span className="absolute inset-0 bg-warm-white/15" />
                      <span className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Cinematic DFW banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 lg:mt-16 overflow-hidden border border-warm-white/10"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/8] lg:aspect-[24/7]">
            <Image
              src="/images/hero/buckfin3.JPG"
              alt="Custom DFW residential construction"
              fill
              sizes="100vw"
              quality={80}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/60 to-rich-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black/70 via-transparent to-rich-black/30" />

            {/* Hairline border accents */}
            <div className="absolute top-6 left-6 right-6 h-px bg-warm-white/10" />
            <div className="absolute bottom-6 left-6 right-6 h-px bg-warm-white/10" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-10 lg:px-14 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <MapPin className="w-4 h-4 text-gold" strokeWidth={1.6} />
                  <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
                    Locally Owned & Operated
                  </span>
                </div>
                <h3
                  className="font-heading text-warm-white font-medium leading-[0.98] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(1.85rem, 4vw, 3.4rem)' }}
                >
                  Proudly serving the
                  <br />
                  <span className="italic">Dallas–Fort Worth area.</span>
                </h3>
              </div>
            </div>
          </div>

          {/* City marquee */}
          <div className="relative bg-warm-charcoal border-t border-warm-white/10 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap py-5">
              {[...serviceAreas, ...serviceAreas].map((city, i) => (
                <span
                  key={`${city}-${i}`}
                  className="inline-flex items-center gap-3 px-7 font-body text-[12px] uppercase tracking-[0.28em] text-warm-white/55"
                >
                  {city}
                  <span className="w-1 h-1 rounded-full bg-gold/60" />
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-warm-charcoal to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-warm-charcoal to-transparent" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
