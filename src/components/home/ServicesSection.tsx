'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Apple-style Header */}
        <AnimatedSection className="text-center mb-24">
          <motion.span 
            className="inline-block text-[#86868b] text-xs font-medium uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-[#1d1d1f] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            What We Build
          </motion.h2>
          <motion.p 
            className="text-[#86868b] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Comprehensive construction services tailored to elevate your home 
            with quality craftsmanship and attention to detail.
          </motion.p>
        </AnimatedSection>

        {/* Services - Side by Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              shortDescription={service.shortDescription}
              image={service.image}
              images={service.images}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


