import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { baseMetadata } from '@/lib/seo/metadata';
import { GuidedAssistant } from '@/components/web/GuidedAssistant';
import { siteConfig } from '@/lib/seo/config';
import { assistantReviewEnabled } from '@/lib/assistant/policy';
import './globals.css';

/**
 * Canonical families (BSD-006): Fraunces for display/editorial, Inter for
 * body and UI. Exactly two families, as the foundation requires.
 *
 * Both are self-hosted by next/font, so there is no third-party font request
 * at runtime. The CSS variables are wired into the canonical token names in
 * app/tokens.css via the html element below.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  variable: '--sk-font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--sk-font-inter',
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never block zoom: pinch-zoom is an accessibility requirement.
  maximumScale: 5,
  themeColor: '#F5F0E7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The document language is English: the primary acquisition language
    // (decisions-log.md 2026-07-27). ES is a second approved language but
    // routed localisation is not implemented in this phase.
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a className="sk-skip-link" href="#main">
          Skip to content
        </a>
        {/* Page chrome lives with each page: the canonical brand pages use
            AppChrome, the website landings supply their own header and footer
            in the scoped palette. */}
        {children}
        <GuidedAssistant
          enabled={assistantReviewEnabled(process.env.VERCEL_ENV, siteConfig.mode)}
        />
      </body>
    </html>
  );
}
