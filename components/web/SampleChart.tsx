import { cn } from '@/lib/utils/cn';
import styles from './SampleChart.module.css';

/**
 * Illustrative chart shapes.
 *
 * GOVERNANCE — read before touching this file.
 *
 * Every series below is a fixed, hand-written sample. None of it is a client
 * result, a projection, a benchmark, a market figure or a claim of any kind.
 * The Phase 2B brief permits sample data on the dashboard surfaces *provided
 * it is explicitly labelled*, and every surface that renders one of these
 * charts carries an "ILLUSTRATIVE — SAMPLE DATA" marker.
 *
 * Do not replace these with real figures without a claims dossier
 * (source, date, permission, scope) and competent financial review.
 *
 * Each chart is `role="img"` with an accessible name that says it is sample
 * data, so a screen-reader user is told the same thing a sighted user is.
 */

const LABEL = 'Illustrative sample data, not a real result';

export interface ChartProps {
  className?: string;
  onDark?: boolean;
  /** Extra context appended to the accessible name. */
  label?: string;
}

/** Small ascending bar sparkline. */
export function SampleBars({ className, onDark = false, label }: ChartProps) {
  const values = [18, 26, 22, 34, 40, 52, 61, 72];
  const max = Math.max(...values);
  const barWidth = 100 / (values.length * 1.6);
  const gap = barWidth * 0.6;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      {values.map((value, index) => {
        const height = (value / max) * 36;
        return (
          <rect
            key={index}
            x={index * (barWidth + gap)}
            y={40 - height}
            width={barWidth}
            height={height}
            className={cn(onDark ? styles.barOnDark : styles.bar, styles.grow)}
            style={{ animationDelay: `${index * 40}ms` }}
          />
        );
      })}
    </svg>
  );
}

/** Small rising line sparkline. */
export function SampleLine({ className, onDark = false, label }: ChartProps) {
  const points = [
    [0, 32],
    [14, 28],
    [28, 30],
    [42, 22],
    [56, 24],
    [70, 14],
    [85, 12],
    [100, 6],
  ] as const;
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      <path
        d={d}
        className={cn(styles.line, onDark ? styles.lineOnDark : styles.lineGold, styles.animated)}
      />
    </svg>
  );
}

/** Stacked annual bars, as in the template's cash-flow card. */
export function SampleColumnChart({ className, label }: ChartProps) {
  const base = [14, 18, 20, 24, 27, 31, 35, 40];
  const top = [6, 8, 9, 11, 13, 15, 18, 21];
  const max = Math.max(...base.map((v, i) => v + (top[i] ?? 0)));

  return (
    <svg
      viewBox="0 0 120 60"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      <line x1="0" y1="54" x2="120" y2="54" className={styles.axis} />
      {base.map((value, index) => {
        const width = 9;
        const gap = 5;
        const x = index * (width + gap) + 2;
        const baseH = (value / max) * 46;
        const topH = ((top[index] ?? 0) / max) * 46;
        return (
          <g key={index} className={styles.grow} style={{ animationDelay: `${index * 50}ms` }}>
            <rect x={x} y={54 - baseH} width={width} height={baseH} className={styles.bar} />
            <rect
              x={x}
              y={54 - baseH - topH}
              width={width}
              height={topH}
              className={styles.barMuted}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** Bell curve, as in the template's distribution card. */
export function SampleDistribution({ className, label }: ChartProps) {
  const points: string[] = [];
  for (let i = 0; i <= 60; i += 1) {
    const x = (i / 60) * 120;
    const t = (i - 30) / 11;
    const y = 50 - Math.exp(-0.5 * t * t) * 40;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const line = points.join(' ');

  return (
    <svg
      viewBox="0 0 120 60"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      <path d={`${line} L120 50 L0 50 Z`} className={styles.area} />
      <path d={line} className={cn(styles.line, styles.lineGold)} />
      <line x1="0" y1="50" x2="120" y2="50" className={styles.axis} />
      {[24, 60, 96].map((x) => (
        <line key={x} x1={x} y1="12" x2={x} y2="50" className={styles.axis} />
      ))}
    </svg>
  );
}

/** Seasonality bars, as in the template's monthly card. */
export function SampleSeasonality({ className, label }: ChartProps) {
  const values = [8, 10, 14, 20, 28, 38, 46, 44, 30, 20, 12, 9];
  const max = Math.max(...values);
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  return (
    <svg
      viewBox="0 0 120 60"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      {values.map((value, index) => {
        const width = 7;
        const gap = 3;
        const x = index * (width + gap) + 2;
        const height = (value / max) * 42;
        return (
          <rect
            key={index}
            x={x}
            y={48 - height}
            width={width}
            height={height}
            className={cn(styles.bar, styles.grow)}
            style={{ animationDelay: `${index * 30}ms` }}
          />
        );
      })}
      <line x1="0" y1="48" x2="120" y2="48" className={styles.axis} />
      {months.map((month, index) => (
        <text key={index} x={index * 10 + 4} y="58" fontSize={9} className={styles.tick}>
          {month}
        </text>
      ))}
    </svg>
  );
}

/** Three diverging scenario lines, as in the template's scenario chart. */
export function SampleScenarios({ className, label }: ChartProps) {
  const series = [
    { cls: styles.lineGold, points: [46, 41, 36, 31, 26, 21, 16, 11, 7, 4] },
    { cls: styles.lineInk, points: [46, 43, 40, 37, 34, 31, 29, 26, 24, 22] },
    { cls: styles.lineMuted, points: [46, 44, 43, 41, 40, 38, 37, 36, 35, 34] },
  ];

  return (
    <svg
      viewBox="0 0 120 56"
      className={cn(styles.chart, className)}
      role="img"
      aria-label={`${label ? `${label}. ` : ''}${LABEL}`}
    >
      <line x1="0" y1="50" x2="120" y2="50" className={styles.axis} />
      {series.map((serie, index) => {
        const d = serie.points
          .map((y, i) => `${i === 0 ? 'M' : 'L'}${(i / (serie.points.length - 1)) * 118} ${y}`)
          .join(' ');
        return (
          <path
            key={index}
            d={d}
            className={cn(styles.line, serie.cls, styles.animated)}
            style={{ animationDelay: `${index * 120}ms` }}
          />
        );
      })}
    </svg>
  );
}
