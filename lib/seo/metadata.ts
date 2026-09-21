import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './config';

/**
 * Brand strings permitted in public-facing output.
 *
 * "Clarity before commitment." is the only approved brand promise
 * (APPROVED + PUBLIC_PRODUCTION in brand-system/governance/decision-status-model.md).
 *
 * The formal institutional descriptor is NEEDS_DECISION and
 * "Property Decision Advisor" is TEST + INTERNAL_TEST_ONLY, so neither appears
 * anywhere in this application.
 */
export const APPROVED_BRAND_PROMISE = 'Clarity before commitment.';

const SITE_NAME = 'Sarah Katerina';

/**
 * Robots directives.
 *
 * `noindex, nofollow` unless the site is BOTH in production mode and
 * explicitly flagged indexable. Laboratory routes are never indexable.
 */
export function robotsFor(options?: { laboratory?: boolean }): Metadata['robots'] {
  const allowIndex = siteConfig.indexable && !options?.laboratory;

  return {
    index: allowIndex,
    follow: allowIndex,
    googleBot: { index: allowIndex, follow: allowIndex },
  };
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Internal laboratory pages are forced to noindex, nofollow. */
  laboratory?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  laboratory = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    robots: robotsFor({ laboratory }),
    alternates: {
      canonical,
      // EN/ES alternates are PREPARED but only EMITTED once the site is
      // indexable. Spanish routes do not exist yet, and seo-final-audit
      // -2026-09.md §9 requires hreflang to be "recíproco, válido y solo para
      // equivalentes" — advertising a /es URL that returns 404 would fail that
      // criterion. The shape is here so the work is a config change, not a
      // rewrite.
      ...(siteConfig.indexable && !laboratory
        ? {
            languages: {
              en: absoluteUrl(path),
              es: absoluteUrl(`/es${path === '/' ? '' : path}`),
            },
          }
        : {}),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${SITE_NAME} — Foundation preview`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Internal technical foundation for the Sarah Katerina website. Not a public site and not approved for production.',
  robots: robotsFor(),
  // No Organization/Person metadata, no verification tokens, no analytics IDs:
  // none of that data is confirmed in the source of truth.
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
};
