'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Our Work', href: '/projects' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Pages where navbar starts on dark hero
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${y}px`;
    } else {
      const y = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (y) window.scrollTo(0, parseInt(y || '0', 10) * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      close();
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      if (pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    },
    [close, pathname]
  );

  // Light theme on inner pages once scrolled, dark hero on home page top
  const onDark = isHomePage && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 bg-rich-black/85 backdrop-blur-xl border-b border-white/[0.06]'
            : isHomePage
              ? 'py-5 bg-transparent'
              : 'py-4 bg-rich-black border-b border-white/[0.06]'
        )}
      >
        <nav
          className="max-w-wide mx-auto px-6 lg:px-10 flex items-center justify-between gap-8"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link href="/" className="relative z-[60] shrink-0" onClick={close}>
            <span className="font-heading text-base md:text-lg font-semibold tracking-[0.22em] text-white">
              STRUCTURE1
            </span>
            <span className="block font-body text-[9px] font-medium uppercase tracking-[0.32em] text-gold mt-0.5">
              Residential Construction
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => {
              const active =
                l.href === pathname ||
                (l.href.startsWith('/') && !l.href.includes('#') && pathname.startsWith(l.href) && l.href !== '/');
              return (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={(e) => handleAnchor(e, l.href)}
                  className={cn(
                    'font-body text-[13px] font-medium tracking-wide transition-colors duration-300',
                    active
                      ? 'text-gold'
                      : onDark
                        ? 'text-white/85 hover:text-gold'
                        : 'text-white/85 hover:text-gold'
                  )}
                >
                  {l.name}
                </Link>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:block shrink-0">
            <Link
              href={pathname === '/' ? '/#contact' : '/contact'}
              onClick={(e) => handleAnchor(e, pathname === '/' ? '/#contact' : '/contact')}
              className="inline-flex items-center bg-gold hover:bg-gold-light text-rich-black px-6 py-3 font-body font-semibold uppercase tracking-[0.18em] text-[11px] transition-colors duration-300"
            >
              Request Estimate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden relative z-[60] p-2 -mr-1 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-rich-black flex flex-col"
          style={{
            paddingTop: 'max(env(safe-area-inset-top, 0px), 90px)',
            paddingBottom: 'env(safe-area-inset-bottom, 24px)',
          }}
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-5 px-6">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={(e) => handleAnchor(e, l.href)}
                className="font-heading text-[28px] font-semibold text-white hover:text-gold transition-colors"
              >
                {l.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="mt-6 inline-flex items-center bg-gold text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs"
            >
              Request Estimate
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
