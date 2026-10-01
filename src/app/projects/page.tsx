import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ProjectFilters from '@/components/sections/ProjectFilters';
import ProjectGrid from '@/components/sections/ProjectGrid';
import CTASection from '@/components/sections/CTASection';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Patio Cover, Pergola & Concrete Projects in Dallas-Fort Worth',
  description:
    'Browse completed Structure1 projects across Dallas-Fort Worth: gable and lean-to patio covers, cedar pergolas, stamped concrete patios, and driveways.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage({ searchParams }: { searchParams: { service?: string; city?: string } }) {
  const { service, city } = searchParams;
  const list = projects.filter((p) => (!service || p.service === service) && (!city || p.city === city));
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Projects' }]}
        eyebrow="Projects"
        title="Our work across Dallas–Fort Worth"
        lead="Real projects, photographed on site. Filter by service or city."
        photo="gable-mckinney-2"
      />
      <Section>
        <ProjectFilters service={service} city={city} />
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
