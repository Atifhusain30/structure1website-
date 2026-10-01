import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { testimonials as all } from '@/content/testimonials';
import type { Testimonial } from '@/content/types';

export default function Testimonials({ items = all, limit = 3 }: { items?: Testimonial[]; limit?: number }) {
  const list = items.slice(0, limit);
  if (list.length === 0) return null;
  return (
    <ul className="grid gap-px border border-gray-200 bg-gray-200 md:grid-cols-3">
      {list.map((t, i) => (
        <Reveal as="li" key={t.id} delay={i * 60} className="bg-white p-6 md:p-8">
          <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-black text-black" aria-hidden />
            ))}
          </div>
          <blockquote className="mt-4 text-body text-black">“{t.quote}”</blockquote>
          <p className="mt-5 text-small font-medium">{t.author}</p>
          <p className="text-meta text-gray-500">
            {t.project} · {t.location}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
