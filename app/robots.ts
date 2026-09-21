import type { MetadataRoute } from 'next';
import { LABORATORY_ROUTES, absoluteUrl, siteConfig } from '@/lib/seo/config';

/**
 * Robots policy.
 *
 * Default is a full disallow. The site only becomes crawlable when it is BOTH
 * in production mode and explicitly flagged indexable — a human decision.
 *
 * NOTE ON AI CRAWLERS: decisions-log.md (2026-08-05) records that the public
 * robots.txt contains no directive for GPTBot, ClaudeBot, PerplexityBot or
 * Google-Extended, that the current open access is "a default configuration,
 * not a policy", and that the decision is still **Propuesta** pending legal
 * input from Sarah. No such directive is invented here. While the site is
 * disallowed for every user-agent the question is moot; it must be answered
 * before indexing is ever enabled.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Laboratory routes stay out of the index at every stage.
        disallow: [...LABORATORY_ROUTES],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
