'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const galleryImages = [
  {
    src: '/images/hero/sashi1.JPG',
    alt: 'Pergola project - concrete foundation',
    label: 'Step 1: Foundation',
  },
  {
    src: '/images/hero/sashi2.jpg',
    alt: 'Pergola project - frame construction',
    label: 'Step 2: Framing',
  },
  {
    src: '/images/hero/sashi3.JPG',
    alt: 'Pergola project - completed structure',
    label: 'Step 3: Structure',
  },
  {
    src: '/images/hero/sashi4.JPG',
    alt: 'Pergola project - polycarbonate roof with fan',
    label: 'Step 4: Finished',
  },
];

export default function PatioGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-rotate - slower on mobile to save battery
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, isMobile ? 5000 : 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section className="py-12 sm:py-section bg-cream">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8 sm:mb-16">
          <motion.h2 
            className="font-heading font-bold text-2xl sm:text-section text-primary-black"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
          >
            Our Work
          </motion.h2>
        </AnimatedSection>

        {/* Animated Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-[#1a1a1a] gpu-accelerated"
        >
          {/* Pre-load all images to prevent glitching */}
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                style={{ imageOrientation: 'from-image' }}
                sizes="(max-width: 375px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                quality={isMobile ? 70 : 80}
                priority={idx < 2}
                loading={idx < 2 ? 'eager' : 'lazy'}
                unoptimized={isMobile}
              />
            </div>
          ))}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-black/40 via-transparent to-transparent z-20 pointer-events-none" />

          {/* Progress indicator label */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-30">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-primary-black transition-opacity duration-300">
              {galleryImages[currentIndex].label}
            </span>
          </div>

          {/* Navigation dots - touch-friendly */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative p-1 touch-manipulation"
                aria-label={`Go to image ${index + 1}`}
              >
                <span
                  className={`block w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white'
                      : 'bg-white/40'
                  }`}
                />
                {/* Progress bar animation for active dot */}
                {index === currentIndex && (
                  <motion.span
                    className="absolute inset-0 top-1 bg-accent-warm rounded-full origin-left h-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: isMobile ? 5 : 4, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Thumbnail strip - hidden on mobile */}
          <div className="absolute bottom-6 right-6 hidden lg:flex gap-2 z-30">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileTap={{ scale: 0.95 }}
                className={`relative w-16 h-11 rounded-lg overflow-hidden transition-all duration-300 touch-manipulation ${
                  index === currentIndex
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                  quality={50}
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project info below gallery */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.1 }}
          className="mt-6 sm:mt-8 text-center px-2"
        >
          <h3 className="font-heading font-semibold text-xl sm:text-2xl text-primary-black mb-2">
            Pergola with Polycarbonate
          </h3>
          <p className="text-text-gray text-sm sm:text-base">
            From foundation to finish — watch the transformation of this beautiful outdoor living space
          </p>
        </motion.div>
      </div>
    </section>
  );
}
