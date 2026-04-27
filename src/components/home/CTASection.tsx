import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-rich-black py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
              Get Started
            </span>
            <h2 className="font-heading font-medium leading-[1.05] tracking-tight text-white max-w-3xl"
                style={{ fontSize: 'clamp(2rem, 4.4vw, 3.5rem)' }}>
              Ready to Start
              <br />
              <span className="italic">Your Project?</span>
            </h2>
            <p className="text-white/55 font-body mt-5 max-w-md">
              Free consultation. Honest pricing. Real craftsmanship.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-400"
          >
            Request Estimate
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
