import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const run = (expression: string) => spawnSync(process.execPath, ['--input-type=module', '-e', `import { localOrigin, assertLocalStudioBuild } from './scripts/qa/studio-isolation.mjs'; ${expression}`], { encoding: 'utf8' });
describe('mutating Studio QA isolation gate', () => {
  it('rejects remote, lookalike, credential and recovery URLs before side effects', () => {
    for (const url of ['https://example.supabase.co', 'https://localhost.example.com', 'https://user@localhost', 'https://localhost/callback', 'https://localhost?token=secret']) {
      expect(run(`localOrigin(${JSON.stringify(url)}, 'test');`).status).not.toBe(0);
    }
  });
  it('accepts strict loopback origins and requires HTTPS for Supabase', () => {
    expect(run(`localOrigin('https://127.0.0.1:54321', 'test', true);`).status).toBe(0);
    expect(run(`localOrigin('http://localhost:54321', 'test', true);`).status).not.toBe(0);
  });
  it('refuses a local app with hosted data configuration', () => {
    expect(run(`assertLocalStudioBuild({ QA_BASE_URL: 'http://localhost:3195', NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co' });`).status).not.toBe(0);
  });
  it('does not accept missing isolation evidence or a mismatched recovery origin', () => {
    expect(run(`assertLocalStudioBuild({ QA_BASE_URL: 'http://localhost:3195', NEXT_PUBLIC_SUPABASE_URL: 'https://localhost:54321', NEXT_PUBLIC_STUDIO_ORIGIN: 'http://localhost:3000' });`).status).not.toBe(0);
  });
  it('rejects stale hosted chunks even when caller environment is local', () => {
    const root = mkdtempSync(join(tmpdir(), 'sk-isolation-'));
    try {
      mkdirSync(join(root, '.next/server'), { recursive: true });
      mkdirSync(join(root, '.next/static'), { recursive: true });
      writeFileSync(join(root, '.next/BUILD_ID'), 'synthetic-qa');
      for (const scope of ['server', 'static']) writeFileSync(join(root, '.next', scope, 'qa.js'), 'https://localhost:54321');
      const env = { QA_BASE_URL: 'http://localhost:3195', NEXT_PUBLIC_SUPABASE_URL: 'https://localhost:54321', NEXT_PUBLIC_STUDIO_ORIGIN: 'http://localhost:3195', NEXT_PUBLIC_SITE_MODE: 'preview', NEXT_PUBLIC_SITE_INDEXABLE: 'false', QA_DB_CONTAINER: 'supabase_db_qa-local' };
      expect(run(`assertLocalStudioBuild(${JSON.stringify(env)}, ${JSON.stringify(root)});`).status).toBe(0);
      writeFileSync(join(root, '.next/static/stale.js'), 'https://example.supabase.co');
      expect(run(`assertLocalStudioBuild(${JSON.stringify(env)}, ${JSON.stringify(root)});`).status).not.toBe(0);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it('stops the mutating runner before browser loading for a hosted destination', () => {
    const r = spawnSync(process.execPath, ['scripts/qa/studio-e2e-local.mjs'], {
      encoding: 'utf8', env: { ...process.env, QA_BASE_URL: 'http://localhost:3195', NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', PLAYWRIGHT_MODULE: 'deliberately-missing-module' },
    });
    expect(r.status).not.toBe(0);
    expect(r.stderr).toContain('NEXT_PUBLIC_SUPABASE_URL: exact loopback origin required');
    expect(r.stderr).not.toContain('Cannot find package');
  });

});
