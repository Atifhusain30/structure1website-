import ProjectCard from './ProjectCard';
import type { Project } from '@/content/types';

/** A contact sheet. With `feature`, the first project runs wide across two columns. */
export default function ProjectGrid({ projects, columns = 3, feature = false }: { projects: Project[]; columns?: 2 | 3; feature?: boolean }) {
  return (
    <ul className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {projects.map((p, i) => {
        const wide = feature && i === 0;
        return (
          <li key={p.slug} className={wide ? 'sm:col-span-2 lg:col-span-3' : ''}>
            <ProjectCard
              project={p}
              feature={wide}
              sizes={wide ? '(max-width: 1280px) 100vw, 1280px' : columns === 3 ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'}
            />
          </li>
        );
      })}
    </ul>
  );
}
