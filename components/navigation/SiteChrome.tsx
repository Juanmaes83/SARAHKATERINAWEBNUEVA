'use client';

import { usePathname } from 'next/navigation';
import { isSelfChromed } from '@/lib/seo/config';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Renders the shared application chrome, except on routes that own theirs.
 * The route list lives in lib/seo/config.ts so it can be tested without
 * pulling a client component into the test environment.
 */

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isSelfChromed(pathname ?? '')) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
