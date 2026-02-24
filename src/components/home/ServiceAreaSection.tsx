'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { serviceAreas } from '@/lib/data';

export default function ServiceAreaSection() {
  return (
    <section id="service-area" className="py-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-warm text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Service Area
          </span>
          <h2 className="font-heading font-extrabold text-section text-primary-black mb-4">
            Proudly Serving the Dallas-Fort Worth Metroplex
          </h2>
          <p className="text-text-gray text-lg max-w-2xl mx-auto">
            From Dallas to Fort Worth and everywhere in between, we bring quality construction to your neighborhood.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
          >
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
          </motion.div>

          {/* Cities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-xl text-primary-black mb-6">
              Cities We Serve
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {serviceAreas.map((city) => (
                <a
                  key={city}
                  href={`#contact`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2 text-text-gray hover:text-accent-warm transition-colors py-1 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent-warm/60 group-hover:text-accent-warm shrink-0" />
                  <span className="text-sm font-medium">{city}, TX</span>
                </a>
              ))}
            </div>
            <p className="text-text-light-gray text-sm mt-6">
              Don&apos;t see your city? We likely serve your area too.{' '}
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('contact');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="text-accent-warm font-semibold hover:text-accent-warm-dark transition-colors"
              >
                Contact us to find out.
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
