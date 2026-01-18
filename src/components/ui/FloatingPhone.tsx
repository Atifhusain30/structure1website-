'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Facebook, Instagram, X, MessageCircle } from 'lucide-react';

export default function FloatingPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });
  const phoneNumber = '(580) 665-2758';
  const phoneLink = 'tel:5806652758';

  useEffect(() => {
    setMounted(true);
    
    // Gentle floating animation
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      if (!isOpen) {
        time += 0.015;
        // Smooth floating pattern
        setFloatOffset({
          x: Math.sin(time) * 6,
          y: Math.sin(time * 1.5) * 8 + Math.cos(time * 0.5) * 4
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            style={{ WebkitBackdropFilter: 'blur(8px)' }}
          />
        )}
      </AnimatePresence>

      {/* Floating Button Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: isOpen ? 0 : floatOffset.x,
          y: isOpen ? 0 : floatOffset.y,
        }}
        transition={{ 
          scale: { type: 'spring', stiffness: 400, damping: 20, delay: 0.5 },
          x: { type: 'spring', stiffness: 100, damping: 30 },
          y: { type: 'spring', stiffness: 100, damping: 30 },
        }}
        className="fixed right-6 bottom-28 z-50"
        style={{ 
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute right-0 bottom-20 flex flex-col gap-3 z-50"
            >
              {/* Phone Card */}
              <motion.a
                href={phoneLink}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-4 rounded-2xl shadow-xl shadow-green-500/25 min-w-[220px]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
                >
                  <Phone className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="text-xs text-white/80 font-medium">Call Us Now</p>
                  <p className="text-lg font-bold">{phoneNumber}</p>
                </div>
              </motion.a>

              {/* Social Row */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.1 }}
                className="flex gap-3 justify-end"
              >
                {/* Facebook */}
                <motion.a
                  href="https://facebook.com/structure1construction"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Facebook className="w-7 h-7 text-white" />
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/structure1construction"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Instagram className="w-7 h-7 text-white" />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600' 
              : 'bg-gradient-to-br from-amber-500 to-orange-600'
          }`}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            boxShadow: isOpen 
              ? '0 10px 40px rgba(239, 68, 68, 0.4)' 
              : '0 10px 40px rgba(249, 115, 22, 0.4)'
          }}
        >
          {/* Pulsing rings when closed */}
          {!isOpen && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-orange-500"
                animate={{ 
                  scale: [1, 1.5],
                  opacity: [0.4, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-orange-500"
                animate={{ 
                  scale: [1, 1.8],
                  opacity: [0.3, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.3
                }}
              />
            </>
          )}
          
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Floating tooltip that appears periodically */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [20, 0, 0, 20],
              scale: [0.8, 1, 1, 0.8]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatDelay: 6,
              times: [0, 0.1, 0.9, 1]
            }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg pointer-events-none"
          >
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              Contact Us! 👋
            </span>
            {/* Arrow pointing right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-transparent border-l-white" />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
