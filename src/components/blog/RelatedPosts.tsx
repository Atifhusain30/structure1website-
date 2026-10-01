import SectionHeader from '@/components/sections/SectionHeader';
import ArticleCard from '@/components/sections/ArticleCard';
import type { BlogPost } from '@/lib/blog';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <>
      <SectionHeader eyebrow="Keep reading" title="Related guides" />
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
