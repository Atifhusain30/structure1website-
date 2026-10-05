import Link from 'next/link';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

/** Service chips for the projects page. */
export default function ProjectFilters({ service }: { service?: string }) {
  const href = (s?: string) => {
    const q = new URLSearchParams();
    if (s) q.set('service', s);
    const qs = q.toString();
    return `/projects${qs ? `?${qs}` : ''}`;
  };
  const chip = (active: boolean) =>
    cn(
      'inline-flex h-10 items-center border px-4 text-sm font-medium transition-colors',
      active ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-700 hover:border-black hover:text-black',
    );
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filter by service">
      <li>
        <Link href={href(undefined)} className={chip(!service)}>
          All
        </Link>
      </li>
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={href(s.slug)} className={chip(service === s.slug)}>
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
