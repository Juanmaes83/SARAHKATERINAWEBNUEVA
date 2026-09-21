import type { SVGProps } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Icon.module.css';

/**
 * Icon system.
 *
 * One 24×24 grid, one 1.5 stroke width, round caps and joins, no fills. Colour
 * comes from `currentColor`, so an icon takes the colour of its context and
 * never introduces a value of its own.
 *
 * Decorative icons are `aria-hidden`. An icon that carries meaning on its own
 * takes a `title`, which becomes its accessible name.
 *
 * Replaces the Unicode glyphs used in Phase 2B, which had inconsistent
 * weights, sizes and baselines across platforms.
 */

export type IconName =
  | 'buyer'
  | 'tax'
  | 'analysis'
  | 'property'
  | 'land'
  | 'commercial'
  | 'redevelopment'
  | 'market'
  | 'dueDiligence'
  | 'financialModel'
  | 'taxOverlay'
  | 'report'
  | 'risk'
  | 'exit'
  | 'analyse'
  | 'buy'
  | 'declare'
  | 'own'
  | 'arrow'
  | 'check'
  | 'pin'
  | 'independence'
  | 'clock'
  | 'document'
  | 'play';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  name: IconName;
  /** Accessible name. Omit for decorative icons. */
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PATHS: Record<IconName, React.ReactNode> = {
  // A person: the international buyer.
  buyer: (
    <>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" />
    </>
  ),
  // Official building: the tax administration.
  tax: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 9.5V20M19 9.5V20M9.5 9.5V20M14.5 9.5V20" />
      <path d="M3 20h18" />
    </>
  ),
  // Magnifier over a chart: analysis.
  analysis: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
      <path d="M8 12.5v-2M10.5 12.5V8M13 12.5v-3.5" />
    </>
  ),
  // House with a roofline.
  property: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.8V20h12V9.8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  // Plot boundary with a horizon.
  land: (
    <>
      <path d="M3 16.5 12 12l9 4.5-9 4.5z" />
      <path d="M7 10h10" />
      <path d="M9 6.5h6" />
    </>
  ),
  // Office block.
  commercial: (
    <>
      <path d="M4 20V5.5h9V20" />
      <path d="M13 20V10h7v10" />
      <path d="M7 9h3M7 13h3M7 17h3M16 13.5h1M16 17h1" />
      <path d="M3 20h18" />
    </>
  ),
  // Structure under works.
  redevelopment: (
    <>
      <path d="M5 20V9l7-4 7 4v11" />
      <path d="M3 20h18" />
      <path d="M9 20v-6h6v6" />
      <path d="M12 5V2M12 2h5" />
    </>
  ),
  // Trend line with a marker: market screen.
  market: (
    <>
      <path d="M3 17.5 9 11l4 3.5 8-8.5" />
      <path d="M21 6v5M21 6h-5" />
      <path d="M3 21h18" />
    </>
  ),
  // Document with a checked list.
  dueDiligence: (
    <>
      <path d="M6 3.5h8L19 8v12.5H6z" />
      <path d="M14 3.5V8h5" />
      <path d="m9 13 1.6 1.6L14 11.2" />
    </>
  ),
  // Bars and a curve: the model.
  financialModel: (
    <>
      <path d="M3 21h18" />
      <path d="M6.5 21v-6M11 21V9.5M15.5 21v-9M20 21V6" />
    </>
  ),
  // Layered sheets: the tax overlay.
  taxOverlay: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </>
  ),
  // Report with a seal.
  report: (
    <>
      <path d="M6 3.5h12v17H6z" />
      <path d="M9 8h6M9 11.5h6M9 15h3" />
      <circle cx="16.5" cy="17" r="2.5" />
    </>
  ),
  // Shield with a gauge: risk.
  risk: (
    <>
      <path d="M12 3.2 19 6v5.6c0 4.2-2.9 7.3-7 9.2-4.1-1.9-7-5-7-9.2V6z" />
      <path d="M12 8.5v4" />
      <path d="M12 15.6h.01" />
    </>
  ),
  // Door with an outbound arrow.
  exit: (
    <>
      <path d="M13.5 4.5H6V21h7.5" />
      <path d="M17 12H10" />
      <path d="m14.5 9 3 3-3 3" />
    </>
  ),
  // Journey: analyse.
  analyse: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  // Journey: buy — handshake reduced to two clasped forms.
  buy: (
    <>
      <path d="M3 12.5h3.5l3 3 2-1.5 2 1.5 3-3H20" />
      <path d="M6.5 12.5V8.5h11v4" />
    </>
  ),
  // Journey: declare — stamped form.
  declare: (
    <>
      <path d="M6 3.5h12v17H6z" />
      <path d="M9.5 8.5h5M9.5 12h5" />
      <path d="m9.5 16 1.4 1.4 3.1-3.1" />
    </>
  ),
  // Journey: own — key.
  own: (
    <>
      <circle cx="8" cy="8" r="4.5" />
      <path d="m11.2 11.2 8.3 8.3" />
      <path d="M16.5 16.5 15 18M18.5 18.5 17 20" />
    </>
  ),
  arrow: <path d="M4 12h15m-5.5-5.5L19.5 12 13.5 17.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  // Balanced scales: independence.
  independence: (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M4 8h16" />
      <path d="M4 8 1.8 13h4.4zM20 8l-2.2 5h4.4z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.3l3.2 2" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h8L19 8v12.5H6z" />
      <path d="M14 3.5V8h5" />
      <path d="M9 12h6M9 15.5h4" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.2 8.6 16 12l-5.8 3.4z" />
    </>
  ),
};

export function Icon({ name, title, size = 'md', className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(styles.icon, styles[size], className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
