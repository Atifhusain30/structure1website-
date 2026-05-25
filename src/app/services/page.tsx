import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/home/CTASection';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Construction and outdoor living services across DFW: patio covers, pergolas, outdoor kitchens, concrete, stamped finishes, and full remodels.',
  alternates: { canonical: '/services' },
};

const supportingServices = [
  {
    title: 'Outdoor Kitchens',
    blurb: 'Built-in grills, masonry counters, sinks, refrigeration — engineered for entertaining.',
    image: '/images/hero/AI kitchen.jpg',
    href: '/contact',
  },
  {
    title: 'Pergolas & Cabanas',
    blurb: 'Cedar timber and aluminum frame structures, free-standing or attached.',
    image: '/images/hero/sashi3.JPG',
    href: '/services/patio-covers',
  },
  {
    title: 'New Builds & Remodels',
    blurb: 'Additions, full backyard makeovers, interior renovations in select markets.',
    image: '/images/hero/new builds.jpg',
    href: '/contact',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Construction &"
        italicWord="outdoor living."
        description="From the structural permit drawings to the last finish coat, we keep every trade under our own roof so quality stays consistent."
        image="/images/hero/sashi3.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      {/* Primary services */}
      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 mb-14 lg:mb-20">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Core offerings
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                The two services<br />
                <span className="italic font-light text-stone">we&apos;re obsessed with.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-stone text-[16px] leading-[1.7] font-sans max-w-md">
                These are the projects we build every week. Patio covers and concrete: two trades, one crew, every detail
                engineered for Texas weather.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
            {services.map((s, i) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group block relative overflow-hidden bg-rich-black"
              >
                <div className="relative aspect-[4/3] lg:aspect-[16/11] image-hover-zoom">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-rich-black/10 to-transparent" />
                </div>
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">// 0{i + 1}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-[30px] lg:text-[38px] font-medium leading-[1.05] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-white/75 text-[15px] leading-[1.6] max-w-md">{s.shortDescription}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting services */}
      <section className="bg-sand/40 py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 mb-14">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Also building
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                Supporting<br />
                <span className="italic font-light text-stone">outdoor living rooms.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-stone text-[15px] leading-[1.7] font-sans max-w-md">
                Outdoor kitchens, cabanas, full remodels — additional trades we can stack onto a primary build.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-7">
            {supportingServices.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group block bg-parchment border border-border hover:border-gold transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden image-hover-zoom">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-[20px] font-medium leading-[1.15]">{s.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-stone group-hover:text-gold transition-colors" />
                  </div>
                  <p className="text-stone text-sm leading-[1.55]">{s.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
