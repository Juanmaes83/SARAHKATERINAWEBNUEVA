-- Hold the unadapted La Zenia case until its D-06 note is resolved.
-- The read-only source revision is retained; no publication is changed.
do $migration$
begin
  perform set_config('studio.workflow', 'on', true);
  update public.documents
     set status = 'blocked',
         blocked_reason = 'Governance decision D-06',
         lock_version = lock_version + 1,
         updated_at = now()
   where slug = 'norwegian-couple-la-zenia' and locale = 'en' and status <> 'blocked';
  update public.review_notes
     set severity = 'blocking'
   where code = 'LAZ-02' and severity <> 'blocking';
  perform set_config('studio.workflow', 'off', true);
end;
$migration$;
