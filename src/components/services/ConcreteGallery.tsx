'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const concreteImages = [
  {
    src: '/images/hero/Concrete1.PNG',
    alt: 'Stamped concrete patio with stone pattern',
    label: 'Flagstone Pattern',
  },
  {
    src: '/images/hero/concrete2.jpg',
    alt: 'Decorative wood plank stamped concrete',
    label: 'Wood Plank Style',
  },
  {
    src: '/images/hero/concrete3.jpg',
    alt: 'Fresh poured concrete slab foundation',
    label: 'Foundation Work',
  },
  {
    src: '/images/hero/Concrete4.jpg',
    alt: 'Multi-tone tile stamped concrete',
    label: 'Tile Pattern',
  },
  {
    src: '/images/hero/Concrete5.jpg',
    alt: 'Herringbone brick pattern concrete',
    label: 'Herringbone Brick',
  },
  {
    src: '/images/hero/concrete6.PNG',
    alt: 'Detailed flagstone texture concrete',
    label: 'Stone Texture',
  },
];

export default function ConcreteGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % concreteImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + concreteImages.length) % concreteImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % concreteImages.length);
    }, isMobile ? 5000 : 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#f5f5f0] to-[#e8e8e3]">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <motion.span 
            className="text-accent-warm text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-3 block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Concrete Work
          </motion.span>
          <motion.h2 
            className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-primary-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stamped & Decorative Finishes
          </motion.h2>
          <motion.p
            className="text-text-gray text-sm sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From elegant stone patterns to modern designs, see our range of concrete finishes
          </motion.p>
        </AnimatedSection>

        {/* Main Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Featured Large Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a]"
          >
            {/* Clickable image area */}
            <button
              type="button"
              onClick={() => openLightbox(currentIndex)}
              className="absolute inset-0 z-10 w-full h-full cursor-pointer touch-manipulation focus:outline-none group"
              aria-label="View image in fullscreen"
            >
              {/* Pre-load all images to prevent glitching */}
              {concreteImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    quality={80}
                    priority={idx < 2}
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Click to view indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-black shadow-lg">
                  Tap to view
                </span>
              </div>
            </button>

            {/* Label - pointer-events-none so clicks pass through */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-black shadow-lg transition-opacity duration-300">
                {concreteImages[currentIndex].label}
              </span>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 z-20">
              {concreteImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className="relative p-2 touch-manipulation"
                  aria-label={`Go to image ${idx + 1}`}
                >
                  <span
                    className={`block w-8 sm:w-10 h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.span
                      className="absolute inset-0 top-2 bg-accent-warm rounded-full h-1 mx-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: isMobile ? 5 : 4, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Thumbnail Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {concreteImages.map((image, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden touch-manipulation transition-all duration-300 cursor-pointer group ${
                  idx === currentIndex 
                    ? 'ring-2 ring-accent-warm ring-offset-2 ring-offset-[#f5f5f0]' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                aria-label={`View ${image.label}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 45vw, 200px"
                  quality={70}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">
                  {image.label}
                </span>
                {/* Tap indicator on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-primary-black">
                    View
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-text-gray text-sm sm:text-base max-w-xl mx-auto">
            Every concrete project is custom-designed to match your home&apos;s style. 
            From stamped patterns to smooth finishes, we deliver quality that lasts.
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          lightboxOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeLightbox}
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingTop: 'env(safe-area-inset-top)'
        }}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            lightboxOpen ? 'opacity-95' : 'opacity-0'
          }`}
        />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-8">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pre-render all images for smooth transitions */}
            {concreteImages.map((image, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  idx === lightboxIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  quality={90}
                  priority={idx === lightboxIndex}
                />
              </div>
            ))}
          </div>

          {/* Label, counter, and thumbnails */}
          <div 
            className="mt-4 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {concreteImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden transition-all duration-200 touch-manipulation ${
                    idx === lightboxIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="48px"
                    quality={50}
                  />
                </button>
              ))}
            </div>

            {/* Label and counter */}
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              {concreteImages[lightboxIndex].label} — {lightboxIndex + 1} / {concreteImages.length}
            </span>
          </div>

          {/* Tap to close hint */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <span className="text-white/40 text-xs">Tap anywhere to close</span>
          </div>
        </div>
      </div>
    </section>
  );
}
