import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Premium residential construction services across DFW: patio covers, pergolas, outdoor living, concrete, and stamped finishes.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Full-service residential construction."
        description="From custom patio covers to stamped concrete finishes — quality work, premium materials, and a process that respects your time."
        image="/images/hero/sashi3.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/60 border border-border/60">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group relative bg-warm-white block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-8 lg:p-10">
                  <h2 className="font-heading font-medium text-rich-black tracking-tight"
                      style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)' }}>
                    {s.title}
                  </h2>
                  <p className="text-text-secondary font-body text-[15px] leading-relaxed mt-4 max-w-md">
                    {s.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-7 text-rich-black font-body text-[11px] font-semibold uppercase tracking-[0.22em] group-hover:text-gold transition-colors">
                    Explore {s.title}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
