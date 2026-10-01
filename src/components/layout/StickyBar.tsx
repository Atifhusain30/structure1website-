'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { company } from '@/content/company';

export default function StickyBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (pathname === '/estimate') return null;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-white shadow-bar transition-transform duration-250 lg:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex gap-2 p-3">
        <a href={`tel:${company.phoneRaw}`} className="flex h-12 w-14 items-center justify-center border border-black" aria-label={`Call ${company.phone}`}>
          <Phone className="h-5 w-5" />
        </a>
        <Link href="/estimate" className="flex h-12 flex-1 items-center justify-center bg-black text-sm font-medium text-white">
          Get a Free Estimate
        </Link>
      </div>
    </div>
  );
}
