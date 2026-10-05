import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ArticleCard from '@/components/sections/ArticleCard';
import CTASection from '@/components/sections/CTASection';
import { getAllPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Resources | Homeowner Guides for DFW Patio Covers & Concrete',
  description: 'Cost guides, permit how-tos, material comparisons, and design ideas for patio covers and concrete in Dallas-Fort Worth.',
  alternates: { canonical: '/blog' },
};

const TOPICS = [
  { slug: 'all', label: 'All' },
  { slug: 'patio-covers', label: 'Patio Covers' },
  { slug: 'concrete', label: 'Concrete' },
  { slug: 'planning', label: 'Planning & Permits' },
];

export default function ResourcesPage({ searchParams }: { searchParams: { topic?: string } }) {
  const topic = searchParams.topic ?? 'all';
  const posts = getAllPosts().filter(
    (p) => topic === 'all' || p.topic === topic || (topic === 'concrete' && ['stamped-concrete', 'driveways-walkways'].includes(p.topic)),
  );
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources' }]}
        eyebrow="Resources"
        title="Homeowner guides for DFW projects"
        lead="Costs, permits, materials, timelines, and design ideas, written by the crew that builds the work."
        photo="gable-mckinney-ceiling"
      />
      <Section>
        <ul className="flex flex-wrap gap-2" aria-label="Filter by topic">
          {TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={t.slug === 'all' ? '/blog' : `/blog?topic=${t.slug}`}
                className={cn(
                  'inline-flex h-10 items-center border px-4 text-sm font-medium transition-colors',
                  topic === t.slug ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-700 hover:border-black hover:text-black',
                )}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        {posts.length > 0 ? (
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <ArticleCard post={p} priority={i === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-body text-gray-700">
            No guides on that topic yet.{' '}
            <Link href="/blog" className="font-medium underline underline-offset-4">
              See all guides
            </Link>
            .
          </p>
        )}
      </Section>
      <CTASection tone="offwhite" heading="Have a question the guides didn't answer?" text="Ask us directly. Free estimates include a site visit and straight answers." />
    </>
  );
}
