'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const galleryImages = [
  {
    src: '/images/hero/jeff1.png',
    alt: 'Lean-to patio cover - stamped concrete foundation',
    label: 'Foundation',
    description: 'Stamped concrete patio base',
  },
  {
    src: '/images/hero/jeff3.JPG',
    alt: 'Lean-to patio cover - ceiling with fan and lights',
    label: 'Interior',
    description: 'Dark wood ceiling with fan & recessed lighting',
  },
  {
    src: '/images/hero/jeff2.JPG',
    alt: 'Lean-to patio cover - completed exterior',
    label: 'Completed',
    description: 'Finished lean-to with outdoor living space',
  },
];

export default function LeanToGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, isMobile ? 6000 : 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile]);

  return (
    <section className="py-12 sm:py-section bg-primary-black overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8 sm:mb-12 text-center">
          <span className="text-accent-warm text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-3 sm:mb-4 block">
            Featured Project
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-white">
            Lean To Style Patio Cover
          </h2>
        </AnimatedSection>

        {/* Gallery */}
        <div className="relative">
          {/* Main Display */}
          <div
            className="relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1a1a1a]"
            onMouseEnter={() => !isMobile && setIsAutoPlaying(false)}
            onMouseLeave={() => !isMobile && setIsAutoPlaying(true)}
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                  quality={80}
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-primary-black/30 z-20 pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-30">
              <span className="inline-block bg-accent-warm text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 sm:mb-3">
                Step {currentIndex + 1}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-3xl md:text-4xl text-white mb-1 sm:mb-2">
                {galleryImages[currentIndex].label}
              </h3>
              <p className="text-white/70 text-sm sm:text-lg">
                {galleryImages[currentIndex].description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
              <motion.div
                className="h-full bg-accent-warm"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: isMobile ? 6 : 5, ease: 'linear' }}
                key={currentIndex}
              />
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative touch-manipulation"
              >
                <div
                  className={`relative w-20 h-14 sm:w-28 sm:h-18 md:w-32 md:h-20 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-accent-warm ring-offset-2 ring-offset-primary-black'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 128px"
                    quality={60}
                    loading="lazy"
                  />
                </div>
                
                {/* Label */}
                <span
                  className={`block text-xs mt-2 text-center transition-colors ${
                    index === currentIndex ? 'text-accent-warm font-semibold' : 'text-white/50'
                  }`}
                >
                  {image.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16 max-w-4xl mx-auto">
          {[
            { title: 'Attached Design', desc: 'Connects directly to existing roofline' },
            { title: 'Weather Protection', desc: 'Excellent drainage and coverage' },
            { title: 'Custom Finishes', desc: 'Matching your home\'s style' },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10"
            >
              <h4 className="font-heading font-semibold text-white text-sm sm:text-base mb-1 sm:mb-2">{feature.title}</h4>
              <p className="text-white/60 text-xs sm:text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

