'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type Service = {
  index: string;
  title: string;
  blurb: string;
  href: string;
  image: string;
  size: 'feature' | 'standard';
};

const services: Service[] = [
  {
    index: '01',
    title: 'Patio Covers & Pergolas',
    blurb: 'Engineered shade structures built to handle Texas weather — cedar, aluminum, polycarbonate.',
    href: '/services/patio-covers',
    image: '/images/hero/cover1.JPG',
    size: 'feature',
  },
  {
    index: '02',
    title: 'Concrete & Stamped Concrete',
    blurb: 'Driveways, patios, walkways. Decorative finishes engineered for our soil and climate.',
    href: '/services/concrete',
    image: '/images/images V2/stamped concrete 2.jpeg',
    size: 'feature',
  },
  {
    index: '03',
    title: 'Outdoor Kitchens',
    blurb: 'Built-in grills, masonry counters, fire features — designed to entertain.',
    href: '/services',
    image: '/images/hero/AI kitchen.jpg',
    size: 'standard',
  },
  {
    index: '04',
    title: 'Cabanas & Pavilions',
    blurb: 'Freestanding structural rooms for pools, dining, and lounging.',
    href: '/services/patio-covers',
    image: '/images/hero/sashi3.JPG',
    size: 'standard',
  },
  {
    index: '05',
    title: 'Stamped Concrete',
    blurb: 'Premium-finish slabs in slate, stone, and brick patterns.',
    href: '/services/concrete',
    image: '/images/images V2/stamped concrete 6.jpeg',
    size: 'standard',
  },
  {
    index: '06',
    title: 'New Builds & Remodels',
    blurb: 'Additions, full backyard makeovers, and interior remodels in select markets.',
    href: '/services',
    image: '/images/hero/new builds.jpg',
    size: 'standard',
  },
];

export default function ServicesGrid() {
  const features = services.filter((s) => s.size === 'feature');
  const standards = services.filter((s) => s.size === 'standard');

  return (
    <section id="services" className="relative bg-sand/40 text-rich-black">
      <div className="max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  What we build
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                Construction &amp;<br />
                <span className="italic font-light text-stone">outdoor living,</span> end to end.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.25}>
              <p className="text-stone text-[16px] leading-[1.7] font-sans max-w-md">
                Six core services. One in-house team. From the structural permit drawings to the last finish coat,
                we keep every trade under our own roof so quality stays consistent.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rich-black border-b border-rich-black hover:text-gold hover:border-gold pb-1 transition-colors"
              >
                View All Services
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Feature row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mb-5 lg:mb-8">
          {features.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 0.1} distance={50}>
              <FeatureCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* Standard row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {standards.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 0.08} distance={40}>
              <StandardCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group relative block overflow-hidden bg-rich-black"
    >
      <div className="relative aspect-[4/3] lg:aspect-[16/11] image-hover-zoom">
        <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-rich-black/15 to-transparent" />
      </div>
      <div className="absolute inset-0 p-7 lg:p-10 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">{`// ${service.index}`}</span>
          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <div>
          <h3 className="font-display text-[28px] lg:text-[34px] leading-[1.05] font-medium mb-2">
            {service.title}
          </h3>
          <p className="text-white/75 text-sm lg:text-[15px] leading-[1.55] max-w-md">{service.blurb}</p>
        </div>
      </div>
    </Link>
  );
}

function StandardCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group block bg-parchment border border-border hover:border-gold transition-colors duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden image-hover-zoom">
        <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-dark">{`// ${service.index}`}</span>
          <ArrowUpRight className="w-4 h-4 text-stone group-hover:text-gold transition-colors" />
        </div>
        <h3 className="font-display text-[22px] font-medium leading-[1.15] mb-2">{service.title}</h3>
        <p className="text-stone text-sm leading-[1.55]">{service.blurb}</p>
      </div>
    </Link>
  );
}
