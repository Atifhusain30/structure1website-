'use client';
import { useCallback } from 'react';

let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer?.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
  }
  observer.observe(el);
}

export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
  className?: string;
}) {
  const ref = useCallback((el: HTMLElement | null) => {
    if (el) observe(el);
  }, []);
  return (
    <Tag ref={ref} data-reveal="" style={{ ['--reveal-delay' as string]: `${delay}ms` }} className={className}>
      {children}
    </Tag>
  );
}
