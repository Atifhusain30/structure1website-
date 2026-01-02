'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function AnimatedText({ 
  text, 
  className, 
  as: Tag = 'h1' 
}: AnimatedTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={cn('overflow-hidden', className)}
    >
      <Tag className="flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
            style={{ perspective: '1000px' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}


