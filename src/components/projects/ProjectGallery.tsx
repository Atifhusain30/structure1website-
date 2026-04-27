'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFilter from './ProjectFilter';
import { projects } from '@/lib/data';

export default function ProjectGallery() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(8);
  };

  return (
    <div>
      <ProjectFilter
        categories={categories}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: (i % 8) * 0.05 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={75}
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
                <div className="pt-4">
                  <h3 className="font-heading font-semibold text-rich-black text-[15px] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary font-body text-[13px] mt-1">
                    {project.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="text-center mt-14">
          <button
            onClick={() => setVisibleCount((p) => p + 8)}
            className="inline-flex items-center bg-rich-black text-white hover:bg-warm-charcoal px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-300"
          >
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
}
