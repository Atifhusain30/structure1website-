import ProjectGrid from './ProjectGrid';
import SectionHeader from './SectionHeader';
import Button from '@/components/ui/Button';
import type { Project } from '@/content/types';

export default function RelatedProjects({ projects, eyebrow = 'Projects', heading, text }: { projects: Project[]; eyebrow?: string; heading: string; text?: string }) {
  if (projects.length === 0) return null;
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow={eyebrow} title={heading} text={text} />
        <Button href="/projects" variant="link">
          View all projects
        </Button>
      </div>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
