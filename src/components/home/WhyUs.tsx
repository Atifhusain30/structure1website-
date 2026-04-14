'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Check, Award } from 'lucide-react';
import Counter from '@/components/ui/Counter';

const benefits = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured for your complete peace of mind.',
  },
  {
    icon: DollarSign,
    title: 'Free Consultations',
    description: 'No-obligation on-site consultations with detailed written estimates.',
  },
  {
    icon: Check,
    title: 'Transparent Pricing',
    description: 'Upfront pricing with no hidden fees. Know exactly what you\'re paying.',
  },
  {
    icon: Award,
    title: '2-Year Warranty',
    description: 'Every project backed by our comprehensive 2-year workmanship warranty.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden">
      {/* ── Image Band with Stats ── */}
      <div className="relative h-[320px] sm:h-[400px] lg:h-[480px]">
        <Image
          src="/images/hero/cover3.JPG"
          alt="Beautiful patio cover illuminated at night in Fort Worth Texas"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-rich-black/70" />

        {/* Stats Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-container mx-auto px-6 lg:px-8 w-full">
            <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto text-center">
              {[
                { value: 150, suffix: '+', label: 'Projects Completed' },
                { value: 4, suffix: '+', label: 'Years Experience' },
                { value: 100, suffix: '%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                >
                  <span className="block font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white tabular-nums">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-white/40 font-body text-xs sm:text-sm mt-2 block uppercase tracking-widest">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Section ── */}
      <div className="bg-rich-black py-section">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="section-divider" />
              <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
                Why Choose Us
              </span>
              <div className="section-divider" />
            </div>
            <h2 className="font-heading font-bold text-section text-white mb-5">
              Why Homeowners
              <br className="hidden sm:block" />
              Choose Us
            </h2>
            <p className="text-white/40 font-body text-lg leading-relaxed max-w-2xl mx-auto">
              No cutting corners. No surprise invoices. Just solid work
              from a team that treats your project like their own backyard.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group text-center lg:text-left"
              >
                <div className="w-14 h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-5 group-hover:border-gold/30 group-hover:bg-gold/[0.06] transition-all duration-500">
                  <benefit.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
