'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureTouch, sessionStore } from '@/lib/attribution';

/**
 * Notes where this session came from (allowlisted campaign params, landing path, referrer origin)
 * so an estimate sent a few pages later still carries it. Stays in the browser until the form is
 * submitted; nothing is sent anywhere from here. Runs on every path or query change, including
 * query-only client navigation, and announces the result so an open form can follow a new offer.
 */
function Capture() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    const href = new URL(pathname + (search ? `?${search}` : ''), window.location.origin).href;
    captureTouch(href, document.referrer, sessionStore(), window);
  }, [pathname, search]);
  return null;
}

// useSearchParams needs a Suspense boundary to keep pages statically rendered. This one wraps only
// an invisible component, so the page and its form still render in the server HTML.
export default function AttributionCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  );
}
