# Phase 2E — Shared authority media and Property Purchase visual pass

Status: Preview-only implementation, pending human visual review. No production,
main, DNS or public publication is authorised by this document.

## Approved changes

1. Property Purchase final CTA replaces the ceramic/amphora visual with
   sarahkaterina_Contacto.png, served as /media/purchase-final-contact.png.
2. The authority image in Investment, Tax Advisory and Property Purchase is
   unified as IMAGES/sarahkaterina_Services_11.png, served as
   /media/authority-editorial.png.
3. The authority block is enlarged across the three landings:
   the image is the lead editorial element, fills its grid column, loses the
   small floating-card treatment and uses a taller, full-bleed-within-layout
   frame. The text remains readable beside it on desktop and stacks safely on
   mobile.
4. No navigation, copy, Buyer System destination, video, production metadata
   or domain behaviour is changed.

## Media governance

The two newly selected source images are intentionally reused at source size
for this protected Preview because the owner supplied and approved them for
visual selection. Next Image may optimise delivery at request time, but these
files are not production-approved derivatives. Before production release,
create clean optimised derivatives and remove the Preview-source exception from
tests/approved-media.test.ts.

The original files remain untouched. Embedded logo/copy is permitted in this
Preview according to the approved Phase 2E inventory; retouching remains a
later owner-led step.

## Human review checklist

- Compare the authority block at 375, 768, 1024 and 1440 px on all three routes.
- Confirm the common Sarah image reads as a coherent shared section.
- Confirm the image is large enough without cutting the subject awkwardly.
- Confirm the Property Purchase final CTA no longer uses the amphora image.
- Confirm no horizontal overflow, focus regressions or hidden content.


## Owner correction — 2026-09-22

The owner clarified the next media replacement:

1. `IMAGES/sarahkaterina_Services_Especial.png` replaces the shared
   authority image in Investment, Tax Advisory and Property Purchase. It is
   served through the existing `/media/authority-editorial.png` slot so the
   three landings remain structurally identical.
2. `IMAGES/sarahkaterina_Services_14.png` replaces **both** Tax Advisory hero
   visuals: the main Sarah/editorial frame and the lower ceramic/amphora
   companion frame. Both intentionally resolve to `APPROVED_MEDIA.taxHero`
   in this Preview.
3. `Services_11` is no longer the active shared authority source. The
   previous Tax Advisory `territoryCoast` image remains registered for other
   approved slots, but it is no longer used in either of the two Tax Advisory
   hero media positions.
4. The change is Preview-only. No navigation, copy, CTA destination, Buyer
   System connection, production metadata, DNS or production deployment is
   authorised by this correction.
