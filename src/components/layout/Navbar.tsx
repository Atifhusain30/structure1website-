'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePathnameChange = () => {
      setActiveSection(window.location.pathname);
    };
    handlePathnameChange();
    window.addEventListener('popstate', handlePathnameChange);
    return () => window.removeEventListener('popstate', handlePathnameChange);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  const toggleMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleNavClick = useCallback(
    () => {
      closeMenu();
    },
    [closeMenu]
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 bg-parchment/85 backdrop-blur-xl border-b border-border/50'
            : 'py-5 bg-transparent'
        )}
      >
        <nav className="max-w-container mx-auto px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="relative z-[60] touch-manipulation"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.location.href = '/';
                }
                if (mobileMenuOpen) closeMenu();
              }}
            >
              <span className="font-heading text-lg md:text-xl font-bold tracking-[0.15em] text-rich-black">
                STRUCTURE1
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'nav-link font-body text-sm font-medium tracking-wide transition-colors',
                    activeSection === item.href
                      ? 'active text-gold'
                      : 'text-rich-black/60 hover:text-rich-black'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <a
                href="/contact"
                onClick={handleNavClick}
                className="bg-rich-black text-white px-6 py-3 rounded-full font-body text-sm font-medium tracking-wider hover:bg-warm-charcoal transition-all duration-400"
              >
                Get a Consultation
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden relative z-[60] p-3 -mr-2 touch-manipulation select-none"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-rich-black pointer-events-none" />
              ) : (
                <Menu className="w-6 h-6 text-rich-black pointer-events-none" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 55,
            backgroundColor: '#FAF7F2',
            paddingTop: 'max(env(safe-area-inset-top, 0px), 100px)',
            paddingBottom: 'env(safe-area-inset-bottom, 20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  display: 'block',
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-bodoni), Georgia, serif',
                  color:
                    activeSection === item.href
                      ? '#C5A04E'
                      : '#0D0D0D',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/contact"
              onClick={handleNavClick}
              style={{
                display: 'inline-block',
                marginTop: '16px',
                backgroundColor: '#0D0D0D',
                color: '#FFFFFF',
                padding: '16px 40px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              Get a Consultation
            </a>
            <a
              href="tel:5806652758"
              style={{
                marginTop: '8px',
                color: '#C5A04E',
                fontSize: '18px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '8px',
              }}
            >
              (580) 665-2758
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
