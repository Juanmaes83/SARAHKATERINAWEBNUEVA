import type { Metadata } from 'next';
import { SarahReviewMark } from '@/components/review/SarahReviewMark';
import { RevealLineProvider } from '@/components/motion/RevealLineProvider';
import {
  HomeContactBand,
  HomeFinalCtaBand,
  HomeHero,
  HomePresentation,
  HomeProcessBand,
  HomeServices,
  HomeSideStatement,
  HomeStage,
  HomeTeam,
  HomeToolsBand,
  HomeVoices,
} from '@/components/web/HomePreview';
import { WebFooter } from '@/components/web/WebFooter';
import { WebHeader } from '@/components/web/WebHeader';
import { footer, seo } from '@/content/en/home';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';
import { buildMetadata } from '@/lib/seo/metadata';
import { pageOverrides } from '@/lib/studio/content';

export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/home',
  // Keeps noindex/nofollow (metadata + X-Robots-Tag on /preview/*).
  laboratory: true,
});

/*
 * CLIENT-REVIEW HOME (owner instruction 2026-09-29). The visible page carries
 * no internal review wording: no prototype strip, no preview/noindex chip.
 * Exception (audit 2026-09-30, docs/approval-marks-audit.md): the temporary
 * SARAH REVIEW REQUIRED marks, which a production build refuses to render.
 * This does NOT authorise publication: the route stays under /preview, out of
 * the sitemap, noindex/nofollow in metadata and headers, and `/` is untouched.
 * The four landings keep their own preview strips.
 */
export const dynamic = 'force-dynamic';
export default async function HomePreviewPage() {
  const overrides = await pageOverrides('home');
  return (
    <RevealLineProvider line="reading-zone">
      <HomeStage>
        <WebHeader
          nav={UNIFIED_WEB_NAV}
          ctaLabel={BUYER_TOOLS_LABEL}
          brandHref={HOME_PREVIEW_ROUTE}
          showLanguageSwitcher={false}
          buyerToolsSourcePage={HOME_PREVIEW_ROUTE}
        />
        <SarahReviewMark id="SR-086" />
        <SarahReviewMark id="SR-001" />
        <HomeHero overrides={overrides} />
        <SarahReviewMark id="SR-087" />
        <HomePresentation />
        <HomeSideStatement />
        <SarahReviewMark id="SR-003" />
        <HomeServices />
        <SarahReviewMark id="SR-005" />
        <HomeProcessBand />
        <SarahReviewMark id="SR-006" />
        <HomeVoices />
        <HomeTeam />
        <SarahReviewMark id="SR-007" />
        <HomeToolsBand />
        {/* The FAQ band left the Home (REVISION WEB-HOME.pdf point 9). */}
        <SarahReviewMark id="SR-009" />
        <HomeContactBand />
        <HomeFinalCtaBand />
        <SarahReviewMark id="SR-011" />
        <WebFooter content={footer} showLanguageStatus={false} showStatus={false} />
      </HomeStage>
    </RevealLineProvider>
  );
}
