'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
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

  // Toggle menu with proper iOS touch handling
  const toggleMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Use regular nav instead of motion.nav to prevent iOS animation issues */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-4 bg-off-white/95 backdrop-blur-md' : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - NO animations on touch devices to prevent spinning */}
            <Link 
              href="/" 
              className="relative z-[60] touch-manipulation"
              onClick={() => mobileMenuOpen && closeMenu()}
            >
              <span className="font-heading text-2xl font-bold tracking-[0.2em] text-primary-black">
                STRUCTURE1
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link text-sm font-medium tracking-wide text-primary-black hover:text-text-dark-gray transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button - simplified for iOS */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="bg-primary-black text-white px-6 py-3 rounded-full text-sm font-medium tracking-wider hover:shadow-lg transition-shadow"
              >
                Get a Consultation
              </Link>
            </div>

            {/* Mobile Menu Button - iOS optimized */}
            <button
              type="button"
              className="md:hidden relative z-[60] p-3 -mr-2 touch-manipulation select-none"
              onClick={toggleMenu}
              onTouchEnd={(e) => {
                // Prevent ghost clicks on iOS
                e.preventDefault();
                toggleMenu();
              }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-primary-black pointer-events-none" />
              ) : (
                <Menu className="w-6 h-6 text-primary-black pointer-events-none" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - iOS optimized: no transforms, no animations, explicit visibility */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 55,
            backgroundColor: '#FAFAFA',
            paddingTop: 'max(env(safe-area-inset-top, 0px), 80px)',
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
              gap: '24px',
            }}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#0A0A0A',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              style={{
                display: 'inline-block',
                marginTop: '16px',
                backgroundColor: '#0A0A0A',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Get a Consultation
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}


