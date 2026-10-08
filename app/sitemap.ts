import type { MetadataRoute } from 'next';
import { absoluteUrl, isLaboratoryRoute, siteConfig } from '@/lib/seo/config';
import { sitemapRoutes } from '@/lib/seo/routes';

/**
 * Sitemap, generated from the governed route manifest (lib/seo/routes.ts).
 *
 * Only publishable routes enter it: an approved production path, eligible for
 * indexing and the sitemap, and the site-wide indexing switch on. While every
 * public path is unresolved (Phase 2 gate D2-01) the sitemap is empty even if
 * the switch were flipped — preview and laboratory URLs can never leak into it.
 *
 * seo-final-audit-2026-09.md §9: "Sitemap contiene únicamente URLs canónicas,
 * 200 e indexables."
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes(siteConfig.indexable)
    .filter((route) => !isLaboratoryRoute(route.productionPath))
    .map((route) => ({
      url: absoluteUrl(route.productionPath),
      changeFrequency: route.changeFrequency ?? 'monthly',
      priority: route.priority ?? 0.5,
    }));
}
