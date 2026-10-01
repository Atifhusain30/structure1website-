import Link from 'next/link';
import { cities, serviceAreaList } from '@/content/cities';
import type { CitySlug } from '@/content/types';

/**
 * A plan-view diagram of the metroplex: Dallas at the center, the ten service-area pages as dots,
 * and the ~50-mile radius we build within. Positions are approximate road-map geometry (4 px per mile).
 */
const POS: Record<CitySlug, [number, number]> = {
  dallas: [320, 268],
  'fort-worth': [192, 276],
  arlington: [258, 280],
  carrollton: [282, 214],
  plano: [334, 194],
  allen: [346, 170],
  frisco: [308, 152],
  mckinney: [364, 140],
  prosper: [310, 118],
  'flower-mound': [232, 178],
};
const LABEL_LEFT = new Set<CitySlug>(['fort-worth', 'carrollton', 'flower-mound', 'frisco', 'prosper']);

export function ServiceAreaMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="Map of Structure1 service areas across Dallas–Fort Worth" className={className}>
      <circle cx={320} cy={268} r={200} fill="none" stroke="#E4E2DC" strokeDasharray="4 6" />
      <circle cx={320} cy={268} r={100} fill="none" stroke="#E4E2DC" strokeDasharray="2 6" />
      <text x={320} y={268 + 200 + 18} textAnchor="middle" fontSize="12" fill="#8C8A84">
        about 50 miles from Dallas
      </text>
      {cities.map((c) => {
        const [x, y] = POS[c.slug];
        const left = LABEL_LEFT.has(c.slug);
        const isHq = c.slug === 'dallas';
        return (
          <Link key={c.slug} href={`/service-areas/${c.slug}`} aria-label={`${c.name} service area`}>
            <g className="cursor-pointer">
              <circle cx={x} cy={y} r={isHq ? 8 : 6} fill={isHq ? '#0E0E0E' : '#FFFFFF'} stroke="#0E0E0E" strokeWidth={1.5} />
              <text x={left ? x - 11 : x + 11} y={y + 4} textAnchor={left ? 'end' : 'start'} fontSize="15" fontWeight={isHq ? 600 : 500} fill="#0E0E0E" className="hover:underline">
                {c.name}
              </text>
            </g>
          </Link>
        );
      })}
    </svg>
  );
}

export default function ServiceAreaGrid({ showList = true }: { showList?: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <ServiceAreaMap className="h-auto w-full max-w-2xl" />
      </div>
      <div className="lg:col-span-5">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link href={`/service-areas/${c.slug}`} className="group block">
                <span className="block font-display text-h3 group-hover:underline group-hover:underline-offset-4">{c.name}</span>
                <span className="block text-meta text-gray-500">{c.county}</span>
              </Link>
            </li>
          ))}
        </ul>
        {showList && (
          <p className="mt-8 text-small text-gray-700">
            Also {serviceAreaList.filter((n) => !cities.some((c) => c.name === n)).join(', ')}, and the communities around them.
          </p>
        )}
      </div>
    </div>
  );
}
