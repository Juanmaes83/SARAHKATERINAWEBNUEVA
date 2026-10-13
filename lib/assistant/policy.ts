import type { SiteMode } from '@/lib/seo/config';

/**
 * The assistant remains an internal-review feature. A separately configured
 * Vercel review project may expose it on its own production deployment.
 * Never infer review approval from site mode alone on Vercel production.
 */
export function assistantReviewEnabled(
  vercelEnvironment: string | undefined,
  mode: SiteMode,
  reviewProjectEnabled = false,
  vercelProjectId?: string,
): boolean {
  if (
    reviewProjectEnabled &&
    mode === 'preview' &&
    vercelProjectId === 'prj_TNvr9TAOburUCNvtsythYOeuVpaP'
  ) {
    return true;
  }
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
