'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ServiceHeroProps {
  title: string;
  description: string;
  image?: string;
}

export default function ServiceHero({ title, description, image }: ServiceHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream to-off-white" />
      
      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-gray mb-6 sm:mb-8 flex-wrap">
              <Link href="/" className="hover:text-primary-black transition-colors touch-manipulation">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-primary-black transition-colors touch-manipulation">
                Services
              </Link>
              <span>/</span>
              <span className="text-primary-black">{title}</span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-hero text-primary-black mb-4 sm:mb-6">
              {title}
            </h1>
            <p className="text-text-gray text-base sm:text-xl leading-relaxed">
              {description}
            </p>
          </AnimatedSection>

          {/* Image - Simplified animation for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#2a2a2a]"
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                priority
                loading="eager"
                quality={isMobile ? 70 : 85}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-black/10 to-cream">
                <span className="text-text-gray font-heading text-lg">{title} Image</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

