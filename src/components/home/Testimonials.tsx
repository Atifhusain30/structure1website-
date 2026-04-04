'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-section bg-parchment overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="section-divider" />
              <span className="text-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
                Testimonials
              </span>
              <div className="section-divider" />
            </div>
            <h2 className="font-heading font-bold text-section text-rich-black">
              What Our Clients Say
            </h2>
          </motion.div>

          {/* Quote */}
          <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
            {/* Large decorative quote mark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 font-heading text-[12rem] leading-none text-gold/[0.07] select-none pointer-events-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center relative z-10"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] text-rich-black leading-[1.3] mb-10 italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-[1.5px] bg-gold mb-4" />
                  <p className="font-body font-semibold text-rich-black text-base">
                    {testimonials[current].author}
                  </p>
                  <p className="text-text-muted font-body text-sm">
                    {testimonials[current].project} &middot; {testimonials[current].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-rich-black hover:text-white hover:border-rich-black transition-all duration-400 touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-400 touch-manipulation ${
                    index === current
                      ? 'bg-gold w-8'
                      : 'bg-border hover:bg-text-muted w-1.5'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-rich-black hover:text-white hover:border-rich-black transition-all duration-400 touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Google Review Link */}
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/search?q=Structure1+Construction+Dallas+TX+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark font-body font-semibold text-sm transition-colors inline-flex items-center gap-1.5"
            >
              Leave Us a Review on Google
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
