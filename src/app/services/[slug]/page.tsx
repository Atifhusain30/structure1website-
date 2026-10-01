import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import RelatedProjects from '@/components/sections/RelatedProjects';
import RelatedGuides from '@/components/sections/RelatedGuides';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import JsonLd from '@/components/seo/JsonLd';
import { services, getService, projectsForService, faqsFor, cities, company, photos } from '@/content';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [{ url: photos[s.hero].src, alt: photos[s.hero].alt }] },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const projects = projectsForService(s.slug);
  const faqs = faqsFor(s.faqIds);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.seo.description,
    url: `${company.url}/services/${s.slug}`,
    image: `${company.url}${photos[s.hero].src}`,
    provider: { '@id': `${company.url}/#business` },
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
  };
  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services' }, { label: s.name }]} eyebrow="Services" title={`${s.name} in Dallas–Fort Worth`} lead={s.lead} photo={s.hero} />
      <Section className="pb-0">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {s.gallery.map((id) => (
            <Photo key={id} id={id} ratio="4/3" sizes="33vw" />
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Overview" title={`${s.name} built for North Texas`} />
            <div className="mt-6 space-y-5 text-body text-gray-700">
              {s.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <p className="text-eyebrow text-gray-500">Related services</p>
              <ul className="mt-4 space-y-2">
                {s.relatedServices.map((r) => {
                  const rs = getService(r)!;
                  return (
                    <li key={r}>
                      <Link href={`/services/${r}`} className="text-small font-medium hover:underline hover:underline-offset-4">
                        {rs.name} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Options" title="Types and options" />
        <ul className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {s.options.map((o) => (
            <li key={o.name} className="bg-white p-6">
              <h3 className="font-display text-h3">{o.name}</h3>
              <p className="mt-2 text-small text-gray-700">{o.blurb}</p>
              {o.range && <p className="mt-3 text-meta font-medium">{o.range}</p>}
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Why build it" title="Why homeowners choose it" />
            <ul className="mt-8 space-y-6">
              {s.reasons.map((r) => (
                <li key={r.title}>
                  <h3 className="font-display text-h3">{r.title}</h3>
                  <p className="mt-1.5 text-small text-gray-700">{r.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Construction" title="How we build it" />
            <ol className="mt-8 space-y-4">
              {s.construction.map((c, i) => (
                <li key={i} className="flex gap-4 text-small text-gray-700">
                  <span className="shrink-0 font-medium text-black">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
      {projects.length > 0 && (
        <Section tone="offwhite">
          <RelatedProjects heading={`${s.name} projects`} projects={projects} />
        </Section>
      )}
      <Section>
        <div className="max-w-3xl">
          <FAQ items={faqs} heading={`${s.name}: questions, answered`} />
        </div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Areas served" title={`${s.name} across Dallas–Fort Worth`} />
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={`/service-areas/${c.slug}`} className="text-small font-medium underline-offset-4 hover:underline hover:underline-offset-4 hover:underline">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <RelatedGuides topic={s.topic} />
      </Section>
      <CTASection heading={`Planning ${s.name.toLowerCase()}?`} text="Tell us about the space. We reply within one business day and walk the site with you before quoting." cta="Discuss Your Project" />
      <JsonLd data={schema} />
    </>
  );
}
