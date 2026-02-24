'use client';

import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-accent-warm text-sm font-semibold uppercase tracking-[0.2em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="font-heading font-extrabold text-section text-primary-black mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <div className="relative min-h-[280px] flex items-center justify-center">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 text-accent-warm/15" />

            <div key={current} className="px-4 animate-fade-in">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-warm text-accent-warm" />
                ))}
              </div>

              <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-primary-black leading-relaxed mb-8">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              <div>
                <p className="font-bold text-primary-black text-lg">
                  {testimonials[current].author}
                </p>
                <p className="text-text-gray text-sm mt-1">
                  {testimonials[current].project} &bull; {testimonials[current].location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:bg-primary-black hover:text-white hover:border-primary-black transition-all touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    index === current
                      ? 'bg-accent-warm w-8'
                      : 'bg-border-light hover:bg-text-gray w-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:bg-primary-black hover:text-white hover:border-primary-black transition-all touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Google Review Link */}
          <div className="mt-8">
            <a
              href="https://www.google.com/search?q=Structure1+Construction+Dallas+TX+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-warm hover:text-accent-warm-dark font-semibold text-sm transition-colors inline-flex items-center gap-1"
            >
              Leave Us a Review on Google &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
