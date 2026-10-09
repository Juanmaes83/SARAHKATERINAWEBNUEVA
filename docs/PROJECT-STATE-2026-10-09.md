# Project State — nueva web y Studio, 9 octubre 2026

## Alcance y autoridad

Repositorio canónico de aplicación, Studio, Media Library y registro de páginas: `Juanmaes83/SARAHKATERINAWEBNUEVA`. El repositorio `Juanmaes83/sarahkaterina` es fuente estratégica y de activos, solo lectura. Rubik SEO GEO y el modo OpenSEO legacy del piloto están excluidos de este frente.

Juanma confirmó el 9 de octubre que Claude ya no trabaja sobre la web y autorizó reconciliar documentación y preparar QA aislada. No autoriza merge, despliegue manual, publicación, DNS, indexación, proveedores, secretos ni escrituras alojadas.

## Checkpoint remoto de partida

| Elemento              | Estado verificado por GitHub el 9 octubre                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| main                  | `d5231afc9627aec44195cb97ef49ce5b53a7f358`                                                                    |
| PR53                  | Abierto, no fusionado; rama `claude/consentimiento-medicion`; HEAD `9be117324d1a6f23ab18b06232347d66ac333d88` |
| CI PR53               | Lint/typecheck/test/build e higiene de secretos: success; Vercel: success                                     |
| PR52                  | Draft abierto, no fusionado; HEAD `e73bf076c783fff69485fef2d403fee121bfea52`                                  |
| Repo estratégico main | `4b8e190b589d45683aaba294e34641e4b6bb7e32`                                                                    |

PR53 contiene preparación de consentimiento, adaptador condicionado, seis tests y documentación. No demuestra banner, cookies emitidas, etiqueta, conexión a GA4/GTM ni medición. No se recrea ni incorpora en esta rama.

## Estado reconciliado y procedencia

| Área             | Evidencia disponible                                                                                                                          | Pendiente real                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Aplicación       | main integra preparación de lanzamiento y Studio consolidado; roadmap de lanzamiento registra 20 páginas EN y tres redirects 308 aprobados    | QA del candidato alojado y conciliación completa de URLs antiguas, ES y legales                          |
| Studio editorial | `studio-hosted-publication-2026-10-08.md` registra 8 artículos + 4 casos publicados y ambas membresías activas                                | Flujo interactivo real, recuperación, conflictos y Storage; no confundir operaciones DB con login humano |
| Nuevo lote       | PR52 declara tres artículos importados como draft, sin publicaciones y con notas bloqueantes; código/documentación del lote aún fuera de main | Revisión humana y PR52; no repetir importación ni publicar                                               |
| Lanzamiento      | Roadmap main registra aprobación histórica; PR52 registra pausa posterior del corte/indexación                                                | La instrucción de esta sesión mantiene publicación, DNS e indexación fuera de alcance                    |
| Datos            | Roadmap registra Preview y producción con la misma BD y cuentas                                                                               | Prohibidas pruebas mutadoras alojadas en este bloque                                                     |
| Consentimiento   | PR53 publicado; configuración sin política aprobada deniega propósitos opcionales                                                             | Decisiones humanas de proveedor, mecanismo y textos; sin conexión real                                   |
| Entidad/legal    | No hay identidad fiscal/legal verificada para completar textos                                                                                | No inferir NIF, entidad, registro o domicilio fiscal del sitio antiguo                                   |

Estas cifras alojadas son evidencia documental del 8 de octubre y del PR52, no una nueva consulta a la BD el 9 de octubre.

## Ubicación canónica de contratos

- Registro de rutas/publicación: `lib/seo/routes.ts`; migración: `lib/seo/redirects.ts`.
- Páginas editables y campos permitidos: `lib/studio/schema.ts` (`PAGE_FIELDS`, `EDITABLE_PAGES`, `pickPageFields`). No es un editor arbitrario de todas las páginas.
- Lectura editorial/overrides: `lib/studio/content.ts`.
- Media aprobada del sitio: `lib/media/approved-media.ts`; Media Library alojada: `components/studio/MediaLibrary.tsx`, `app/api/studio/media/route.ts` y migraciones de Storage.
- Project State: este documento; `PROJECT-STATUS.md` conserva decisiones y cronología histórica. No se crea una segunda implementación de los registros.

## Reconciliación de documentos históricos

README y PROJECT-STATUS describían principalmente septiembre. El handoff y ledger Studio aún contenían cero publicaciones, invitaciones pendientes e importaciones pendientes, supersedidas por el registro alojado posterior. `seo-route-migration.md` afirmaba que solo existían previews y no había redirects: el roadmap de lanzamiento posterior registra rutas públicas y tres redirects aprobados. Se conservan dichos textos como evidencia histórica con aviso de reconciliación; sus tareas no se ejecutan automáticamente.

## Siguiente bloque ejecutable

Preparar y verificar un entorno local desechable con Auth, PostgreSQL y Storage reales, luego ejecutar la matriz de [QA aislada](STUDIO-ISOLATED-QA-2026-10-09.md). No usar los contenidos reales ni sus notas como fixtures. La sesión actual no dispone de Docker ni CLI Supabase: QA DB/Storage queda pendiente, no aprobada.

La entrega de esta rama cambia solo Markdown, sin cambios visibles en producto. El SHA de entrega, PR y CI se mantienen en el PR y checkpoint final para evitar un SHA autorreferencial en el documento.

## Verificación de esta entrega

Checkout aislado en rama `docs/canonical-state-isolated-studio-qa-2026-10-09`, desde el SHA main anterior, inicialmente limpio. `npm ci`, lint (0 errores, 8 avisos de img existentes), typecheck y build correctos. Captura local de 45 rutas: estados HTTP, redirects privados y noindex correctos; posterior `REQUIRE_RENDERED_HTML=1 npm test`: 467/467 tests, 30 suites, sin skips. Supabase sin configurar en este build: no demuestra contenido alojado, login real, recuperación ni Storage. Diff solo de ocho Markdown; código y registros intactos.
