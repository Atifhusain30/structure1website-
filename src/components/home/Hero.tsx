'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import RotatingBadge from '@/components/ui/RotatingBadge';
import Button from '@/components/ui/Button';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -75]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <AnimatedText
              text="Where Quality Meets Craftsmanship"
              className="font-heading font-bold text-hero leading-[1.05] text-primary-black mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-text-gray text-lg lg:text-xl leading-relaxed max-w-lg mb-10"
            >
              Transform your living space with our expert design-build services—from 
              stunning pools to complete home renovations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Button href="/projects" variant="outline">
                Explore Our Work
              </Button>
              <Button href="/contact" variant="primary">
                Get Free Quote
              </Button>
            </motion.div>

            {/* Stats preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-12 mt-16 pt-8 border-t border-border-light"
            >
              <div>
                <span className="block font-heading font-bold text-4xl text-primary-black">150+</span>
                <span className="text-text-gray text-sm">Projects Done</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-4xl text-primary-black">4+</span>
                <span className="text-text-gray text-sm">Years Experience</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-4xl text-primary-black">100%</span>
                <span className="text-text-gray text-sm">Satisfaction</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Image Grid */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[500px] lg:h-[700px]">
              {/* Main large image - Pool with Patio Cover */}
              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 right-0 w-[70%] h-[60%] rounded-2xl overflow-hidden shadow-2xl z-10"
              >
                <Image
                  src="/images/hero/hero-1.png"
                  alt="Luxury pool with custom patio cover and outdoor kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, 35vw"
                  priority
                />
              </motion.div>

              {/* Second image - Modern Home with Pool */}
              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-[40%] left-0 w-[55%] h-[45%] rounded-2xl overflow-hidden shadow-xl z-20"
              >
                <Image
                  src="/images/hero/hero-2.png"
                  alt="Modern custom home with geometric pool design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 28vw"
                  priority
                />
              </motion.div>

              {/* Third image - Patio Cover */}
              <motion.div
                style={{ y: y3 }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-0 right-[10%] w-[45%] h-[35%] rounded-2xl overflow-hidden shadow-lg z-30"
              >
                <Image
                  src="/images/hero/hero-3.png"
                  alt="Custom patio cover with outdoor living space"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 23vw"
                  priority
                />
              </motion.div>

              {/* Rotating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-[20%] left-[10%] z-40"
              >
                <RotatingBadge />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-accent-warm/10 rounded-full blur-2xl" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-cream rounded-full blur-3xl" />
    </section>
  );
}
