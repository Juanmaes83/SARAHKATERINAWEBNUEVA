import type { MetadataRoute } from 'next';
import { absoluteUrl, isLaboratoryRoute, siteConfig } from '@/lib/seo/config';

/**
 * Routes eligible for the sitemap.
 *
 * Laboratory routes are excluded by construction and the exclusion is asserted
 * below, so a future route cannot be added to the sitemap by accident.
 *
 * seo-final-audit-2026-09.md §9: "Sitemap contiene únicamente URLs canónicas,
 * 200 e indexables."
 */
const PUBLIC_ROUTES = ['/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // While the site is not indexable the sitemap is empty. Publishing preview
  // URLs would contradict the noindex posture and pollute a future crawl.
  if (!siteConfig.indexable) {
    return [];
  }

  return PUBLIC_ROUTES.filter((route) => !isLaboratoryRoute(route)).map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
