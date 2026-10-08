# Sarah Katerina Studio — handoff (WIP, 2026-10-07)

## Continuation update, 2026-10-07

The sections below preserve the original handoff as historical evidence. Current operation and the ten-source register are in [studio-operation-2026-10-07.md](studio-operation-2026-10-07.md). The import has now run: ten editorials and two editable page records exist in Supabase, with ten adapted editorial revisions, 65 internal notes, two blocked cases and **zero publications**. Migrations through `20261008063431` are applied. The Home visual branch, SEO origin correction and pinned Core remain in the Studio branch. The original five hero candidates still need a genuine upload through the Studio library; site-approved assets currently serve as labelled illustrative fallbacks. The one-use administrator invitation to `marketing@sarahkaterina.com` was sent on 8 October; account acceptance, password setup and live role workflow remain to verify. Do not use the historical personal address or code flow in the section below.

Work in progress on branch `feat/sarah-studio-editorial-2026-10-07`. Not reviewed, not for merge.
Base: `origin/feat/home-desktop-balance-and-images-2026-10-07` (35d119e) + merge of `origin/fix/seo-stable-site-origin` (b47c5d1).

## Done
- **Supabase project** `sarah-katerina-studio` (ref `wiswwjxshdknjihjpgcu`, eu-west-3). Migrations applied (also in `supabase/migrations/`):
  - `20261007120000_studio_core.sql` — studio_members allowlist + invite-code gate on auth.users, roles contributor/publisher/admin,
    documents (working copy + lock_version), revisions, publications (only public table), review_notes, media, redirects, audit_log,
    RLS on everything, SECURITY DEFINER workflow: `save_document` (optimistic lock, 40001 on conflict), `transition_document`
    (submit/request_changes/approve/publish/unpublish/block/unblock, role-checked), `restore_revision`, `invite_member`.
    Storage buckets `media` (public) and `evidence` (private).
  - `20261007130000_studio_uploads.sql` — two-step upload (`uploads/` staging → server validates → `originals/` + `variants/`).
  - `20261007140000_studio_import.sql` — admin-only `import_document(jsonb)` (initial import + JSON backup restore).
- Security advisors: only the expected "authenticated can execute SECURITY DEFINER" warnings (each function checks the role inside).
- QA users created (qa-admin / qa-publisher / qa-contributor @example.com); passwords only in local gitignored `.env.local`.
  Verified: login OK for the 3 roles; anon cannot read documents/members nor call RPCs; uninvited sign-up and wrong invite code rejected.
  **Delete the QA users after QA.**
- Dependencies pinned: `@supabase/ssr` 0.12.7, `@supabase/supabase-js` 2.117.2, `@rubik/seo-geo-core` @ `8a1f808` (no copy in repo), `server-only`.
- Code: `lib/studio/schema.ts` (Zod content contract, 8 block types, sanitisation, page field allow-list),
  `lib/studio/inline.ts` (safe inline syntax), `lib/studio/media.ts` (variants, MIME sniffing), `lib/studio/content.ts` (public read layer + draft mode),
  `lib/supabase/{env,public,server}.ts`.
- Import tooling: `scripts/studio/import/build_seed.py` + `live-snapshot-2026-10-07.json` (read-only snapshot of the 10 live URLs).
  Produces payloads for `import_document`: revision 1 = verbatim source, revision 2 = adapted proposal (5 mandatory pages), 55 internal review notes,
  inactive legacy redirect registry. **Not yet imported into the DB.**
  The snapshot contains group-entity names verbatim (it is the live site); it lives outside the governance-scanned source dirs on purpose.

## Sources verified 2026-10-07
- AEAT Modelo 210 plazos (page updated 02/10/2026): rental income annual grouping since 2024 (1–20 Jan for 2024–25 income; 1–20 Apr from 2026); imputed income 1 Apr–31 Dec of following year from 2026 income; quarterly calendar for other income.
- BOE STC 182/2021 (26/10/2021, BOE 25/11/2021): consolidated situations FJ 6.
- GVA self-registration VUT: municipal compatibility report ≤ 6 months, 5-year validity (Decreto 10/2021, Ley 15/2018, DL 9/2024).
- BOE-A-2026-1528: resolution 8/10/2025 — express community approval (3/5 owners and quotas, arts. 7.3 / 17.12 LPH) since 3/4/2025.
- LGT art. 27: 1% + 1%/month, 15% after 12 months.
- Google Article docs (updated 08/09/2026): author should be Person/Organization — conflicts with governance (no Person JSON-LD) → pending decision.
- Google AI features (10/12/2025): no special requirements; no llms.txt needed.
- NOT verified: Valencian ITP 9% from 1/6/2026 (only secondary sources).

## Next steps (in order)
1. Import: login as qa-admin with supabase-js, call `rpc('import_document', payload)` for each payload from `build_seed.py`.
2. Upload hero images through the Studio media pipeline from originals listed in `lib/media/approved-media.ts`
   (tax-overview = purchase-fiscal-exposure, one-file = purchase-one-file, rental-analysis = case-apartment-letting,
   coffee-key = territory-contact, coast = territory-coast) and set `hero` on working + revision 2 + publication.
3. Public templates `/preview/insights`, `/preview/insights/[slug]`, `/preview/case-studies`, `/preview/case-studies/[slug]`
   (WebHeader/WebFooter, `--sk-web-*` tokens, BlogPosting/Article + BreadcrumbList without Person, per-document canonical/OG).
4. `/studio` (login, Resumen, Páginas, Artículos, Casos, Media, SEO/links via Core registry, Revisión/versiones, Equipo) + `/api/studio/*` routes + middleware; noindex headers for `/studio`.
5. HomeHero and WebHero optional override props fed by `pageOverrides('home' | 'investment')` (empty = unchanged).
6. Vercel Preview env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (public values).
7. QA (lint/typecheck/test/build, Playwright viewports, auth/roles, conflict, restore, upload), Draft PR, docs, delete QA users.

## Owner action needed
- Admin access for Juanma: run `invite_member('juanmaes83@gmail.com','admin')` as an admin (or seed via SQL) and sign up at `/studio/login` with the code.
- Supabase dashboard: set Site URL / Redirect URLs to the preview domain (needed for password-reset e-mails).
