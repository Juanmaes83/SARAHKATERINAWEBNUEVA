-- Sarah Katerina Studio — core editorial schema.
--
-- Model
--   documents   one row per page / article / case. Holds the WORKING copy
--               (`working`) that editors autosave, guarded by `lock_version`.
--   revisions   immutable snapshots (import, submit, approve, manual, restore).
--   publications what the public preview renders. Written ONLY by the
--               publish_document() function, readable by anyone.
--   review_notes internal notes. Never readable by anonymous visitors.
--   media       library metadata; files live in Storage.
--   redirects   historical slug registry (source -> destination).
--   audit_log   append-only trail of sensitive actions.
--
-- Security
--   * Every table has RLS. Anonymous visitors can read `publications`, the
--     `active` rows of `redirects` and public `media` metadata only.
--   * Membership is an allowlist (`studio_members`). A sign-up whose e-mail is
--     not invited, or whose invite code is wrong/expired, is rejected inside
--     the database by a trigger on auth.users.
--   * Workflow transitions (submit / approve / publish / restore) run through
--     SECURITY DEFINER functions that check the caller's role, so the browser
--     can never write `publications` or change a status directly.

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Roles and membership
-- ---------------------------------------------------------------------------

create type public.studio_role as enum ('contributor', 'publisher', 'admin');

create table public.studio_members (
  email text primary key check (email = lower(email) and position('@' in email) > 1),
  role public.studio_role not null default 'contributor',
  display_name text,
  user_id uuid unique references auth.users (id) on delete set null,
  invite_code_hash text,
  invite_expires_at timestamptz,
  active boolean not null default true,
  invited_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  joined_at timestamptz
);

comment on table public.studio_members is
  'Allowlist of Studio members. invite_code_hash is a SHA-256 of a one-time code; the code itself is never stored.';

-- Role of the current user (null when not a member). SECURITY DEFINER so RLS
-- policies can call it without recursing into studio_members' own policies.
create or replace function public.studio_current_role()
returns public.studio_role
language sql
stable
security definer
set search_path = ''
as $$
  select m.role
  from public.studio_members m
  where m.user_id = (select auth.uid()) and m.active
$$;

create or replace function public.studio_has_role(minimum public.studio_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select case m.role
              when 'admin' then 3
              when 'publisher' then 2
              else 1
            end
     from public.studio_members m
     where m.user_id = (select auth.uid()) and m.active)
    >=
    case minimum when 'admin' then 3 when 'publisher' then 2 else 1 end,
    false)
$$;

-- Sign-up gate. Runs inside GoTrue's insert, so a rejected e-mail never
-- becomes an account.
create or replace function public.studio_gate_signup()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  member public.studio_members%rowtype;
  supplied text;
begin
  select * into member
  from public.studio_members
  where email = lower(new.email) and active
  for update;

  if not found then
    raise exception 'studio: this e-mail is not invited' using errcode = '42501';
  end if;

  if member.user_id is not null then
    raise exception 'studio: this invitation has already been used' using errcode = '42501';
  end if;

  supplied := coalesce(new.raw_user_meta_data ->> 'invite_code', '');
  if member.invite_code_hash is null
     or member.invite_expires_at is null
     or member.invite_expires_at < now()
     or encode(extensions.digest(supplied, 'sha256'), 'hex') <> member.invite_code_hash then
    raise exception 'studio: invalid or expired invite code' using errcode = '42501';
  end if;

  -- The invite code proves the person received the invitation from an admin,
  -- so the address is treated as confirmed. The code is single use.
  new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  new.raw_user_meta_data := new.raw_user_meta_data - 'invite_code';
  return new;
end;
$$;

create or replace function public.studio_link_member()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.studio_members
     set user_id = new.id,
         joined_at = now(),
         invite_code_hash = null,
         invite_expires_at = null
   where email = lower(new.email);
  return new;
end;
$$;

create trigger studio_gate_signup
  before insert on auth.users
  for each row execute function public.studio_gate_signup();

create trigger studio_link_member
  after insert on auth.users
  for each row execute function public.studio_link_member();

-- ---------------------------------------------------------------------------
-- Editorial content
-- ---------------------------------------------------------------------------

