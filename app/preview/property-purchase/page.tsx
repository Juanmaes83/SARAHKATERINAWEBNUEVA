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
import { PROTOTYPE_NOTICE, faq, footer, headerCta, nav, seo } from '@/content/en/property-purchase';
import { buildMetadata } from '@/lib/seo/metadata';
import { ServiceJourney } from '@/components/web/ServiceJourney';
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
        nav={nav}
        ctaLabel={headerCta.text}
        brandHref="/preview/property-purchase"
        ctaHref="#services-options"
      />
      <PurchaseHero />
      {/* Phase 2H (Sarah's review): the purchase-tax tool, at the start of the page. */}
      <BuyerToolBand
        toolKey="purchaseTax"
        sourcePage={SERVICE_ROUTES.purchase}
        moment="Before anything else: what Spain charges on the purchase itself, for your own case."
      />
      <PurchaseTrustBand />
      <AudienceBand />
      {/* Phase 2G: the idea, and where it can fail — before the file that holds it. */}
      <GoodIdeaBand />
      <OneFileBand />
      <FileTrackerBand />
      <ProcessBand />
      <BeforeSignBand />
      <WorriesBand />
      <ServicesBand />
      <AuthorityBand />
      <CasesBand />
      <JourneyBand />
      <ServiceJourney page="purchase" />
      <WebFaq content={faq} appearance="light" />
      <FinalCtaBand />
      <WebFooter content={footer} />
    </RevealLineProvider>
  );
}
