import type { Metadata } from 'next';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHero } from '@/components/web/WebHero';
import { WebFaq } from '@/components/web/WebFaq';
import {
  ApproachBand,
  AssetTypesBand,
  AuthorityBand,
  CasesBand,
  DoorsBand,
  FinalCtaBand,
  JourneyBand,
  ProcessBand,
  ReportBand,
  ScenariosBand,
  TrustBand,
} from '@/components/web/WebBands';
import { WebSection, WebSectionHeader } from '@/components/web/WebSection';
import { BuyerSystemBridge } from '@/components/sections/BuyerSystemBridge';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  PROTOTYPE_NOTICE,
  buyerSystem,
  headerCta,
  hero,
  nav,
  seo,
} from '@/content/en/investment';

/**
 * INVESTMENT — PHASE 2B VISUAL IMPLEMENTATION.
 *
 * Visual implementation of the approved Investment template
 * (`website/nueva web/Sarah Katerina Investment.png`), using the scoped
 * ivory / navy / gold palette approved on 2026-09-21.
 *
 * It remains a preview: `laboratory: true` forces noindex/nofollow, the route
 * stays under `/preview`, and it is excluded from the sitemap by construction.
 * Nothing on it is approved for production, and Juanma's human visual review
 * is mandatory before any merge.
 *
 * This page supplies its own header and footer because the website chrome uses
 * the scoped palette, while `/` and `/foundation` keep the canonical
 * brand-system chrome.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/investment',
  laboratory: true,
});

const SOURCE_PAGE = '/preview/investment';

export default function InvestmentPage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

      <WebHeader nav={nav} ctaLabel={headerCta.text} />

      <WebHero
        eyebrow={hero.eyebrow.text}
        heading={hero.heading.text}
        lead={hero.lead.text}
        primaryCta={hero.primaryCta.text}
        secondaryCta={hero.secondaryCta.text}
        credentials={hero.credentials.map((credential) => ({
          value: credential.value.text,
          note: credential.note.text,
        }))}
        locationLabel={hero.locationLabel.text}
        imageAlt={hero.imageAlt.text}
        caption={hero.caption.text}
      />

      <TrustBand />
      <ApproachBand />
      <DoorsBand />
      <AssetTypesBand />
      <ProcessBand />
      <ReportBand />
      <ScenariosBand />

      {/* Buyer System entry points — links only, no calculator rebuilt here. */}
      <WebSection surface="soft" id="tools">
        <WebSectionHeader
          eyebrow={buyerSystem.eyebrow.text}
          title={buyerSystem.title.text}
          subtitle={buyerSystem.subtitle.text}
          centered
          rule
        />
        <BuyerSystemBridge
          experiences={['askingPrice', 'realCashNeeded']}
          sourcePage={SOURCE_PAGE}
        />
      </WebSection>

      <AuthorityBand />
      <CasesBand />
      <JourneyBand />
      <WebFaq />
      <FinalCtaBand />
      <WebFooter />
    </>
  );
}
