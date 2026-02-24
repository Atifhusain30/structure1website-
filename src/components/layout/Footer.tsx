'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock, ArrowUp } from 'lucide-react';
import { companyInfo, navigation } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mini CTA Bar */}
      <div className="bg-charcoal py-10">
        <div className="max-w-container mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            Schedule a free consultation and take the first step toward transforming your outdoor space.
          </p>
          <a
            href="/#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            className="inline-block bg-accent-warm text-white px-8 py-4 rounded-full font-medium tracking-wider text-sm hover:bg-accent-warm-dark transition-colors shadow-lg shadow-accent-warm/20"
          >
            Get Free Estimate
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-black text-white">
        <div className="max-w-container mx-auto px-6 lg:px-8 py-14 lg:py-18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Company */}
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="inline-block"
              >
                <span className="font-heading text-lg font-bold tracking-[0.2em]">STRUCTURE1</span>
              </a>
              <p className="mt-4 text-white/40 leading-relaxed text-sm">
                Premium patio covers and concrete work in Dallas-Fort Worth.
                Unmatched quality and craftsmanship for over 4 years.
              </p>
              <div className="flex gap-3 mt-5">
                {[
                  { href: companyInfo.social.facebook, icon: Facebook, label: 'Facebook' },
                  { href: companyInfo.social.instagram, icon: Instagram, label: 'Instagram' },
                  { href: companyInfo.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-warm hover:border-accent-warm transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-[0.15em] text-white/60 mb-5">Navigation</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href === '/') {
                          e.preventDefault();
                          if (window.location.pathname === '/') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            window.location.href = '/';
                          }
                        } else {
                          const hashIdx = item.href.indexOf('#');
                          if (hashIdx !== -1) {
                            e.preventDefault();
                            scrollTo(item.href.slice(hashIdx + 1));
                          }
                        }
                      }}
                      className="text-white/40 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-[0.15em] text-white/60 mb-5">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-warm shrink-0 mt-0.5" />
                  <span className="text-white/40 text-sm">{companyInfo.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent-warm shrink-0" />
                  <a href={`tel:${companyInfo.phoneRaw}`} className="text-white/40 hover:text-white transition-colors text-sm">
                    {companyInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-warm shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="text-white/40 hover:text-white transition-colors text-sm">
                    {companyInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent-warm shrink-0" />
                  <span className="text-white/40 text-sm">{companyInfo.hours}</span>
                </li>
              </ul>
            </div>

            {/* Back to Top */}
            <div className="flex flex-col items-start lg:items-end justify-between">
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-[0.15em] text-white/60 mb-5">Service Area</h3>
                <p className="text-white/40 text-sm">
                  Proudly serving the entire Dallas-Fort Worth metroplex including Plano, Frisco, McKinney, and more.
                </p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-warm hover:border-accent-warm transition-all"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm">
                &copy; {currentYear} {companyInfo.name}. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="/privacy" className="text-white/30 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-white/30 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
