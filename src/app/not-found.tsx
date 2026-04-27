import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-rich-black text-white px-6">
      <div className="text-center max-w-xl">
        <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
          Error 404
        </span>
        <h1 className="font-heading font-medium text-white tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          Page Not <span className="italic text-gold">Found.</span>
        </h1>
        <p className="text-white/60 font-body text-base sm:text-lg leading-relaxed mt-6 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-10 bg-gold hover:bg-gold-light text-rich-black px-8 py-4 font-body font-semibold uppercase tracking-[0.18em] text-xs transition-colors duration-400"
        >
          Back to Home
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