create type public.document_kind as enum ('article', 'case', 'page');
create type public.workflow_status as enum ('draft', 'in_review', 'approved', 'published', 'blocked');

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  kind public.document_kind not null,
  locale text not null default 'en' check (locale in ('en', 'es')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 96),
  title text not null check (char_length(title) between 1 and 200),
  working jsonb not null default '{}'::jsonb,
  status public.workflow_status not null default 'draft',
  lock_version integer not null default 1,
  has_unpublished_changes boolean not null default true,
  blocked_reason text,
  source_url text,
  next_review_on date,
  translation_of uuid references public.documents (id) on delete set null,
  approved_revision_id uuid,
  created_by uuid references auth.users (id) on delete set null,
  updated_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, locale, slug)
);

create table public.revisions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  number integer not null,
  reason text not null check (reason in ('import_source', 'import_adapted', 'manual', 'submit', 'approve', 'publish', 'restore', 'duplicate')),
  title text not null,
  slug text not null,
  content jsonb not null,
  note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (document_id, number)
);

alter table public.documents
  add constraint documents_approved_revision_fk
  foreign key (approved_revision_id) references public.revisions (id) on delete set null;

create table public.publications (
  document_id uuid primary key references public.documents (id) on delete cascade,
  kind public.document_kind not null,
  locale text not null,
  slug text not null,
  title text not null,
  content jsonb not null,
  revision_id uuid not null references public.revisions (id) on delete restrict,
  first_published_at timestamptz not null default now(),
  published_at timestamptz not null default now(),
  published_by uuid references auth.users (id) on delete set null,
  unique (kind, locale, slug)
);

comment on table public.publications is
  'The ONLY source for public preview pages. "Published" here means visible on the preview deployment, not on the production domain.';

