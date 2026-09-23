import type { Metadata } from 'next';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
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

export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/property-purchase',
  laboratory: true,
});

export default function PropertyPurchasePage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />
      <WebHeader
        nav={nav}
        ctaLabel={headerCta.text}
        brandHref="/preview/property-purchase"
        ctaHref="#services-options"
      />
      <PurchaseHero />
      <PurchaseTrustBand />
      <AudienceBand />
      <OneFileBand />
      <FileTrackerBand />
      <ProcessBand />
      <BeforeSignBand />
      <WorriesBand />
      <ServicesBand />
      <AuthorityBand />
      <CasesBand />
      <JourneyBand />
      <WebFaq content={faq} appearance="light" />
      <FinalCtaBand />
      <WebFooter content={footer} />
    </>
  );
}
