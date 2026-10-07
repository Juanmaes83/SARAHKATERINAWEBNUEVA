# Sarah Katerina Studio — architecture and operation

## Scope and base

Implementation branch `feat/sarah-studio-editorial-2026-10-07` continues `bcfccf4` (Home visual base `35d119e`, SEO origin fix `b47c5d1`). It keeps the approved Home, Investment and shared web tokens. The shared Rubik SEO/GEO Core remains pinned to `8a1f808`; Sarah uses its `professional-service` adapter for service classification and path checks. Next.js renders metadata and schema once, without a second Publisher HTML layer.

The Supabase project is `wiswwjxshdknjihjpgcu` in Paris. Its first three migrations came from the handoff. Migration `20261007150000_studio_related.sql` connects the first five adapted working copies. Migration `20261007160000_studio_governance_hold.sql` blocks the La Zenia draft under D-06. Migration `20261007170000_studio_email_invites.sql` permits a pre-allowlisted Supabase Admin email invitation. Migration `20261007180000_studio_complete_adaptations.sql` adds proposals for the other five records only if their working copies still equal source revision 1, and `20261007190000_studio_complete_related.sql` adds related reading. Migration `20261007200000_studio_private_case_copy.sql` removes internal conflict descriptions from the two blocked case proposals while keeping the private notes and original revisions. Migration `20261007210000_studio_primary_sources.sql` adds checked primary references to four priority proposals without changing their facts. All ten editorials and both editable pages remain drafts or blocked; `publications` remains empty. Legacy redirect rows are inactive.

## Editorial workflow for Sarah and the team

1. Juanma confirmed `marketing@sarahkaterina.com` as the first administrator recipient. The address is pre-allowlisted as admin; use Supabase Auth **Send invitation** once the protected Preview is ready. The recipient follows the single-use email link to `/studio/accept-invite`, chooses a password, then signs in at `/studio/login`. No access code belongs in a PR, URL or chat transcript. Confirm that the member row links to the accepted Auth user before retiring QA accounts.
2. After signing in, use **Review Insights** or **Review Case studies** in the Studio sidebar. These links open `/api/studio/preview?collection=insights` or `case-studies`, authenticate the member, enable the private draft cookie and show all ten working copies. Anonymous visitors see only Preview publications. Direct detail URLs require this authenticated review step while the documents remain drafts.
3. Open **Páginas**, **Artículos** or **Casos**. Each editor sees the working copy, a save status, versions and private review notes. Autosave waits briefly after changes. A conflict keeps the unsaved text in the tab and asks the editor to copy it before reloading.
4. Use **Preview working copy** to see the exact revision while signed in. The preview is private to members and stays `noindex`. Leaving a draft session or signing out returns to published preview content only.
5. Add media in **Biblioteca** from a suitable original. The browser uploads into staging; the server checks file bytes, decode, size and dimensions, retains the original and makes responsive variants. Provide rights and descriptive alt. An image of a real case may be used as evidence only when its origin and permission are verified. Approved site images appear as explicitly labelled illustration fallbacks on all ten review details; replace them through the library when an appropriate original and its rights are confirmed.
6. A contributor sends the saved copy to review. A reviewer checks figures, sources, law, links, images and private notes, then approves or requests changes. A publisher makes the approved revision visible **on the Preview deployment only**. Later edits change the working copy and require another review; the visible publication remains stable. Restore copies an older version back into a draft.
7. Admins manage invitations from **Equipo**. Keep at least one confirmed administrator active before retiring the three inherited QA accounts. Export through `/api/studio/export` as an administrator and keep the JSON in an access controlled backup. Restoring a backup requires an admin-only import and a new editorial review before publication.

## Boundaries and security

- Auth uses Supabase sessions in secure cookies; server routes call `getUser()` and RLS checks the active member. Anonymous users may read only preview publications, active redirects and public media metadata. Evidence storage is private.
- Structured Zod content allows eight block types and a small safe inline syntax. It does not render arbitrary HTML. Home and Investment accept only their listed fields; empty fields keep the existing copy and layout.
- Media metadata references bucket paths and rights. The server validates staged uploads before promoting them. The public renderer resolves only the `media` bucket.
- Auth roles are contributor, publisher and admin. The optimistic `lock_version` in database functions stops silent concurrent overwrites. Revisions, audit log and export support recovery.
- Preview publication, editorial approval, human visual approval and production launch are distinct. This branch does not modify DNS, the production domain, main, or indexation.

## Ten-source register

