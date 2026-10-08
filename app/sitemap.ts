import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/seo/config';
import { sitemapRoutes } from '@/lib/seo/routes';

/**
 * Sitemap, generated from the governed route manifest (lib/seo/routes.ts).
 *
 * A route enters it only when it is sitemap-eligible AND its public path is
 * indexable under the same shared decision the page metadata uses
 * (`resolveRouteIndexing()`): site-level gate open, route approved with a
 * valid non-laboratory production path, index-eligible. While every public
 * path is unresolved (Phase 2 gate D2-01) the sitemap is empty even if the
 * switch were flipped — preview and laboratory URLs can never leak into it.
 *
 * The manifest cannot prove that the App Router page at that path exists and
 * answers 200; that is a launch check (docs/seo-route-migration.md).
 *
 * seo-final-audit-2026-09.md §9: "Sitemap contiene únicamente URLs canónicas,
 * 200 e indexables."
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes(siteConfig.indexable).map((route) => ({
    url: absoluteUrl(route.productionPath),
    changeFrequency: route.changeFrequency ?? 'monthly',
    priority: route.priority ?? 0.5,
  }));
}
