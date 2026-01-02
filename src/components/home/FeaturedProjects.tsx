'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/data';

export default function FeaturedProjects() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.span 
              className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.span>
            <h2 className="font-heading font-bold text-section text-primary-black">
              Our Recent Work
            </h2>
          </div>
          <motion.div
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href="/projects" 
              className="inline-flex items-center text-primary-black font-medium hover:text-accent-warm transition-colors"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <ProjectCard
                id={project.id}
                slug={project.slug}
                title={project.title}
                category={project.category}
                image={project.image}
                location={project.location}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


