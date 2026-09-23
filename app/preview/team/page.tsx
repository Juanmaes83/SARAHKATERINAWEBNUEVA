import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { TeamEditorial } from '@/components/web/TeamEditorial';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import { footer, headerCta, nav, PROTOTYPE_NOTICE, seo } from '@/content/en/team';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Editorial team preview.
 *
 * The route deliberately remains inside `/preview`: `laboratory: true`, the
 * shared preview response header and the empty preview sitemap keep it
 * noindex/nofollow until separate human, professional and publication gates
 * are explicitly closed.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/team',
  laboratory: true,
});

export default function TeamPage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader nav={nav} ctaLabel={headerCta.text} ctaHref="#contact" brandHref="/preview/team" />
      <TeamEditorial />
      <WebFooter content={footer} />
    </>
  );
}
