import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import type { Service } from '@/content/types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <Photo id={service.hero} ratio="4/3" sizes="(max-width: 768px) 100vw, 33vw" hover />
      <h3 className="mt-4 font-display text-h3">{service.name}</h3>
      <p className="mt-1.5 text-small text-gray-700">{service.navBlurb}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-timber">
        Learn more <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}
