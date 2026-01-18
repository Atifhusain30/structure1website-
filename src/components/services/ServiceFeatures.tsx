'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="py-12 bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white rounded-xl"
              >
                <div className="w-6 h-6 bg-primary-black rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-primary-black text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


