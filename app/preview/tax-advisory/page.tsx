import type { Metadata } from 'next';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { WebFaq } from '@/components/web/WebFaq';
import { TaxHero } from '@/components/web/TaxHero';
import { ServiceJourney } from '@/components/web/ServiceJourney';
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
import { SarahReviewMark } from '@/components/review/SarahReviewMark';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { BuyerToolBand } from '@/components/web/BuyerToolRibbon';
import { SERVICE_ROUTES, TAX_LEAD_TOOL } from '@/content/en/service-journey';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROTOTYPE_NOTICE, faq, footer, seo } from '@/content/en/tax-advisory';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';

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

      <WebHeader
        nav={UNIFIED_WEB_NAV}
        ctaLabel={BUYER_TOOLS_LABEL}
        brandHref={HOME_PREVIEW_ROUTE}
        showLanguageSwitcher={false}
        buyerToolsSourcePage={SERVICE_ROUTES.tax}
      />

      <TaxHero />
      <SarahReviewMark id="SR-054" />
      {/* Phase 2H (Sarah's review): the purchase-tax tool, at the start of the page. */}
      <BuyerToolBand
        toolKey={TAX_LEAD_TOOL.key}
        sourcePage={SERVICE_ROUTES.tax}
        moment={TAX_LEAD_TOOL.moment.text}
      />
      <TaxContextBand />
      {/* Phase 2E (brief §8): what is reviewed, then when — then the report. */}
      <TaxProcessBand />
      <TaxCalendarBand />
      <SarahReviewMark id="SR-058" />
      <TaxReportBand />
      <SarahReviewMark id="SR-059" />
      <TaxConcernsBand />
      <TaxServicesBand />
      <TaxAuthorityBand />
      <TaxCasesBand />
      <TaxJourneyBand />
      <ServiceJourney page="tax" />
      <WebFaq content={faq} appearance="light" />
      <TaxFinalCtaBand />
      <WebFooter content={footer} />
    </RevealLineProvider>
  );
}
