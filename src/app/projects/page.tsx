import { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ProjectGallery from '@/components/projects/ProjectGallery';

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Explore our portfolio of completed patio covers, pergolas, and concrete work across the Dallas-Fort Worth Metroplex.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Recent projects across DFW."
        description="Patio covers, pergolas, outdoor kitchens, and concrete craftsmanship — every project built right and built to last."
        image="/images/hero/cover1.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <ProjectGallery />
        </div>
      </section>
    </>
  );
}
