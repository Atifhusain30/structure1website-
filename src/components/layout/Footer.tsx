'use client';

import Link from 'next/link';
import { Facebook, Instagram, ArrowUpRight, MapPin } from 'lucide-react';
import { companyInfo } from '@/lib/data';

const serviceLinks = [
  { label: 'Patio Covers', href: '/services/patio-covers' },
  { label: 'Pergolas & Pavilions', href: '/services/patio-covers' },
  { label: 'Outdoor Living', href: '/services/patio-covers' },
  { label: 'Concrete Work', href: '/services/concrete' },
  { label: 'Stamped Concrete', href: '/services/concrete' },
  { label: 'Custom Design', href: '/contact' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Process', href: '/about' },
  { label: 'Our Work', href: '/projects' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToContact = () => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== '/') {
      window.location.href = '/#contact';
      return;
    }
    const el = document.getElementById('contact');
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
              <h2 className="font-heading font-medium leading-[1.05] tracking-tight text-white"
                  style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)' }}>
                Ready to Start
                <br />
                <span className="italic">Your Project?</span>
              </h2>
              <p className="text-white/55 font-body mt-5 max-w-md">
                Tell us about your project and we&apos;ll be in touch
                with a clear plan and estimate.
              </p>
            </div>
            <div>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-400"
              >
                Request Estimate
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
            <Link href="/" className="inline-block">
              <span className="font-heading text-lg font-semibold tracking-[0.22em] text-white">
                STRUCTURE1
              </span>
              <span className="block font-body text-[10px] font-medium uppercase tracking-[0.32em] text-gold mt-1">
                Residential Construction
              </span>
            </Link>
            <p className="text-white/45 font-body text-sm mt-5 leading-relaxed max-w-xs">
              Proudly serving homeowners across the DFW Metroplex with premium
              outdoor construction.
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
