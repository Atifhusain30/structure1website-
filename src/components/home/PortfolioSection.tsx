'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { projects } from '@/lib/data';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'patio-covers', label: 'Patio Covers' },
  { id: 'concrete', label: 'Concrete' },
];

const INITIAL_COUNT = 6;

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const openLightbox = useCallback((project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setLightboxIndex(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    if (!selectedProject) return;
    setLightboxIndex((prev) => (prev + 1) % selectedProject.images.length);
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (!selectedProject) return;
    setLightboxIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  }, [selectedProject]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProject, closeLightbox, nextImage, prevImage]);

  const scrollToContact = () => {
    closeLightbox();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
  };

  const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label || id;

  // Assign layout sizes for the asymmetric grid
  const getGridClass = (index: number) => {
    const pattern = index % 6;
    switch (pattern) {
      case 0: return 'sm:col-span-2 sm:row-span-2'; // large
      case 1: return 'sm:col-span-1 sm:row-span-1'; // standard
      case 2: return 'sm:col-span-1 sm:row-span-1'; // standard
      case 3: return 'sm:col-span-1 sm:row-span-1'; // standard
      case 4: return 'sm:col-span-1 sm:row-span-1'; // standard
      case 5: return 'sm:col-span-2 sm:row-span-1'; // wide
      default: return '';
    }
  };

  const getAspect = (index: number) => {
    const pattern = index % 6;
    if (pattern === 0) return 'aspect-square sm:aspect-auto sm:h-full';
    if (pattern === 5) return 'aspect-[4/3] sm:aspect-[2/1]';
    return 'aspect-[4/3]';
  };

  return (
    <section id="portfolio" className="py-section bg-sand overflow-hidden">
      <div className="max-w-wide mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="section-divider" />
              <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
                Portfolio
              </span>
            </div>
            <h2 className="font-heading font-bold text-section text-rich-black">
              Our Recent Projects
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setShowAll(false);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-400 ${
                  activeFilter === cat.id
                    ? 'bg-rich-black text-white'
                    : 'bg-parchment text-text-secondary hover:bg-rich-black/5 border border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 auto-rows-[minmax(200px,1fr)]">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(project)}
                className={`group cursor-pointer ${getGridClass(index)}`}
              >
                <div className={`relative ${getAspect(index)} w-full h-full rounded-card-lg overflow-hidden editorial-frame`}>
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location} by Structure1 Construction`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    sizes={
                      index % 6 === 0
                        ? '(max-width: 640px) 100vw, 66vw'
                        : index % 6 === 5
                        ? '(max-width: 640px) 100vw, 66vw'
                        : '(max-width: 640px) 100vw, 33vw'
                    }
                    quality={isMobile ? 65 : 75}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient overlay — always visible for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 via-rich-black/5 to-transparent md:opacity-50 md:group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Category tag — always visible on touch, hover-reveal on desktop */}
                  <div className="absolute top-4 left-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400">
                    <span className="bg-gold/90 text-white text-[10px] font-body font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {categoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Info overlay — always visible on touch */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
                    <div className="flex items-center gap-1.5 text-gold/90 text-[10px] font-body font-semibold uppercase tracking-widest mb-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg sm:text-xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 delay-100">
                      {project.title}
                    </h3>
                  </div>

                  {/* Gold accent line — hover only on desktop */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-600 ease-out-expo origin-left" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {!showAll && filtered.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <button
              onClick={() => setShowAll(true)}
              className="border border-rich-black/20 text-rich-black px-10 py-4 rounded-full font-body font-medium text-sm tracking-wider hover:bg-rich-black hover:text-white hover:border-rich-black transition-all duration-500 ease-out-expo"
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-rich-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="relative w-full max-w-5xl mx-4 aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProject.images[lightboxIndex]}
                alt={`${selectedProject.title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain rounded-card"
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={85}
                priority
              />

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Project info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-rich-black/80 to-transparent rounded-b-card">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="text-gold text-xs font-body font-semibold uppercase tracking-widest">
                      {selectedProject.location}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/60 font-body text-sm mt-1 max-w-md">
                      {selectedProject.description}
                    </p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="bg-gold text-white px-6 py-3 rounded-full text-sm font-body font-semibold hover:bg-gold-dark transition-colors whitespace-nowrap shrink-0"
                  >
                    Get a Similar Build
                  </button>
                </div>

                {selectedProject.images.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-4">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === lightboxIndex ? 'bg-gold w-6' : 'bg-white/25 w-2'
                        }`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
