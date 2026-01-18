'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const recentProjects = [
  {
    src: '/images/hero/cover3.JPG',
    title: 'Pergola with Back Wall',
    location: 'McKinney, TX',
    blurColor: '#3d2c1a',
  },
  {
    src: '/images/hero/cover4.JPG',
    title: 'Gable Design',
    location: 'Fort Worth, TX',
    blurColor: '#1a2433',
  },
  {
    src: '/images/hero/cover1.JPG',
    title: 'Gable Patio Cover',
    location: 'Dallas, TX',
    blurColor: '#2d3a4a',
  },
  {
    src: '/images/hero/buckfin1.JPG',
    title: 'Classic Gable Design',
    location: 'Frisco, TX',
    blurColor: '#3a2d1f',
  },
  {
    src: '/images/hero/jeff2.JPG',
    title: 'Lean-To Patio Cover',
    location: 'Plano, TX',
    blurColor: '#2a3d4a',
  },
];

interface SelectedProject {
  src: string;
  title: string;
  location: string;
}

export default function RecentWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openLightbox = useCallback((project: SelectedProject) => {
    setSelectedProject(project);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeLightbox]);

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
    <section className="py-12 sm:py-section bg-off-white overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <motion.span
              className="text-accent-warm text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-2 sm:mb-4 block"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.3 : 0.5 }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-primary-black"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: isMobile ? 0.3 : 0.5 }}
            >
              Our Recent Work
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: isMobile ? 0.3 : 0.5 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-primary-black font-medium hover:text-accent-warm transition-colors touch-manipulation"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {recentProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? index * 0.05 : index * 0.1 }}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={() => openLightbox(project)}
              className="group relative cursor-pointer touch-manipulation"
            >
              <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden gpu-accelerated" style={{ backgroundColor: project.blurColor }}>
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className={`object-cover ${!isMobile ? 'transition-transform duration-500 group-hover:scale-105' : ''}`}
                  sizes="(max-width: 375px) 50vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={isMobile ? 70 : 80}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
                
                {/* Overlay - always visible on mobile */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/20 to-transparent ${
                    isMobile ? 'opacity-70' : hoveredIndex === index ? 'opacity-80' : 'opacity-60'
                  } transition-opacity duration-300`}
                />

                {/* Content - always visible on mobile */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
                  <div className={isMobile ? '' : `transform ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'} transition-all duration-300`}>
                    <span className="text-accent-warm text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1 block">
                      {project.location}
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-xl text-white line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  {/* Hover indicator - hidden on mobile */}
                  {!isMobile && (
                    <motion.div
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: hoveredIndex === index ? 1 : 0, 
                        opacity: hoveredIndex === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-white -rotate-45" />
                    </motion.div>
                  )}
                </div>

                {/* Border animation - disabled on mobile */}
                {!isMobile && hoveredIndex === index && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-accent-warm" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - optimized for mobile */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
            onClick={closeLightbox}
            style={{ 
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingTop: 'env(safe-area-inset-top)'
            }}
          >
            {/* Close Button - larger tap target for mobile */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400, duration: isMobile ? 0.2 : 0.3 }}
              className="relative w-full max-w-5xl mx-2 sm:mx-4 aspect-[4/3] sm:aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProject.src}
                alt={selectedProject.title}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 375px) 100vw, (max-width: 768px) 100vw, 80vw"
                quality={isMobile ? 75 : 85}
                priority
              />

              {/* Project Info */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-amber-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  {selectedProject.location}
                </span>
                <h3 className="text-white font-heading font-bold text-lg sm:text-2xl mt-1">
                  {selectedProject.title}
                </h3>
              </div>
            </motion.div>

            {/* Tap to close hint - always visible */}
            <div className="mt-4 text-center pointer-events-none">
              <span className="text-white/40 text-xs">Tap anywhere to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
