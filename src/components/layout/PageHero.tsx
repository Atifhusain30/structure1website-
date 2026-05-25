import Link from 'next/link';
import Image from 'next/image';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
}

export default function PageHero({
  eyebrow,
  title,
  italicWord,
  description,
  image = '/images/hero/cover3.JPG',
  crumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative bg-rich-black overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill sizes="100vw" quality={80} priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/85 via-rich-black/55 to-rich-black/95" />
        <div className="absolute inset-0 grain-overlay opacity-50" />
      </div>

      <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-16 pt-40 pb-20 lg:pt-48 lg:pb-28">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-3">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-white/30">·</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="eyebrow-row mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold">{eyebrow}</span>
        </div>
        <h1
          className="font-display font-medium text-white leading-[0.98] tracking-[-0.025em] max-w-5xl"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
        >
          {title}
          {italicWord && (
            <>
              {' '}
              <span className="italic font-light text-white/80">{italicWord}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-white/65 font-sans text-base sm:text-lg leading-[1.65]">{description}</p>
        )}
      </div>
    </section>
  );
}
