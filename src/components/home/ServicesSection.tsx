'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section className="py-section bg-cream">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.span 
            className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Expertise
          </motion.span>
          <h2 className="font-heading font-bold text-section text-primary-black mb-6">
            What We Build
          </h2>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            Comprehensive construction services tailored to elevate your home 
            with quality craftsmanship and attention to detail.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              shortDescription={service.shortDescription}
              image={service.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

