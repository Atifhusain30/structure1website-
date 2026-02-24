'use client';

import { motion } from 'framer-motion';
import { Shield, DollarSign, Check, Award } from 'lucide-react';
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
    <section id="why-us" className="py-section bg-primary-black overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-accent-warm text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            className="font-heading font-bold text-section text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Dallas Homeowners Trust Structure1
          </motion.h2>

          <motion.p
            className="text-white/50 text-lg leading-relaxed mb-14 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We combine years of experience with a passion for quality construction.
            Every project receives our full attention, ensuring results that exceed expectations.
          </motion.p>

          {/* Animated Counters */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mb-16 max-w-xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <span className="block font-heading font-bold text-3xl sm:text-5xl text-white tabular-nums">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-white/40 text-xs sm:text-sm mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-14">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-accent-warm" />
                </div>
                <span className="text-white/80 font-medium text-sm">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Embedded testimonial quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-white/10 pt-10"
          >
            <p className="text-white/60 text-lg md:text-xl italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;Structure1 transformed our backyard into an absolute paradise.
              The patio cover exceeded every expectation. Professional from start to finish.&rdquo;
            </p>
            <p className="text-accent-warm font-semibold text-sm mt-4">
              — Sarah & Michael Johnson, McKinney TX
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
