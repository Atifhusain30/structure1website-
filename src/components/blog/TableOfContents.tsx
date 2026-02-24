'use client';

import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-28" aria-label="Table of contents">
      <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] text-text-muted mb-4">
        In this article
      </h4>
      <ul className="space-y-2 border-l border-border-light">
        {headings.filter(h => h.level === 2).map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`block text-left text-sm pl-4 py-1 border-l-2 -ml-px transition-colors ${
                activeId === heading.id
                  ? 'border-accent-warm text-accent-warm font-medium'
                  : 'border-transparent text-text-muted hover:text-primary-black hover:border-primary-black/20'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
