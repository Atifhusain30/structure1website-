'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import { projects } from '@/lib/data';

const featured = projects.filter((p) => p.featured).slice(0, 6);

export default function RecentWork() {
  return (
    <section id="work" className="relative bg-parchment text-rich-black overflow-hidden">
      <div className="max-w-wide mx-auto px-6 lg:px-16 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <div>
            <Reveal direction="up" delay={0.05}>
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Recent work
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <h2
                className="font-display font-medium leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
              >
                A few of the rooms
                <br />
                <span className="italic font-light text-stone">we&apos;ve built lately.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.3}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rich-black border-b border-rich-black hover:text-gold hover:border-gold pb-1 transition-colors self-start lg:self-end"
            >
              View Full Gallery
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-auto">
          <Reveal direction="up" delay={0.05} className="col-span-12 lg:col-span-8">
            <ProjectTile project={featured[0]} ratio="aspect-[16/11]" parallax="slow" />
          </Reveal>
          <Reveal direction="up" delay={0.15} className="col-span-12 lg:col-span-4">
            <ProjectTile project={featured[1]} ratio="aspect-[16/11] lg:aspect-[3/4]" parallax="fast" />
          </Reveal>
          <Reveal direction="up" delay={0.05} className="col-span-6 lg:col-span-4">
            <ProjectTile project={featured[2]} ratio="aspect-[4/5]" parallax="slow" />
          </Reveal>
          <Reveal direction="up" delay={0.15} className="col-span-6 lg:col-span-4">
            <ProjectTile project={featured[3]} ratio="aspect-[4/5]" parallax="fast" />
          </Reveal>
          <Reveal direction="up" delay={0.25} className="col-span-12 lg:col-span-4">
            <ProjectTile project={featured[4]} ratio="aspect-[4/5]" parallax="slow" />
          </Reveal>
          <Reveal direction="up" delay={0.1} className="col-span-12">
            <ProjectTile project={featured[5]} ratio="aspect-[21/9]" parallax="slow" />
          </Reveal>
        </div>
      </div>

      {/* Bottom fade — bridges into the dark Process section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-rich-black/30 pointer-events-none" />
    </section>
  );
}

function ProjectTile({
  project,
  ratio,
  parallax = 'slow',
}: {
  project: (typeof projects)[number];
  ratio: string;
  parallax?: 'slow' | 'fast';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], parallax === 'slow' ? ['-4%', '4%'] : ['-8%', '8%']);

  return (
    <Link href={`/projects/${project.slug}`} className="group block relative overflow-hidden bg-rich-black">
      <div ref={ref} className={`relative ${ratio} overflow-hidden`}>
        <motion.div style={{ y }} className="absolute inset-[-8%]">
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/85 via-transparent to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="absolute inset-0 p-5 lg:p-7 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{project.location}</span>
          <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <h3 className="font-display text-[20px] lg:text-[26px] font-medium leading-[1.1] max-w-sm">{project.title}</h3>
      </div>
    </Link>
  );
}
