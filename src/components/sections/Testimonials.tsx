import { Star } from 'lucide-react';
import { testimonials as all } from '@/content/testimonials';
import type { Testimonial } from '@/content/types';

export default function Testimonials({ items = all, limit = 3 }: { items?: Testimonial[]; limit?: number }) {
  const list = items.slice(0, limit);
  if (list.length === 0) return null;
  return (
    <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
      {list.map((t) => (
        <li key={t.id}>
          <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="h-3.5 w-3.5 fill-black text-black" aria-hidden />
            ))}
          </div>
          <blockquote className="mt-4 font-display text-[1.25rem] leading-snug tracking-[-0.01em]">{t.quote}</blockquote>
          <p className="mt-4 text-small font-medium">{t.author}</p>
          <p className="text-meta text-gray-500">
            {t.project}, {t.location}
          </p>
        </li>
      ))}
    </ul>
  );
}
