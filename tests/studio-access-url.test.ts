import { afterEach, describe, expect, it } from 'vitest';
import { studioReturnUrl } from '@/lib/studio/access-url';

const previous = process.env.NEXT_PUBLIC_STUDIO_ORIGIN;
afterEach(() => { if (previous === undefined) delete process.env.NEXT_PUBLIC_STUDIO_ORIGIN; else process.env.NEXT_PUBLIC_STUDIO_ORIGIN = previous; });

describe('Studio recovery redirect', () => {
  it('uses the stable preview alias when configured', () => {
    process.env.NEXT_PUBLIC_STUDIO_ORIGIN = 'https://studio-branch.example/';
    expect(studioReturnUrl('/studio/recover/complete', 'https://ephemeral.example'))
      .toBe('https://studio-branch.example/studio/recover/complete');
  });

  it('does not accept a non-HTTPS or path-bearing configured origin', () => {
    process.env.NEXT_PUBLIC_STUDIO_ORIGIN = 'http://untrusted.example/path';
    expect(studioReturnUrl('/studio/recover/complete', 'http://localhost:3000'))
      .toBe('http://localhost:3000/studio/recover/complete');
  });
});