create table public.review_notes (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  code text,
  domain text not null default 'editorial' check (domain in ('editorial', 'figures', 'legal', 'tax', 'governance', 'source', 'seo', 'media')),
  severity text not null default 'review' check (severity in ('info', 'review', 'blocking')),
  body text not null check (char_length(body) between 1 and 4000),
  resolved boolean not null default false,
  resolved_by uuid references auth.users (id) on delete set null,
  resolved_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null check (bucket in ('media', 'evidence')),
  original_path text not null unique,
  variants jsonb not null default '[]'::jsonb,
  mime text not null check (mime in ('image/jpeg', 'image/png', 'image/webp', 'image/avif')),
  bytes integer not null check (bytes > 0 and bytes <= 15728640),
  width integer check (width > 0),
  height integer check (height > 0),
  sha256 text,
  alt text not null default '',
  caption text,
  credit text,
  rights text,
  provenance text not null default 'real' check (provenance in ('real', 'illustration', 'stock', 'generated')),
  focus_x real not null default 0.5 check (focus_x between 0 and 1),
  focus_y real not null default 0.5 check (focus_y between 0 and 1),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique check (source_path ~ '^/'),
  destination_path text not null check (destination_path ~ '^/'),
  status_code integer not null default 308 check (status_code in (301, 302, 307, 308)),
  origin text not null default 'manual' check (origin in ('legacy_site', 'slug_change', 'manual')),
  document_id uuid references public.documents (id) on delete set null,
  active boolean not null default false,
  note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on column public.redirects.active is
  'Legacy-site rows stay inactive: they are the source->destination registry for the future domain migration, which is NOT authorised in this phase.';

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor uuid references auth.users (id) on delete set null,
  action text not null,
  document_id uuid references public.documents (id) on delete set null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index revisions_document_idx on public.revisions (document_id, number desc);
create index review_notes_document_idx on public.review_notes (document_id) where not resolved;
create index documents_kind_status_idx on public.documents (kind, status);
create index audit_log_document_idx on public.audit_log (document_id, created_at desc);
create index redirects_document_idx on public.redirects (document_id);
create index documents_translation_idx on public.documents (translation_of);
create index documents_approved_revision_idx on public.documents (approved_revision_id);
create index publications_revision_idx on public.publications (revision_id);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.studio_members enable row level security;
alter table public.documents enable row level security;
alter table public.revisions enable row level security;
alter table public.publications enable row level security;
alter table public.review_notes enable row level security;
alter table public.media enable row level security;
alter table public.redirects enable row level security;
alter table public.audit_log enable row level security;

-- Members: everybody in the Studio sees the team; only admins change it.
create policy members_read on public.studio_members
  for select to authenticated using ((select public.studio_has_role('contributor')));
create policy members_admin_insert on public.studio_members
  for insert to authenticated with check ((select public.studio_has_role('admin')));
create policy members_admin_update on public.studio_members
  for update to authenticated using ((select public.studio_has_role('admin')))
  with check ((select public.studio_has_role('admin')));
create policy members_admin_delete on public.studio_members
  for delete to authenticated using ((select public.studio_has_role('admin')) and user_id is distinct from (select auth.uid()));

-- Documents: members read and edit the working copy. Status, lock_version and
-- approval pointers are protected by a trigger (see below), so a contributor
-- cannot approve by writing the column.
create policy documents_read on public.documents
  for select to authenticated using ((select public.studio_has_role('contributor')));
-- New documents always start as a version-1 draft. There is deliberately NO
-- update policy: every change goes through save_document() (optimistic lock)
-- or transition_document() (role-checked workflow).
create policy documents_insert on public.documents
  for insert to authenticated with check (
    (select public.studio_has_role('contributor'))
    and status = 'draft' and lock_version = 1 and approved_revision_id is null
  );
create policy documents_delete on public.documents
  for delete to authenticated using ((select public.studio_has_role('admin')));

create policy revisions_read on public.revisions
  for select to authenticated using ((select public.studio_has_role('contributor')));
create policy revisions_insert on public.revisions
  for insert to authenticated with check (
    (select public.studio_has_role('contributor')) and reason in ('manual', 'duplicate')
  );

-- Publications: world-readable; nobody writes them except publish_document().
create policy publications_read on public.publications
  for select to anon, authenticated using (true);

create policy notes_read on public.review_notes
  for select to authenticated using ((select public.studio_has_role('contributor')));
create policy notes_insert on public.review_notes
  for insert to authenticated with check ((select public.studio_has_role('contributor')));
create policy notes_update on public.review_notes
  for update to authenticated using ((select public.studio_has_role('publisher')))
  with check ((select public.studio_has_role('publisher')));

-- Media metadata: public-bucket rows are readable by anyone (the public page
-- needs alt/caption/credit); evidence rows only by members.
create policy media_read_public on public.media
  for select to anon, authenticated using (bucket = 'media' or (select public.studio_has_role('contributor')));
create policy media_insert on public.media
  for insert to authenticated with check ((select public.studio_has_role('contributor')));
create policy media_update on public.media
  for update to authenticated using ((select public.studio_has_role('contributor')))
  with check ((select public.studio_has_role('contributor')));
create policy media_delete on public.media
  for delete to authenticated using ((select public.studio_has_role('admin')));

create policy redirects_read on public.redirects
  for select to anon, authenticated using (active or (select public.studio_has_role('contributor')));
create policy redirects_write on public.redirects
  for insert to authenticated with check ((select public.studio_has_role('publisher')));
create policy redirects_update on public.redirects
  for update to authenticated using ((select public.studio_has_role('publisher')))
  with check ((select public.studio_has_role('publisher')));
create policy redirects_delete on public.redirects
  for delete to authenticated using ((select public.studio_has_role('admin')));

create policy audit_read on public.audit_log
  for select to authenticated using ((select public.studio_has_role('publisher')));

-- ---------------------------------------------------------------------------
-- Integrity triggers
-- ---------------------------------------------------------------------------

-- Defence in depth: even if an update policy were added later, workflow
-- columns change exclusively inside the SECURITY DEFINER functions, which set
-- the transaction-local flag `studio.workflow`.
create or replace function public.studio_guard_documents()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if coalesce(current_setting('studio.workflow', true), '') <> 'on' then
    if new.status is distinct from old.status
       or new.lock_version is distinct from old.lock_version
       or new.approved_revision_id is distinct from old.approved_revision_id
       or new.kind is distinct from old.kind
       or new.created_by is distinct from old.created_by then
      raise exception 'studio: workflow fields can only change through the Studio workflow' using errcode = '42501';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger studio_guard_documents
  before update on public.documents
  for each row execute function public.studio_guard_documents();

-- ---------------------------------------------------------------------------
-- Workflow functions (the only way to change status)
-- ---------------------------------------------------------------------------

create or replace function public.studio_audit(p_action text, p_document uuid, p_detail jsonb)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.audit_log (actor, action, document_id, detail)
  values ((select auth.uid()), p_action, p_document, coalesce(p_detail, '{}'::jsonb));
$$;

create or replace function public.studio_next_revision(p_document uuid)
returns integer
language sql
security definer
set search_path = ''
as $$
  select coalesce(max(number), 0) + 1 from public.revisions where document_id = p_document
$$;

-- Autosave with optimistic locking. Returns the new lock_version, or raises
-- SQLSTATE 40001 ("conflict") when somebody else saved first.
create or replace function public.save_document(
  p_id uuid,
  p_expected_version integer,
  p_title text,
  p_slug text,
  p_working jsonb,
  p_next_review_on date default null
)
returns table (lock_version integer, updated_at timestamptz, status public.workflow_status)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  doc public.documents%rowtype;
  new_status public.workflow_status;
begin
  if not public.studio_has_role('contributor') then
    raise exception 'studio: not a member' using errcode = '42501';
  end if;

  select * into doc from public.documents d where d.id = p_id for update;
  if not found then
    raise exception 'studio: document not found' using errcode = 'P0002';
  end if;

  if doc.lock_version <> p_expected_version then
    raise exception 'studio: conflict — saved by someone else (current version %)', doc.lock_version
      using errcode = '40001';
  end if;

  -- Editing anything that was in review/approved/published sends the WORKING
  -- copy back to draft. The published copy is untouched until the next
  -- approve+publish.
  new_status := case when doc.status = 'blocked' then 'blocked'::public.workflow_status else 'draft'::public.workflow_status end;

  perform set_config('studio.workflow', 'on', true);
  update public.documents d
     set title = p_title,
         slug = p_slug,
         working = p_working,
         next_review_on = coalesce(p_next_review_on, d.next_review_on),
         lock_version = d.lock_version + 1,
         status = new_status,
         has_unpublished_changes = true,
         approved_revision_id = null,
         updated_by = (select auth.uid())
   where d.id = p_id;
  perform set_config('studio.workflow', 'off', true);

  return query select d.lock_version, d.updated_at, d.status from public.documents d where d.id = p_id;
end;
$$;

create or replace function public.transition_document(
  p_id uuid,
  p_action text,
  p_expected_version integer,
  p_note text default null
)
returns table (lock_version integer, status public.workflow_status, revision_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  doc public.documents%rowtype;
  rev_id uuid;
  rev_no integer;
  target public.workflow_status;
  old_slug text;
begin
  select * into doc from public.documents d where d.id = p_id for update;
  if not found then
    raise exception 'studio: document not found' using errcode = 'P0002';
  end if;
  if doc.lock_version <> p_expected_version then
    raise exception 'studio: conflict — the document changed (current version %)', doc.lock_version
      using errcode = '40001';
  end if;

  if p_action = 'submit' then
    if not public.studio_has_role('contributor') then raise exception 'studio: not allowed' using errcode = '42501'; end if;
    if doc.status not in ('draft') then raise exception 'studio: only drafts can be sent to review' using errcode = '22023'; end if;
    target := 'in_review';
  elsif p_action = 'request_changes' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    if doc.status not in ('in_review', 'approved') then raise exception 'studio: nothing to send back' using errcode = '22023'; end if;
    target := 'draft';
  elsif p_action = 'approve' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    if doc.status <> 'in_review' then raise exception 'studio: only documents in review can be approved' using errcode = '22023'; end if;
    if exists (select 1 from public.review_notes n where n.document_id = p_id and not n.resolved and n.severity = 'blocking') then
      raise exception 'studio: resolve the blocking review notes first' using errcode = '22023';
    end if;
    target := 'approved';
  elsif p_action = 'publish' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    if doc.status <> 'approved' or doc.approved_revision_id is null then
      raise exception 'studio: only approved documents can be published' using errcode = '22023';
    end if;
    target := 'published';
  elsif p_action = 'unpublish' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    target := 'draft';
  elsif p_action = 'block' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    target := 'blocked';
  elsif p_action = 'unblock' then
    if not public.studio_has_role('publisher') then raise exception 'studio: reviewers only' using errcode = '42501'; end if;
    if doc.status <> 'blocked' then raise exception 'studio: not blocked' using errcode = '22023'; end if;
    target := 'draft';
  else
    raise exception 'studio: unknown action %', p_action using errcode = '22023';
  end if;

  rev_id := null;
  if p_action in ('submit', 'approve') then
    rev_no := public.studio_next_revision(p_id);
    insert into public.revisions (document_id, number, reason, title, slug, content, note, created_by)
    values (p_id, rev_no, p_action, doc.title, doc.slug, doc.working, p_note, (select auth.uid()))
    returning id into rev_id;
  end if;

  perform set_config('studio.workflow', 'on', true);

  if p_action = 'approve' then
    update public.documents d set approved_revision_id = rev_id where d.id = p_id;
  end if;

  if p_action = 'publish' then
    select slug into old_slug from public.publications where document_id = p_id;
    insert into public.publications as pub (document_id, kind, locale, slug, title, content, revision_id, published_by)
    select doc.id, doc.kind, doc.locale, r.slug, r.title, r.content, r.id, (select auth.uid())
    from public.revisions r where r.id = doc.approved_revision_id
    on conflict (document_id) do update
      set slug = excluded.slug,
          title = excluded.title,
          content = excluded.content,
          revision_id = excluded.revision_id,
          published_at = now(),
          published_by = excluded.published_by;
    rev_id := doc.approved_revision_id;

    -- A changed public slug keeps the old URL alive through a redirect.
    if old_slug is not null and old_slug <> doc.slug and doc.kind <> 'page' then
      insert into public.redirects (source_path, destination_path, origin, document_id, active, created_by)
      values (
        '/preview/' || case doc.kind when 'article' then 'insights' else 'case-studies' end || '/' || old_slug,
        '/preview/' || case doc.kind when 'article' then 'insights' else 'case-studies' end || '/' || doc.slug,
        'slug_change', p_id, true, (select auth.uid()))
      on conflict (source_path) do update set destination_path = excluded.destination_path, active = true;
    end if;
  end if;

  if p_action = 'unpublish' then
    delete from public.publications where document_id = p_id;
  end if;

  update public.documents d
     set status = target,
         lock_version = d.lock_version + 1,
         has_unpublished_changes = case when p_action = 'publish' then false
                                        when p_action = 'unpublish' then true
                                        else d.has_unpublished_changes end,
         blocked_reason = case when p_action = 'block' then p_note
                               when p_action = 'unblock' then null
                               else d.blocked_reason end,
         approved_revision_id = case when target in ('draft', 'blocked') then null else d.approved_revision_id end,
         updated_by = (select auth.uid())
   where d.id = p_id;

  perform set_config('studio.workflow', 'off', true);
  perform public.studio_audit(p_action, p_id, jsonb_build_object('note', p_note, 'revision', rev_id, 'from', doc.status, 'to', target));

  return query select d.lock_version, d.status, rev_id from public.documents d where d.id = p_id;
end;
$$;

-- Restore copies a revision into the WORKING copy. It never touches what is
-- published: the restored text must go through review again.
create or replace function public.restore_revision(p_revision uuid, p_expected_version integer)
returns table (lock_version integer, status public.workflow_status)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  rev public.revisions%rowtype;
  doc public.documents%rowtype;
begin
  if not public.studio_has_role('contributor') then
    raise exception 'studio: not a member' using errcode = '42501';
  end if;
  select * into rev from public.revisions where id = p_revision;
  if not found then raise exception 'studio: revision not found' using errcode = 'P0002'; end if;
  select * into doc from public.documents d where d.id = rev.document_id for update;
  if doc.lock_version <> p_expected_version then
    raise exception 'studio: conflict — the document changed (current version %)', doc.lock_version using errcode = '40001';
  end if;

  perform set_config('studio.workflow', 'on', true);
  update public.documents d
     set working = rev.content,
         title = rev.title,
         slug = rev.slug,
         status = case when d.status = 'blocked' then 'blocked'::public.workflow_status else 'draft'::public.workflow_status end,
         lock_version = d.lock_version + 1,
         has_unpublished_changes = true,
         approved_revision_id = null,
         updated_by = (select auth.uid())
   where d.id = rev.document_id;
  perform set_config('studio.workflow', 'off', true);

  insert into public.revisions (document_id, number, reason, title, slug, content, note, created_by)
  values (rev.document_id, public.studio_next_revision(rev.document_id), 'restore', rev.title, rev.slug, rev.content,
          'Restored from revision ' || rev.number, (select auth.uid()));

  perform public.studio_audit('restore', rev.document_id, jsonb_build_object('revision', rev.id, 'number', rev.number));
  return query select d.lock_version, d.status from public.documents d where d.id = rev.document_id;
end;
$$;

-- Admin-only: create or refresh an invitation. Returns the one-time code,
-- which is shown once to the admin and stored only as a hash.
create or replace function public.invite_member(p_email text, p_role public.studio_role, p_display_name text default null)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  code text;
  normalized text := lower(trim(p_email));
begin
  if not public.studio_has_role('admin') then
    raise exception 'studio: admins only' using errcode = '42501';
  end if;
  code := encode(extensions.gen_random_bytes(12), 'hex');
  insert into public.studio_members (email, role, display_name, invite_code_hash, invite_expires_at, invited_by)
  values (normalized, p_role, p_display_name, encode(extensions.digest(code, 'sha256'), 'hex'), now() + interval '7 days', (select auth.uid()))
  on conflict (email) do update
    set role = excluded.role,
        display_name = coalesce(excluded.display_name, public.studio_members.display_name),
        invite_code_hash = case when public.studio_members.user_id is null then excluded.invite_code_hash else null end,
        invite_expires_at = case when public.studio_members.user_id is null then excluded.invite_expires_at else null end,
        active = true;
  perform public.studio_audit('invite', null, jsonb_build_object('email', normalized, 'role', p_role));
  return code;
end;
$$;

-- Lock down function execution: nothing for anon, members via authenticated.
revoke all on function public.studio_current_role() from public, anon;
revoke all on function public.studio_has_role(public.studio_role) from public, anon;
revoke all on function public.studio_gate_signup() from public, anon, authenticated;
revoke all on function public.studio_link_member() from public, anon, authenticated;
revoke all on function public.studio_audit(text, uuid, jsonb) from public, anon, authenticated;
revoke all on function public.studio_next_revision(uuid) from public, anon, authenticated;
revoke all on function public.save_document(uuid, integer, text, text, jsonb, date) from public, anon;
revoke all on function public.transition_document(uuid, text, integer, text) from public, anon;
revoke all on function public.restore_revision(uuid, integer) from public, anon;
revoke all on function public.invite_member(text, public.studio_role, text) from public, anon;
revoke all on function public.studio_guard_documents() from public, anon, authenticated;
grant execute on function public.studio_current_role() to authenticated;
grant execute on function public.studio_has_role(public.studio_role) to authenticated;
grant execute on function public.save_document(uuid, integer, text, text, jsonb, date) to authenticated;
grant execute on function public.transition_document(uuid, text, integer, text) to authenticated;
grant execute on function public.restore_revision(uuid, integer) to authenticated;
grant execute on function public.invite_member(text, public.studio_role, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------

-- `media`    public read (images rendered on public pages). Writes: members.
-- `evidence` private (documents supporting a claim). Never public.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('evidence', 'evidence', false, 15728640, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy media_objects_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.studio_has_role('contributor')) and (storage.foldername(name))[1] in ('originals', 'variants'));
create policy media_objects_update on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.studio_has_role('contributor')))
  with check (bucket_id = 'media' and (select public.studio_has_role('contributor')));
create policy media_objects_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.studio_has_role('admin')));

create policy evidence_objects_read on storage.objects
  for select to authenticated
  using (bucket_id = 'evidence' and (select public.studio_has_role('contributor')));
create policy evidence_objects_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'evidence' and (select public.studio_has_role('contributor')));
create policy evidence_objects_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'evidence' and (select public.studio_has_role('admin')));
