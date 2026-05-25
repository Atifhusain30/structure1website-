'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedNumberProps {
  value: string; // e.g. "150+", "4+", "5.0★", "2 yr"
  duration?: number;
}

export default function AnimatedNumber({ value, duration = 1.4 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  // Extract numeric portion + suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || numeric === null || reduced) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const progress = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      const isInt = Number.isInteger(numeric);
      setDisplay(`${isInt ? Math.round(current) : current.toFixed(1)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, suffix, duration, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
