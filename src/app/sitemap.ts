import { MetadataRoute } from 'next';
import { services, projects } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { cities } from '@/lib/city-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://structure1builds.com';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/service-areas',
    '/projects',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/service-areas/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...projectPages, ...blogPosts];
}


