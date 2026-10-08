-- Permit a trusted Supabase Auth admin email invitation for a pre-allowlisted
-- member. Client sign-up still requires the one-time code. `invited_at` is set
-- by GoTrue's privileged invitation path, never by client user metadata.
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
  if member.invite_expires_at is null or member.invite_expires_at < now() then
    raise exception 'studio: invitation expired' using errcode = '42501';
  end if;

  -- Admin-issued email invites do not carry a password or code. Requiring
  -- both the server-owned invited_at field and a pending allowlist row keeps
  -- public sign-up from taking this path.
  if member.invite_code_hash is null and new.invited_at is not null then
    return new;
  end if;

  supplied := coalesce(new.raw_user_meta_data ->> 'invite_code', '');
  if member.invite_code_hash is null
     or encode(extensions.digest(supplied, 'sha256'), 'hex') <> member.invite_code_hash then
    raise exception 'studio: invalid invite code' using errcode = '42501';
  end if;

  new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  new.raw_user_meta_data := new.raw_user_meta_data - 'invite_code';
  return new;
end;
$$;
