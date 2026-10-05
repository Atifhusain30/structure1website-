import Link from 'next/link';
import { cities, serviceAreaList } from '@/content/cities';
import type { CitySlug } from '@/content/types';
import ServiceAreaLeafletMap, { type MapCity } from './ServiceAreaLeafletMap';

/** Real coordinates for the city guides; Dallas is home base. */
const CITY_COORDS: Record<CitySlug, [number, number]> = {
  dallas: [32.7767, -96.797],
  'fort-worth': [32.7555, -97.3308],
  plano: [33.0198, -96.6989],
  frisco: [33.1507, -96.8236],
  mckinney: [33.1972, -96.6398],
  arlington: [32.7357, -97.1081],
  allen: [33.1032, -96.6706],
  carrollton: [32.9537, -96.8903],
  'flower-mound': [33.0146, -97.097],
  prosper: [33.2362, -96.8011],
};
const mapCities: MapCity[] = cities.map((c) => ({ slug: c.slug, name: c.name, lat: CITY_COORDS[c.slug][0], lng: CITY_COORDS[c.slug][1], home: c.slug === 'dallas' }));

const otherTowns = serviceAreaList.filter((n) => !cities.some((c) => c.name === n));

/** Compact form for the home page: the ten city pages as a row of links, plus the towns around them. */
export function ServiceAreaLinks() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2" aria-label="Service area pages">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link href={`/service-areas/${c.slug}`} className="inline-flex h-11 items-center border border-gray-200 px-4 text-[0.9375rem] font-medium text-black transition-colors hover:border-black hover:bg-black hover:text-white">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-prose text-small text-gray-700">Also {otherTowns.join(', ')}, and the communities around them.</p>
    </div>
  );
}

export default function ServiceAreaGrid({ variant = 'map' }: { variant?: 'map' | 'links' }) {
  if (variant === 'links') return <ServiceAreaLinks />;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">
        <ServiceAreaLeafletMap cities={mapCities} className="h-[26rem] w-full bg-offwhite sm:h-[32rem] lg:h-[36rem]" />
      </div>
      <div className="lg:col-span-4">
        <h2 className="font-display text-h2">All of Dallas–Fort Worth.</h2>
        <p className="mt-4 text-lead text-gray-700">
          150+ projects across Dallas, Tarrant, Collin, and Denton counties and the towns around them. If your home is within about 50 miles of Dallas, we build there.
        </p>
        <p className="mt-8 text-small text-gray-500">City guides with local projects, permit notes, and reviews:</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={`/service-areas/${c.slug}`} className="text-[0.9375rem] font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-black">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
