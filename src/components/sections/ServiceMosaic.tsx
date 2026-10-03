import Image from 'next/image';
import Link from 'next/link';
import { photos, focalStyle, type Photo } from '@/content/images';
import { mosaicTiles } from '@/content/services';
import type { MosaicTile } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * Services as a photo mosaic. Each tile is one large photograph with the service name on a dark band.
 * Three rows on desktop: 2+1 / 1+1+1 / 2+1. Every row has a 4:3 single tile that sets the row height,
 * so the wide tiles simply fill it. One column on phones. Which tiles are wide is decided in content (`tile.wide`).
 */
function Tile({ t }: { t: MosaicTile }) {
  const p: Photo = photos[t.photo];
  const wide = Boolean(t.wide);
  return (
    <Link href={t.href} className={cn('group relative block overflow-hidden bg-charcoal text-white', wide ? 'aspect-[4/3] lg:aspect-auto lg:h-full' : 'aspect-[4/3]')}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={wide ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        style={focalStyle(p)}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <h3 className={cn('font-display', wide ? 'text-h2' : 'text-h3')}>{t.name}</h3>
        <p className="mt-1 max-w-md text-small text-white/80">{t.blurb}</p>
      </div>
    </Link>
  );
}

export default function ServiceMosaic({ tiles = mosaicTiles }: { tiles?: MosaicTile[] }) {
  return (
    <ul className="grid gap-3 md:gap-4 lg:grid-cols-3">
      {tiles.map((t) => (
        <li key={t.key} className={cn(t.wide && 'lg:col-span-2', 'min-h-0')}>
          <Tile t={t} />
        </li>
      ))}
    </ul>
  );
}
