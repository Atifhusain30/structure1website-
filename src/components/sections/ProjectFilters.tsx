import Link from 'next/link';
import { services } from '@/content/services';
import { cities } from '@/content/cities';
import { cn } from '@/lib/utils';

export default function ProjectFilters({ service, city }: { service?: string; city?: string }) {
  const href = (s?: string, c?: string) => {
    const q = new URLSearchParams();
    if (s) q.set('service', s);
    if (c) q.set('city', c);
    const qs = q.toString();
    return `/projects${qs ? `?${qs}` : ''}`;
  };
  const chip = (active: boolean) =>
    cn(
      'inline-flex h-10 items-center border px-4 text-sm font-medium transition-colors',
      active ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-700 hover:border-black hover:text-black',
    );
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-2" aria-label="Filter by service">
        <li>
          <Link href={href(undefined, city)} className={chip(!service)}>
            All
          </Link>
        </li>
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={href(s.slug, city)} className={chip(service === s.slug)}>
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-2" aria-label="Filter by city">
        <li>
          <Link href={href(service, undefined)} className={chip(!city)}>
            All cities
          </Link>
        </li>
        {cities
          .filter((c) => ['dallas', 'fort-worth', 'plano', 'mckinney'].includes(c.slug))
          .map((c) => (
            <li key={c.slug}>
              <Link href={href(service, c.slug)} className={chip(city === c.slug)}>
                {c.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
