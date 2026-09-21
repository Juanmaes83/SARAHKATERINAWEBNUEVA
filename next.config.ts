import type { NextConfig } from 'next';

/**
 * The site is NOT indexable by default. Indexing is only ever enabled by an
 * explicit, human-approved environment change (see lib/seo/config.ts).
 */
const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

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
    ];
  },
};

export default nextConfig;
