'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Facebook, Instagram, X, Sparkles } from 'lucide-react';

export default function FloatingPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const phoneNumber = '(580) 665-2758';
  const phoneLink = 'tel:5806652758';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Action Button Container */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              
              {/* Social Links */}
              <div className="absolute bottom-20 right-0 flex flex-col items-end gap-4 z-50">
                {/* Phone with number */}
                <motion.a
                  href={phoneLink}
                  initial={{ opacity: 0, scale: 0, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: 100 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-4 rounded-2xl shadow-lg shadow-green-500/30"
                >
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Phone className="w-6 h-6" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xs opacity-80">Call Us Now</span>
                    <span className="font-bold text-lg">{phoneNumber}</span>
                  </div>
                </motion.a>

                {/* Social Icons Row */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
                  className="flex gap-3"
                >
                  <motion.a
                    href="https://facebook.com/structure1construction"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30"
                  >
                    <Facebook className="w-7 h-7 text-white" />
                  </motion.a>
                  
                  <motion.a
                    href="https://instagram.com/structure1construction"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/30"
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </motion.a>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/40' 
              : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/40'
          }`}
        >
          {/* Animated ring */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-400"
              animate={{ 
                scale: [1, 1.4, 1.4],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          )}
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* "Contact Us" label */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg whitespace-nowrap"
          >
            <span className="text-sm font-semibold text-gray-800">Contact Us!</span>
            {/* Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
          </motion.div>
        )}
      </div>
    </>
  );
}


