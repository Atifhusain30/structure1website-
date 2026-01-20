'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [isIOSOrTouch, setIsIOSOrTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect iOS or touch devices - Lenis causes major issues on these
    const checkIOSOrTouch = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobile = window.innerWidth < 1024;
      
      // Disable Lenis on iOS, touch devices, or mobile screens
      return isIOS || (isTouchDevice && isMobile);
    };
    
    setIsIOSOrTouch(checkIOSOrTouch());
    
    // Re-check on resize
    const handleResize = () => setIsIOSOrTouch(checkIOSOrTouch());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // During SSR or before mount, render without Lenis
  if (!mounted) {
    return <>{children}</>;
  }

  // On iOS/touch devices, use native scrolling for better performance
  if (isIOSOrTouch) {
    return <>{children}</>;
  }

  // Only use Lenis on desktop with mouse
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        touchMultiplier: 0, // Disable touch handling completely
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}


