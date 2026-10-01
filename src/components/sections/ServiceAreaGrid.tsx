import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cities, serviceAreaList } from '@/content/cities';

export default function ServiceAreaGrid({ showList = true }: { showList?: boolean }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-px border border-gray-200 bg-gray-200 md:grid-cols-5">
        {cities.map((c) => (
          <li key={c.slug} className="bg-white">
            <Link href={`/service-areas/${c.slug}`} className="group flex h-full flex-col justify-between p-5">
              <span>
                <span className="block font-display text-h3">{c.name}</span>
                <span className="block text-meta text-gray-500">{c.county}</span>
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:text-timber">
                View {c.name} <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {showList && (
        <p className="mt-6 text-small text-gray-700">
          <span className="font-medium text-black">Also serving:</span>{' '}
          {serviceAreaList.filter((n) => !cities.some((c) => c.name === n)).join(', ')}, and surrounding communities.
        </p>
      )}
    </>
  );
}