Each original remains in the read-only source snapshot `scripts/studio/import/live-snapshot-2026-10-07.json`. All ten editorials have source revision 1 and adapted revision 2; related-reading revisions are present on all ten. The two blocked cases have a further copy-only revision. No historical amount was silently replaced. These cases are accessible to authenticated reviewers only and cannot be approved until their blocking notes are resolved.

| Live source path | New Preview path | Current state | Editorial point before approval |
| --- | --- | --- | --- |
| `/insights/modelo-210-explained` | `/preview/insights/modelo-210-explained` | Adapted draft | AEAT deadlines, tax residence, deductible costs and example review |
| `/insights/five-documents-before-arras` | `/preview/insights/five-documents-before-arras` | Adapted draft | Arras type, charges, habitability and reference values |
| `/insights/gross-vs-net-yield-costa-blanca` | `/preview/insights/gross-vs-net-yield-costa-blanca` | Adapted draft | Acquisition cost versus table, reserve versus tax expense, ITP date |
| `/insights/short-term-rental-licence-valencian-community` | `/preview/insights/short-term-rental-licence-valencian-community` | Adapted draft | Confirm address-specific municipal, regional, community and national requirements |
| `/insights/plusvalia-2021-constitutional-ruling` | `/preview/insights/plusvalia-2021-constitutional-ruling` | Adapted draft | Review procedural analysis and any file-specific claim deadline |
| `/insights/nie-application-three-routes` | `/preview/insights/nie-application-three-routes` | Adapted draft | Confirm office-specific documents, fees and timings |
| `/case-studies/dutch-investor-orihuela` | `/preview/case-studies/dutch-investor-orihuela` | Adapted draft | Separate observed saving and eight-year projection; exit tax |
| `/case-studies/german-retiree-guardamar` | `/preview/case-studies/german-retiree-guardamar` | Adapted draft | Reconcile historic surcharge sums and annual filing calendar |
| `/case-studies/norwegian-couple-la-zenia` | `/preview/case-studies/norwegian-couple-la-zenia` | Adapted, blocked draft | D-06 naming; separate one-off and recurring amounts; annual average |
| `/case-studies/british-buyer-torrevieja` | `/preview/case-studies/british-buyer-torrevieja` | Adapted, blocked draft | D-06 naming decision; monthly and annual figures conflict |

## Primary-source checks, 7 October 2026

- [AEAT Modelo 210 filing windows](https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/declaracion-irnr-sin-establecimiento-permanente/modelo-plazo-declaracion.html) and [non-resident rental income](https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/rendimientos-inmuebles-arrendados.html).
- Checked 8 October: [BOE Civil Code, article 1454](https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763&bj=art1454) and the [Catastro 2026 reference-value portal](https://www.sedecatastro.gob.es/Accesos/SECAccvr.aspx?EJERCICIO=2026). These sources are attached to the arras proposal; they do not replace the required case-specific legal review.
- [BOE STC 182/2021](https://www.boe.es/buscar/doc.php?id=BOE-A-2021-19511).
- [Generalitat Valenciana holiday-home registry](https://sede.gva.es/es/inicio/procedimientos?id_proc=19207&version=red) and [BOE community-approval resolution](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-1528).
- [DOGV Law 5/2025](https://www.boe.es/ccaa/dogv/2025/10120/r00001-00176.pdf) sets the ordinary Valencian ITP at 9% for taxable events from 1 June 2026, subject to the law's exceptions; the historic 10% example was retained in the source revision and marked for context, not automatically recalculated.
- [Google Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article) permits a genuine `Person` byline. An article has `Article` or `BlogPosting` plus breadcrumbs, with visible author and dates where known. No corporate author is invented. [Google AI Search guidance](https://developers.google.com/search/docs/appearance/ai-features) gives no guaranteed inclusion from a GEO score.

## Operating checks before a visual sign-off

The protected branch alias is `https://sarahkaterina-web-nueva-git-fe-bc2d45-juanma-espinosas-projects.vercel.app`. Supabase Auth Site URL points to its `/studio/accept-invite` route; Redirect URLs include that route, `/studio/login` and `/studio`. Verify configuration again before inviting. The Preview must have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. This branch derives canonical URLs from the stable Vercel project origin; if `NEXT_PUBLIC_SITE_URL` is configured later, keep it on that Preview origin. Verify the final deployment SHA and READY state. Review at 320, 375, 390, 768, 1280, 1440 and 1920 px, then complete authenticated editing, upload, conflict, restore and role checks. Record screenshots from that same final deployment. Any blocked note or inconsistent real figure requires editorial resolution; passing code QA is not approval to publish it.
