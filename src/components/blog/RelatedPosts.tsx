import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="block w-10 h-px bg-gold" />
        <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
          Related Articles
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-warm-white border border-border h-full flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden bg-stone">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-gold font-body text-[10px] font-semibold uppercase tracking-[0.28em]">
                  {post.category}
                </span>
                <h4 className="font-heading font-semibold text-rich-black mt-2 line-clamp-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 mt-auto pt-3 text-text-muted text-xs font-body">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
