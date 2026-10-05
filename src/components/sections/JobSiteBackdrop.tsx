'use client';
import { useEffect, useRef } from 'react';

/**
 * Decorative backdrop for the "From the job site" band: a thin-line vector drawing of a home with an
 * attached cover that re-draws itself on a loop through the three roofs we build (lean-to, gable, open
 * open-rafter). The whole drawing fades from 0 to 100% opacity as the band scrolls into view, so it reveals
 * itself rather than sitting there. Under prefers-reduced-motion it is simply visible and still.
 */

// Five points per roof shape: wall attach, ridge/mid, outer eave, post top, post foot. The same point
// count in every frame keeps the SMIL morph smooth. Compact 1400x600 sheet: house on the left, cover on the right.
const ROOF = {
  leanto: 'M600,220 L875,270 L1150,320 L1120,328 L1120,560',
  gable: 'M600,300 L875,150 L1150,300 L1120,310 L1120,560',
  open: 'M600,260 L875,260 L1150,260 L1120,270 L1120,560',
};
const BEAM = {
  leanto: 'M600,250 L1120,345',
  gable: 'M600,325 L1120,325',
  open: 'M600,280 L1120,280',
};
type Frames = typeof ROOF;
const ORDER = ['leanto', 'gable', 'open'] as const;
const hold = (f: Frames) => [...ORDER.flatMap((k) => [f[k], f[k]]), f.leanto].join(';');
const KEY_TIMES = '0;0.25;0.333;0.583;0.666;0.916;1';
const SPLINES = Array(6).fill('0.45 0 0.2 1').join(';');

function Drawing({ animate }: { animate: boolean }) {
  const morph = (frames: Frames) =>
    animate ? <animate attributeName="d" dur="15s" repeatCount="indefinite" calcMode="spline" values={hold(frames)} keyTimes={KEY_TIMES} keySplines={SPLINES} /> : null;
  return (
    <svg viewBox="0 0 1400 600" preserveAspectRatio="xMaxYMin meet" className="block h-auto w-full" aria-hidden focusable="false">
      <g fill="none" stroke="#2B2B2B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {/* The home: side elevation, still. */}
        <g strokeOpacity="0.3">
          <path d="M100,560 V260 L350,120 L600,260 V560" />
          <path d="M60,260 L350,95 L640,260" />
          <path d="M170,560 V430 H260 V560" />
          <path d="M360,320 H520 V420 H360 Z M440,320 V420 M360,370 H520" />
          <path d="M20,560 H1380" />
        </g>
        {/* The cover: the part that changes shape. */}
        <g strokeOpacity="0.6">
          <path d={BEAM.gable}>{morph(BEAM)}</path>
          <path d={ROOF.gable}>{morph(ROOF)}</path>
        </g>
      </g>
    </svg>
  );
}

/** Left-hand companion: a band of evenly spaced diagonal lines, like looking up through open rafters,
 * fading out toward the reels. Pure texture, no drawing. Still. */
function RafterPattern() {
  const lines = Array.from({ length: 34 }, (_, i) => -560 + i * 40);
  return (
    <svg viewBox="0 0 800 300" preserveAspectRatio="xMinYMax slice" className="block h-auto w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id="js-rafter-fade" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="js-rafter-mask">
          <rect width="800" height="300" fill="url(#js-rafter-fade)" />
        </mask>
      </defs>
      <g mask="url(#js-rafter-mask)" stroke="#2B2B2B" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {lines.map((x) => (
          <line key={x} x1={x} y1="300" x2={x + 300} y2="0" />
        ))}
      </g>
    </svg>
  );
}

/** Opacity follows the band's position: 0 as its top enters at the bottom of the viewport, 1 once it is a third of the way up. */
function useScrollReveal(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.opacity = '1';
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - top) / (vh * 0.66);
      el.style.opacity = String(Math.min(1, Math.max(0, progress)));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export default function JobSiteBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-0 md:block" aria-hidden>
      {/* Home + morphing cover, anchored top-right so the roof sits in the open header row and the posts land in the gutter past the reels. */}
      <div className="absolute bottom-0 left-0 w-[42%] max-w-[600px]">
        <RafterPattern />
      </div>
      <div className="absolute -top-8 right-0 w-[62%] max-w-[900px]">
        <div className="relative motion-reduce:hidden">
          <Drawing animate />
        </div>
        <div className="relative hidden motion-reduce:block">
          <Drawing animate={false} />
        </div>
      </div>
    </div>
  );
}
