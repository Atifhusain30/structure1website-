'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CommitmentBlock() {
  return (
    <section className="bg-parchment pb-section overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Dark left panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-rich-black text-white p-10 lg:p-14 xl:p-16 flex flex-col justify-center min-h-[420px] order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-gold" />
              <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
                Our Commitment
              </span>
            </div>
            <h2 className="font-heading font-medium leading-[1.05] tracking-tight text-white mb-6"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
              Construction
              <br />
              <span className="italic">That Adds Value</span>
            </h2>
            <p className="font-body text-white/65 text-[15px] leading-relaxed max-w-md mb-9">
              We combine quality craftsmanship, premium materials, and proven processes
              to deliver outdoor spaces that are built right and built to last.
            </p>
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-7 py-3.5 font-body font-semibold uppercase tracking-[0.18em] text-[11px] transition-colors duration-400"
              >
                Learn More About Us
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Image right panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative min-h-[280px] lg:min-h-[420px] order-1 lg:order-2"
          >
            <Image
              src="/images/hero/buckfin2.JPG"
              alt="Cedar truss patio cover detail by Structure1 Construction"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={85}
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
