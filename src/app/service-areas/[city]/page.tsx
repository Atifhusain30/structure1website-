import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MapPin, Quote } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CTASection from '@/components/home/CTASection';
import { cities, getCityFaqItems } from '@/lib/city-data';
import { projects, testimonials, companyInfo } from '@/lib/data';

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) return {};
  return {
    title: `Patio Covers & Concrete in ${city.name}, TX | Free Estimates`,
    description: `Custom patio covers, pergolas & stamped concrete in ${city.name}, TX. Permits handled, 2-year warranty, free on-site estimates from Structure1 Construction.`,
    alternates: { canonical: `/service-areas/${city.slug}` },
  };
}

const cityServices = [
  { title: 'Patio Covers', href: '/services/patio-covers', blurb: 'Gable, lean-to & polycarbonate designs' },
  { title: 'Pergolas', href: '/services/patio-covers', blurb: 'Cedar structures, free-standing or attached' },
  { title: 'Stamped Concrete', href: '/services/concrete', blurb: 'Patios, driveways & decorative finishes' },
];

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) notFound();

  const cityProjects = projects.filter((p) => city.projectSlugs.includes(p.slug));
  const cityTestimonials = testimonials.filter((t) => city.testimonialIds.includes(t.id));
  const faqItems = getCityFaqItems(city);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: companyInfo.name,
    url: `https://structure1builds.com/service-areas/${city.slug}`,
    telephone: companyInfo.phone,
    areaServed: { '@type': 'City', name: `${city.name}, TX` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  };

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas' },
          { name: `${city.name}, TX`, path: `/service-areas/${city.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PageHero
        eyebrow={`Serving ${city.name}, Texas`}
        title={`Outdoor living, built in`}
        italicWord={`${city.name}.`}
        description={`Custom patio covers, pergolas, and stamped concrete for ${city.name} homeowners — permits handled, engineered for Texas weather, backed by a 2-year warranty.`}
        image={city.heroImage}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas' },
          { label: `${city.name}, TX` },
        ]}
      />

      {/* Intro */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  {city.name} contractor
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-7"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                Your backyard,<br />
                <span className="italic font-light text-stone">our craft.</span>
              </h2>
              <div className="space-y-5 text-stone text-[16px] leading-[1.75] font-sans">
                {city.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Neighborhoods */}
              <div className="mt-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark block mb-4">
                  Areas we serve in {city.name}
                </span>
                <div className="flex flex-wrap gap-2">
                  {city.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 border border-border bg-sand/50 px-3.5 py-1.5 text-[13px] text-stone font-sans"
                    >
                      <MapPin className="w-3 h-3 text-gold" />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Services links */}
            <div className="lg:col-span-5">
              <div className="bg-sand/60 border border-border p-8 lg:p-10 lg:sticky lg:top-32">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark block mb-6">
                  What we build in {city.name}
                </span>
                <div className="space-y-1">
                  {cityServices.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0"
                    >
                      <div>
                        <span className="font-display text-[17px] font-medium text-rich-black block leading-[1.2]">
                          {s.title}
                        </span>
                        <span className="text-stone text-[13px] font-sans">{s.blurb}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-stone group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local projects */}
      {cityProjects.length > 0 && (
        <section className="bg-sand/40 py-24 lg:py-32">
          <div className="max-w-wide mx-auto px-6 lg:px-16">
            <div className="mb-12 max-w-2xl">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Built in {city.name}
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                Recent {city.name}<br />
                <span className="italic font-light text-stone">projects.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8 max-w-4xl">
              {cityProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group block bg-rich-black relative overflow-hidden">
                  <div className="relative aspect-[4/3] image-hover-zoom">
                    <Image
                      src={p.image}
                      alt={`${p.title} — ${p.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <h3 className="font-display text-[22px] font-medium leading-[1.1] mb-1">{p.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{p.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {cityTestimonials.length > 0 && (
        <section className="bg-parchment py-24 lg:py-28">
          <div className="max-w-wide mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-8 h-8 text-gold mx-auto mb-8 rotate-180" />
              <blockquote className="font-display text-rich-black font-medium leading-[1.3] tracking-[-0.01em] mb-8"
                style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)' }}
              >
                &ldquo;{cityTestimonials[0].quote}&rdquo;
              </blockquote>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                {cityTestimonials[0].author} · {cityTestimonials[0].project} · {cityTestimonials[0].location}
              </div>
            </div>
          </div>
        </section>
      )}

      <ServiceFAQ
        items={faqItems}
        eyebrow={`${city.name} questions`}
        title={`Building in ${city.name},`}
        italicWord="answered."
        description={`Costs, permits, and timelines for outdoor living projects in ${city.name}, Texas.`}
      />

      <CTASection />
    </>
  );
}
