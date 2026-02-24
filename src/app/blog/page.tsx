import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patio Cover Blog | Tips, Costs & Design Ideas',
  description:
    'Expert insights on patio covers, pergolas, concrete work, and outdoor living in Dallas-Fort Worth. Cost guides, design inspiration, and project planning tips from Structure1 Construction.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Patio Cover Blog | Tips, Costs & Design Ideas | Structure1 Construction',
    description:
      'Expert insights on patio covers, pergolas, concrete work, and outdoor living in Dallas-Fort Worth.',
    url: 'https://structure1builds.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section className="pt-32 pb-section bg-off-white">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-accent-warm text-xs font-semibold tracking-[0.15em] uppercase">
            Our Blog
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Patio Cover &amp; Outdoor Living Insights
          </h1>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto">
            Expert guides, cost breakdowns, and design inspiration from the Structure1 team.
          </p>
        </div>

        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block group mb-14">
            <article className="bg-white rounded-card-lg overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 md:grid md:grid-cols-2 md:gap-0">
              <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredImageAlt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-warm text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-accent-warm text-xs font-semibold tracking-[0.15em] uppercase">
                  {featuredPost.category}
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2 group-hover:text-accent-warm transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-text-muted mt-3 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-5 text-text-muted text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="bg-white rounded-card-lg overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-accent-warm text-xs font-semibold tracking-[0.15em] uppercase">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold mt-2 group-hover:text-accent-warm transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text-muted mt-2 text-sm leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-text-muted text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">Blog posts coming soon. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}
