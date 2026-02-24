import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lastModified?: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  keywords: string[];
  readTime: string;
  content: string;
  htmlContent?: string;
  headings?: { id: string; text: string; level: number }[];
}

function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function extractHeadings(htmlContent: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h([23])([^>]*)>(.*?)<\/h([23])>/gi, (_, level, attrs, text, closeLevel) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h${level}${attrs} id="${id}">${text}</h${closeLevel}>`;
  });
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    lastModified: data.lastModified,
    category: data.category || '',
    featuredImage: data.featuredImage || '',
    featuredImageAlt: data.featuredImageAlt || '',
    keywords: data.keywords || [],
    readTime: estimateReadTime(content),
    content,
  };
}

export async function getPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const processed = await remark().use(html, { sanitize: false }).process(post.content);
  let htmlContent = processed.toString();
  htmlContent = addHeadingIds(htmlContent);
  const headings = extractHeadings(htmlContent);

  return {
    ...post,
    htmlContent,
    headings,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const otherPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  const sameCategoryPosts = otherPosts.filter((post) => post.category === category);

  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }

  const remaining = otherPosts
    .filter((post) => post.category !== category)
    .slice(0, limit - sameCategoryPosts.length);

  return [...sameCategoryPosts, ...remaining];
}
