import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://execuai.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/features',
    '/how-it-works',
    '/use-cases',
    '/security',
    '/pricing',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/cookies',
    '/refund',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
