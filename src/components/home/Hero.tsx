import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/images';

/** One calm, full-bleed photo. The headline sits low and left, in normal flow so short phones never clip it. */
export default function Hero() {
  const p = photos['gable-mckinney-1'];
  return (
    <section data-dark-hero="" className="hero-photo relative flex min-h-[92svh] items-end overflow-hidden bg-black text-white">
      <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={82} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" aria-hidden />
      <div className="hero-copy relative mx-auto w-full max-w-site px-4 pb-10 pt-36 sm:px-6 md:pb-16">
        <h1 className="max-w-4xl font-display text-h1">Outdoor spaces built like they belong with your home.</h1>
        <p className="mt-5 max-w-xl text-lead text-white/85">
          Patio covers, pergolas, concrete, and complete outdoor rooms across Dallas–Fort Worth. One in-house crew from drawings to final walk-through.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/#estimate" className="inline-flex h-12 items-center justify-center bg-white px-6 text-[0.9375rem] font-medium text-black transition-colors hover:bg-offwhite">
            Get a free estimate
          </Link>
          <Link href="/projects" className="inline-flex h-12 items-center justify-center border border-white/70 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
