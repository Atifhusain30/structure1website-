'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectFilter from './ProjectFilter';
import { projects } from '@/lib/data';

export default function ProjectGallery() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(9);
  };

  return (
    <div>
      <ProjectFilter categories={categories} activeFilter={filter} onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
        {visibleProjects.map((project, i) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block relative overflow-hidden bg-rich-black"
          >
            <div className="relative aspect-[4/5] image-hover-zoom">
              <Image
                src={project.image}
                alt={`${project.title} in ${project.location}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                className="object-cover"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-rich-black/10 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 p-6 lg:p-7 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  {project.location}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/55 block mb-2">
                  {(project.category || '').replace(/-/g, ' ')}
                </span>
                <h3 className="font-display text-[22px] lg:text-[26px] font-medium leading-[1.1]">
                  {project.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-16">
          <button
            onClick={() => setVisibleCount((p) => p + 9)}
            className="inline-flex items-center gap-2 bg-rich-black text-white hover:bg-gold hover:text-rich-black border border-rich-black hover:border-gold px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
