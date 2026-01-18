'use client';

import { Phone } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export default function FloatingPhone() {
  const phoneNumber = companyInfo.phone;
  const phoneLink = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;

  return (
    <a
      href={phoneLink}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary-black text-white px-5 py-3 rounded-full shadow-2xl hover:bg-accent-warm hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label={`Call us at ${phoneNumber}`}
    >
      <Phone className="w-5 h-5" />
      
      {/* Phone number - visible on larger screens */}
      <span className="hidden sm:inline font-medium text-sm">
        {phoneNumber}
      </span>
    </a>
  );
}


