import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { getService } from '@/content/services';
import type { Project } from '@/content/types';

export default function ProjectCard({ project, sizes = '(max-width: 768px) 100vw, 33vw' }: { project: Project; sizes?: string }) {
  const service = getService(project.service);
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Photo id={project.cover} ratio="4/3" sizes={sizes} hover />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-h3">{project.title}</h3>
          <p className="mt-1 text-meta text-gray-500">
            {project.location}
            {service ? ` · ${service.name}` : ''}
          </p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium group-hover:text-timber">
          View Project <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
