'use client';

import { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsMobile(mobile || isIOS);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified animation for mobile - no 3D transforms
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.12,
      },
    },
  };

  const wordVariants = isMobile 
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            duration: 0.3, 
            ease: 'easeOut'
          },
        },
      }
    : {
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
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={cn('overflow-hidden', className)}
    >
      <Tag className="flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
            style={isMobile ? undefined : { perspective: '1000px' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}


