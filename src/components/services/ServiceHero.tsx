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
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            quality={85}
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black/80 via-rich-black/45 to-rich-black/85" />
        </div>
      )}

      <div className="relative z-10 max-w-wide mx-auto px-6 lg:px-10 pt-40 pb-20 lg:pt-48 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55 font-body">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li className="text-white/30">/</li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li className="text-white/30">/</li>
            <li className="text-white">{title}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <span className="block w-10 h-px bg-gold" />
          <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
            Our Services
          </span>
        </div>
        <h1
          className="font-heading font-medium text-white tracking-tight leading-[1.05] max-w-4xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-white/70 font-body text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
