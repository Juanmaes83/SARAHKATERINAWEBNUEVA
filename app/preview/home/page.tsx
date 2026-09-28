import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { HomeContent } from '@/components/web/HomeBands';
import { PROTOTYPE_NOTICE, footer, headerCta, nav, seo } from '@/content/en/home';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * PREVIEW HOME (docs/home-preview.md).
 *
 * The commercial Home recorded as future work in Phase 2G §10 and Phase 2H §7,
 * built under `/preview` so `/` stays the project index. `laboratory: true`
 * forces noindex/nofollow and keeps the route out of the sitemap.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/home',
  laboratory: true,
});

export default function HomePreviewPage() {
  return (
    <RevealLineProvider line="reading-zone">
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader nav={nav} ctaLabel={headerCta.text} ctaHref="#contact" brandHref="/preview/home" />
      <HomeContent />
      <WebFooter content={footer} />
    </RevealLineProvider>
  );
}
