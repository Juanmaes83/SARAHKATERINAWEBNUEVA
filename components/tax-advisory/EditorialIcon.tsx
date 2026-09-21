import { cn } from '@/lib/utils/cn';
import styles from './Primitives.module.css';

/**
 * Editorial line symbols.
 *
 * The reference composition uses thin, single-weight line icons in gold. These
 * are drawn as inline SVG rather than pulled from an icon library: adding a
 * dependency for nine glyphs would be disproportionate, and an inline path
 * inherits `currentColor`, so each icon takes its colour from the surface it
 * sits on instead of carrying one of its own.
 *
 * They are decorative. Every icon is `aria-hidden`; the adjacent text carries
 * the meaning (brand-system/foundations/iconography.md: an icon never
 * substitutes for a label).
 */
export type IconName =
  | 'map'
  | 'home'
  | 'document'
  | 'chart'
  | 'coins'
  | 'cycle'
  | 'calendar'
  | 'globe'
  | 'shield'
  | 'clock'
  | 'person'
  | 'people'
  | 'institution'
  | 'play'
  | 'arrow';

const PATHS: Record<IconName, React.ReactNode> = {
  map: (
    <>
      <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20V12M12 20V6M17 20v-5" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.75" />
      <path d="M5 6.5v4c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75v-4" />
      <path d="M5 10.5v4c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75v-4" />
    </>
  ),
  cycle: (
    <>
      <path d="M20 12a8 8 0 0 1-13.7 5.6" />
      <path d="M4 12a8 8 0 0 1 13.7-5.6" />
      <path d="M17.5 3v3.5H14M6.5 21v-3.5H10" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5s-1.2 6.1-3.4 8.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4-2.9 7.3-7 8.5-4.1-1.2-7-4.5-7-8.5V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M5 20.5c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.25" />
      <path d="M3 20c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
      <path d="M16 6.2a3.25 3.25 0 0 1 0 6.3M17.5 14.9c2.1.7 3.5 2.5 3.5 5.1" />
    </>
  ),
  institution: (
    <>
      <path d="M3.5 9.5 12 4l8.5 5.5" />
      <path d="M5.5 9.5V18M9.5 9.5V18M14.5 9.5V18M18.5 9.5V18" />
      <path d="M3.5 20.5h17" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.2 8.6 15.4 12l-5.2 3.4Z" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15.5" />
      <path d="m14 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),
};

export interface EditorialIconProps {
  name: IconName;
  className?: string;
  /** Filled variants are used only for the `play` and `arrow` affordances. */
  size?: 'sm' | 'md';
}

export function EditorialIcon({ name, className, size = 'md' }: EditorialIconProps) {
  return (
    <svg
      className={cn(styles.icon, size === 'sm' && styles.iconSm, className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
