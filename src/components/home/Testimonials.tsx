'use client';

import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <span className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-section text-primary-black mb-16">
            What Our Clients Say
          </h2>

          {/* Testimonial Content - simplified transitions for iOS */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 text-accent-warm/20" />
            
            <div key={current} className="px-4 animate-fade-in">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-warm text-accent-warm" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-2xl md:text-3xl text-primary-black leading-relaxed mb-8">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p className="font-semibold text-primary-black">
                  {testimonials[current].author}
                </p>
                <p className="text-text-gray text-sm">
                  {testimonials[current].project} • {testimonials[current].location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation - simplified for iOS */}
          <div className="flex items-center justify-center gap-4 mt-10" role="group" aria-label="Testimonial navigation">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:bg-primary-black hover:text-white hover:border-primary-black transition-all active:scale-95 touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  role="tab"
                  aria-selected={index === current}
                  aria-label={`Go to testimonial ${index + 1} from ${testimonial.author}`}
                  className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    index === current 
                      ? 'bg-primary-black w-8' 
                      : 'bg-border-light hover:bg-text-gray w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:bg-primary-black hover:text-white hover:border-primary-black transition-all active:scale-95 touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

