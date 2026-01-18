'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const galleryImages = [
  {
    src: '/images/hero/buckfin1.JPG',
    alt: 'Gable patio cover - completed exterior',
    title: 'Completed Exterior',
    subtitle: 'Beautiful gable design with outdoor furniture',
  },
  {
    src: '/images/hero/buckfin2.JPG',
    alt: 'Gable patio cover - interior ceiling',
    title: 'Interior View',
    subtitle: 'Stunning wood ceiling with modern fan',
  },
  {
    src: '/images/hero/buckfin3.JPG',
    alt: 'Gable patio cover - construction',
    title: 'Construction Phase',
    subtitle: 'Expert craftsmanship in progress',
  },
];

export default function GableGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-section bg-gradient-to-b from-cream to-off-white overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.span
            className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Gable Style
          </motion.span>
          <motion.h2
            className="font-heading font-bold text-4xl md:text-5xl text-primary-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Classic Gable Patio Cover
          </motion.h2>
        </AnimatedSection>

        {/* Stacked Cards Gallery */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Thumbnail Stack - Left Side */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="flex lg:flex-col gap-4 justify-center">
                {galleryImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                        activeIndex === index
                          ? 'w-full h-24 lg:h-32 ring-2 ring-accent-warm ring-offset-4'
                          : 'w-full h-20 lg:h-24 opacity-60 hover:opacity-100'
                      }`}
                      animate={{
                        boxShadow: activeIndex === index 
                          ? '0 20px 40px rgba(0,0,0,0.15)' 
                          : '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 150px"
                        quality={70}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
                      />
                      
                      {/* Overlay with number */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        activeIndex === index ? 'bg-accent-warm/20' : 'bg-primary-black/30 group-hover:bg-primary-black/10'
                      }`}>
                        <motion.span
                          className={`font-heading font-bold text-2xl ${
                            activeIndex === index ? 'text-white' : 'text-white/80'
                          }`}
                          animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                        >
                          0{index + 1}
                        </motion.span>
                      </div>
                    </motion.div>
                    
                    {/* Title below thumbnail */}
                    <motion.p
                      className={`mt-2 text-sm font-medium text-center transition-colors ${
                        activeIndex === index ? 'text-accent-warm' : 'text-text-gray'
                      }`}
                    >
                      {image.title}
                    </motion.p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main Image Display - Right Side */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <motion.div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#1a1a1a]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Pre-load all images to prevent glitching */}
                {galleryImages.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      style={{ imageOrientation: 'from-image' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                      quality={85}
                      priority={idx === 0}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      unoptimized={isMobile}
                    />
                  </div>
                ))}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black/60 via-primary-black/10 to-transparent z-20 pointer-events-none" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
                  <div className="transition-opacity duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-[2px] bg-accent-warm" />
                      <span className="text-accent-warm text-sm font-medium uppercase tracking-wider">
                        Step {activeIndex + 1} of {galleryImages.length}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-3xl text-white mb-2">
                      {galleryImages[activeIndex].title}
                    </h3>
                    <p className="text-white/80 text-lg">
                      {galleryImages[activeIndex].subtitle}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-30">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveIndex((prev) => (prev + 1) % galleryImages.length)}
                    className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute top-6 right-6 z-30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-primary-black font-semibold text-sm">
                      Gable Design
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-8 bg-accent-warm' : 'bg-primary-black/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
