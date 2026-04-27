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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
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
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black/80 via-rich-black/40 to-rich-black/90" />
        </div>

        <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-10 pt-40 pb-20 lg:pt-48 lg:pb-24">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/65 hover:text-gold font-body text-[11px] font-semibold uppercase tracking-[0.22em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
              {project.category.replace('-', ' ')}
            </span>
          </div>

          <h1
            className="font-heading font-medium text-white tracking-tight leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
          >
            {project.title}
          </h1>

          <div className="flex items-center gap-2 mt-5 text-white/65 font-body text-sm">
            <MapPin className="w-4 h-4 text-gold" />
            {project.location}
          </div>

          <p className="mt-6 text-white/70 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
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
      <section className="bg-parchment pb-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
                Project Overview
              </span>
              <h2 className="font-heading font-medium text-rich-black tracking-tight"
                  style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)' }}>
                Built for the way you actually use your backyard.
              </h2>
              <div className="mt-6 space-y-4 text-text-secondary font-body text-[15px] leading-relaxed">
                <p>{project.description}</p>
                <p>
                  Every Structure1 project starts with a conversation about how you live —
                  and ends with a space that holds up to it. From cedar selection to footing depth,
                  the details are chosen for longevity, not the lowest bid.
                </p>
              </div>
            </div>

            <aside className="bg-warm-white border border-border p-7">
              <h3 className="font-heading font-medium text-rich-black text-xl mb-6">
                Project Details
              </h3>
              <dl className="space-y-5">
                <div>
                  <dt className="text-text-muted font-body text-[10px] uppercase tracking-[0.22em] mb-1">
                    Category
                  </dt>
                  <dd className="font-body font-semibold text-rich-black capitalize text-[15px]">
                    {project.category.replace('-', ' ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted font-body text-[10px] uppercase tracking-[0.22em] mb-1">
                    Location
                  </dt>
                  <dd className="font-body font-semibold text-rich-black text-[15px]">
                    {project.location}
                  </dd>
                </div>
                {service && (
                  <div className="pt-4 border-t border-border">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-gold hover:text-gold-dark font-body text-sm font-semibold transition-colors"
                    >
                      Learn more about {service.title}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </dl>

              <div className="mt-7 pt-6 border-t border-border">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 bg-rich-black text-white hover:bg-warm-charcoal px-6 py-3.5 font-body font-semibold uppercase tracking-[0.18em] text-[11px] transition-colors"
                >
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
