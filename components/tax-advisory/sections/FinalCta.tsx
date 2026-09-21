import { ScriptNote, SectionHead, StatusMark } from '../Primitives';
import { TaxCta, TaxCtaNote } from '../TaxCta';
import { finalCta } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * FINAL CTA — navy band.
 *
 * The template promises a reply within one working day. No response-time
 * commitment is confirmed, and publishing one would be a service promise, so
 * the reassurance renders as a marked slot beside the one that is safe.
 *
 * Neither button navigates: no contact channel is confirmed anywhere
 * (README.md §12). The page-wide explanation is rendered once here and
 * referenced by every inert CTA on the page through aria-describedby.
 */
export function FinalCta() {
  return (
    <div className={styles.finalCta}>
      <div className={styles.finalCtaCopy}>
        <SectionHead
          eyebrow={finalCta.eyebrow.text}
          heading={finalCta.heading.text}
          standfirst={finalCta.body.text}
          onDark
          review="tax"
        />
      </div>

      <div className={styles.finalCtaActions}>
        <ul className={styles.finalCtaReassurances}>
          {finalCta.reassurances.map((item) =>
            item.status === 'pending' ? (
              <li key={item.text}>
                <StatusMark claim={item} onDark />
              </li>
            ) : (
              <li key={item.text} className={styles.finalCtaReassurance}>
                {item.text}
              </li>
            ),
          )}
        </ul>

        <div className={styles.finalCtaButtons}>
          <TaxCta variant="primary" onDark section="final_cta" target="map_tax_exposure">
            {finalCta.primaryCta.text}
          </TaxCta>
          <TaxCta variant="secondary" onDark section="final_cta" target="talk_first" noArrow>
            {finalCta.secondaryCta.text}
          </TaxCta>
        </div>

        <TaxCtaNote onDark>{finalCta.contactNote.text}</TaxCtaNote>
      </div>

      <ScriptNote onDark className={styles.finalCtaScript}>
        {finalCta.marginNote.text}
      </ScriptNote>
    </div>
  );
}
