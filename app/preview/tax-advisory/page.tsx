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
} from '@/components/web/TaxBands';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROTOTYPE_NOTICE, faq, footer, headerCta, nav, seo } from '@/content/en/tax-advisory';

export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/tax-advisory',
  laboratory: true,
});

export default function TaxAdvisoryPage() {
  return (
    // Phase 2E: arrivals start in the reading zone, not at the viewport edge.
    <RevealLineProvider line="reading-zone">
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

      <WebHeader nav={nav} ctaLabel={headerCta.text} />

      <TaxHero />
      <TaxContextBand />
      {/* Phase 2E (brief §8): what is reviewed, then when — then the report. */}
      <TaxProcessBand />
      <TaxCalendarBand />
      <TaxReportBand />
      <TaxConcernsBand />
      <TaxServicesBand />
      <TaxAuthorityBand />
      <TaxCasesBand />
      <TaxJourneyBand />
      <WebFaq content={faq} appearance="light" />
      <TaxFinalCtaBand />
      <WebFooter content={footer} />
    </RevealLineProvider>
  );
}
