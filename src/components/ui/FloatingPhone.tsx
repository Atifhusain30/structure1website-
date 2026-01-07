'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export default function FloatingPhone() {
  const phoneNumber = companyInfo.phone;
  const phoneLink = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;

  return (
    <motion.a
      href={phoneLink}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary-black text-white px-5 py-3 rounded-full shadow-2xl hover:bg-accent-warm transition-colors duration-300 group"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Call us at ${phoneNumber}`}
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-primary-black animate-ping opacity-20" />
      
      {/* Phone icon with shake animation on hover */}
      <motion.div
        className="relative"
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          repeatDelay: 3 
        }}
      >
        <Phone className="w-5 h-5" />
      </motion.div>
      
      {/* Phone number - visible on larger screens */}
      <span className="hidden sm:inline font-medium text-sm">
        {phoneNumber}
      </span>
    </motion.a>
  );
}

