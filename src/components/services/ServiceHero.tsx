'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ServiceHeroProps {
  title: string;
  description: string;
  image?: string;
}

export default function ServiceHero({ title, description, image }: ServiceHeroProps) {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream to-off-white" />
      
      <div className="relative max-w-container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <AnimatedSection>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-primary-black transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-primary-black">{title}</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              {title}
            </h1>
            <p className="text-text-gray text-xl leading-relaxed">
              {description}
            </p>
          </AnimatedSection>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2a2a2a]"
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAABAgMRIf/aAAwDAQACEQMRAD8AyDT9MuNV1GK0tIzLPK2FRfpPwD2SBgdZzWt7Y2vb7W13ELq3huRH5AjljDhS3ElRkd4H7SlKpZNhaZ//2Q=="
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-black/10 to-cream">
                <span className="text-text-gray font-heading text-lg">{title} Image</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

