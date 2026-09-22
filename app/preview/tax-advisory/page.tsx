import type { Metadata } from 'next';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { WebFaq } from '@/components/web/WebFaq';
import { TaxHero } from '@/components/web/TaxHero';
import {
  TaxAuthorityBand,
  TaxCalendarBand,
  TaxCasesBand,
  TaxConcernsBand,
  TaxContextBand,
  TaxFinalCtaBand,
  TaxJourneyBand,
  TaxProcessBand,
  TaxReportBand,
  TaxServicesBand,
  TaxTrustBand,
} from '@/components/web/TaxBands';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROTOTYPE_NOTICE, faq, footer, headerCta, nav, seo } from '@/content/en/tax-advisory';

/**
 * TAX ADVISORY — PHASE 2D, CONVERGED ONTO THE INVESTMENT SYSTEM.
 *
 * Implements the approved Tax Advisory template
 * (`website/nueva web/Sarah Katerina Tax Advisory.png`) using the canonical
 * website layer: `app/web-tokens.css`, `components/web/*`, the shared header,
 * footer, FAQ, buttons, cards, icons, charts and motion.
 *
 * There is no second visual architecture. Everything this page renders comes
 * from the same components and the same tokens as `/preview/investment`; the
 * only Tax-Advisory-specific styles are the four structures listed in
 * `components/web/TaxBands.module.css`, each justified there and in
 * `docs/shared-web-layer-convergence.md`.
 *
 * SECTION ORDER — the template's own:
 *   header · hero · trust · context ("Know what Spain will actually cost you",
 *   which the template composes as one band) · calendar · process · report ·
 *   concerns · services (three blocks) · authority · cases · continuity ·
 *   FAQ · final CTA · footer
 *
 * Still a preview: `laboratory: true` forces noindex/nofollow, the route stays
 * under `/preview`, and it is excluded from the sitemap by construction.
 * No JSON-LD is emitted — most FAQ answers are pending and the legal entity is
 * unconfirmed. Juanma's visual review is mandatory before any merge.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/tax-advisory',
  laboratory: true,
});

export default function TaxAdvisoryPage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

      <WebHeader nav={nav} ctaLabel={headerCta.text} />

      <TaxHero />
      <TaxTrustBand />
      <TaxContextBand />
      <TaxCalendarBand />
      <TaxProcessBand />
      <TaxReportBand />
      <TaxConcernsBand />
      <TaxServicesBand />
      <TaxAuthorityBand />
      <TaxCasesBand />
      <TaxJourneyBand />
      <WebFaq content={faq} />
      <TaxFinalCtaBand />
      <WebFooter content={footer} />
    </>
  );
}
