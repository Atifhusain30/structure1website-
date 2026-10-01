import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

export default function ArticleCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="photo-hover relative aspect-[4/3] overflow-hidden bg-gray-200">
        <Image src={post.featuredImage} alt={post.featuredImageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" priority={priority} className="object-cover" />
      </div>
      <p className="mt-4 text-meta text-gray-500">
        {post.category} · {post.readTime}
      </p>
      <h3 className="mt-1.5 font-display text-h3 group-hover:text-timber">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-small text-gray-700">{post.excerpt}</p>
    </Link>
  );
}
