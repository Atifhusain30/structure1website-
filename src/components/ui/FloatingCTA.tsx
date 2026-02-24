'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
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
    <>
      {/* Mobile: Bottom bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary-black/95 backdrop-blur-lg border-t border-white/10 transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      >
        <div className="flex gap-3 px-4 py-3">
          <a
            href={`tel:${companyInfo.phoneRaw}`}
            className="flex items-center justify-center gap-2 w-14 bg-white/10 text-white rounded-full touch-manipulation"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={scrollToContact}
            className="flex-1 bg-accent-warm text-white py-3 rounded-full font-semibold text-sm tracking-wide touch-manipulation hover:bg-accent-warm-dark transition-colors"
          >
            Get Free Estimate
          </button>
        </div>
      </div>

      {/* Desktop: Floating phone pill */}
      <div className={`hidden md:block fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <a
          href={`tel:${companyInfo.phoneRaw}`}
          className="flex items-center gap-3 bg-primary-black text-white pl-5 pr-6 py-3.5 rounded-full font-medium text-sm shadow-heavy hover:shadow-card-hover hover:scale-[1.02] transition-all"
        >
          <Phone className="w-4 h-4 text-accent-warm" />
          {companyInfo.phone}
        </a>
      </div>
    </>
  );
}
