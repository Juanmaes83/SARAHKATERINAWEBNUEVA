import type { Metadata } from 'next';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHero } from '@/components/web/WebHero';
import { WebFaq } from '@/components/web/WebFaq';
import { ToolsBand } from '@/components/web/ToolsBand';
import { ServiceJourney } from '@/components/web/ServiceJourney';
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
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROTOTYPE_NOTICE, headerCta, nav, seo } from '@/content/en/investment';

/**
 * INVESTMENT — PHASE 2C VISUAL FIDELITY IMPLEMENTATION.
 *
 * Implements the approved Investment template
 * (`website/nueva web/Sarah Katerina Investment.png`) using the scoped
 * ivory / navy / gold palette and the template's own copy, approved as the
 * copy source on 2026-09-21.
 *
 * Still a preview: `laboratory: true` forces noindex/nofollow, the route stays
 * under `/preview`, and it is excluded from the sitemap by construction.
 * Nothing on it is approved for production, and Juanma's visual review against
 * the template is mandatory before any merge.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/investment',
  laboratory: true,
});

export default function InvestmentPage() {
  return (
    // Phase 2E: arrivals start in the reading zone, not at the viewport edge.
    <RevealLineProvider line="reading-zone">
      {/* Phase 2H: gold restraint on this page only (see WebSection.module.css). */}
      <div data-accent="restrained">
        <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

        <WebHeader nav={nav} ctaLabel={headerCta.text} />

        <WebHero />
        <TrustBand />
        {/* Phase 2H (Sarah's review): Sarah's authority block at the start of the page. */}
        <AuthorityBand />
        <ApproachBand />
        <DoorsBand />
        <AssetTypesBand />
        <ProcessBand />
        <ReportBand />
        <ScenariosBand />
        <ToolsBand />
        <CasesBand />
        <JourneyBand />
        {/* Phase 2G: where the operation continues — purchase, tax, the team. */}
        <ServiceJourney page="investment" />
        <WebFaq appearance="light" />
        <FinalCtaBand />
        <WebFooter />
      </div>
    </RevealLineProvider>
  );
}
