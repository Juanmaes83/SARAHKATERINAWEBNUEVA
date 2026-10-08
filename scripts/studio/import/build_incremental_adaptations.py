"""Generate the one-time, guarded migration for the five later editorial proposals.

Run build_seed.py first and pass its JSON output as the first argument. The
result is versioned SQL, not a fresh import: it preserves source revisions,
human edits, publication state and all existing notes.
"""

import json
import pathlib
import sys


SOURCE = pathlib.Path(sys.argv[1])
DESTINATION = pathlib.Path(sys.argv[2])
LATER = {
    'short-term-rental-licence-valencian-community',
    'plusvalia-2021-constitutional-ruling',
    'nie-application-three-routes',
    'norwegian-couple-la-zenia',
    'british-buyer-torrevieja',
}
payloads = json.loads(SOURCE.read_text(encoding='utf-8'))
new_codes = {'STR-06', 'PLU-03', 'NIE-02', 'LAZ-04', 'TOR-03', 'IMP-02'}
selected = [
    {
        'document': {key: p['document'][key] for key in ('kind', 'slug', 'title', 'working')},
        'notes': [note for note in p['notes'] if note['code'] in new_codes],
    }
    for p in payloads if p['document']['slug'] in LATER
]
assert {p['document']['slug'] for p in selected} == LATER
literal = json.dumps(selected, ensure_ascii=False).replace("'", "''")

sql = """-- Complete the five later editorial proposals without reimporting documents.
-- A later human edit or publication causes an exception rather than an overwrite.
-- The source revision and all existing notes remain untouched.
do $migration$
declare
  item jsonb;
  doc public.documents%rowtype;
  source_content jsonb;
  entry jsonb;
begin
  for item in select value from jsonb_array_elements('PAYLOADS'::jsonb)
  loop
    select * into doc from public.documents
      where kind = (item #>> '{document,kind}')::public.document_kind
        and locale = 'en' and slug = item #>> '{document,slug}'
      for update;
    if not found then
      raise exception 'Missing Studio document %', item #>> '{document,slug}';
    end if;
    if exists (select 1 from public.revisions
               where document_id = doc.id and reason = 'import_adapted') then
      continue; -- Already applied; do not change a later human revision.
    end if;
    select content into source_content from public.revisions
      where document_id = doc.id and number = 1 and reason = 'import_source';
    if source_content is null or doc.working is distinct from source_content
       or exists (select 1 from public.revisions where document_id = doc.id and number <> 1)
       or exists (select 1 from public.publications where document_id = doc.id)
       or doc.status not in ('draft', 'blocked') then
      raise exception 'Studio document % changed since the source import; review manually', doc.slug;
    end if;
    perform set_config('studio.workflow', 'on', true);
    update public.documents set
      title = item #>> '{document,title}',
      working = item #> '{document,working}',
      lock_version = lock_version + 1,
      has_unpublished_changes = true,
      updated_at = now()
      where id = doc.id;
    insert into public.revisions(document_id, number, reason, title, slug, content, note)
      values (doc.id, 2, 'import_adapted', item #>> '{document,title}', doc.slug,
              item #> '{document,working}',
              'Editorial proposal for private preview; source remains in revision 1.');
    for entry in select value from jsonb_array_elements(item -> 'notes')
    loop
      if not exists (select 1 from public.review_notes
                     where document_id = doc.id and code = entry ->> 'code') then
        insert into public.review_notes(document_id, code, domain, severity, body)
          values (doc.id, entry ->> 'code', entry ->> 'domain',
                  entry ->> 'severity', entry ->> 'body');
      end if;
    end loop;
    perform set_config('studio.workflow', 'off', true);
  end loop;
end;
$migration$;
""".replace('PAYLOADS', literal)
DESTINATION.write_text(sql, encoding='utf-8')
print(f'Wrote guarded migration for {len(selected)} documents to {DESTINATION}')
