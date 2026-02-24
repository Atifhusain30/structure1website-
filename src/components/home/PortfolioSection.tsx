'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { projects } from '@/lib/data';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'patio-covers', label: 'Patio Covers' },
  { id: 'concrete', label: 'Concrete' },
];

const INITIAL_COUNT = 6;

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const openLightbox = useCallback((project: typeof projects[0]) => {
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
    setLightboxIndex(prev => (prev + 1) % selectedProject.images.length);
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (!selectedProject) return;
    setLightboxIndex(prev => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
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

  const categoryLabel = (id: string) => categories.find(c => c.id === id)?.label || id;

  return (
    <section id="portfolio" className="py-section bg-cream">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
        >
          <div>
            <span className="text-accent-warm text-xs font-semibold uppercase tracking-[0.2em] mb-3 block">
              Portfolio
            </span>
            <h2 className="font-heading font-bold text-section text-primary-black tracking-tight">
              Our Recent Projects
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveFilter(cat.id); setShowAll(false); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-primary-black text-white shadow-card'
                    : 'bg-white text-text-gray hover:bg-primary-black/5 border border-border-light'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => openLightbox(project)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-charcoal">
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location} by Structure1 Construction`}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={isMobile ? 65 : 75}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black/70 via-primary-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Amber hover border */}
                  <div className="absolute inset-0 rounded-card border-2 border-accent-warm/0 group-hover:border-accent-warm/60 transition-all duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-warm/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {categoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-accent-warm text-xs font-medium uppercase tracking-wider mb-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                      {project.title}
                    </h3>
                    {/* View Project text on hover */}
                    <div className="mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                      <span className="text-white/80 text-sm font-medium">View Project &rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {!showAll && filtered.length > INITIAL_COUNT && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="border-2 border-primary-black text-primary-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wider hover:bg-primary-black hover:text-white transition-all duration-300"
            >
              View All Projects &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
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
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={85}
                priority
              />

              {/* Nav Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors touch-manipulation"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="text-accent-warm text-xs font-semibold uppercase tracking-wider">
                      {selectedProject.location}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 max-w-md">
                      {selectedProject.description}
                    </p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="bg-accent-warm text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent-warm-dark transition-colors whitespace-nowrap shrink-0"
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
                        className={`h-1.5 rounded-full transition-all ${
                          i === lightboxIndex ? 'bg-accent-warm w-6' : 'bg-white/30 w-2'
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
