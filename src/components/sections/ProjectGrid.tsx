import Reveal from '@/components/ui/Reveal';
import ProjectCard from './ProjectCard';
import type { Project } from '@/content/types';

export default function ProjectGrid({ projects, columns = 3 }: { projects: Project[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {projects.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={Math.min(i, 5) * 60}>
          <ProjectCard project={p} sizes={columns === 3 ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'} />
        </Reveal>
      ))}
    </ul>
  );
}
