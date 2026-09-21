import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Grid.module.css';

export type GridColumns = 2 | 3 | 4 | 'split';
export type GridGap = 'tight' | 'default' | 'wide';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  columns?: GridColumns;
  gap?: GridGap;
  as?: ElementType;
}

const columnClass: Record<GridColumns, string> = {
  2: styles.cols2!,
  3: styles.cols3!,
  4: styles.cols4!,
  split: styles.split!,
};

export function Grid({
  columns = 3,
  gap = 'default',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: GridProps) {
  return (
    <Tag
      className={cn(
        styles.grid,
        columnClass[columns],
        gap === 'tight' && styles.gapTight,
        gap === 'wide' && styles.gapWide,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
