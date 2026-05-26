'use client';

import Image from 'next/image';
import EstimateForm from '@/components/forms/EstimateForm';
import Reveal from '@/components/ui/Reveal';

export default function InlineEstimate() {
  return (
    <section id="estimate" className="relative bg-rich-black text-white overflow-hidden">
      {/* Top fade — bridges sand from ServicesGrid into the dark band */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/40 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 grain-overlay opacity-40" />

      <div className="relative max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left rail */}
          <div className="lg:col-span-5">
            <Reveal direction="right" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                  Free Estimate
                </span>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                Let&apos;s scope
                <br />
                <span className="italic font-light text-white/85">your project.</span>
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.3}>
              <p className="mt-6 text-white/65 text-[17px] leading-[1.7] font-sans max-w-md">
                Send a few details. We reply within one business day with next steps, a site-visit window, and a
                ballpark price range.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="mt-10 hidden lg:block relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/hero/jeff2.JPG"
                  alt="On-site build, DFW"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  <span>{'// On site'}</span>
                  <span>Forney, TX</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal direction="left" delay={0.2}>
              <EstimateForm cta="Send My Project" />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom fade — bridges into parchment RecentWork */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-parchment pointer-events-none z-[1]" />
    </section>
  );
}
