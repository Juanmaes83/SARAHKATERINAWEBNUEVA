import { Container } from '@/components/layout/Container';
import styles from './PrototypeBanner.module.css';

export interface PrototypeBannerProps {
  label: string;
  body: string;
}

/**
 * Persistent prototype status.
 *
 * Deliberately not dismissible and deliberately sticky. A reviewer who lands
 * mid-page, or who shares a screenshot of one section, must still see that
 * this is not an approved landing.
 */
export function PrototypeBanner({ label, body }: PrototypeBannerProps) {
  return (
    <aside className={styles.banner} data-surface="dark" aria-label="Page status">
      <Container className={styles.inner}>
        <span className={styles.label}>{label}</span>
        <p className={styles.body}>{body}</p>
      </Container>
    </aside>
  );
}
