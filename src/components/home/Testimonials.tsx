'use client';

import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-parchment text-rich-black">
      <div className="max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <Reveal direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="gold-rule" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                Words from clients
              </span>
              <span className="gold-rule" />
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <h2
              className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              What homeowners say
              <br />
              <span className="italic font-light text-stone">about the build.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.slice(0, 6).map((t, i) => (
            <Reveal
              key={t.id}
              direction="up"
              delay={i * 0.1}
              distance={40}
              className={i === 0 ? 'lg:row-span-2 lg:col-span-1' : ''}
            >
              <article
                className={`relative p-8 lg:p-10 border border-border bg-parchment h-full ${
                  i === 0 ? 'bg-sand/40' : ''
                }`}
              >
                <Quote className="w-7 h-7 text-gold mb-6" strokeWidth={1.4} />
                <p
                  className={`font-display ${
                    i === 0 ? 'text-[24px] lg:text-[28px]' : 'text-[19px] lg:text-[22px]'
                  } leading-[1.4] text-rich-black mb-8`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: t.rating }).map((_, i2) => (
                    <Star key={i2} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="font-sans font-semibold text-sm">{t.author}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone mt-1.5">
                    {t.project} · {t.location}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
