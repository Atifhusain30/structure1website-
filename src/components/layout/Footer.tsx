import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import Container from './Container';
import { company } from '@/content/company';
import { services } from '@/content/services';
import { cities } from '@/content/cities';

const companyLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Our Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Free Estimate', href: '/estimate' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="font-display text-xl font-bold">
              Structure1
            </Link>
            <p className="mt-4 max-w-xs text-small text-white/70">
              Dallas–Fort Worth patio covers, concrete, and outdoor living. Designed, permitted, and built by one in-house crew.
            </p>
            <Link href="/estimate" className="mt-6 inline-flex h-12 items-center bg-white px-6 text-sm font-medium text-black hover:bg-offwhite">
              Get a Free Estimate
            </Link>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-white/50">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-small text-white/80 hover:text-white">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-white/50">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-white/50">Service Areas</h2>
            <ul className="mt-4 space-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="text-small text-white/80 hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-white/50">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-small text-white/80">
              <li>
                <a href={`tel:${company.phoneRaw}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="break-all hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </li>
              <li>{company.hours}</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-meta text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
