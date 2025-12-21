'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative py-section overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-primary-black"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-black via-primary-black to-text-dark-gray" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-warm rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <motion.span 
            className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get Started
          </motion.span>
          <h2 className="font-heading font-bold text-section text-white mb-6">
            Ready to Build Your Dream?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Let&apos;s discuss your project. Schedule a free consultation with our team 
            and take the first step toward transforming your space.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact">
              <MagneticButton className="bg-white text-primary-black px-10 py-5 rounded-full font-medium tracking-wider uppercase text-sm hover:shadow-2xl transition-shadow">
                Start Your Project
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10"
          >
            <div className="text-center">
              <span className="block text-white font-heading font-bold text-2xl">Free</span>
              <span className="text-gray-500 text-sm">Consultation</span>
            </div>
            <div className="text-center">
              <span className="block text-white font-heading font-bold text-2xl">No</span>
              <span className="text-gray-500 text-sm">Obligation</span>
            </div>
            <div className="text-center">
              <span className="block text-white font-heading font-bold text-2xl">Fast</span>
              <span className="text-gray-500 text-sm">Response</span>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

