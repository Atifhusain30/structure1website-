'use client';

import { motion } from 'framer-motion';
import { Check, Shield, DollarSign, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Counter from '@/components/ui/Counter';
import { stats } from '@/lib/data';

const benefits = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: DollarSign, text: 'Free Consultations' },
  { icon: Check, text: 'Transparent Pricing' },
  { icon: Award, text: '2-Year Workmanship Warranty' },
];

export default function WhyUs() {
  return (
    <section className="py-section bg-cream overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center">
            <AnimatedSection>
              <motion.span 
                className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Why Choose Us
              </motion.span>
              <h2 className="font-heading font-bold text-section text-primary-black mb-6">
                Why Structure1?
              </h2>
              <p className="text-text-gray text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                We combine years of experience with a passion for quality construction. 
                Every project receives our full attention, from initial design through 
                final walkthrough, ensuring results that exceed expectations.
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-3 gap-8 mb-12 max-w-xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <span className="block font-heading font-bold text-4xl text-primary-black">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-text-gray text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-12 h-12 bg-primary-black rounded-full flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-primary-black font-medium text-sm">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

