import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { TeamEditorial } from '@/components/web/TeamEditorial';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import { footer, PROTOTYPE_NOTICE, seo } from '@/content/en/team';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
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
    // 2026-09-30: aquamarine accent on navy surfaces (app/web-tokens.css).
    <div data-palette="aqua">
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader
        nav={UNIFIED_WEB_NAV}
        ctaLabel={BUYER_TOOLS_LABEL}
        brandHref={HOME_PREVIEW_ROUTE}
        showLanguageSwitcher={false}
        buyerToolsSourcePage={SERVICE_ROUTES.team}
      />
      <TeamEditorial />
      <WebFooter content={footer} />
    </div>
  );
}
