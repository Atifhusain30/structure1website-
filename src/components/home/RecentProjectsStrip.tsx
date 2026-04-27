'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export default function RecentProjectsStrip() {
  const recent = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="portfolio" className="bg-parchment py-section overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-14"
        >
          <div>
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-4">
              Our Work
            </span>
            <h2 className="font-heading text-rich-black font-medium tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}>
              Recent Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-rich-black font-body text-[11px] font-semibold uppercase tracking-[0.22em] hover:text-gold transition-colors duration-400"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* 4 column horizontal grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {recent.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={p.image}
                    alt={`${p.title} in ${p.location}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
                <div className="pt-4">
                  <h3 className="font-heading font-semibold text-rich-black text-[15px] leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary font-body text-[13px] mt-1">
                    {p.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
