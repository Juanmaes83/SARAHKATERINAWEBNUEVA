# Legal footer — visual proposal, 2026-10-09

Owner authorizes implementation and Preview, explicitly requires human mobile/desktop review before merge. Base main 6de9a13437b4cf9c53ae92d670f210f9c1feaf2e. No merge or production deployment authorized for this change.

Shared footer now has one wrapping legal row: Legal notice, Privacy policy, Cookie policy, Cookie preferences. Existing Legal columns are removed at render time to avoid duplicates and unsupported Terms of use links. Original protected content files and main menu remain unchanged. Contact has no form; privacy draft access is added beside its direct channels without adding a form.

Three /preview pages are explicitly marked draft / PENDING_APPROVAL, noindex, registered as laboratory routes in the canonical manifest, excluded from public paths/sitemap. Identity, NIF, legal address, registration and privacy text are not fabricated. These draft links must not be promoted to public legal policies until competent approval and verified data exist.

Preferences are a visual demonstration using transient React state only. Accept/reject/apply make no network request, write no cookie/storage/database and connect no provider. Choices reset on navigation. This is not a real consent mechanism or the integration of PR53.

Review: desktop 1440px and mobile 390px / 320px, Home and Contact footer. Check one legal row, no menu items, wrapping/touch targets/focus, then open all three destinations and the preferences anchor. Verify prominent draft notices, reject/accept equal visual weight, state feedback, and reset after navigation. No Studio role needed; Vercel access may be required. Do not click existing contact/map/booking channels as part of this QA: they can open external apps/providers. Preview shares hosted production DB; no Studio or form writes.

Legal basis references: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758 ; https://www.aepd.es/guias/guia-cookies.pdf ; https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion . Footer placement is a design decision, not a legally prescribed corner.

Next: human visual approval; verify controller and actual processing/cookie inventory, draft competent-reviewed final legal texts, integrate a separately approved real consent mechanism before optional providers. Chatbot/WhatsApp automation remain outside this PR.

Local verification: lint zero errors (eight inherited Studio img warnings); typecheck passed; full test run 432 passed with 38 render checks deferred; final build passed; HTTP capture 55 routes passed; required rendered follow-up 55 tests passed. Canonical tokens and protected content files unchanged. Browser visual QA is additional and does not substitute Juanma approval.
