-- Two-step upload: the browser puts the file in `uploads/` (it may exceed the
-- serverless request limit), then the Studio server downloads it, checks the
-- real bytes (magic number + full decode), writes `originals/` and the WebP
-- `variants/`, and deletes the upload. Members may remove their staging
-- files; only admins delete library objects.
drop policy if exists media_objects_insert on storage.objects;

create policy media_objects_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'media'
    and (select public.studio_has_role('contributor'))
    and (storage.foldername(name))[1] in ('uploads', 'originals', 'variants')
  );

create policy media_uploads_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'media'
    and (select public.studio_has_role('contributor'))
    and (storage.foldername(name))[1] = 'uploads'
  );

-- The server needs to read the staged upload with the member's session.
create policy media_objects_read_members on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and (select public.studio_has_role('contributor')));
