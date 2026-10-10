import type { SiteMode } from '@/lib/seo/config';

/** Owner approved review, not a production release. Fail closed for any other host context. */
export function assistantReviewEnabled(
  vercelEnvironment: string | undefined,
  mode: SiteMode,
): boolean {
  return vercelEnvironment === 'preview' || (vercelEnvironment === undefined && mode === 'preview');
}

export function isAssistantWebsiteRoute(pathname: string | null): boolean {
  return (
    pathname === '/' ||
    /^\/(preview\/(home|investment|property-purchase|tax-advisory|team|contact|insights|case-studies|legal-notice|privacy|cookies)|investment|about|contact|insights|case-studies|services\/(property-purchase|tax-advisory))(\/|$)/.test(
      pathname ?? '',
    )
  );
}
