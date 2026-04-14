'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({
  target,
  suffix = '',
  duration = 2
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      setCount(0);
      animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (value) => setCount(Math.round(value)),
      });
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}
