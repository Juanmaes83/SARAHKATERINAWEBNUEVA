-- Keep editorial conflict descriptions in private notes, not in the case copy.
-- Only the two untouched, blocked import proposals are eligible. Source
-- revisions, validated amounts, related links and publication state remain.
do $migration$
declare
  doc public.documents%rowtype;
  next_copy jsonb;
  next_number integer;
begin
  for doc in select * from public.documents
    where locale = 'en' and slug in ('norwegian-couple-la-zenia', 'british-buyer-torrevieja')
    for update
  loop
    if doc.status <> 'blocked' or exists (select 1 from public.publications where document_id = doc.id) then
      raise exception 'Blocked private case % changed state', doc.slug;
    end if;
    select coalesce(max(number), 0) into next_number from public.revisions where document_id = doc.id;
    if next_number = 4 then continue; end if; -- Migration already applied.
    if next_number <> 3 or jsonb_array_length(doc.working -> 'blocks') <> 6 then
      raise exception 'Case % has a later edit; review manually', doc.slug;
    end if;
    if doc.slug = 'norwegian-couple-la-zenia' then
      if doc.working ->> 'outcome' <> 'The source records a first-year recovery and a cleaner second filing cycle. The claimed recurring average remains under editorial review because the periods and amounts do not reconcile.'
        or doc.working #>> '{blocks,4,text}' <> 'What still needs reconciliation' then
        raise exception 'Case % copy changed; review manually', doc.slug;
      end if;
      next_copy := jsonb_set(doc.working, '{outcome}', to_jsonb('The source records a first-year recovery and a cleaner second filing cycle.'::text));
      next_copy := jsonb_set(next_copy, '{blocks}', (next_copy -> 'blocks') - 5 - 4);
    else
      if doc.working ->> 'outcome' <> 'The original timeline records keys in week 14 and first guest in week 18. Revenue, owner-cash and annual projections in the source use incompatible periods and are withheld from this proposed summary until reconciled.'
        or doc.working #>> '{blocks,4,text}' <> 'Rental launch and the open calculation' then
        raise exception 'Case % copy changed; review manually', doc.slug;
      end if;
      next_copy := jsonb_set(doc.working, '{outcome}', to_jsonb('The original timeline records keys in week 14 and a first guest in week 18. A verified full-year rental result is not established by those milestones.'::text));
      next_copy := jsonb_set(next_copy, '{blocks,5,text}', to_jsonb('The first guest arrived in week 18. That milestone records the start of activity; it does not establish a full-year rental result.'::text));
      next_copy := jsonb_set(next_copy, '{blocks,4,text}', to_jsonb('Rental launch'::text));
    end if;
    perform set_config('studio.workflow', 'on', true);
    update public.documents set working = next_copy, lock_version = lock_version + 1,
      has_unpublished_changes = true, updated_at = now() where id = doc.id;
    insert into public.revisions(document_id, number, reason, title, slug, content, note)
      values(doc.id, 4, 'manual', doc.title, doc.slug, next_copy,
             'Removed internal review commentary from private case copy; conflict notes remain private.');
    perform set_config('studio.workflow', 'off', true);
  end loop;
end;
$migration$;
