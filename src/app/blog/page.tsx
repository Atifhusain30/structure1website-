import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Patio Cover Blog | Tips, Costs & Design Ideas',
  description:
    'Expert insights on patio covers, pergolas, concrete work, and outdoor living in Dallas-Fort Worth.',
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
  const featured = posts[0];
  const remaining = posts.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Field notes from the build site."
        description="Cost guides, design inspiration, and project planning tips from the Structure1 team."
        image="/images/hero/sashi3.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-16">
              <article className="grid grid-cols-1 md:grid-cols-2 border border-border bg-warm-white overflow-hidden">
                <div className="relative aspect-[16/10] md:aspect-auto bg-stone overflow-hidden">
                  <Image
                    src={featured.featuredImage}
                    alt={featured.featuredImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-rich-black text-[10px] font-body font-semibold px-3 py-1 uppercase tracking-[0.22em]">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] mb-4">
                    {featured.category}
                  </span>
                  <h2 className="font-heading font-medium text-rich-black tracking-tight"
                      style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)' }}>
                    {featured.title}
                  </h2>
                  <p className="text-text-secondary font-body text-[15px] leading-relaxed mt-4 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-5 mt-6 text-text-muted text-xs font-body">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.date).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 mt-7 text-rich-black font-body text-[11px] font-semibold uppercase tracking-[0.22em] group-hover:text-gold transition-colors">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {remaining.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {remaining.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="border border-border bg-warm-white h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                      <Image
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-medium text-rich-black text-xl mt-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary font-body text-[14px] leading-relaxed mt-2 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-text-muted text-xs font-body">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
              <p className="text-text-muted font-body text-lg">Blog posts coming soon. Check back later.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
