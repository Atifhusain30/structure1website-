'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import RotatingBadge from '@/components/ui/RotatingBadge';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { scrollY } = useScroll();
  
  // Detect mobile and iOS on mount
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsMobile(mobile);
      setIsIOS(ios);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Disable parallax completely on mobile/iOS for performance
  const shouldDisableParallax = isMobile || isIOS;
  const y1 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -75]);

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-off-white hero-section">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <AnimatedText
              text="Where Quality Meets Craftsmanship"
              className="font-heading font-bold text-hero leading-[1.05] text-primary-black mb-4 sm:mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.3 : 0.8 }}
              className="text-text-gray text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mb-6 sm:mb-10"
            >
              Transform your living space with our expert design-build services—from 
              stunning pools to complete home renovations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.4 : 1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button href="/projects" variant="outline">
                Explore Our Work
              </Button>
              <Button href="/contact" variant="primary">
                Get Free Quote
              </Button>
            </motion.div>

            {/* Stats preview - responsive grid on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.5 : 1.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-border-light"
            >
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">150+</span>
                <span className="text-text-gray text-xs sm:text-sm">Projects Done</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">4+</span>
                <span className="text-text-gray text-xs sm:text-sm">Years Experience</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">100%</span>
                <span className="text-text-gray text-xs sm:text-sm">Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Image Grid - Simplified animations for iOS */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[700px]">
              {/* Main large image - Gable Patio Cover */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute top-0 right-0 w-[70%] h-[60%] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl z-10 bg-[#2d3a4a]"
              >
                <Image
                  src="/images/hero/cover1.JPG"
                  alt="Custom gable patio cover with outdoor furniture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 35vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>

              {/* Second image - Pergola with Polycarbonate */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute top-[40%] left-0 w-[55%] h-[45%] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl z-20 bg-[#3a4555]"
              >
                <Image
                  src="/images/hero/cover2.JPG"
                  alt="Pergola with polycarbonate roofing and ceiling fan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 40vw, 28vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  priority
                  loading="eager"
                />
              </motion.div>

              {/* Third image - Patio Cover at Night */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute bottom-[5%] right-[5%] w-[50%] sm:w-[45%] h-[30%] sm:h-[35%] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg z-30 bg-[#1a2433]"
              >
                <Image
                  src="/images/hero/cover3.JPG"
                  alt="Beautiful patio cover illuminated at night"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 23vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  loading="lazy"
                />
              </motion.div>

              {/* Rotating Badge - smaller on mobile, simplified on iOS */}
              {!isIOS && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute top-[15%] sm:top-[20%] left-[5%] sm:left-[10%] z-40 scale-75 sm:scale-100"
                >
                  <RotatingBadge />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements - hidden on mobile for performance */}
      <div className="hidden lg:block absolute top-40 left-10 w-20 h-20 bg-accent-warm/10 rounded-full blur-2xl" />
      <div className="hidden lg:block absolute bottom-40 right-10 w-40 h-40 bg-cream rounded-full blur-3xl" />
    </section>
  );
}
