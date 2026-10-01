import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { cities } from '@/content/cities';
import { company } from '@/content/company';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.url;
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page('', 1, 'weekly'),
    page('/services', 0.9),
    page('/projects', 0.9, 'weekly'),
    page('/service-areas', 0.8),
    page('/estimate', 0.9),
    page('/process', 0.7),
    page('/about', 0.6),
    page('/contact', 0.7),
    page('/blog', 0.8, 'weekly'),
    page('/privacy', 0.2),
    page('/terms', 0.2),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    ...cities.map((c) => page(`/service-areas/${c.slug}`, 0.8)),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.6)),
    ...getAllPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.lastModified || p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
