'use client';

import Link from 'next/link';
import { Facebook, Instagram, ArrowUpRight, MapPin } from 'lucide-react';
import { companyInfo } from '@/lib/data';

const serviceLinks = [
  { label: 'Patio Covers', href: '/services/patio-covers' },
  { label: 'Pergolas & Pavilions', href: '/services/patio-covers' },
  { label: 'Outdoor Kitchens', href: '/services' },
  { label: 'Stamped Concrete', href: '/services/concrete' },
  { label: 'Driveways & Walkways', href: '/services/concrete' },
  { label: 'New Builds & Remodels', href: '/services' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Our Work', href: '/projects' },
  { label: 'Service Areas', href: '/#areas' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToContact = () => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== '/') {
      window.location.href = '/#estimate';
      return;
    }
    const el = document.getElementById('estimate');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-rich-black text-white">
      {/* Ready to start */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-5">
                — Let&apos;s build it
              </p>
              <h2
                className="font-display font-medium leading-[0.98] tracking-tight text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Tell us about
                <br />
                <span className="italic font-light">your project.</span>
              </h2>
              <p className="text-white/55 font-sans mt-6 max-w-md">
                A clear plan, transparent quote, and the right crew on site. We respond within one business day.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href="tel:5806652758"
                className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/70 hover:text-gold transition-colors"
              >
                (580) 665-2758
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-gold hover:brightness-95 text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300"
              >
                Free Estimate
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="max-w-container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block leading-none">
              <span className="font-display text-[26px] font-semibold tracking-[0.06em] text-white">
                Structure<span className="text-gold">1</span>
              </span>
              <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-white/50 mt-1.5">
                Construction · Outdoor Living
              </span>
            </Link>
            <p className="text-white/50 font-sans text-sm mt-6 leading-relaxed max-w-xs">
              Dallas–Fort Worth&apos;s patio cover, pergola, and concrete builders. Custom outdoor living rooms — engineered for Texas weather, built to last.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body font-semibold text-white text-[11px] uppercase tracking-[0.28em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/55 hover:text-gold font-body text-sm transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-body font-semibold text-white text-[11px] uppercase tracking-[0.28em] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/55 hover:text-gold font-body text-sm transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body font-semibold text-white text-[11px] uppercase tracking-[0.28em] mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-white/55 font-body text-sm">
              <li>
                <a
                  href={`tel:${companyInfo.phoneRaw}`}
                  className="hover:text-gold transition-colors duration-300"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-gold transition-colors duration-300 break-all"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold mt-1 shrink-0" />
                <span>Dallas-Fort Worth, TX</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/65 hover:text-gold hover:border-gold transition-colors duration-300"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/65 hover:text-gold hover:border-gold transition-colors duration-300"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/30 font-body text-xs">
              &copy; {year} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-white/30 hover:text-gold font-body text-xs transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/30 hover:text-gold font-body text-xs transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
