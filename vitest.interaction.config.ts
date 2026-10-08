import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

/**
 * Browser interaction QA (Phase 2B). NOT part of `npm run test` or CI: it
 * needs a running server (QA_BASE_URL) and a Playwright install that this
 * repository does not declare as a dependency (PLAYWRIGHT_MODULE). See
 * tests/interaction/README.md.
 */
export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, '.') } },
  test: {
    environment: 'node',
    include: ['tests/interaction/**/*.interaction.ts'],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
});
