'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  location: string;
}

export default function ProjectCard({ 
  slug, 
  title, 
  category,
  image,
  location 
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Project Image */}
        <motion.div
          className="w-full h-full relative"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/20 to-transparent"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
            {category.replace('-', ' ')}
          </span>
          <h3 className="text-white font-heading font-bold text-xl mb-1">
            {title}
          </h3>
          <p className="text-white/70 text-sm mb-4">{location}</p>
          <span className="inline-flex items-center text-white text-sm font-medium">
            View Project 
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </span>
        </motion.div>

        {/* Always visible category badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-primary-black uppercase tracking-wider">
            {category.replace('-', ' ')}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

