import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { getAllPostSlugs, getPostWithHtml, getRelatedPosts } from '@/lib/blog';
import { getService } from '@/content/services';
import { company } from '@/content/company';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostWithHtml(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', publishedTime: post.date, modifiedTime: post.lastModified, images: [{ url: post.featuredImage, alt: post.featuredImageAlt }] },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostWithHtml(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, post.category, 3);
  const service = getService(post.topic);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${company.url}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@id': `${company.url}/#business` },
    mainEntityOfPage: `${company.url}/blog/${post.slug}`,
  };
  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <>
      <Section className="pb-8 pt-28 md:pb-8 md:pt-36">
        <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: post.title }]} />
        <Eyebrow className="mt-8">
          {post.category} · {date} · {post.readTime}
        </Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-h1">{post.title}</h1>
        <p className="mt-4 max-w-2xl text-lead text-gray-700">{post.excerpt}</p>
      </Section>
      <Section className="pb-8 pt-0 md:pb-8 md:pt-0">
        <div className="relative aspect-[21/9] overflow-hidden bg-gray-200">
          <Image src={post.featuredImage} alt={post.featuredImageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
        </div>
      </Section>
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <TableOfContents headings={post.headings ?? []} />
              {service && (
                <div className="mt-8 border border-gray-200 p-5">
                  <p className="text-eyebrow text-gray-500">Related service</p>
                  <Link href={`/services/${service.slug}`} className="mt-2 block text-small font-medium hover:underline hover:underline-offset-4">
                    {service.name} →
                  </Link>
                </div>
              )}
            </div>
          </aside>
          <article className="order-1 lg:order-2 lg:col-span-8 lg:col-start-5">
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.htmlContent ?? '' }} />
          </article>
        </div>
      </Section>
      <Section tone="offwhite">
        <RelatedPosts posts={related} />
      </Section>
      <CTASection heading="Ready to plan your project?" text="Every guide ends the same way: with a free on-site estimate and an itemized quote." />
      <JsonLd data={schema} />
    </>
  );
}
