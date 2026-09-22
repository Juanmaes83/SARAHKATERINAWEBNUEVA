/**
 * Static image import declarations.
 *
 * WHY THIS FILE EXISTS
 *
 * `next/image` supports importing an image file directly
 * (`import logo from '@/public/brand/sarah-katerina-logo.png'`), which is how
 * the website header, footer, hero and authority band load their assets. That
 * import only typechecks if the `*.png` / `*.jpg` module declarations from
 * `next/image-types/global` are in scope.
 *
 * Next.js normally supplies them through the generated `next-env.d.ts`. That
 * file is gitignored (Next generates it and tells you not to commit it), and
 * it is only written when `next dev` or `next build` runs.
 *
 * CI runs `lint`, then `typecheck`, then `test`, then `build` — so on a clean
 * checkout `typecheck` executes BEFORE anything has generated `next-env.d.ts`.
 * Every static image import then fails with TS2307, and the run goes red.
 * That is exactly what happened to `main` after the Investment landing started
 * importing images: the assets are committed and correct, the type
 * declarations simply were not there yet.
 *
 * Referencing the types here — in a committed file — makes typecheck
 * independent of build order. Re-declaring the same reference that
 * `next-env.d.ts` also carries is harmless.
 *
 * Reproduce the original failure with:
 *   mv next-env.d.ts /tmp && npm run typecheck
 */

/// <reference types="next/image-types/global" />
