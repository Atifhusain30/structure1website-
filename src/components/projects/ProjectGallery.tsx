'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProjectFilter from './ProjectFilter';
import Button from '@/components/ui/Button';
import { projects } from '@/lib/data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SelectedProject {
  title: string;
  image: string;
  images: string[];
  location: string;
  category: string;
}

export default function ProjectGallery() {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openLightbox = (project: typeof projects[0]) => {
    setSelectedProject({
      title: project.title,
      image: project.image,
      images: project.images,
      location: project.location,
      category: project.category
    });
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, nextImage, prevImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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
              onClick={() => openLightbox(project)}
              className="cursor-pointer"
            >
              <motion.div
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* Project Image */}
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
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={75}
                    loading="lazy"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/20 to-transparent"
                  variants={{
                    rest: { opacity: 0.6 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-5"
                >
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider mb-1">
                    {project.location}
                  </span>
                  <h3 className="text-white font-heading font-bold text-lg">
                    {project.title}
                  </h3>
                </motion.div>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl mx-4 aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProject.images[currentImageIndex]}
                alt={selectedProject.title}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={85}
                priority
              />

              {/* Navigation Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">
                  {selectedProject.category.replace('-', ' ')} • {selectedProject.location}
                </span>
                <h3 className="text-white font-heading font-bold text-2xl mt-1">
                  {selectedProject.title}
                </h3>
                {selectedProject.images.length > 1 && (
                  <div className="flex items-center gap-2 mt-3">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-amber-400 w-6' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

