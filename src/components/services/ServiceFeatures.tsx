'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

interface ServiceFeaturesProps {
  title: string;
  features: string[];
}

export default function ServiceFeatures({ title, features }: ServiceFeaturesProps) {
  return (
    <section className="py-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Content */}
          <AnimatedSection>
            <motion.span 
              className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What We Offer
            </motion.span>
            <h2 className="font-heading font-bold text-section text-primary-black mb-6">
              Our {title} Services
            </h2>
            <p className="text-text-gray text-lg leading-relaxed mb-10">
              We provide comprehensive {title.toLowerCase()} solutions tailored to your specific 
              needs. Our experienced team handles every aspect of the project, from initial 
              design to final installation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Get Free Quote
              </Button>
              <Button href="/projects" variant="outline">
                View Projects
              </Button>
            </div>
          </AnimatedSection>

          {/* Right - Features */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl"
                >
                  <div className="w-8 h-8 bg-primary-black rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-primary-black font-medium pt-1">{feature}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}


