import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { projects, services } from '@/lib/data';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const service = services.find((s) => s.id === project.category);
  const nextProject =
    projects[projects.findIndex((p) => p.slug === project.slug) + 1] || projects[0];

  return (
    <>
      {/* Hero with full-bleed image */}
      <section className="relative bg-rich-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="100vw"
            quality={85}
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black/85 via-rich-black/35 to-rich-black/95" />
          <div className="absolute inset-0 grain-overlay opacity-50" />
        </div>

        <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-16 pt-40 pb-20 lg:pt-48 lg:pb-28">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/65 hover:text-gold font-mono text-[10px] uppercase tracking-[0.24em] mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          <div className="eyebrow-row mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold">
              {project.category.replace(/-/g, ' ')}
            </span>
          </div>

          <h1
            className="font-display font-medium text-white leading-[0.98] tracking-[-0.025em] max-w-4xl"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {project.title}
          </h1>

          <div className="flex items-center gap-2 mt-6 text-white/70 font-mono text-[11px] uppercase tracking-[0.24em]">
            <MapPin className="w-4 h-4 text-gold" />
            {project.location}
          </div>

          <p className="mt-7 text-white/70 font-sans text-base sm:text-lg leading-[1.65] max-w-2xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
            {project.images.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-stone ${
                  i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title} — view ${i + 1}`}
                  fill
                  sizes={i === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  quality={85}
                  className="object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail panel */}
      <section className="bg-parchment pb-24 lg:pb-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Project overview
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)' }}
              >
                Built for the way<br />
                <span className="italic font-light text-stone">you actually use it.</span>
              </h2>
              <div className="mt-7 space-y-5 text-stone font-sans text-[16px] leading-[1.7]">
                <p>{project.description}</p>
                <p>
                  Every Structure1 project starts with a conversation about how you live — and ends with a space that holds up to it.
                  From cedar selection to footing depth, the details are chosen for longevity, not the lowest bid.
                </p>
              </div>
            </div>

            <aside className="bg-rich-black text-white p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-5">{'// Details'}</p>
              <dl className="space-y-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 mb-1">Category</dt>
                  <dd className="font-display text-[20px] font-medium capitalize">
                    {project.category.replace(/-/g, ' ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 mb-1">Location</dt>
                  <dd className="font-display text-[20px] font-medium">{project.location}</dd>
                </div>
                {service && (
                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-gold hover:text-white font-sans text-sm font-semibold transition-colors"
                    >
                      Learn more — {service.title}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </dl>

              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-gold hover:brightness-95 text-rich-black px-6 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[11px] transition-all"
              >
                Start Your Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Next project teaser */}
      {nextProject && nextProject.slug !== project.slug && (
        <section className="bg-rich-black text-white">
          <Link href={`/projects/${nextProject.slug}`} className="block group relative">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                sizes="100vw"
                className="object-cover opacity-45 group-hover:opacity-65 transition-opacity"
              />
              <div className="absolute inset-0 bg-rich-black/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold block mb-5">
                  Next project →
                </span>
                <h3
                  className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                  {nextProject.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 mt-4 block">
                  {nextProject.location}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}
    </>
  );
}
