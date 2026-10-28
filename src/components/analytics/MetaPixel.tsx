'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { META_PIXEL_ID, trackCall, trackPageView } from '@/lib/track';

// Meta's base code, unchanged apart from the id. It queues calls until fbevents.js arrives
// and fires the first PageView itself.
const baseCode = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

export default function MetaPixel() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // Client-side navigations don't reload the page, so report them as page views.
  // The initial load is already counted by the base code.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  // One listener covers every phone link on the site (header, footer, sticky bar, forms...).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackCall(window.location.pathname);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  if (!META_PIXEL_ID) return null;

  // No <noscript> image fallback: inside a client component React preloads that image for every
  // visitor, which would send a second PageView on each load.
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {baseCode}
    </Script>
  );
}
