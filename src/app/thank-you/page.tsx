import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your request was received. We will be in touch within one business day.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="relative min-h-[100svh] bg-rich-black text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grain-overlay opacity-40" />
      <div className="relative max-w-narrow mx-auto px-6 lg:px-10 py-32 text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-gold/50 flex items-center justify-center">
          <Check className="w-7 h-7 text-gold" strokeWidth={1.6} />
        </div>
        <div className="eyebrow-row justify-center mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold">Request received</span>
        </div>
        <h1
          className="font-display font-medium leading-[0.98] tracking-[-0.025em]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Thanks for reaching out.
          <br />
          <span className="italic font-light text-white/80">We&apos;re on it.</span>
        </h1>
        <p className="mt-8 text-white/65 font-sans text-lg leading-[1.65] max-w-xl mx-auto">
          A member of our team will reach out within one business day with next steps. For urgent projects,
          call us directly.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <a
            href="tel:5806652758"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:brightness-95 text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[12px] transition-all"
          >
            Call (580) 665-2758
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white hover:text-rich-black px-8 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-[12px] transition-all"
          >
            Browse Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
