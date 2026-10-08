import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './config';
import { SEO_ROUTES, languageAlternates, resolveRouteIndexing, type SeoRoute } from './routes';

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

/** Which page is being described. Omitting it fails closed (noindex). */
export type RouteContext = {
  /** Path the page is served at. */
  path?: string;
  /** Internal laboratory pages are forced to noindex, nofollow. */
  laboratory?: boolean;
  /** Route manifest; injectable for tests with synthetic fixtures only. */
  routes?: readonly SeoRoute[];
};

/**
 * Robots directives.
 *
 * `index, follow` only when BOTH gates are open (see lib/seo/routes.ts):
 * the site-level gate (`siteConfig.indexable`: production mode + explicit
 * flag) and the route-level gate (`resolveRouteIndexing()`: a known, approved,
 * index-eligible route served at its public path, not its preview, and not
 * marked laboratory). A call without a path — the layout fallback
 * `baseMetadata`, or any page that forgets its context — is noindex.
 */
export function robotsFor(context: RouteContext = {}): Metadata['robots'] {
  const allowIndex = resolveRouteIndexing(
    context.path,
    { siteIndexable: siteConfig.indexable, laboratory: context.laboratory },
    context.routes ?? SEO_ROUTES,
  ).indexable;

  return {
    index: allowIndex,
    follow: allowIndex,
    googleBot: { index: allowIndex, follow: allowIndex },
  };
}

type PageMetadataInput = RouteContext & {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
  laboratory = false,
  routes = SEO_ROUTES,
}: PageMetadataInput): Metadata {
  const resolution = resolveRouteIndexing(path, { siteIndexable: siteConfig.indexable, laboratory }, routes);
  // Canonical and Open Graph point at the APPROVED public path when the route
  // has one — also from its /preview URL, which stays noindex. Without an
  // approved public path they keep the served path: no production URL is
  // invented for an undecided route.
  const canonical = absoluteUrl(resolution.publicPath ?? path);
  // hreflang comes ONLY from the route manifest, only on an indexable public
  // URL, and only for alternates whose target is itself an existing,
  // approved, indexable manifest route that links back
  // (`languageAlternates()`). No Spanish route exists, so nothing is emitted.
  // seo-final-audit-2026-09.md §9 requires hreflang to be "recíproco, válido y
  // solo para equivalentes".
  const alternates = resolution.indexable ? languageAlternates(path, siteConfig.indexable, routes) : undefined;

  return {
    title,
    description,
    robots: robotsFor({ path, laboratory, routes }),
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
      locale: resolution.route?.locale ?? 'en',
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
  // No route context: always noindex. Every page sets its own robots through
  // buildMetadata(); anything that does not (e.g. not-found) inherits this.
  robots: robotsFor(),
  // No Organization/Person metadata, no verification tokens, no analytics IDs:
  // none of that data is confirmed in the source of truth.
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
};
