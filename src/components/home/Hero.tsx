'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import RotatingBadge from '@/components/ui/RotatingBadge';
import Counter from '@/components/ui/Counter';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { scrollY } = useScroll();

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

  const shouldDisableParallax = isMobile || isIOS;
  const y1 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, shouldDisableParallax ? 0 : -75]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-off-white hero-section">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent-warm/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cream rounded-full blur-3xl -z-0" />

      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-accent-warm text-sm font-semibold uppercase tracking-[0.2em] mb-4 block"
            >
              Dallas-Fort Worth&apos;s #1 Outdoor Builder
            </motion.span>

            <AnimatedText
              text="Premium Patio Covers & Concrete in Dallas-Fort Worth"
              className="font-heading font-bold text-hero leading-[1.05] text-primary-black mb-4 sm:mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.3 : 0.8 }}
              className="text-text-gray text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mb-6 sm:mb-10"
            >
              Transform your backyard into a stunning outdoor living space.
              Expert craftsmanship, transparent pricing, 150+ projects completed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.4 : 1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo('portfolio')}
                className="border-2 border-primary-black text-primary-black px-8 py-4 rounded-full font-medium tracking-wider uppercase text-sm hover:bg-primary-black hover:text-white transition-all duration-300"
              >
                Explore Our Work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="bg-primary-black text-white px-8 py-4 rounded-full font-medium tracking-wider uppercase text-sm hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300"
              >
                Get Free Estimate
              </button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.5 : 1.2 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-border-light"
            >
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">
                  <Counter target={150} suffix="+" />
                </span>
                <span className="text-text-gray text-xs sm:text-sm">Projects Done</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">
                  <Counter target={4} suffix="+" duration={1.5} />
                </span>
                <span className="text-text-gray text-xs sm:text-sm">Years Experience</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-heading font-bold text-2xl sm:text-4xl text-primary-black">
                  <Counter target={100} suffix="%" />
                </span>
                <span className="text-text-gray text-xs sm:text-sm">Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Overlapping Image Collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[700px]">
              {/* Main large image */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y1 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-0 right-0 w-[70%] h-[60%] rounded-xl sm:rounded-2xl overflow-hidden shadow-heavy z-10 bg-charcoal"
              >
                <Image
                  src="/images/images V2/andrew 2.jpeg"
                  alt="Custom gable patio cover with cedar posts and metal accents in Dallas-Fort Worth Texas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 35vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>

              {/* Second image */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y2 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute top-[40%] left-0 w-[55%] h-[45%] rounded-xl sm:rounded-2xl overflow-hidden shadow-medium z-20 bg-charcoal"
              >
                <Image
                  src="/images/hero/cover2.JPG"
                  alt="Pergola with polycarbonate roofing and ceiling fan in Plano Texas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 40vw, 28vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  priority
                  loading="eager"
                />
              </motion.div>

              {/* Third image */}
              <motion.div
                style={shouldDisableParallax ? undefined : { y: y3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-[5%] right-[5%] w-[50%] sm:w-[45%] h-[30%] sm:h-[35%] rounded-xl sm:rounded-2xl overflow-hidden shadow-card z-30 bg-charcoal"
              >
                <Image
                  src="/images/hero/cover3.JPG"
                  alt="Beautiful patio cover illuminated at night in Fort Worth Texas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 23vw"
                  quality={isIOS ? 60 : (isMobile ? 70 : 80)}
                  loading="lazy"
                />
              </motion.div>

              {/* Spinning S1 Badge */}
              {!isIOS && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute top-[15%] sm:top-[20%] left-[5%] sm:left-[10%] z-40 scale-75 sm:scale-100"
                >
                  <RotatingBadge />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
