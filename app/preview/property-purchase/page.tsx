import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { WebFaq } from '@/components/web/WebFaq';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import {
  AudienceBand,
  AuthorityBand,
  BeforeSignBand,
  CasesBand,
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
import { PROTOTYPE_NOTICE, faq, footer, seo } from '@/content/en/property-purchase';
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
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader
        nav={UNIFIED_WEB_NAV}
        ctaLabel={BUYER_TOOLS_LABEL}
        brandHref={HOME_PREVIEW_ROUTE}
        showLanguageSwitcher={false}
        buyerToolsSourcePage={SERVICE_ROUTES.purchase}
      />
      <SarahReviewMark id="SR-018" />
      <PurchaseHero />
      <SarahReviewMark id="SR-019" />
      {/* Phase 2H (Sarah's review): the purchase-tax tool, at the start of the page. */}
      <BuyerToolBand
        toolKey="purchaseTax"
        sourcePage={SERVICE_ROUTES.purchase}
        moment="Before anything else: what Spain charges on the purchase itself, for your own case."
      />
      <SarahReviewMark id="SR-020" />
      <PurchaseTrustBand />
      <SarahReviewMark id="SR-021" />
      <AudienceBand />
      {/* Phase 2G: the idea, and where it can fail — before the file that holds it. */}
      <SarahReviewMark id="SR-022" />
      <GoodIdeaBand />
      <SarahReviewMark id="SR-023" />
      <OneFileBand />
      <SarahReviewMark id="SR-024" />
      <FileTrackerBand />
      <ProcessBand />
      <SarahReviewMark id="SR-025" />
      <BeforeSignBand />
      <SarahReviewMark id="SR-026" />
      <WorriesBand />
      <SarahReviewMark id="SR-027" />
      <ServicesBand />
      <SarahReviewMark id="SR-028" />
      <AuthorityBand />
      <SarahReviewMark id="SR-030" />
      <CasesBand />
      <SarahReviewMark id="SR-031" />
      <JourneyBand />
      <SarahReviewMark id="SR-032" />
      <ServiceJourney page="purchase" />
      <SarahReviewMark id="SR-033" />
      <WebFaq content={faq} appearance="light" />
      <SarahReviewMark id="SR-034" />
      <FinalCtaBand />
      <SarahReviewMark id="SR-035" />
      <WebFooter content={footer} />
    </RevealLineProvider>
  );
}
