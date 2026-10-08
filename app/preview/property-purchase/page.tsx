import type { Metadata } from 'next';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { WebFaq } from '@/components/web/WebFaq';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import {
  AudienceBand,
  AuthorityBand,
  BeforeSignBand,
  FileTrackerBand,
  FinalCtaBand,
  GoodIdeaBand,
  JourneyBand,
  OneFileBand,
  ProcessBand,
  PurchaseHero,
  PurchaseTrustBand,
  ServicesBand,
  WorriesBand,
} from '@/components/web/PropertyPurchase';
import { faq, footer, seo } from '@/content/en/property-purchase';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';
import { buildMetadata } from '@/lib/seo/metadata';
import { ServiceJourney } from '@/components/web/ServiceJourney';
import { SarahReviewMark } from '@/components/review/SarahReviewMark';
import { BuyerToolBand } from '@/components/web/BuyerToolRibbon';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
import { FAQ_RELATED } from '@/content/en/internal-links';

export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/property-purchase',
  laboratory: true,
});

export default function PropertyPurchasePage() {
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
          buyerToolsSourcePage={SERVICE_ROUTES.purchase}
        />
        <main id="main" tabIndex={-1}>
        <PurchaseHero />
        <SarahReviewMark id="SR-019" />
        {/* Phase 2H (Sarah's review): the purchase-tax tool, at the start of the page. */}
        <BuyerToolBand
          toolKey="purchaseTax"
          sourcePage={SERVICE_ROUTES.purchase}
          moment="Before anything else: what Spain charges on the purchase itself, for your own case."
        />
        <PurchaseTrustBand />
        <AudienceBand />
        {/* Phase 2G: the idea, and where it can fail — before the file that holds it. */}
        <SarahReviewMark id="SR-022" />
        <GoodIdeaBand />
        <OneFileBand />
        <FileTrackerBand />
        <ProcessBand />
        <BeforeSignBand />
        <SarahReviewMark id="SR-082" />
        <WorriesBand />
        <SarahReviewMark id="SR-027" />
        <ServicesBand />
        <AuthorityBand />
        {/* 2026-10-01: the cases band only held evidence placeholders (client
            permission, verified outcomes); it returns when a case clears C-01. */}
        <JourneyBand />
        <ServiceJourney page="purchase" />
        <SarahReviewMark id="SR-085" />
        <WebFaq content={faq} appearance="light" related={FAQ_RELATED.purchase} />
        <FinalCtaBand />
        </main>
        <WebFooter content={footer} />
      </div>
    </RevealLineProvider>
  );
}
