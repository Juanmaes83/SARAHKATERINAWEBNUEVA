-- A pending invitation is a short-lived enrollment permission. Once Auth
-- links the confirmed user, studio_link_member clears this expiry; the
-- resulting membership remains active until an administrator revokes it.
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
  values (normalized, p_role, p_display_name, encode(extensions.digest(code, 'sha256'), 'hex'), now() + interval '24 hours', (select auth.uid()))
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
