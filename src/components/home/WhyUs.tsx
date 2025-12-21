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
  { icon: Award, text: '5-Year Warranty' },
];

export default function WhyUs() {
  return (
    <section className="py-section bg-cream overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <AnimatedSection>
            <div className="relative">
              <motion.div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-black/10 to-cream"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-gray font-heading text-lg">Team at Work</span>
                </div>
              </motion.div>
              
              {/* Floating card */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-warm/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-warm" />
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-2xl text-primary-black">
                      <Counter target={15} suffix="+" />
                    </span>
                    <span className="text-text-gray text-sm">Years Experience</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <div>
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
              <p className="text-text-gray text-lg leading-relaxed mb-10">
                We combine decades of experience with a passion for quality construction. 
                Every project receives our full attention, from initial design through 
                final walkthrough, ensuring results that exceed expectations.
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-3 gap-6 mb-10">
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
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary-black rounded-full flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-primary-black font-medium">{benefit.text}</span>
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

