'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  index: number;
}

export default function ServiceCard({ 
  id, 
  title, 
  shortDescription,
  image,
  index 
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/services/${id}`}>
        <motion.div
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cream to-border-light">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
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
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-heading font-bold text-xl text-primary-black mb-2">
              {title}
            </h3>
            <p className="text-text-gray text-sm leading-relaxed mb-4">
              {shortDescription}
            </p>
            <motion.span 
              className="inline-flex items-center text-sm font-medium text-primary-black"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              Learn More 
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

