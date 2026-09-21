'use client';

import { WebSection, WebSectionHeader } from './WebSection';
import { Icon, type IconName } from './icons/Icon';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { track } from '@/lib/analytics/track';
import { resolveEntryPoint, type BuyerSystemExperienceKey } from '@/lib/buyer-system/links';
import { buyerSystem } from '@/content/en/investment';
import styles from './WebBands.module.css';

const TOOLS: ReadonlyArray<{
  key: BuyerSystemExperienceKey;
  icon: IconName;
  label: string;
  benefit: string;
}> = [
  {
    key: 'purchaseTax',
    icon: 'taxOverlay',
    label: 'Purchase tax',
    benefit: 'What Spain charges you to buy, before you commit to anything.',
  },
  {
    key: 'realCashNeeded',
    icon: 'financialModel',
    label: 'Real cash needed',
    benefit: 'What actually has to leave your account, not the headline price.',
  },
  {
    key: 'askingPrice',
    icon: 'market',
    label: 'Asking price context',
    benefit: 'Official territorial context and your own comparables, side by side.',
  },
];

/**
 * Free tools band.
 *
 * Phase 2B rendered this as a governance notice with more warnings than value,
 * which broke the template's rhythm. The governance has not changed — the
 * Buyer System is a separate product, its production URL is unconfirmed and
 * `asking-price` is not approved for public linking — but it now lives in
 * secondary microcopy under each card instead of dominating the section.
 *
 * Still true, and still enforced by `resolveEntryPoint`:
 *   - no calculator, formula or tax figure is reproduced here;
 *   - no URL is invented; an unset base URL renders a controlled state, never
 *     a broken link;
 *   - no form, no capture, no CRM.
 */
export function ToolsBand() {
  return (
    <WebSection surface="white" id="tools">
      <WebSectionHeader
        eyebrow={buyerSystem.eyebrow.text}
        title={buyerSystem.title.text}
        subtitle={buyerSystem.subtitle.text}
        centered
        rule
      />

      <div className={styles.toolGrid}>
        {TOOLS.map((tool, index) => {
          const { experience, href, pending } = resolveEntryPoint(tool.key);

          const body = (
            <>
              <span className={styles.toolIcon}>
                <Icon name={tool.icon} />
              </span>
              <h3 className={styles.cardTitle}>{tool.label}</h3>
              <p className={styles.cardText}>{tool.benefit}</p>
              <span className={styles.toolStatus}>
                <span className={styles.toolStatusDot} aria-hidden="true" />
                {pending ? 'Coming soon' : 'Open the tool'}
              </span>
            </>
          );

          if (pending || href === null) {
            return (
              <RevealOnScroll key={tool.key} order={index} className={styles.tool}>
                {body}
              </RevealOnScroll>
            );
          }

          return (
            <RevealOnScroll key={tool.key} order={index} as="div">
              <a
                href={href}
                className={styles.tool}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('calculator_start', {
                    calculator: experience.id,
                    source_page: '/preview/investment',
                  })
                }
              >
                {body}
                <span className="sk-visually-hidden">(opens in a new tab)</span>
              </a>
            </RevealOnScroll>
          );
        })}
      </div>

      <p
        className={styles.cardText}
        style={{ marginBlockStart: 'var(--sk-space-24)', textAlign: 'center' }}
      >
        The result is shown without a form, an email or any commitment. The tools are a separate
        product and are not connected in this preview.
      </p>
    </WebSection>
  );
}
