import Link from 'next/link';
import { companyInfo } from '@/lib/data';
import { Phone } from 'lucide-react';

export default function BlogCTA() {
  return (
    <div className="max-w-3xl mx-auto mt-16 bg-primary-black rounded-card-lg p-8 md:p-12 text-center">
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
        Ready to Start Your Patio Cover Project?
      </h3>
      <p className="text-white/60 mt-3 max-w-lg mx-auto">
        Get a free, no-obligation estimate from the Structure1 team. We&apos;ll help you design the
        perfect outdoor living space for your DFW home.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Link
          href="/#contact"
          className="bg-accent-warm text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-accent-warm-dark transition-colors"
        >
          Get Free Estimate
        </Link>
        <a
          href={`tel:${companyInfo.phoneRaw}`}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm"
        >
          <Phone className="w-4 h-4" />
          {companyInfo.phone}
        </a>
      </div>
    </div>
  );
}
