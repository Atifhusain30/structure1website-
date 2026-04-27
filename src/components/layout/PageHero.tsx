import Link from 'next/link';
import Image from 'next/image';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image = '/images/hero/cover3.JPG',
  crumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative bg-rich-black overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          quality={80}
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/80 via-rich-black/55 to-rich-black/85" />
      </div>

      <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-10 pt-40 pb-20 lg:pt-48 lg:pb-24">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55 font-body">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-white/30">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-3 mb-6">
          <span className="block w-10 h-px bg-gold" />
          <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
            {eyebrow}
          </span>
        </div>
        <h1
          className="font-heading font-medium text-white leading-[1.02] tracking-tight max-w-4xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-white/70 font-body text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
