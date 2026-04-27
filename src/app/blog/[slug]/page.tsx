import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { getAllPostSlugs, getPostWithHtml, getRelatedPosts } from '@/lib/blog';
import BlogTableOfContents from '@/components/blog/TableOfContents';
import BlogCTA from '@/components/blog/BlogCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostWithHtml(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://structure1builds.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.featuredImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostWithHtml(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, post.category);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `https://structure1builds.com${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: { '@type': 'Organization', name: 'Structure1 Construction', url: 'https://structure1builds.com' },
    publisher: { '@type': 'Organization', name: 'Structure1 Construction', url: 'https://structure1builds.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://structure1builds.com/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://structure1builds.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://structure1builds.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://structure1builds.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero band */}
      <section className="relative bg-rich-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            sizes="100vw"
            quality={85}
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rich-black/85 via-rich-black/50 to-rich-black/90" />
        </div>
        <div className="relative z-10 max-w-narrow mx-auto px-6 lg:px-10 pt-40 pb-16 lg:pt-48 lg:pb-20 text-center">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/55 font-body">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white truncate max-w-[200px] md:max-w-none">{post.title}</li>
            </ol>
          </nav>

          <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em]">
            {post.category}
          </span>
          <h1
            className="font-heading font-medium text-white tracking-tight leading-[1.1] mt-4 max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-5 mt-6 text-white/60 text-sm font-body">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <article className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          {/* Featured Image */}
          <div className="relative aspect-[2/1] md:aspect-[2.5/1] max-w-4xl mx-auto overflow-hidden mb-14">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>

          {/* Content + TOC */}
          <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            <div
              className="blog-post prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
            />
            {post.headings && post.headings.length > 0 && (
              <aside className="hidden lg:block">
                <BlogTableOfContents headings={post.headings} />
              </aside>
            )}
          </div>

          <BlogCTA />

          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

          <div className="text-center mt-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-rich-black hover:text-gold font-body font-semibold uppercase tracking-[0.18em] text-[11px] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
