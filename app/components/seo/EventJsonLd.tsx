import type { MetadataRoute } from 'next';
import { SITE } from '@/app/content/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.seo.canonicalUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/global-color'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
