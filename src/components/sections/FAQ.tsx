'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import type { Faq } from '@/content/types';

export default function FAQ({ items, heading = 'Questions, answered' }: { items: Faq[]; heading?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
  return (
    <div>
      <h2 className="font-display text-h2">{heading}</h2>
      <ul className="mt-8 border-t border-gray-200">
        {items.map((f) => {
          const isOpen = open === f.id;
          return (
            <li key={f.id} className="border-b border-gray-200">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${f.id}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-body font-medium"
                >
                  {f.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
              </h3>
              <div id={`faq-${f.id}`} className={`grid transition-[grid-template-rows] duration-250 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="pb-6 text-small text-gray-700">{f.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <JsonLd data={schema} />
    </div>
  );
}
