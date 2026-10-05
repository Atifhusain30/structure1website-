import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ProjectFilters from '@/components/sections/ProjectFilters';
import ProjectGrid from '@/components/sections/ProjectGrid';
import CTASection from '@/components/sections/CTASection';
import { projects, inServiceFamily, serviceFamily } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Patio Cover & Concrete Projects in Dallas-Fort Worth',
  description:
    'Browse completed Structure1 projects across Dallas-Fort Worth: gable, lean-to, and polycarbonate patio covers, stamped concrete patios, and driveways.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage({ searchParams }: { searchParams: { service?: string } }) {
  const { service } = searchParams;
  const svc = service && Object.prototype.hasOwnProperty.call(serviceFamily, service) ? (service as keyof typeof serviceFamily) : undefined;
  const list = projects.filter((p) => !svc || inServiceFamily(p, svc));
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Projects' }]}
        eyebrow="Projects"
        title="Our work across Dallas–Fort Worth"
        lead="Real projects, photographed on site. Filter by service."
        photo="gable-mckinney-2"
      />
      <Section>
        <ProjectFilters service={svc} />
        <div className="mt-12">
          {list.length > 0 ? (
            <ProjectGrid projects={list} />
          ) : (
            <p className="text-body text-gray-700">
              No projects match that filter yet.{' '}
              <a href="/projects" className="font-medium underline underline-offset-4">
                Show all projects
              </a>
              .
            </p>
          )}
        </div>
      </Section>
      <CTASection heading="Like what you see?" text="Every project starts with a free on-site estimate and an itemized quote." cta="Get an Estimate" />
    </>
  );
}
