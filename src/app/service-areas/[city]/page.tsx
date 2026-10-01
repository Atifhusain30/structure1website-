import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import ProjectGrid from '@/components/sections/ProjectGrid';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import RelatedGuides from '@/components/sections/RelatedGuides';
import CTASection from '@/components/sections/CTASection';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { cities, getCity, services, projectsForCity, featuredProjects, testimonialsForCity, cityFaqs, company, photos } from '@/content';

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const c = getCity(params.city);
  if (!c) return {};
  return {
    title: { absolute: c.seo.title },
    description: c.seo.description,
    alternates: { canonical: `/service-areas/${c.slug}` },
    openGraph: { images: [{ url: photos[c.hero].src, alt: photos[c.hero].alt }] },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const c = getCity(params.city);
  if (!c) notFound();
  const local = projectsForCity(c.slug);
  const nearby = local.length === 0 ? featuredProjects(3) : [];
  const reviews = testimonialsForCity(c.slug);
  const faqs = cityFaqs(c);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Patio covers, pergolas & concrete in ${c.name}, TX`,
    provider: { '@id': `${company.url}/#business` },
    areaServed: { '@type': 'City', name: c.name },
    url: `${company.url}/service-areas/${c.slug}`,
  };
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Service Areas', href: '/service-areas' }, { label: c.name }]}
        eyebrow={`${c.name} · ${c.county}`}
        title={`Patio Covers, Pergolas & Concrete in ${c.name}, TX`}
        lead={c.intro[0]}
        photo={c.hero}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Local" title={`Building in ${c.name}`} />
            <div className="mt-6 space-y-5 text-body text-gray-700">
              {c.intro.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <p className="text-eyebrow text-gray-500">Services in {c.name}</p>
              <ul className="mt-4 space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-small font-medium hover:underline hover:underline-offset-4">
                      {s.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Projects"
            title={local.length > 0 ? `Our work in ${c.name}` : 'Recent work nearby'}
            text={local.length > 0 ? undefined : `We have not published a ${c.name} project yet. These recent DFW builds show the same crew, materials, and standard.`}
          />
          <Button href="/projects" variant="link">
            View all projects
          </Button>
        </div>
        <div className="mt-12">
          <ProjectGrid projects={local.length > 0 ? local : nearby} />
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Permits & HOA" title={`Permits in ${c.name}`} />
            <p className="mt-6 text-body text-gray-700">{c.permitNote}</p>
          </div>
          <div>
            <SectionHeader eyebrow="Neighborhoods" title="Where we build" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.neighborhoods.map((n) => (
                <li key={n} className="border border-gray-200 px-3 py-1.5 text-small text-gray-700">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      {reviews.length > 0 && (
        <Section tone="offwhite">
          <SectionHeader eyebrow="Reviews" title={`What ${c.name} homeowners say`} />
          <div className="mt-12">
            <Testimonials items={reviews} />
          </div>
        </Section>
      )}
      <Section>
        <div className="max-w-3xl">
          <FAQ items={faqs} heading={`${c.name} questions, answered`} />
        </div>
      </Section>
      <Section tone="offwhite">
        <RelatedGuides topic="planning" />
      </Section>
      <CTASection heading={`Ready to build in ${c.name}?`} text="Free on-site estimate, itemized quote, permits included." cta={`Get a Free Estimate in ${c.name}`} />
      <JsonLd data={schema} />
    </>
  );
}
