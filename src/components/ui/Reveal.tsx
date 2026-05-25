'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger child by N seconds. Default 0. */
  delay?: number;
  /** Animation duration. Default 1.1s — slow and gentle. */
  duration?: number;
  /** Subtle y-rise distance in px. Default 8 — barely perceptible. */
  rise?: number;
  /** Trigger fraction. Default 0.15 — start as section enters. */
  amount?: number;
  /** Re-trigger on re-entry. Default true (once only). */
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'h1' | 'h2' | 'h3' | 'p';
  /** @deprecated — kept for backward compat, ignored. All reveals are subtle y-rise + fade. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'in';
  /** @deprecated — use `rise` instead. */
  distance?: number;
}

/**
 * Subtle, seamless reveal. Fades opacity + tiny y rise.
 * Single easing curve across the site for visual cohesion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  rise = 8,
  amount = 0.15,
  once = true,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: rise },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </Tag>
  );
}
