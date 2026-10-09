# Project State — nueva web y Studio, 9 octubre 2026

## Alcance y autoridad

Repositorio canónico de aplicación, Studio, Media Library y registro de páginas: `Juanmaes83/SARAHKATERINAWEBNUEVA`. El repositorio `Juanmaes83/sarahkaterina` es fuente estratégica y de activos, solo lectura. Rubik SEO GEO y el modo OpenSEO legacy del piloto están excluidos de este frente.

Juanma confirmó el 9 de octubre que Claude ya no trabaja sobre la web. Autorizó implementar/publicar el bloque legacy (PR55), aprobó visualmente y autorizó fusionar el footer legal (PR56), y después autorizó finalizar reconciliación y preparación de QA aislada. Estas instrucciones no aportan datos legales, ni decisiones concretas de proveedor, ni autorización para escribir datos reales o modificar DNS/secretos/gastos. La QA mutadora sigue limitada a una instancia desechable demostrablemente aislada.

## Checkpoint remoto de partida

| Elemento              | Estado verificado por GitHub el 9 octubre                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| main                  | `846fb72d901940deae12f5fe4079dcc9f76b9c12`                                                                    |
| PR53                  | Abierto, no fusionado; rama `claude/consentimiento-medicion`; HEAD `9be117324d1a6f23ab18b06232347d66ac333d88` |
| CI PR53               | Lint/typecheck/test/build e higiene de secretos: success; Vercel: success                                     |
| PR52                  | Draft abierto, no fusionado; HEAD `e73bf076c783fff69485fef2d403fee121bfea52`                                  |
| Repo estratégico main | `4b8e190b589d45683aaba294e34641e4b6bb7e32`                                                                    |

PR53 contiene preparación de consentimiento, adaptador condicionado, seis tests y documentación. No demuestra banner, cookies emitidas, etiqueta, conexión a GA4/GTM ni medición. No se recrea ni incorpora en esta rama.

## Estado reconciliado y procedencia

| Área             | Evidencia disponible                                                                                                                          | Pendiente real                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Aplicación       | main integra preparación de lanzamiento y Studio consolidado; roadmap de lanzamiento registra 20 páginas EN y siete redirects 308 implementados por PR55 y diez URLs editoriales conservadas    | QA del candidato alojado y conciliación completa de URLs antiguas, ES y legales                          |
| Studio editorial | `studio-hosted-publication-2026-10-08.md` registra 8 artículos + 4 casos publicados y ambas membresías activas                                | Flujo interactivo real, recuperación, conflictos y Storage; no confundir operaciones DB con login humano |
| Nuevo lote       | PR52 declara tres artículos importados como draft, sin publicaciones y con notas bloqueantes; código/documentación del lote aún fuera de main | Revisión humana y PR52; no repetir importación ni publicar                                               |
| Lanzamiento      | Roadmap main registra aprobación histórica; PR52 registra pausa posterior del corte/indexación                                                | PR55 y PR56 tienen merge y despliegue Vercel READY; dominio definitivo y activación de indexación siguen pendientes                    |
| Datos            | Roadmap registra Preview y producción con la misma BD y cuentas                                                                               | Prohibidas pruebas mutadoras alojadas en este bloque                                                     |
| Consentimiento   | PR53 publicado; configuración sin política aprobada deniega propósitos opcionales                                                             | Decisiones humanas de proveedor, mecanismo y textos; sin conexión real                                   |
| Entidad/legal    | PR56 entrega footer y tres páginas /preview legales explícitamente draft; identidad aportada por Juanma y relación de titular confirmada en esta sesión; dirección todavía parcial, registro/privacidad pendientes                                                                                | No inferir NIF, entidad, registro o domicilio fiscal del sitio antiguo                                   |

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

Esta continuación añade reconciliación documental y barreras para el script de QA local; no modifica la UI del producto. El SHA de entrega, PR y CI se mantienen en el PR y checkpoint final para evitar un SHA autorreferencial en el documento.

## Cierre de los bloques implementados

- PR55 fusionado: `6de9a13437b4cf9c53ae92d670f210f9c1feaf2e`. CI verde y despliegue `dpl_8j7DvdnpubsugRUca9C8hyaotxLH` READY. Preserva los diez detalles heredados y siete aliases 308; no implica pago, traducciones o cutover completados.
- PR56 fusionado tras aprobación visual humana: `846fb72d901940deae12f5fe4079dcc9f76b9c12`. CI verde y despliegue `dpl_DLd2U92ihpbU1citbCD2WVmtkwqq` READY. Footer legal, privacidad por canales y páginas de revisión; preferencias son una demo sin persistencia ni proveedores. Textos legales todavía PENDING_APPROVAL.
- La reconciliación original estaba en PR54; esta continuación la integra con los resultados posteriores, manteniendo documentos históricos y señalando sus estados supersedidos.
- PR52 (tres drafts) y PR53 (preparación consentimiento) no fusionados en la comprobación de esta sesión. No recrear importaciones ni equiparar invitaciones a API/OAuth conectado.

## Preparación de QA y límite real

`STUDIO-ISOLATED-QA-2026-10-09.md` define la matriz de roles, conflictos, restauración, recuperación y Media Library. `scripts/qa/studio-isolation.mjs` añade rechazo previo de configuración alojada, callbacks distintos, build ausente/mezclado y contenedor DB no explícito; el navegador aborta peticiones fuera de los orígenes locales permitidos. El script añade aserciones donde antes solo registraba resultados y deja de interpolar el contenedor/SQL en una shell.

Esto reduce el riesgo; NO prueba aislamiento del egreso del servidor, proxy TLS, SMTP, Auth ni Storage real. La ejecución mutadora completa requiere Docker/stack local con TLS y restricción real del egreso. En esta sesión no hay Docker ni CLI Supabase y la descarga de Chromium falló en el bloque anterior: esos casos permanecen BLOCKED. No se ejecuta el script sobre Preview porque comparte producción.

## Actualización de titular y Docker aportada por Juanma

El propietario aportó razón social, CIF y dirección parcial y confirmó que la sociedad presta/factura Sarah Katerina. No repetir la petición de razón social/CIF; falta completar domicilio y decisiones/validación de privacidad. Los valores permanecen en el canal privado de la sesión hasta la propuesta legal revisable.

La captura de Docker Desktop del propietario muestra motor activo, cero contenedores corriendo y dos contenedores PostgreSQL ajenos a este frente. No se tocaron. Tener Docker en Windows no da acceso a este executor remoto: no hay CLI/socket Docker aquí. El handoff local prepara ejecución con Codex Desktop/CLI en Windows, sin exponer Docker por TCP ni usar bases de otros proyectos. Ver [ejecución local](STUDIO-LOCAL-EXECUTION-HANDOFF-2026-10-09.md).

## Lo que debe aportar Sarah

Ver [lista de cierre para Sarah](SARAH-CLOSEOUT-REQUEST-2026-10-09.md). Datos o textos no confirmados no pasan a producción. El checkpoint de esta continuación y CI queda en el PR para no introducir un SHA autorreferencial.

## Verificación de reconciliación y guardas

Sobre el código de main indicado: lint 0 errores/8 avisos Studio img heredados; typecheck y build correctos; 55 rutas HTTP comprobadas; `REQUIRE_RENDERED_HTML=1 npm run test`: 476/476 PASS, 32 suites, sin skips. Seis tests de aislamiento prueban rechazo previo de destinos/callbacks no locales y chunks alojados en build; no sustituyen UI/Auth/DB/Storage real. No hay cambios visuales ni mutaciones alojadas en esta continuación.
