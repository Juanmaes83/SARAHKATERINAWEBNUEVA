# Hosted Studio editorial publication — 2026-10-08

## Authorized scope and outcome

The owner explicitly requested all prior and new Insights and Case Studies visible in the protected preview. Supabase plugin authorization was restored for project `wiswwjxshdknjihjpgcu`. The two new payloads from PR #49 were imported idempotently as drafts using `public.import_document`; all twelve editorial documents then passed through `transition_document` submit → approve → publish, with optimistic lock versions. Previously blocked cases first passed through the unblock action. Home and Investment page drafts were not published or changed.

Result: **8 articles and 4 cases published** in the hosted database. Marketing (admin) and info (contributor) memberships are active and linked to Auth. No additional invitation was sent.

Administrative operations ran through the authorized Supabase MCP using the existing marketing member's delegated JWT claim context and authenticated role. This applied server role, RLS and workflow checks; it does **not** demonstrate an interactive login by that person. No Auth users, passwords, global Auth expiry, schema, triggers, DNS, production deployment or indexation settings were changed.

## Private review notes

Current adapted copies exclude held group names and the expired Plusvalía countdown. PLU-01/03 and TOR-01/LAZ-02 blockers were resolved specifically for the current adapted version, with the reason appended. Plusvalía's FJ6 summary was checked against [BOE-A-2021-19511](https://www.boe.es/buscar/doc.php?id=BOE-A-2021-19511); the article asserts no deadline for an individual file.

TOR-02, TOR-03 and LAZ-04 remain **unresolved** private review notes, downgraded from blocking to review because the current copy omits the disputed annual/recurring figures. Those source figures were NOT represented as reconciled. Original source revisions and all note bodies remain retained.

## Hosted HTTP checks

Checked the consolidated code at commit `7f7b42f711a9234b086981bebe896f60e04f5e87` through authenticated Vercel fetches. Both lists render their expected headings and contain links to all 8 articles / all 4 cases. All 12 detail pages return 200 and render the matching article/case H1. All 14 responses include `noindex, nofollow`.

| Route | HTTP | H1 count |
| --- | --- | --- |
| /preview/insights | 200 | 1 |
| /preview/case-studies | 200 | 1 |
| /preview/insights/five-documents-before-arras | 200 | 1 |
| /preview/insights/gross-vs-net-yield-costa-blanca | 200 | 1 |
| /preview/insights/modelo-210-explained | 200 | 1 |
| /preview/insights/nie-application-three-routes | 200 | 1 |
| /preview/insights/plusvalia-2021-constitutional-ruling | 200 | 1 |
| /preview/insights/short-term-rental-licence-valencian-community | 200 | 1 |
| /preview/insights/ibi-alicante-province-non-resident-owners | 200 | 1 |
| /preview/insights/non-resident-owner-tax-calendar-alicante-2026 | 200 | 1 |
| /preview/case-studies/british-buyer-torrevieja | 200 | 1 |
| /preview/case-studies/dutch-investor-orihuela | 200 | 1 |
| /preview/case-studies/german-retiree-guardamar | 200 | 1 |
| /preview/case-studies/norwegian-couple-la-zenia | 200 | 1 |

Canonicals currently reference the Vercel preview origin. These are review routes; production canonical domains, redirects, sitemap and indexation still require launch verification.

## Remaining limits and work

- The owner chooses principal images in Studio. The two new articles were published without selecting a new principal image.
- Hosted image upload and real role-by-role interactive login/edit/recovery have not been verified by this database/HTTP check.
- The tax-calendar article still has a private suggestion to connect related-document ids to Modelo 210 and IBI.
- Human visual review remains available using the existing preview access. Vercel protection remains enabled; no bypass tokens or private share URLs are stored here.
- No new test run was required for these content/workflow operations; the previously recorded code QA is separate from this hosted publication evidence.
