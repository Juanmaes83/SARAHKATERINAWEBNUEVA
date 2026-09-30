import { siteConfig } from '@/lib/seo/config';

/**
 * Sarah review marks are a tool of the review environment only.
 *
 * A mark says that a text, image or claim is still waiting for Sarah's
 * decision, so a build that could be published — production mode or an
 * indexable configuration — must not contain one. Rendering a mark there
 * throws, which fails `next build` instead of shipping unapproved content with
 * its review label quietly removed (docs/approval-marks-audit.md §5).
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
