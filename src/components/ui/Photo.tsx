import type { CSSProperties } from 'react';
import Image from 'next/image';
import { photos, focalStyle, type Photo as PhotoEntry, type PhotoId } from '@/content/images';
import { cn } from '@/lib/utils';

const ratios = {
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
  '16/9': 'aspect-video',
  fill: 'absolute inset-0',
} as const;

export default function Photo({
  id,
  ratio = '4/3',
  sizes,
  priority = false,
  className,
  hover = false,
  position,
}: {
  id: PhotoId;
  ratio?: keyof typeof ratios;
  sizes: string;
  priority?: boolean;
  className?: string;
  hover?: boolean;
  /** Overrides the registry focal for this use only: object-position on small screens, and from `lg` up. */
  position?: { base: string; lg: string };
}) {
  const p: PhotoEntry = photos[id];
  const crop = position
    ? { className: 'object-cover object-[var(--pos)] lg:object-[var(--pos-lg)]', style: { '--pos': position.base, '--pos-lg': position.lg } as CSSProperties }
    : { className: 'object-cover', style: focalStyle(p) };
  return (
    <div className={cn('relative overflow-hidden bg-gray-200', ratios[ratio], hover && 'photo-hover', className)}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={82}
        className={crop.className}
        style={crop.style}
      />
    </div>
  );
}
