import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import CTASection from '@/components/home/CTASection';
import { projects, services } from '@/lib/data';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const service = services.find((s) => s.id === project.category);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection>
            {/* Back link */}
            <Link
              href="/projects"
              className="inline-flex items-center text-text-gray hover:text-primary-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-primary-black transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-primary-black">{project.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-primary-black text-white px-4 py-1 rounded-full text-sm uppercase tracking-wider">
                {project.category.replace('-', ' ')}
              </span>
              <span className="text-text-gray">{project.location}</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              {project.title}
            </h1>
            <p className="text-text-gray text-xl leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Images */}
      <section className="py-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <AnimatedSection className="lg:col-span-2">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-border-light relative">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} - Main Image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </AnimatedSection>

            {/* Additional Images */}
            {project.images.slice(1).map((image, index) => (
              <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-border-light relative">
                  <Image
                    src={image}
                    alt={`${project.title} - Detail View ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-section bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <AnimatedSection className="lg:col-span-2">
              <h2 className="font-heading font-bold text-3xl text-primary-black mb-6">
                Project Overview
              </h2>
              <p className="text-text-gray text-lg leading-relaxed mb-6">
                {project.description}
              </p>
              <p className="text-text-gray leading-relaxed">
                This project showcases our commitment to quality craftsmanship and 
                attention to detail. From the initial consultation through final 
                completion, we worked closely with the client to ensure their vision 
                was brought to life perfectly.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8">
                <h3 className="font-heading font-bold text-xl text-primary-black mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-text-gray text-sm block mb-1">Category</span>
                    <span className="text-primary-black font-medium capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-gray text-sm block mb-1">Location</span>
                    <span className="text-primary-black font-medium">
                      {project.location}
                    </span>
                  </div>
                  {service && (
                    <div className="pt-4 border-t border-border-light">
                      <Link
                        href={`/services/${service.id}`}
                        className="text-accent-warm hover:text-primary-black transition-colors font-medium"
                      >
                        Learn more about our {service.title} services →
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Button href="/contact" variant="primary" className="w-full">
                    Start Your Project
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}


