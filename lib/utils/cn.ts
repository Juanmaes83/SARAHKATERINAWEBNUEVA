/**
 * Minimal class-name joiner. Kept dependency-free on purpose: this phase does
 * not add a library for something the platform already does.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
