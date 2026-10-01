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
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const items = headings.filter((h) => h.level === 2);
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-eyebrow text-gray-500">In this article</p>
      <ul className="space-y-1 border-l border-gray-200">
        {items.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-small transition-colors ${
                activeId === heading.id ? 'border-black font-medium text-black' : 'border-transparent text-gray-700 hover:underline hover:underline-offset-4'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
