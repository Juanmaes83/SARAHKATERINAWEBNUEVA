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
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

      <WebHeader nav={nav} ctaLabel={headerCta.text} />

      <TaxHero />
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
