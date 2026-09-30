import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { ContactPage } from '@/components/web/ContactPage';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import { PROTOTYPE_NOTICE, seo } from '@/content/en/contact';
import { footer } from '@/content/en/team';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * Contact preview (2026-09-29). Inside `/preview`: `laboratory: true`, the
 * preview X-Robots-Tag and the empty preview sitemap keep it noindex/nofollow.
 * It is not added to the approved navigation; linking it from the header or
 * the Home is a separate decision (docs/contact-page.md §6).
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/contact',
  laboratory: true,
});

export default function ContactPreviewPage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader
        nav={UNIFIED_WEB_NAV}
        ctaLabel={BUYER_TOOLS_LABEL}
        brandHref={HOME_PREVIEW_ROUTE}
        showLanguageSwitcher={false}
        buyerToolsSourcePage="/preview/contact"
      />
      <ContactPage />
      <WebFooter content={footer} showLanguageStatus={false} />
    </>
  );
}
