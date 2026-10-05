'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX } from 'lucide-react';
import type { Reel } from '@/content/reels';

/**
 * A film strip of vertical job-site clips. Tiles snap-scroll horizontally and run past the right edge
 * of the page; each clip plays muted while it is on screen and pauses when it leaves. Tap the speaker
 * for sound. With reduced motion, nothing autoplays and the poster frame shows a play control instead.
 */
function ReelTile({ reel, reduced }: { reel: Reel; reduced: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) v.play().then(() => setPlaying(true)).catch(() => {});
        else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (reduced && v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }
    setMuted((m) => !m);
  };

  return (
    <figure className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23rem]">
      <div className="relative aspect-[9/16] overflow-hidden bg-charcoal">
        <video ref={ref} src={reel.src} poster={reel.poster} muted={muted} loop playsInline preload="metadata" className="h-full w-full object-cover" aria-label={`${reel.title}, ${reel.location}`} />
        <button
          type="button"
          onClick={toggle}
          aria-label={reduced && !playing ? 'Play clip' : muted ? 'Turn sound on' : 'Turn sound off'}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black"
        >
          {reduced && !playing ? <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" aria-hidden /> : muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span>
          <span className="block font-display text-h3">
            {reel.project ? (
              <Link href={`/projects/${reel.project}`} className="hover:underline hover:underline-offset-4">{reel.title}</Link>
            ) : reel.service ? (
              <Link href={`/services/${reel.service}`} className="hover:underline hover:underline-offset-4">{reel.title}</Link>
            ) : (
              reel.title
            )}
          </span>
          <span className="block text-meta text-gray-500">{reel.location}</span>
        </span>
        {reel.instagram && (
          <a href={reel.instagram} target="_blank" rel="noopener noreferrer" className="shrink-0 text-meta underline underline-offset-4 decoration-gray-200 hover:decoration-black">
            Instagram
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export default function ReelStrip({ reels }: { reels: Reel[] }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  if (reels.length === 0) return null;
  return (
    <div className="-mr-4 sm:-mr-6 lg:mr-[min(-1.5rem,calc((100vw-80rem)/-2-1.5rem))]">
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] md:gap-6 sm:pr-6 [&::-webkit-scrollbar]:hidden">
        {reels.map((r, i) => (
          <li key={r.id} className={i % 2 === 1 ? 'lg:pt-10' : ''}>
            <ReelTile reel={r} reduced={reduced} />
          </li>
        ))}
      </ul>
    </div>
  );
}
