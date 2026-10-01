'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photos, type Photo, type PhotoId } from '@/content/images';

export default function ProjectGallery({ ids, title }: { ids: PhotoId[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + ids.length) % ids.length)), [ids.length]);

  useEffect(() => {
    if (index === null) return;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') e.preventDefault();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [index, close, step]);

  const cover: Photo = photos[ids[0]];
  const current: Photo | null = index === null ? null : photos[ids[index]];
  return (
    <>
      <button
        type="button"
        onClick={(e) => open(0, e.currentTarget)}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-gray-200"
        aria-label={`Open photo 1 of ${ids.length}: ${cover.alt}`}
      >
        <Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" quality={85} className="object-cover" />
      </button>
      {ids.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 md:grid-cols-6">
          {ids.slice(1).map((id, i) => {
            const p: Photo = photos[id];
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={(e) => open(i + 1, e.currentTarget)}
                  className="photo-hover relative block aspect-square w-full overflow-hidden bg-gray-200"
                  aria-label={`Open photo ${i + 2} of ${ids.length}: ${p.alt}`}
                >
                  <Image src={p.src} alt="" fill sizes="(max-width: 768px) 25vw, 200px" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {index !== null && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current !== null) {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }
            touchX.current = null;
          }}
        >
          <button ref={closeBtn} type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center text-white hover:text-white/70">
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={88} className="object-contain" />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-meta text-white/70">
            {index + 1} / {ids.length}
          </p>
          {ids.length > 1 && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white hover:text-white/70">
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white hover:text-white/70">
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
