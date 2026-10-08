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
  DoorsBand,
  FinalCtaBand,
  JourneyBand,
  ProcessBand,
  ReportBand,
  ScenariosBand,
  TrustBand,
} from '@/components/web/WebBands';
import { SarahReviewMark } from '@/components/review/SarahReviewMark';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import { buildMetadata } from '@/lib/seo/metadata';
import { seo } from '@/content/en/investment';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
import { FAQ_RELATED } from '@/content/en/internal-links';

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
      <div data-accent="restrained" data-palette="aqua">
        <WebHeader
          nav={UNIFIED_WEB_NAV}
          ctaLabel={BUYER_TOOLS_LABEL}
          brandHref={HOME_PREVIEW_ROUTE}
          showLanguageSwitcher={false}
          buyerToolsSourcePage={SERVICE_ROUTES.investment}
        />

        <SarahReviewMark id="SR-036" />
        <WebHero />
        <TrustBand />
        {/* Phase 2H (Sarah's review): Sarah's authority block at the start of the page. */}
        <AuthorityBand />
        <SarahReviewMark id="SR-083" />
        <ApproachBand />
        <SarahReviewMark id="SR-041" />
        <DoorsBand />
        <AssetTypesBand />
        <ProcessBand />
        <ReportBand />
        <ScenariosBand />
        <ToolsBand />
        {/* 2026-10-01: the cases band only held evidence placeholders (client
            permission, verified outcomes); it returns when a case clears C-01. */}
        <JourneyBand />
        {/* Phase 2G: where the operation continues — purchase, tax, the team. */}
        <SarahReviewMark id="SR-049" />
        <ServiceJourney page="investment" />
        <SarahReviewMark id="SR-084" />
        <WebFaq appearance="light" related={FAQ_RELATED.investment} />
        <FinalCtaBand />
        <WebFooter />
      </div>
    </RevealLineProvider>
  );
}
