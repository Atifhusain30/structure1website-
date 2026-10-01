import Image from 'next/image';
import Link from 'next/link';
import HeaderTheme from '@/components/layout/HeaderTheme';
import { photos } from '@/content/images';
import { company } from '@/content/company';

/**
 * Full-bleed photo with a "title block" — the stamped corner panel of a drawing set —
 * carrying what we build, where, and the one action that matters.
 */
export default function Hero() {
  const p = photos['gable-mckinney-1'];
  return (
    <section className="relative bg-black text-white">
      <HeaderTheme dark />
      <div className="hero-photo relative min-h-[100svh] overflow-hidden">
        <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={82} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto grid max-w-site gap-8 px-4 pb-8 sm:px-6 md:pb-12 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="hero-copy lg:col-span-7">
              <h1 className="max-w-3xl font-display text-h1">Outdoor spaces built like they belong with your home.</h1>
              <p className="mt-5 max-w-xl text-lead text-white/85">
                Patio covers, pergolas, concrete, and complete outdoor rooms. Designed, permitted, and built by one in-house crew across Dallas–Fort Worth.
              </p>
            </div>
            <div className="hero-block lg:col-span-5 lg:col-start-8">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-white/40 pt-4 text-small">
                <dt className="text-white/60">Builds</dt>
                <dd>Patio covers, pergolas, concrete, outdoor living</dd>
                <dt className="text-white/60">Serves</dt>
                <dd>Dallas–Fort Worth, based in Dallas</dd>
                <dt className="text-white/60">Since</dt>
                <dd>2021, 150+ projects, 2-year warranty</dd>
              </dl>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/estimate" className="inline-flex h-12 items-center justify-center bg-timber px-6 text-[0.9375rem] font-medium text-black transition-colors hover:bg-white">
                  Get My Free Estimate
                </Link>
                <Link href="/projects" className="inline-flex h-12 items-center justify-center border border-white/60 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                  View Our Work
                </Link>
              </div>
              <p className="mt-4 text-meta text-white/60">
                Or call{' '}
                <a href={`tel:${company.phoneRaw}`} className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white">
                  {company.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
