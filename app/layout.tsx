import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { SiteChrome } from '@/components/navigation/SiteChrome';
import { baseMetadata } from '@/lib/seo/metadata';
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
        {/* Most routes get the application chrome. A landing that owns its
            own header, main and footer opts out — see SiteChrome. */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
