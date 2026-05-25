import { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ProjectGallery from '@/components/projects/ProjectGallery';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'A portfolio of completed patio covers, pergolas, outdoor kitchens, and concrete projects across the Dallas–Fort Worth Metroplex.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Built across"
        italicWord="the Metroplex."
        description="Patio covers, pergolas, outdoor kitchens, and concrete projects across DFW. Filter by service — each tile links to the full build story."
        image="/images/hero/cover1.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Work' }]}
      />

      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <ProjectGallery />
        </div>
      </section>

      <CTASection />
    </>
  );
}
