'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section id="services" className="py-section bg-parchment overflow-hidden">
      {/* Section Header */}
      <div className="max-w-container mx-auto px-6 lg:px-8 mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="section-divider" />
            <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
              Our Services
            </span>
          </div>
          <h2 className="font-heading font-bold text-section text-rich-black mb-5">
            What We Do Best
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Two services. One standard — build it right, make it last,
            and leave your yard looking better than you imagined.
          </p>
        </motion.div>
      </div>

      {/* Service Panels */}
      <div className="space-y-0">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;
          const featureImage = service.images?.[0] || service.image;
          const secondaryImage = service.images?.[2] || service.images?.[1] || service.image;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/services/${service.id}`} className="group block">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-0 lg:min-h-[600px] ${
                    isReversed ? 'bg-sand' : 'bg-parchment'
                  }`}
                >
                  {/* Image Panel - 7 columns */}
                  <div
                    className={`relative lg:col-span-7 h-[320px] sm:h-[420px] lg:min-h-[600px] overflow-hidden ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Image
                      src={featureImage}
                      alt={`${service.title} by Structure1 Construction`}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-out-expo md:group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      quality={80}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />

                    {/* Inset secondary image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={`absolute bottom-6 ${
                        isReversed ? 'left-6' : 'right-6'
                      } w-[140px] sm:w-[180px] lg:w-[220px] aspect-[4/3] rounded-card-lg overflow-hidden shadow-image z-10 hidden sm:block`}
                    >
                      <Image
                        src={secondaryImage}
                        alt={`${service.title} detail`}
                        fill
                        className="object-cover"
                        sizes="220px"
                        quality={75}
                        loading="lazy"
                      />
                    </motion.div>
                  </div>

                  {/* Content Panel - 5 columns */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Service number */}
                    <span className="font-heading text-7xl lg:text-8xl font-bold text-border/60 leading-none mb-4 select-none">
                      0{index + 1}
                    </span>

                    <h3 className="font-heading font-bold text-subsection text-rich-black mb-4 group-hover:text-gold transition-colors duration-500">
                      {service.title}
                    </h3>

                    <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-10">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-rich-black font-body font-medium text-sm tracking-wide group-hover:text-gold transition-colors duration-500">
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
