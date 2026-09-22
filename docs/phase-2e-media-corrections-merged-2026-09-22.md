# Phase 2E — Media and crop merge record

**Date:** 2026-09-22  
**Repository:** `Juanmaes83/SARAHKATERINAWEBNUEVA`  
**Status:** MERGED TO `main` · PREVIEW-ONLY · NOT PRODUCTION

## What was merged

The approved media and visual-crop corrections are now integrated into the three coordinated landing bases:

- **Investment** keeps the approved shared authority image treatment.
- **Tax Advisory** uses one `sarahkaterina_Services_14` hero image instead of the duplicated stack.
- **Property Purchase** uses the approved `sarahkaterina_Services_Especial` authority media in the wider editorial composition.
- The shared authority image treatment is applied consistently across all three routes.
- The Tax Advisory hero now respects the source asset's native approximately 3:2 ratio so Sarah and the tax-agency panel remain visible.
- The Property Purchase authority image uses the wider composition and centred focal point approved against the Tax Advisory reference.

## Merge record

| Change | PR | Merge commit |
|---|---:|---|
| Approved media across the three landings | #16 | `b24ca2b31af85ff89ccff5cbee15ca67e675d322` |
| Tax hero duplicate removal and Property authority framing | #17 | `bf040eb1545fb00c2c158be81363373473145737` |

## Verification

The final pre-merge Preview was checked with Chromium/Playwright:

- Tax Advisory hero: one `Services_14` render.
- Tax Advisory hero frame: `3:2`, matching the source asset rather than the shared desktop `3:4` rule.
- Sarah is visible inside the composition and the tax-agency panel is preserved.
- Property Purchase authority: wide editorial image composition with centred focal point.
- No horizontal overflow observed at the verified desktop viewport.
- All three routes remain under `/preview`, noindex/nofollow, with no production or domain changes.

## Explicit boundary

This merge closes only the approved media and crop pass. It does not close Phase 2E entirely.

Still pending:

- premium transitions and effects;
- navigation motion and scrollspy work;
- final video assets;
- further responsive visual QA;
- human approval of each new visual/motion iteration;
- production, legal, CTA and Buyer System gates.

The next implementation block is **motion, transitions and effects**. It must remain preview-only and preserve `prefers-reduced-motion`, keyboard focus, no scroll-jacking and no fabricated claims or data.
