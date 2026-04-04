'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { serviceAreas } from '@/lib/data';

export default function ServiceAreaSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="service-area" className="py-section bg-parchment">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-card-xl overflow-hidden shadow-medium aspect-[4/3] editorial-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429155.26683382626!2d-97.19972374228133!3d32.82058804783487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647571f!2sDallas-Fort%20Worth%20metroplex!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Structure1 Construction service area - Dallas-Fort Worth metroplex"
              />
            </div>
          </motion.div>

          {/* Right: Cities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="section-divider" />
              <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
                Service Area
              </span>
            </div>
            <h2 className="font-heading font-bold text-section text-rich-black mb-4">
              Proudly Serving
              <br className="hidden sm:block" />
              the DFW Metroplex
            </h2>
            <p className="text-text-secondary font-body leading-relaxed mb-8 max-w-md">
              From Dallas to Fort Worth and everywhere in between, we bring quality
              construction to your neighborhood.
            </p>

            {/* City pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {serviceAreas.map((city, index) => (
                <motion.button
                  key={city}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-warm-white font-body text-sm text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <MapPin className="w-3 h-3 text-gold/60" />
                  {city}, TX
                </motion.button>
              ))}
            </div>

            <p className="text-text-muted font-body text-sm">
              Don&apos;t see your city? We likely serve your area too.{' '}
              <button
                onClick={scrollToContact}
                className="text-gold font-semibold hover:text-gold-dark transition-colors"
              >
                Contact us to find out.
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
