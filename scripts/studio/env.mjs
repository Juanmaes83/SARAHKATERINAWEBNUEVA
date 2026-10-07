// Loads .env.local for the local Studio scripts (never committed, never printed).
import { readFileSync } from 'node:fs';
export function loadEnv(file = '.env.local') {
  const out = {};
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
