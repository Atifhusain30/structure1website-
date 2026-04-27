'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Star, MessageCircle } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    body: 'Fully licensed and insured for your peace of mind.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    body: 'Skilled professionals with decades of combined experience.',
  },
  {
    icon: Star,
    title: 'Quality Craftsmanship',
    body: 'Built with precision and attention to every detail.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    body: 'Transparent updates and honest communication.',
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-rich-black border-t border-white/[0.05]">
      <div className="max-w-wide mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="shrink-0 w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center">
                <p.icon className="w-4 h-4 text-gold" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-body font-semibold text-white text-[15px] tracking-tight">
                  {p.title}
                </h3>
                <p className="text-white/55 font-body text-sm leading-relaxed mt-1">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
