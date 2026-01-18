import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectGallery from '@/components/projects/ProjectGallery';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Explore our portfolio of completed patio cover projects including gable designs, lean-to covers, and pergolas with polycarbonate roofing.',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary-black">Projects</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Our Projects
            </h1>
            <p className="text-text-gray text-xl leading-relaxed">
              Explore our portfolio of completed projects. Each one represents our 
              commitment to quality craftsmanship and client satisfaction.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <ProjectGallery />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}


