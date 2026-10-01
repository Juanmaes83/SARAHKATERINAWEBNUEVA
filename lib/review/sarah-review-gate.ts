import { siteConfig } from '@/lib/seo/config';

/**
 * Publication barrier for open Sarah review items.
 *
 * Each open item has an anchor (`SarahReviewMark`) next to the block it covers.
 * Since 2026-10-01 the anchor renders nothing, so the visitor never sees the
 * editorial tracking. A build that could be published — production mode or an
 * indexable configuration — must still not contain an open item: rendering an
 * anchor there throws, which fails `next build` (docs/approval-marks-audit.md
 * §5 and §12).
 */
export interface ReviewGateConfig {
  readonly mode: 'preview' | 'production';
  readonly indexable: boolean;
}

export function sarahReviewMarksAllowed(config: ReviewGateConfig = siteConfig): boolean {
  return config.mode === 'preview' && !config.indexable;
}

export function assertSarahReviewMarksAllowed(
  id: string,
  config: ReviewGateConfig = siteConfig,
): void {
  if (!sarahReviewMarksAllowed(config)) {
    throw new Error(
      `${id} is still waiting for Sarah's review. SARAH REVIEW marks cannot be built into a production or indexable site: resolve the item in content/en/sarah-review.ts first.`,
    );
  }
}
