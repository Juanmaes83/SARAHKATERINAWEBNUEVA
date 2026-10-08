-- Connect the five later proposals to actual imported records. Safe to replay:
-- only empty related-document lists are populated, and publication is untouched.
do $migration$
declare
  entry record;
  ids uuid[];
  doc public.documents%rowtype;
  rev_number integer;
begin
  for entry in select * from (values
    ('short-term-rental-licence-valencian-community', array['british-buyer-torrevieja','five-documents-before-arras']::text[]),
    ('plusvalia-2021-constitutional-ruling', array['german-retiree-guardamar','modelo-210-explained']::text[]),
    ('nie-application-three-routes', array['five-documents-before-arras','british-buyer-torrevieja']::text[]),
    ('norwegian-couple-la-zenia', array['modelo-210-explained','dutch-investor-orihuela']::text[]),
    ('british-buyer-torrevieja', array['gross-vs-net-yield-costa-blanca','short-term-rental-licence-valencian-community']::text[])
  ) as mappings(source_slug, target_slugs)
  loop
    select * into doc from public.documents
      where slug = entry.source_slug and locale = 'en' for update;
    if not found then raise exception 'Missing source %', entry.source_slug; end if;
    if coalesce(doc.working #> '{related,documents}', '[]'::jsonb) <> '[]'::jsonb then
      continue; -- Preserve editorial edits if the list was already populated.
    end if;
    select array_agg(d.id order by t.ordinality) into ids
      from unnest(entry.target_slugs) with ordinality as t(slug, ordinality)
      join public.documents d on d.slug = t.slug and d.locale = 'en';
    if cardinality(ids) <> cardinality(entry.target_slugs) then
      raise exception 'Missing related target for %', entry.source_slug;
    end if;
    if exists (select 1 from public.publications where document_id = doc.id) then
      raise exception 'Published source % requires editorial review', entry.source_slug;
    end if;
    perform set_config('studio.workflow', 'on', true);
    update public.documents set
      working = jsonb_set(working, '{related,documents}', to_jsonb(ids)),
      lock_version = lock_version + 1,
      has_unpublished_changes = true,
      updated_at = now()
      where id = doc.id;
    select coalesce(max(number), 0) + 1 into rev_number
      from public.revisions where document_id = doc.id;
    insert into public.revisions(document_id, number, reason, title, slug, content, note)
      select d.id, rev_number, 'manual', d.title, d.slug, d.working,
             'Connected related reading to imported Studio records.'
      from public.documents d where d.id = doc.id;
    perform set_config('studio.workflow', 'off', true);
  end loop;
end;
$migration$;
