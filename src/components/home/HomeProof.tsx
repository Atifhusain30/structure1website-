import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';
import SectionHeader from '@/components/sections/SectionHeader';
import { getService } from '@/content/services';
import type { Project } from '@/content/types';

/**
 * Early proof under the hero: three finished projects, each with its photo, location, type and two lines of
 * the real scope, and one "View project" link. The photo links too but is skipped by the keyboard, so each
 * card is a single tab stop.
 */
export default function HomeProof({ projects }: { projects: Project[] }) {
  return (
    <section data-home-proof="" aria-labelledby="home-proof-title" className="bg-white py-14 text-black md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader title="Recent projects" text="Real projects, photographed on site when we finished." />
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/projects" variant="link">
              All projects
            </Button>
          </div>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {projects.map((p) => {
            const service = getService(p.service);
            return (
              <li key={p.slug} data-proof-card="" className="flex flex-col">
                <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className="block">
                  <Photo id={p.cover} ratio="4/3" sizes="(max-width: 768px) 100vw, 33vw" hover />
                </Link>
                <p className="mt-4 text-meta text-gray-500">
                  {p.location}
                  {service && ` · ${service.name}`}
                </p>
                <h3 className="mt-1 font-display text-h3">{p.title}</h3>
                <ul className="mt-3 space-y-1.5 text-small text-gray-700">
                  {p.scope.slice(0, 2).map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-black" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button href={`/projects/${p.slug}`} variant="link">
                    View project<span className="sr-only">: {p.title}</span>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
