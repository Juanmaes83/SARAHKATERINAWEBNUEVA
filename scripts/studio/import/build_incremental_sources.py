"""Build guarded source-only migration from the editorial seed payloads."""

import json
import pathlib
import sys


expected = {
    'modelo-210-explained': 2,
    'five-documents-before-arras': 0,
    'gross-vs-net-yield-costa-blanca': 1,
    'dutch-investor-orihuela': 0,
}
payloads = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
entries = [
    {'slug': p['document']['slug'], 'expected': expected[p['document']['slug']],
     'sources': p['document']['working']['sources']}
    for p in payloads if p['document']['slug'] in expected
]
assert {p['slug'] for p in entries} == set(expected)
literal = json.dumps(entries, ensure_ascii=False).replace("'", "''")
sql = """-- Add checked primary sources without changing editorial facts or review status.
-- Refuse to overwrite a later human revision or any publication.
do $migration$
declare
  entry jsonb;
  doc public.documents%rowtype;
  revision_number integer;
  next_copy jsonb;
begin
  for entry in select value from jsonb_array_elements('PAYLOADS'::jsonb)
  loop
    select * into doc from public.documents where locale = 'en'
      and slug = entry ->> 'slug' for update;
    if not found then raise exception 'Missing source document %', entry ->> 'slug'; end if;
    if doc.working -> 'sources' = entry -> 'sources' then continue; end if;
    select coalesce(max(number),0) into revision_number
      from public.revisions where document_id = doc.id;
    if doc.status <> 'draft' or revision_number <> 3
       or jsonb_array_length(doc.working -> 'sources') <> (entry ->> 'expected')::integer
       or exists (select 1 from public.publications where document_id = doc.id) then
      raise exception 'Source document % changed; review manually', doc.slug;
    end if;
    next_copy := jsonb_set(doc.working, '{sources}', entry -> 'sources');
    perform set_config('studio.workflow', 'on', true);
    update public.documents set working = next_copy, lock_version = lock_version + 1,
      has_unpublished_changes = true, updated_at = now() where id = doc.id;
    insert into public.revisions(document_id, number, reason, title, slug, content, note)
      values (doc.id, 4, 'manual', doc.title, doc.slug, next_copy,
              'Added checked primary-source references; no case result or legal conclusion changed.');
    perform set_config('studio.workflow', 'off', true);
  end loop;
end;
$migration$;
""".replace('PAYLOADS', literal)
path = pathlib.Path(sys.argv[2])
path.write_text(sql, encoding='utf-8')
print(f'Wrote source migration for {len(entries)} documents to {path}')
