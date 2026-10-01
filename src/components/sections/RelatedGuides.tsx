import SectionHeader from './SectionHeader';
import ArticleCard from './ArticleCard';
import Button from '@/components/ui/Button';
import { getPostsByTopic } from '@/lib/blog';

export default function RelatedGuides({ topic, heading = 'Homeowner guides', limit = 3 }: { topic: string; heading?: string; limit?: number }) {
  const posts = getPostsByTopic(topic, limit);
  if (posts.length === 0) return null;
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow="Resources" title={heading} />
        <Button href="/blog" variant="link" arrow>
          All resources
        </Button>
      </div>
      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <ArticleCard post={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
