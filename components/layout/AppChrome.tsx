import type { ReactNode } from 'react';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

/**
 * Canonical brand-system chrome.
 *
 * Wraps `/` and `/foundation`, which use the canonical Forest/Ivory token
 * layer. `/preview/investment` deliberately does not use this: the website
 * landings use the scoped ivory / navy / gold palette and supply their own
 * header and footer.
 *
 * Keeping the chrome out of the root layout is what makes the two systems able
 * to coexist without one bleeding into the other.
 */
export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
