-- Admin-only import of one complete document (used for the initial import of
-- the live site and for restoring a JSON backup produced by the Studio export).
-- Payload:
--   { document: {kind, slug, title, working, status, source_url, next_review_on, blocked_reason},
--     revisions: [{number, reason, title, slug, content, note}],
--     publish_revision: <number> | null,
--     redirects: [{source_path, destination_path, origin, active, note}],
--     notes: [{code, domain, severity, body}] }
create or replace function public.import_document(p jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  d jsonb := p -> 'document';
  doc_id uuid := gen_random_uuid();
  rev jsonb;
  rev_id uuid;
  pub_rev uuid;
begin
  if not public.studio_has_role('admin') then
    raise exception 'studio: admins only' using errcode = '42501';
  end if;

  perform set_config('studio.workflow', 'on', true);

  insert into public.documents (id, kind, locale, slug, title, working, status, lock_version, has_unpublished_changes,
                                blocked_reason, source_url, next_review_on, created_by, updated_by)
  values (doc_id, (d ->> 'kind')::public.document_kind, coalesce(d ->> 'locale', 'en'), d ->> 'slug', d ->> 'title',
          d -> 'working', (d ->> 'status')::public.workflow_status, 1, coalesce((d ->> 'has_unpublished_changes')::boolean, true),
          d ->> 'blocked_reason', d ->> 'source_url', (d ->> 'next_review_on')::date, (select auth.uid()), (select auth.uid()));

  for rev in select * from jsonb_array_elements(coalesce(p -> 'revisions', '[]'::jsonb)) loop
    insert into public.revisions (document_id, number, reason, title, slug, content, note, created_by)
    values (doc_id, (rev ->> 'number')::int, rev ->> 'reason', rev ->> 'title', rev ->> 'slug', rev -> 'content', rev ->> 'note', (select auth.uid()))
    returning id into rev_id;
    if (rev ->> 'number')::int = (p ->> 'publish_revision')::int then
      pub_rev := rev_id;
    end if;
  end loop;

  if pub_rev is not null then
    update public.documents set approved_revision_id = pub_rev where id = doc_id;
    insert into public.publications (document_id, kind, locale, slug, title, content, revision_id, published_by)
    select doc_id, r.kind_v, coalesce(d ->> 'locale', 'en'), r.slug, r.title, r.content, r.id, (select auth.uid())
    from (select rv.*, (d ->> 'kind')::public.document_kind as kind_v from public.revisions rv where rv.id = pub_rev) r;
  end if;

  insert into public.redirects (source_path, destination_path, status_code, origin, document_id, active, note, created_by)
  select x ->> 'source_path', x ->> 'destination_path', coalesce((x ->> 'status_code')::int, 308), x ->> 'origin', doc_id,
         coalesce((x ->> 'active')::boolean, false), x ->> 'note', (select auth.uid())
  from jsonb_array_elements(coalesce(p -> 'redirects', '[]'::jsonb)) x
  on conflict (source_path) do update set destination_path = excluded.destination_path, document_id = excluded.document_id;

  insert into public.review_notes (document_id, code, domain, severity, body, created_by)
  select doc_id, x ->> 'code', x ->> 'domain', x ->> 'severity', x ->> 'body', (select auth.uid())
  from jsonb_array_elements(coalesce(p -> 'notes', '[]'::jsonb)) x;

  perform set_config('studio.workflow', 'off', true);
  perform public.studio_audit('import', doc_id, jsonb_build_object('slug', d ->> 'slug'));
  return doc_id;
end;
$$;

revoke all on function public.import_document(jsonb) from public, anon;
grant execute on function public.import_document(jsonb) to authenticated;
