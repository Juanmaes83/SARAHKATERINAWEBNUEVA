-- Add checked primary sources without changing editorial facts or review status.
-- Refuse to overwrite a later human revision or any publication.
do $migration$
declare
  entry jsonb;
  doc public.documents%rowtype;
  revision_number integer;
  next_copy jsonb;
begin
  for entry in select value from jsonb_array_elements('[{"slug": "modelo-210-explained", "expected": 2, "sources": [{"id": "aeat-210", "label": "Modelo 210 — filing periods (plazo de declaración)", "publisher": "Agencia Tributaria (AEAT)", "url": "https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/declaracion-irnr-sin-establecimiento-permanente/modelo-plazo-declaracion.html", "checkedOn": "2026-10-07", "note": "Page updated by AEAT on 2 October 2026."}, {"id": "lgt-27", "label": "Ley 58/2003, General Tributaria — article 27 (late-filing surcharges)", "publisher": "BOE", "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186", "checkedOn": "2026-10-07"}, {"id": "aeat-rental-income", "label": "Non-resident tax on rented property", "publisher": "Agencia Tributaria (AEAT)", "url": "https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/rendimientos-inmuebles-arrendados.html", "checkedOn": "2026-10-08"}]}, {"slug": "five-documents-before-arras", "expected": 0, "sources": [{"id": "boe-cc-1454", "label": "Civil Code, article 1454 (arras)", "publisher": "BOE", "url": "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763&bj=art1454", "checkedOn": "2026-10-08"}, {"id": "catastro-reference-2026", "label": "Reference value of real estate, 2026", "publisher": "Dirección General del Catastro", "url": "https://www.sedecatastro.gob.es/Accesos/SECAccvr.aspx?EJERCICIO=2026", "checkedOn": "2026-10-08"}]}, {"slug": "gross-vs-net-yield-costa-blanca", "expected": 1, "sources": [{"id": "aeat-210", "label": "Modelo 210 — filing periods (plazo de declaración)", "publisher": "Agencia Tributaria (AEAT)", "url": "https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/declaracion-irnr-sin-establecimiento-permanente/modelo-plazo-declaracion.html", "checkedOn": "2026-10-07", "note": "Page updated by AEAT on 2 October 2026."}, {"id": "aeat-rental-income", "label": "Non-resident tax on rented property", "publisher": "Agencia Tributaria (AEAT)", "url": "https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/rendimientos-inmuebles-arrendados.html", "checkedOn": "2026-10-08"}]}, {"slug": "dutch-investor-orihuela", "expected": 0, "sources": [{"id": "aeat-rental-income", "label": "Non-resident tax on rented property", "publisher": "Agencia Tributaria (AEAT)", "url": "https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/cuestiones-especificas-sobre-tributacion-inmuebles/rendimientos-inmuebles-arrendados.html", "checkedOn": "2026-10-08"}]}]'::jsonb)
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
