import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import ProjectGallery from '@/components/sections/ProjectGallery';
import RelatedProjects from '@/components/sections/RelatedProjects';
import RelatedGuides from '@/components/sections/RelatedGuides';
import CTASection from '@/components/sections/CTASection';
import { projects, getProject, relatedProjects, getService, getCity, photos } from '@/content';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const service = getService(p.service)!;
  return {
    title: `${p.title} in ${p.location}`,
    description: p.overview,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [{ url: photos[p.cover].src, alt: photos[p.cover].alt }] },
    keywords: [service.name, p.location],
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const service = getService(p.service)!;
  const city = p.city ? getCity(p.city) : undefined;
  return (
    <>
      <Section className="pb-8 pt-28 md:pt-36">
        <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: p.title }]} />
        <Eyebrow className="mt-8">{service.name}</Eyebrow>
        <h1 className="mt-3 font-display text-h1">{p.title}</h1>
        <p className="mt-3 text-lead text-gray-700">{p.location}</p>
      </Section>
      <Section className="pt-0">
        <ProjectGallery ids={p.gallery} title={p.title} />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-h2">Overview</h2>
            <p className="mt-5 text-body text-gray-700">{p.overview}</p>
            <dl className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
              <div className="bg-white p-6">
                <dt className="text-eyebrow text-gray-500">Scope of work</dt>
                <dd>
                  <ul className="mt-3 space-y-2 text-small text-gray-700">
                    {p.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="bg-white p-6">
                <dt className="text-eyebrow text-gray-500">Materials</dt>
                <dd>
                  <ul className="mt-3 space-y-2 text-small text-gray-700">
                    {p.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-gray-200 p-6">
              <dl className="space-y-4 text-small">
                <div>
                  <dt className="text-eyebrow text-gray-500">Service</dt>
                  <dd className="mt-1">
                    <Link href={`/services/${service.slug}`} className="font-medium hover:underline hover:underline-offset-4">
                      {service.name} →
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-gray-500">Location</dt>
                  <dd className="mt-1">
                    {city ? (
                      <Link href={`/service-areas/${city.slug}`} className="font-medium hover:underline hover:underline-offset-4">
                        {p.location} →
                      </Link>
                    ) : (
                      p.location
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-gray-500">Warranty</dt>
                  <dd className="mt-1">2-year workmanship</dd>
                </div>
              </dl>
              <Link href="/estimate" className="mt-6 inline-flex h-12 w-full items-center justify-center bg-timber text-sm font-medium text-black hover:bg-black hover:text-white">
                Get an Estimate
              </Link>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="offwhite">
        <RelatedProjects heading="Related projects" projects={relatedProjects(p)} />
      </Section>
      <Section>
        <RelatedGuides topic={service.topic} limit={2} />
      </Section>
      <CTASection heading="Planning something similar?" text="Send a few photos of your space and we will reply within one business day with next steps." cta="Get an Estimate" />
    </>
  );
}
