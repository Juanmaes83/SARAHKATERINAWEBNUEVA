import type { NextConfig } from 'next';
import { siteConfig } from './lib/seo/config';
import { activeRedirects } from './lib/seo/redirects';

/**
 * The site is NOT indexable by default. The global X-Robots-Tag is lifted only
 * by the SAME site-level gate the rest of the app uses (`siteConfig.indexable`,
 * lib/seo/config.ts): production mode AND an explicit
 * `NEXT_PUBLIC_SITE_INDEXABLE=true`. A preview deployment handed the flag by
 * mistake keeps the header. Lifting it does not make any page indexable on its
 * own: each page's robots meta still applies the route-level gate
 * (lib/seo/routes.ts).
 */
const isIndexable = siteConfig.indexable;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Type errors must fail the build. CI also runs `npm run typecheck`.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint errors must fail the build. CI also runs `npm run lint`.
    ignoreDuringBuilds: false,
  },
  async redirects() {
    // Only owner-approved migrations whose target route is publishable
    // (lib/seo/redirects.ts, lib/seo/routes.ts). Today this list is empty:
    // every target path is unresolved, so nothing redirects silently.
    // `permanent: true` makes Next.js answer 308, not 301. Redirects do not
    // depend on the indexing switch: they have their own approval.
    return activeRedirects();
  },
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ];

    return [
      {
        source: '/:path*',
        headers: isIndexable
          ? security
          : [
              // Transport-level crawler block for the whole preview, alongside
              // app/robots.ts and the per-page metadata robots directives.
              { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
              ...security,
            ],
      },
      {
        // /foundation is an internal component laboratory. It is never
        // indexable, regardless of NEXT_PUBLIC_SITE_INDEXABLE.
        source: '/foundation',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // Everything under /preview is a visual prototype. Never indexable.
        source: '/preview/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      { source: '/studio/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/studio/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};

export default nextConfig;
