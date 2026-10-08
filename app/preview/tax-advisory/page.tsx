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
import { BuyerToolBand } from '@/components/web/BuyerToolRibbon';
import { SERVICE_ROUTES, TAX_LEAD_TOOL } from '@/content/en/service-journey';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { buildMetadata } from '@/lib/seo/metadata';
import { FAQ_RELATED } from '@/content/en/internal-links';
import { faq, footer, seo } from '@/content/en/tax-advisory';
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
      {/* 2026-09-30: aquamarine accent on navy surfaces (app/web-tokens.css). */}
      <div data-palette="aqua">
        <WebHeader
          nav={UNIFIED_WEB_NAV}
          ctaLabel={BUYER_TOOLS_LABEL}
          brandHref={HOME_PREVIEW_ROUTE}
          showLanguageSwitcher={false}
          buyerToolsSourcePage={SERVICE_ROUTES.tax}
        />
        <main id="main" tabIndex={-1}>

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
        <WebFaq content={faq} appearance="light" related={FAQ_RELATED.tax} />
        <TaxFinalCtaBand />
        </main>
        <WebFooter content={footer} />
      </div>
    </RevealLineProvider>
  );
}
