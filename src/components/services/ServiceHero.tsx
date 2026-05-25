import Link from 'next/link';
import Image from 'next/image';

interface ServiceHeroProps {
  title: string;
  description: string;
  image?: string;
}

export default function ServiceHero({ title, description, image }: ServiceHeroProps) {
  return (
    <section className="relative bg-rich-black overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt="" fill sizes="100vw" quality={85} priority className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black/85 via-rich-black/45 to-rich-black/95" />
          <div className="absolute inset-0 grain-overlay opacity-50" />
        </div>
      )}

      <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-16 pt-40 pb-20 lg:pt-48 lg:pb-28">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/30">·</li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Services
              </Link>
            </li>
            <li className="text-white/30">·</li>
            <li className="text-white">{title}</li>
          </ol>
        </nav>

        <div className="eyebrow-row mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-gold">Our services</span>
        </div>
        <h1
          className="font-display font-medium text-white leading-[0.98] tracking-[-0.025em] max-w-4xl"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
        >
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-white/65 font-sans text-base sm:text-lg leading-[1.65]">{description}</p>
      </div>
    </section>
  );
}
