import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { company } from '@/content/company';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${company.url}${c.href}` } : {}),
    })),
  };
  const muted = tone === 'dark' ? 'text-white/60' : 'text-gray-500';
  const strong = tone === 'dark' ? 'text-white' : 'text-black';
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-meta ${muted}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:underline hover:underline-offset-4">
                {c.label}
              </Link>
            ) : (
              <span className={strong} aria-current="page">
                {c.label}
              </span>
            )}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
