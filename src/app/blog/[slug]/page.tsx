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
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
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
    author: {
      '@type': 'Organization',
      name: 'Structure1 Construction',
      url: 'https://structure1builds.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Structure1 Construction',
      url: 'https://structure1builds.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://structure1builds.com/blog/${post.slug}`,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-32 pb-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li>
                <Link href="/" className="hover:text-accent-warm transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-accent-warm transition-colors">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-primary-black font-medium truncate max-w-[200px] md:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-accent-warm text-xs font-semibold tracking-[0.15em] uppercase">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold mt-3 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-5 text-text-muted text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[2/1] md:aspect-[2.5/1] max-w-4xl mx-auto rounded-card-lg overflow-hidden mb-12">
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

          {/* CTA */}
          <BlogCTA />

          {/* Related Posts */}
          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

          {/* Back to blog */}
          <div className="text-center mt-14">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-warm transition-colors font-medium"
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
