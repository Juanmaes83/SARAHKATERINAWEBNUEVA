import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Band } from '@/components/tax-advisory/Primitives';
import { PreviewNotice } from '@/components/tax-advisory/PreviewNotice';
import { TaxHeader } from '@/components/tax-advisory/TaxHeader';
import { TaxFooter } from '@/components/tax-advisory/TaxFooter';
import { Hero } from '@/components/tax-advisory/sections/Hero';
import { TrustStrip } from '@/components/tax-advisory/sections/TrustStrip';
import { Problem } from '@/components/tax-advisory/sections/Problem';
import { Audience } from '@/components/tax-advisory/sections/Audience';
import { TaxCalendar } from '@/components/tax-advisory/sections/TaxCalendar';
import { Process } from '@/components/tax-advisory/sections/Process';
import { ReportPreview } from '@/components/tax-advisory/sections/ReportPreview';
import { Concerns } from '@/components/tax-advisory/sections/Concerns';
import { Services } from '@/components/tax-advisory/sections/Services';
import { Authority } from '@/components/tax-advisory/sections/Authority';
import { Cases } from '@/components/tax-advisory/sections/Cases';
import { Continuity } from '@/components/tax-advisory/sections/Continuity';
import { Faq } from '@/components/tax-advisory/sections/Faq';
import { FinalCta } from '@/components/tax-advisory/sections/FinalCta';
import { buildMetadata } from '@/lib/seo/metadata';
import { seo, trustStrip } from '@/content/en/tax-advisory';

/**
 * TAX ADVISORY — VISUAL IMPLEMENTATION PREVIEW. NOT PRODUCTION.
 *
 * Lives under /preview/ deliberately. `laboratory: true` forces
 * noindex/nofollow and keeps the route out of the sitemap regardless of the
 * site-wide indexing flag; next.config.ts adds an X-Robots-Tag on the whole
 * /preview namespace, and robots.ts disallows everything while the site is
 * not indexable. Three independent layers, none of which depends on the
 * others being right.
 *
 * SECTION ORDER follows the reference composition exactly, with the problem
 * and audience blocks separated (the reference folds them together) as the
 * phase brief requires:
 *
 *   header · hero · trust · problem · audience · calendar · process ·
 *   report preview · concerns · services · authority · cases · continuity ·
 *   FAQ · final CTA · footer
 *
 * NO JSON-LD IS EMITTED. FAQPage schema is prepared in content but withheld:
 * schema may only describe visible, verified content and most answers are
 * pending. Organization/Person/LocalBusiness are prohibited outright while the
 * legal entity and contact details are unconfirmed (AGENTS.md §7.4).
 *
 * The page owns its own header and footer rather than inheriting the
 * application chrome — see components/navigation/SiteChrome.tsx.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/tax-advisory',
  laboratory: true,
});

export default function TaxAdvisoryPreviewPage() {
  return (
    <>
      <PreviewNotice />
      <TaxHeader />

      <main id="main">
        {/* 2. HERO ---------------------------------------------------- */}
        <Hero />

        {/* 3. TRUST STRIP --------------------------------------------- */}
        <Band tone="ivoryDeep" space="tight" rule>
          <Container>
            <TrustStrip />
            <p className="sk-visually-hidden">{trustStrip.note.text}</p>
          </Container>
        </Band>

        {/* 4. PROBLEM / CONTEXT --------------------------------------- */}
        <Band tone="ivory" space="regular">
          <Container>
            <Problem />
          </Container>
        </Band>

        {/* 5. AUDIENCE ------------------------------------------------ */}
        <Band tone="ivoryDeep" space="regular" rule>
          <Container>
            <Audience />
          </Container>
        </Band>

        {/* 6. ANNUAL TAX CALENDAR ------------------------------------- */}
        <Band tone="ivory" space="regular">
          <Container>
            <TaxCalendar />
          </Container>
        </Band>

        {/* 7. PROCESS ------------------------------------------------- */}
        <Band tone="ivoryDeep" space="regular" rule>
          <Container>
            <Process />
          </Container>
        </Band>

        {/* 8. REPORT PREVIEW — first navy band ------------------------ */}
        <Band tone="navySoft" space="open">
          <Container>
            <ReportPreview />
          </Container>
        </Band>

        {/* 9. CONCERNS ------------------------------------------------ */}
        <Band tone="ivory" space="regular">
          <Container>
            <Concerns />
          </Container>
        </Band>

        {/* 10. SERVICES ----------------------------------------------- */}
        <Band tone="ivoryDeep" space="regular" rule>
          <Container>
            <Services />
          </Container>
        </Band>

        {/* 11. AUTHORITY — second navy band --------------------------- */}
        <Band tone="navy" space="open">
          <Container>
            <Authority />
          </Container>
        </Band>

        {/* 12. CASES -------------------------------------------------- */}
        <Band tone="ivory" space="regular">
          <Container>
            <Cases />
          </Container>
        </Band>

        {/* 13. CONTINUITY --------------------------------------------- */}
        <Band tone="ivoryDeep" space="regular" rule>
          <Container>
            <Continuity />
          </Container>
        </Band>

        {/* 14. FAQ ---------------------------------------------------- */}
        <Band tone="ivory" space="regular">
          <Container>
            <Faq />
          </Container>
        </Band>

        {/* 15. FINAL CTA — third navy band ----------------------------
            `regular`, not `open`: this band meets the navy footer directly,
            so two open paddings in a row would read as a void rather than as
            air. */}
        <Band tone="navy" space="regular">
          <Container>
            <FinalCta />
          </Container>
        </Band>
      </main>

      {/* 16. FOOTER --------------------------------------------------- */}
      <TaxFooter />
    </>
  );
}
