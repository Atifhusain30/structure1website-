import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CTASection from '@/components/home/CTASection';
import { cities } from '@/lib/city-data';
import { serviceAreas } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Service Areas | Patio Covers & Concrete Across Dallas-Fort Worth',
  description:
    'Structure1 Construction builds patio covers, pergolas & stamped concrete across the DFW metroplex — Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington & more.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas' },
        ]}
      />

      <PageHero
        eyebrow="Where we build"
        title="Serving the entire"
        italicWord="DFW metroplex."
        description="Based in Dallas, building everywhere in the metroplex — patio covers, pergolas, and stamped concrete within a 50-mile radius."
        image="/images/hero/cover2.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Service Areas' }]}
      />

      {/* Featured city pages */}
      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow-row mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                Featured cities
              </span>
            </div>
            <h2
              className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
            >
              Our most active<br />
              <span className="italic font-light text-stone">service areas.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="group block bg-rich-black relative overflow-hidden"
              >
                <div className="relative aspect-[4/3] image-hover-zoom">
                  <Image
                    src={city.heroImage}
                    alt={`Patio covers and concrete in ${city.name}, TX`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-rich-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
                  <ArrowUpRight className="w-5 h-5 self-end text-white/70 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                  <div>
                    <h3 className="font-display text-[26px] font-medium leading-[1.05] mb-1">{city.name}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Texas</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full area list */}
      <section className="bg-sand/40 py-20 lg:py-24">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="mb-10 max-w-2xl">
            <div className="eyebrow-row mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                Full coverage
              </span>
            </div>
            <h2
              className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              Everywhere else<br />
              <span className="italic font-light text-stone">we build.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="border border-border bg-parchment px-4 py-2 text-[14px] text-stone font-sans"
              >
                {area}, TX
              </span>
            ))}
          </div>
          <p className="mt-8 text-stone text-[15px] leading-[1.7] font-sans max-w-2xl">
            Don&apos;t see your city? We serve projects within roughly 50 miles of Dallas —{' '}
            <Link href="/contact" className="text-gold-dark underline underline-offset-4 hover:text-gold transition-colors">
              reach out
            </Link>{' '}
            and we&apos;ll confirm your area.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
