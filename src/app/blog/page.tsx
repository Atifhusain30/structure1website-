import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Field notes from the build site. Cost guides, design inspiration, and planning tips for patio covers, pergolas, and concrete in DFW.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Journal | Structure1',
    description:
      'Field notes from the build site — patio covers, pergolas, and concrete in DFW.',
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
        title="Field notes from"
        italicWord="the build site."
        description="Cost guides, design inspiration, permit how-tos. Written by the team that actually swings the hammer."
        image="/images/hero/sashi3.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-16 lg:mb-20">
              <article className="grid grid-cols-1 lg:grid-cols-2 bg-rich-black overflow-hidden">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden image-hover-zoom">
                  <Image
                    src={featured.featuredImage}
                    alt={featured.featuredImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    priority
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-gold text-rich-black font-mono text-[10px] font-medium px-3 py-1.5 uppercase tracking-[0.22em]">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-14 flex flex-col justify-center text-white">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-4">
                    {featured.category}
                  </div>
                  <h2
                    className="font-display font-medium leading-[1.05] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.6rem)' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-white/65 font-sans text-[15px] leading-[1.65] mt-5 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 mt-7 text-white/50 text-xs font-mono uppercase tracking-[0.22em]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 mt-8 text-gold font-mono text-[11px] uppercase tracking-[0.24em] group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {remaining.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {remaining.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-parchment border border-border h-full flex flex-col hover:border-gold transition-colors">
                    <div className="relative aspect-[16/10] overflow-hidden image-hover-zoom">
                      <Image
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-dark">
                        {post.category}
                      </span>
                      <h3 className="font-display font-medium text-rich-black text-[22px] leading-[1.15] mt-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-stone font-sans text-[14px] leading-[1.65] mt-3 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-5 text-stone text-[10px] font-mono uppercase tracking-[0.22em]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
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
              <p className="text-stone font-sans text-lg">Articles coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
