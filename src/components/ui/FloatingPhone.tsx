'use client';

import { useState, useEffect } from 'react';
import { Phone, Facebook, Instagram, X as CloseIcon, MessageCircle } from 'lucide-react';

export default function FloatingPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const phoneNumber = '(580) 665-2758';
  const phoneLink = 'tel:5806652758';

  useEffect(() => {
    setMounted(true);
    // Detect iOS to disable complex animations
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop when open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        />
      )}

      {/* Floating Button Container - simplified for iOS */}
      <div
        className="fixed right-6 bottom-28 z-50"
        style={{ 
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Expanded Menu */}
        {isOpen && (
          <div className="absolute right-0 bottom-20 flex flex-col gap-3 z-50 animate-fade-in">
            {/* Phone Card */}
            <a
              href={phoneLink}
              className="flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-4 rounded-2xl shadow-xl shadow-green-500/25 min-w-[220px] active:opacity-90 transition-opacity touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-white/80 font-medium">Call Us Now</p>
                <p className="text-lg font-bold">{phoneNumber}</p>
              </div>
            </a>

            {/* Social Row */}
            <div className="flex gap-3 justify-end">
              {/* Facebook */}
              <a
                href="https://facebook.com/structure1construction"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 active:opacity-90 transition-opacity touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Facebook className="w-7 h-7 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/structure1construction"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25 active:opacity-90 transition-opacity touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Instagram className="w-7 h-7 text-white" />
              </a>
            </div>
          </div>
        )}

        {/* Main Button - simplified, no complex animations */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 touch-manipulation ${
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
          {/* Pulsing ring - CSS only for iOS compatibility */}
          {!isOpen && !isIOS && (
            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" />
          )}
          
          {/* Icon */}
          {isOpen ? (
            <CloseIcon className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </button>

        {/* Tooltip - hidden on iOS to prevent issues */}
        {!isOpen && !isIOS && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg pointer-events-none animate-pulse-slow hidden sm:block">
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              Contact Us! 👋
            </span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-transparent border-l-white" />
          </div>
        )}
      </div>
    </>
  );
}
