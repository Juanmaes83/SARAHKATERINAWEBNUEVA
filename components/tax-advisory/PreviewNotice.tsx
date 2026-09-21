import { PREVIEW_NOTICE } from '@/content/en/tax-advisory';
import styles from './PreviewNotice.module.css';

/**
 * The first thing in the document.
 *
 * It is not decoration and it is not dismissible. Every reviewer who opens
 * this preview — or who is forwarded the link — must see, before any copy,
 * that the page is provisional and that its figures are placeholders.
 * AGENTS.md §2: a plausible placeholder a reviewer could mistake for real data
 * must not ship.
 */
export function PreviewNotice() {
  return (
    <aside className={styles.banner} aria-label="Preview status">
      <div className={styles.inner}>
        <p className={styles.label}>{PREVIEW_NOTICE.label}</p>
        <p className={styles.body}>{PREVIEW_NOTICE.body.text}</p>
      </div>
    </aside>
  );
}
