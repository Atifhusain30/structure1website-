'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { company } from '@/content/company';
import { services } from '@/content/services';

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Colors come from CSS variables set in globals.css: the header is white by default and turns
 * transparent/white-on-photo only while the page has a [data-dark-hero] section and the header is
 * neither scrolled nor open. That is decided in CSS at first paint, so there is no flash on load.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const servicesBtn = useRef<HTMLButtonElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burger.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        servicesBtn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [menu]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const nav = 'text-sm font-medium text-[var(--hdr-muted)] transition-colors hover:text-[var(--hdr-fg)]';
  const active = 'text-sm font-medium text-[var(--hdr-fg)] underline underline-offset-[10px] decoration-2';

  return (
    <header
      data-header=""
      data-scrolled={scrolled ? '' : undefined}
      data-open={open ? '' : undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hdr-line)] bg-[var(--hdr-bg)] text-[var(--hdr-fg)] transition-[background-color,border-color] duration-250"
    >
      <div className={cn('mx-auto flex max-w-site items-center justify-between px-4 sm:px-6 transition-[height] duration-250', scrolled ? 'h-16' : 'h-20')}>
        <Link href="/" className="font-display text-xl font-bold tracking-tight" aria-label="Structure1 home">
          Structure1
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          <div
            className="relative"
            ref={menuRef}
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
            onBlur={(e) => {
              if (!menuRef.current?.contains(e.relatedTarget as Node)) setMenu(false);
            }}
          >
            <button ref={servicesBtn} type="button" aria-expanded={menu} aria-controls="services-menu" onClick={() => setMenu((v) => !v)} className={cn('flex h-10 items-center gap-1', pathname.startsWith('/services') ? active : nav)}>
              Services <ChevronDown className={cn('h-4 w-4 transition-transform duration-150', menu && 'rotate-180')} aria-hidden />
            </button>
            <div className={cn('absolute left-0 top-full pt-3 transition-opacity duration-150', menu ? 'opacity-100' : 'pointer-events-none opacity-0')}>
              <ul id="services-menu" className="w-[22rem] border border-gray-200 bg-white p-2 text-black">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} tabIndex={menu ? 0 : -1} className="block px-4 py-3 hover:bg-offwhite">
                      <span className="block text-sm font-medium">{s.navLabel}</span>
                      <span className="block text-meta text-gray-500">{s.navBlurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? active : nav}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={`tel:${company.phoneRaw}`} className={nav}>
            {company.phone}
          </a>
          <Link href="/estimate" className="inline-flex h-11 items-center bg-[var(--hdr-cta-bg)] px-5 text-sm font-medium text-[var(--hdr-cta-fg)] transition-colors hover:bg-[var(--hdr-cta-hover)]">
            Get a Free Estimate
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a href={`tel:${company.phoneRaw}`} aria-label={`Call ${company.phone}`} className="flex h-11 w-11 items-center justify-center">
            <Phone className="h-5 w-5" />
          </a>
          <button ref={burger} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="flex h-11 w-11 items-center justify-center">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 bottom-0 overflow-y-auto border-t border-gray-200 bg-white text-black transition-opacity duration-250 lg:hidden',
          scrolled ? 'top-16' : 'top-20',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav className="px-4 py-4" aria-label="Mobile">
          <button type="button" onClick={() => setMobileServices((v) => !v)} aria-expanded={mobileServices} className="flex w-full items-center justify-between py-3 text-lg font-medium" tabIndex={open ? 0 : -1}>
            Services <ChevronDown className={cn('h-5 w-5 transition-transform duration-150', mobileServices && 'rotate-180')} aria-hidden />
          </button>
          <ul className={cn('overflow-hidden transition-[max-height] duration-250', mobileServices ? 'max-h-[40rem]' : 'max-h-0')}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block py-2.5 pl-4 text-base text-gray-700" tabIndex={open && mobileServices ? 0 : -1}>
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block border-t border-gray-200 py-3 text-lg font-medium" tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/estimate" className="inline-flex h-12 items-center justify-center bg-black text-sm font-medium text-white" tabIndex={open ? 0 : -1}>
              Get a Free Estimate
            </Link>
            <a href={`tel:${company.phoneRaw}`} className="inline-flex h-12 items-center justify-center border border-black text-sm font-medium" tabIndex={open ? 0 : -1}>
              Call {company.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
