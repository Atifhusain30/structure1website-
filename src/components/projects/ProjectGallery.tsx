'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProjectFilter from './ProjectFilter';
import Button from '@/components/ui/Button';
import { projects } from '@/lib/data';

export default function ProjectGallery() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(6);
  };

  return (
    <div>
      <ProjectFilter
        categories={categories}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div
                  className="w-full h-full relative bg-primary-black/10"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={75}
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/20 to-transparent"
                  variants={{
                    rest: { opacity: 0.6 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-accent-warm text-xs font-medium uppercase tracking-wider mb-1">
                    {project.location}
                  </span>
                  <h3 className="text-white font-heading font-bold text-lg">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <Button onClick={handleLoadMore} variant="outline">
            Load More Projects
          </Button>
        </motion.div>
      )}
    </div>
  );
}
