import Image from 'next/image';
import Link from 'next/link';
import { photos, type Photo } from '@/content/images';
import { services as all } from '@/content/services';
import type { Service } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * Services as a photo mosaic. Each tile is one large photograph with the service name on a dark band.
 * Three rows on desktop: 2+1 / 1+1+1 / 2+1. Every row has a 4:3 single tile that sets the row height,
 * so the wide tiles simply fill it. One column on phones.
 */
const SPAN: Record<string, string> = {
  'patio-covers': 'lg:col-span-2',
  'outdoor-living': 'lg:col-span-2',
};

function Tile({ s, wide }: { s: Service; wide: boolean }) {
  const p: Photo = photos[s.hero];
  return (
    <Link href={`/services/${s.slug}`} className={cn('group relative block overflow-hidden bg-charcoal text-white', wide ? 'aspect-[4/3] lg:aspect-auto lg:h-full' : 'aspect-[4/3]')}>
      <Image src={p.src} alt={p.alt} fill sizes={wide ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <h3 className={cn('font-display', wide ? 'text-h2' : 'text-h3')}>{s.name}</h3>
        <p className="mt-1 max-w-md text-small text-white/80">{s.navBlurb}</p>
      </div>
    </Link>
  );
}

export default function ServiceMosaic({ services = all }: { services?: Service[] }) {
  return (
    <ul className="grid gap-3 md:gap-4 lg:grid-cols-3">
      {services.map((s) => {
        const wide = Boolean(SPAN[s.slug]);
        return (
          <li key={s.slug} className={cn(SPAN[s.slug], 'min-h-0')}>
            <Tile s={s} wide={wide} />
          </li>
        );
      })}
    </ul>
  );
}
