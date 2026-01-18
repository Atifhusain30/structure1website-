'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

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
    alt: 'Herringbone brick pattern concrete',
    label: 'Herringbone Brick',
  },
  {
    src: '/images/hero/Concrete4.jpg',
    alt: 'Multi-tone tile stamped concrete',
    label: 'Tile Pattern',
  },
  {
    src: '/images/hero/Concrete5.jpg',
    alt: 'Fresh poured concrete slab foundation',
    label: 'Foundation Work',
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
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-[#2a2a2a]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={concreteImages[currentIndex].src}
                  alt={concreteImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  quality={80}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Label */}
            <div className="absolute top-4 left-4 z-10">
              <motion.span
                key={`label-${currentIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-black shadow-lg"
              >
                {concreteImages[currentIndex].label}
              </motion.span>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 z-10">
              {concreteImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative p-1 touch-manipulation"
                  aria-label={`Go to image ${idx + 1}`}
                >
                  <span
                    className={`block w-8 sm:w-10 h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.span
                      className="absolute inset-0 top-1 bg-accent-warm rounded-full h-1"
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
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden touch-manipulation transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'ring-2 ring-accent-warm ring-offset-2 ring-offset-[#f5f5f0]' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 150px"
                  quality={70}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">
                  {image.label}
                </span>
              </motion.button>
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
    </section>
  );
}
