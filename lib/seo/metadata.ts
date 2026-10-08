import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './config';
import { languageAlternates } from './routes';

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
  // hreflang comes ONLY from the route manifest (lib/seo/routes.ts), and only
  // for publishable routes that declare an existing alternate. No Spanish
  // route exists, so nothing is emitted. The previous version prepared a
  // guessed `/es<path>` URL that would have been advertised the moment indexing
  // was switched on — seo-final-audit-2026-09.md §9 requires hreflang to be
  // "recíproco, válido y solo para equivalentes".
  const alternates = siteConfig.indexable && !laboratory ? languageAlternates(path) : undefined;

  return {
    title,
    description,
    robots: robotsFor({ laboratory }),
    alternates: {
      canonical,
      ...(alternates
        ? {
            languages: Object.fromEntries(
              Object.entries(alternates).map(([locale, href]) => [locale, absoluteUrl(href)]),
            ),
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
