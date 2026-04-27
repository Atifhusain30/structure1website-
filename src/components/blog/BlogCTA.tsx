import Link from 'next/link';
import { Phone, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export default function BlogCTA() {
  return (
    <div className="max-w-3xl mx-auto mt-16 bg-rich-black p-10 md:p-14 text-center">
      <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-4">
        Get Started
      </span>
      <h3 className="font-heading font-medium text-white tracking-tight leading-[1.05]"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
        Ready to start your project?
      </h3>
      <p className="text-white/55 font-body mt-4 max-w-lg mx-auto">
        Get a free, no-obligation estimate from the Structure1 team.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-300"
        >
          Request Estimate
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <a
          href={`tel:${companyInfo.phoneRaw}`}
          className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors font-body text-sm"
        >
          <Phone className="w-4 h-4 text-gold" />
          {companyInfo.phone}
        </a>
      </div>
    </div>
  );
}
