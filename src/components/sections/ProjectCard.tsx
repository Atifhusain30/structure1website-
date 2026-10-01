import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import { getService } from '@/content/services';
import type { Project } from '@/content/types';

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw', feature = false }: { project: Project; sizes?: string; feature?: boolean }) {
  const service = getService(project.service);
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Photo id={project.cover} ratio={feature ? '21/9' : '4/3'} sizes={sizes} hover />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className={`font-display ${feature ? 'text-h2' : 'text-h3'} group-hover:underline group-hover:underline-offset-4`}>{project.title}</h3>
        <p className="shrink-0 text-right text-meta text-gray-500">
          {project.location}
          {service && (
            <>
              <br />
              {service.name}
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
