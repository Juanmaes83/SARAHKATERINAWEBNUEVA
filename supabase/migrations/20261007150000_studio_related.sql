-- Connect the five adapted working copies to real imported records.
-- This is an idempotent, draft-only data migration. It never writes publications.
do $migration$
declare
  entry record;
  ids uuid[];
  current_ids jsonb;
  next_ids jsonb;
  rev_number integer;
begin
  perform set_config('studio.workflow', 'on', true);
  for entry in
    select * from (values
      ('modelo-210-explained', array['german-retiree-guardamar','five-documents-before-arras']::text[]),
      ('five-documents-before-arras', array['dutch-investor-orihuela','modelo-210-explained']::text[]),
      ('gross-vs-net-yield-costa-blanca', array['dutch-investor-orihuela','five-documents-before-arras']::text[]),
      ('dutch-investor-orihuela', array['gross-vs-net-yield-costa-blanca','five-documents-before-arras']::text[]),
      ('german-retiree-guardamar', array['modelo-210-explained','gross-vs-net-yield-costa-blanca']::text[])
    ) as mappings(source_slug, target_slugs)
  loop
    select array_agg(d.id order by t.ordinality) into ids
      from unnest(entry.target_slugs) with ordinality as t(slug, ordinality)
      join public.documents d on d.slug = t.slug and d.locale = 'en';
    if cardinality(ids) <> cardinality(entry.target_slugs) then
      raise exception 'Studio import missing related target for %', entry.source_slug;
    end if;
    next_ids := to_jsonb(ids);
    select coalesce(d.working #> '{related,documents}', '[]'::jsonb)
      into current_ids from public.documents d
      where d.slug = entry.source_slug and d.locale = 'en' for update;
    if current_ids is distinct from next_ids then
      update public.documents d
         set working = jsonb_set(d.working, '{related,documents}', next_ids),
             lock_version = d.lock_version + 1,
             has_unpublished_changes = true,
             updated_at = now()
       where d.slug = entry.source_slug and d.locale = 'en';
      select coalesce(max(r.number), 0) + 1 into rev_number
        from public.revisions r join public.documents d on d.id = r.document_id
        where d.slug = entry.source_slug and d.locale = 'en';
      insert into public.revisions(document_id, number, reason, title, slug, content, note)
        select d.id, rev_number, 'manual', d.title, d.slug, d.working,
               'Connected related reading to imported Studio records.'
          from public.documents d where d.slug = entry.source_slug and d.locale = 'en';
    end if;
  end loop;
  perform set_config('studio.workflow', 'off', true);
end;
$migration$;
