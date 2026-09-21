import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Specimen.module.css';

export interface SpecimenProps {
  title: string;
  /** What this specimen proves, or the governance rule that constrains it. */
  note?: ReactNode;
  /** Stack the stage vertically instead of wrapping inline. */
  column?: boolean;
  /** Render the stage as a plain block (for text and table specimens). */
  block?: boolean;
  /** Render the stage on the Forest surface to check inverted states. */
  dark?: boolean;
  children: ReactNode;
}

/**
 * One labelled component specimen inside the foundation laboratory.
 */
export function Specimen({
  title,
  note,
  column = false,
  block = false,
  dark = false,
  children,
}: SpecimenProps) {
  return (
    <div className={styles.specimen}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
      <div
        className={cn(
          styles.stage,
          column && styles.stageColumn,
          block && styles.stageBlock,
          dark && styles.stageDark,
        )}
        data-surface={dark ? 'dark' : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export interface TokenTableProps {
  columns: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  caption?: string;
}

export function TokenTable({ columns, rows, caption }: TokenTableProps) {
  return (
    <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={caption ?? 'Tokens'}>
      <table className={styles.table}>
        {caption ? <caption className="sk-visually-hidden">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.mono}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Swatch({ token }: { token: string }) {
  return <span className={styles.swatch} style={{ backgroundColor: `var(${token})` }} />;
}

export function SpacingBar({ token }: { token: string }) {
  return <span className={styles.spacingBar} style={{ width: `var(${token})` }} />;
}
