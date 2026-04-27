import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Users, Target, Heart, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { stats } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Structure1 Construction — over 4 years of premium residential construction in Dallas-Fort Worth. Meet our team and discover our values.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description:
      'We never compromise. Every project receives complete attention to detail and finest craftsmanship.',
  },
  {
    icon: Users,
    title: 'Client Focused',
    description:
      'Your vision drives our work. We listen, collaborate, and deliver results that exceed expectations.',
  },
  {
    icon: Target,
    title: 'Precision',
    description:
      'From planning to execution, we maintain exacting standards to ensure perfect results every time.',
  },
  {
    icon: Heart,
    title: 'Built to Last',
    description:
      'Materials, methods, and finishes chosen for longevity — not the lowest bid.',
  },
];

const milestones = [
  { year: '2021', title: 'Company Founded', description: 'Structure1 Construction established in Dallas, TX.' },
  { year: '2022', title: 'Expanded Services', description: 'Added pergolas and concrete work to our offerings.' },
  { year: '2023', title: '50th Project', description: 'Celebrated completing our 50th construction project.' },
  { year: '2024', title: 'Regional Growth', description: 'Expanded operations across the DFW Metroplex.' },
  { year: '2025', title: '150+ Projects', description: 'Continuing to grow with unwavering commitment to quality.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Structure1"
        title="Building outdoor spaces that last."
        description="For over four years, Structure1 Construction has been transforming homes across Dallas-Fort Worth — combining traditional craftsmanship with modern materials to deliver work that adds value."
        image="/images/hero/cover4.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Story */}
      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
                Our Story
              </span>
              <h2 className="font-heading font-medium text-rich-black tracking-tight leading-[1.05]"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
                Craft over shortcuts.
                <br />
                <span className="italic text-gold">Always.</span>
              </h2>
              <div className="mt-7 space-y-5 text-text-secondary font-body text-[15px] leading-relaxed max-w-xl">
                <p>
                  What started as a small family operation has grown into one of the most
                  trusted residential construction companies in the DFW Metroplex.
                </p>
                <p>
                  Our commitment to quality, transparency, and customer satisfaction
                  remains unchanged — every project, every time.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/hero/sashi3.JPG"
                  alt="Custom pergola with polycarbonate roofing in Plano, Texas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — dark band */}
      <section className="bg-rich-black py-16 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl mx-auto text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-heading text-white font-medium tabular-nums leading-none"
                      style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-white/50 font-body text-[11px] uppercase tracking-[0.22em] mt-3 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 lg:mb-20">
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
              Our Values
            </span>
            <h2 className="font-heading text-rich-black font-medium tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border/60">
            {values.map((v) => (
              <div key={v.title} className="bg-warm-white p-8 lg:p-10">
                <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center mb-6">
                  <v.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-rich-black text-lg mb-3">
                  {v.title}
                </h3>
                <p className="text-text-secondary font-body text-[14.5px] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-parchment pb-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
              Our Journey
            </span>
            <h2 className="font-heading text-rich-black font-medium tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
              Company Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 sm:gap-10 mb-10 last:mb-0">
                <div className="shrink-0">
                  <span className="font-heading text-rich-black text-2xl sm:text-3xl font-medium">
                    {m.year}
                  </span>
                </div>
                <div className="pt-1 border-l border-border pl-6 sm:pl-8 flex-1">
                  <h3 className="font-heading font-semibold text-rich-black text-xl mb-2">
                    {m.title}
                  </h3>
                  <p className="text-text-secondary font-body text-[15px] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-rich-black text-white hover:bg-warm-charcoal px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-400"
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
