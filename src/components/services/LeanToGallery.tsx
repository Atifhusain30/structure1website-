'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-section bg-primary-black overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <motion.span
            className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Project
          </motion.span>
          <h2 className="font-heading font-bold text-section text-white">
            Lean To Style Patio Cover
          </h2>
        </AnimatedSection>

        {/* Cinematic Gallery */}
        <div className="relative">
          {/* Main Display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Split Reveal Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' }}
                animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                exit={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              >
                <Image
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px"
                  quality={85}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
                />
                
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-primary-black/30" />
                
                {/* Animated Grain Effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block bg-accent-warm text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    Step {currentIndex + 1}
                  </motion.span>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2">
                    {galleryImages[currentIndex].label}
                  </h3>
                  <p className="text-white/70 text-lg">
                    {galleryImages[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-accent-warm"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                key={currentIndex}
              />
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden transition-all duration-500 ${
                    index === currentIndex
                      ? 'ring-2 ring-accent-warm ring-offset-4 ring-offset-primary-black'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 120px"
                    quality={70}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-accent-warm/0 group-hover:bg-accent-warm/20 transition-colors"
                  />
                </div>
                
                {/* Label */}
                <motion.span
                  className={`block text-xs mt-2 text-center transition-colors ${
                    index === currentIndex ? 'text-accent-warm' : 'text-white/50'
                  }`}
                  animate={{
                    fontWeight: index === currentIndex ? 600 : 400,
                  }}
                >
                  {image.label}
                </motion.span>

                {/* Active Indicator Line */}
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-warm rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent-warm/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent-warm/5 rounded-full blur-3xl" />
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { title: 'Attached Design', desc: 'Connects directly to existing roofline' },
            { title: 'Weather Protection', desc: 'Excellent drainage and coverage' },
            { title: 'Custom Finishes', desc: 'Matching your home\'s style' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h4 className="font-heading font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-white/60 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
