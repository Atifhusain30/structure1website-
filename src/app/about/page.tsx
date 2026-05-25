import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Users, Target, Heart, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { stats } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Structure1 — a Dallas–Fort Worth construction and outdoor-living team building permanence into every patio cover, pergola, and concrete project.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'No corners cut. Every project gets full attention and the right materials for Texas weather.',
  },
  {
    icon: Users,
    title: 'One Point of Contact',
    description: 'Same project manager from estimate to final walk-through. No relay, no confusion.',
  },
  {
    icon: Target,
    title: 'Engineered',
    description: 'Real loads, real soil, real permits. Every cover and slab is built to outlive the house.',
  },
  {
    icon: Heart,
    title: 'Built to Last',
    description: 'Materials chosen for longevity, finished in a way you will brag about a decade from now.',
  },
];

const milestones = [
  { year: '2021', title: 'Company Founded', description: 'Structure1 launches in Dallas with a focus on backyard transformations.' },
  { year: '2022', title: 'Concrete Expansion', description: 'In-house concrete crew added. Stamped, decorative, and structural slabs.' },
  { year: '2023', title: '50 Projects In', description: 'Built across Plano, Frisco, McKinney, Southlake, and the surrounding metro.' },
  { year: '2024', title: 'Metro-wide', description: 'Service reach extends to 20+ DFW cities. Outdoor kitchen + remodel offerings added.' },
  { year: '2025', title: '150+ Builds', description: 'Continuing the same standard, one homeowner at a time.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Structure1"
        title="Builders who care about"
        italicWord="what comes after."
        description="Four years, 150+ projects, one obsession: building outdoor rooms that hold up to Texas weather and add real value to your home."
        image="/images/hero/cover4.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Story */}
      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/hero/sashi3.JPG"
                  alt="Custom pergola in Plano, Texas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover"
                />
                <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
                  <span>// Pergola</span>
                  <span>Plano, TX</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  The story
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Craft over shortcuts.<br />
                <span className="italic font-light text-stone">Every time.</span>
              </h2>
              <div className="mt-7 space-y-5 text-stone font-sans text-[16px] leading-[1.7] max-w-xl">
                <p>
                  What started as a small family operation grew into one of the most trusted construction + outdoor living teams in
                  the DFW Metroplex — because we treat every build like our own home.
                </p>
                <p>
                  We don&apos;t farm out the heart of the work. The same crew that pours your slab is the one finishing the trim
                  on your pergola.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — dark band */}
      <section className="bg-rich-black py-20 lg:py-24">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl mx-auto text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span
                  className="block font-display text-white font-medium tabular-nums leading-[0.9]"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)' }}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-white/50 font-mono text-[11px] uppercase tracking-[0.22em] mt-4 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/40 py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="text-center mb-14 lg:mb-20 max-w-2xl mx-auto">
            <div className="eyebrow-row justify-center mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                What drives us
              </span>
            </div>
            <h2
              className="font-display text-rich-black font-medium leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              The standards behind<br />
              <span className="italic font-light text-stone">every project.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border/60">
            {values.map((v) => (
              <div key={v.title} className="bg-parchment p-8 lg:p-10">
                <div className="w-11 h-11 border border-gold/40 rounded-full flex items-center justify-center mb-6">
                  <v.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-medium text-rich-black text-xl mb-3">{v.title}</h3>
                <p className="text-stone font-sans text-[14.5px] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="eyebrow-row justify-center mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                The journey
              </span>
            </div>
            <h2
              className="font-display text-rich-black font-medium leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 sm:gap-10 mb-10 last:mb-0">
                <div className="shrink-0 w-20 sm:w-24 pt-1">
                  <span className="font-display text-rich-black text-2xl sm:text-3xl font-medium">{m.year}</span>
                </div>
                <div className="pt-1 border-l border-border pl-6 sm:pl-8 flex-1">
                  <h3 className="font-display font-medium text-rich-black text-xl mb-2">{m.title}</h3>
                  <p className="text-stone font-sans text-[15px] leading-[1.7]">{m.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-rich-black text-white hover:bg-gold hover:text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300 border border-rich-black hover:border-gold"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
