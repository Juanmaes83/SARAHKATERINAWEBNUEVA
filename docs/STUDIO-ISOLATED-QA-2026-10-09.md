# QA aislada del Studio — plan ejecutable, 9 octubre 2026

Estado: PREPARADA, NO EJECUTADA. Alcance: permisos, persistencia, conflictos, recuperación, Media Library y registros canónicos. No prueba cuentas reales ni producción.

## Condiciones previas obligatorias

1. Instancia local desechable de Supabase con PostgreSQL, Auth, correo local y Storage reales. Aplicar las migraciones del repositorio; registrar cualquier migración dependiente de datos alojados como bloqueada, sin marcarla aplicada artificialmente ni sustituir Storage por un esquema mínimo.
2. Build nuevo de la app, modo preview/noindex, contra HTTPS local. Registrar SHA y las URLs efectivas compiladas del navegador y del servidor. `QA_BASE_URL=localhost` por sí sola NO demuestra aislamiento: el build puede conservar una URL Supabase alojada.
3. Confirmar que app, Auth, redirect de recuperación, REST, Storage y contenedor DB apuntan al entorno local. Revisar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_STUDIO_ORIGIN` sin imprimir claves/tokens. Bloquear egreso hacia servicios alojados durante las pruebas; abortar si aparece una petición externa o no se demuestra el destino efectivo.
4. Crear únicamente cuentas ficticias admin, publisher, contributor y usuario Auth sin membresía, con correos `example.test`; credenciales fuera de Git. Fixtures sintéticas identificadas `qa-isolated-*`, sin datos fiscales ni personales reales.
5. Capturar estado inicial, publicaciones y objetos. Eliminar el entorno desechable al terminar; no limpiar mediante comandos que puedan seleccionar el proyecto alojado.

El script `scripts/qa/studio-e2e-local.mjs` publica y crea datos. Ahora ejecuta `assertLocalStudioBuild` ANTES de importar Playwright o iniciar sesión: exige orígenes loopback, Supabase HTTPS, callback igual a la web, preview/noindex, contenedor explícito y build con URL local en server/static, sin referencias alojadas Supabase. Rechaza `.env` discrepantes. Intercepta peticiones del navegador fuera de esos orígenes y falla si aparecen. Aserciones obligatorias: approve oculto, API403, texto persistido, detalle200 y listado público. SQL usa argumentos de execFile, sin shell.

Este preflight no prueba egreso del servidor ni el destino detrás de un proxy local. No ejecutar hasta verificar todas las condiciones anteriores, incluida la restricción efectiva de egreso y correspondencia DB/Auth/Storage. Las fixtures heredadas del script son dos artículos del lote; aunque los títulos sean iguales, deben crearse exclusivamente en la instancia desechable, nunca importarse de producción. El script cubre parte de la matriz, no conflictos, restauración, recuperación o uploads completos.

### Configuración de ejecución, sin secretos en Git

- `QA_BASE_URL`: origen local exacto de la app.
- `NEXT_PUBLIC_SUPABASE_URL`: origen HTTPS loopback del proxy al Supabase desechable; la app rechaza HTTP en `lib/supabase/env.ts`, regla que no se cambia.
- `NEXT_PUBLIC_STUDIO_ORIGIN`: mismo origen que QA_BASE_URL.
- `NEXT_PUBLIC_SITE_MODE=preview`, `NEXT_PUBLIC_SITE_INDEXABLE=false`.
- `QA_DB_CONTAINER`: nombre explícito `supabase_db_<id-local>` comprobado con inspección del contenedor/red; no proyecto vinculado alojado.
- `QA_PASSWORD`, publishable key local y configuración SMTP: solo entorno privado desechable, sin imprimir valores.
- Rebuild limpio de `.next` con esos valores; servidor arranca con los mismos. Revisar BUILD_ID, mapa proxy TLS y contenedor/red. La URL local no es garantía si un proxy reenvía a producción.
- Solo después ejecutar `node scripts/qa/studio-e2e-local.mjs <directorio-de-evidencias>`.

Dependencias de esta sesión: Docker y CLI Supabase no disponibles; no hay `supabase/config.toml`. No se crea un proyecto alojado ni se configura uno de pago para suplirlo. Instalar/arrancar el stack local y verificar migraciones, Auth y Storage es trabajo técnico, no una petición a Sarah de contraseñas o contenido.


## Matriz funcional

Ejecutar a 390 × 844 y 1440 × 900, con contexto de navegador separado por rol. Guardar evidencias del mismo SHA, URL local exacta y dataset de prueba.

| Prueba / ruta                                    | Rol y pasos                                                                                  | Resultado esperado                                                                                | Efecto sobre datos/consumo local                         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `/studio/login`, `/studio`, `/api/studio/export` | Anónimo y Auth sin miembro activo: abrir rutas y APIs                                        | Sin acceso a documentos privados ni export; login no basta sin membresía                          | Solo sesiones locales; ningún dato editorial             |
| `/studio/new`, `/studio/documents/<fixture-id>`  | Contributor: crear, editar, Save now, recargar, cerrar y volver a entrar                     | Draft persiste; slug/tipo válidos; no aprobación/publicación                                      | Documento y revisiones locales                           |
| Editor y API                                     | Contributor: Send to review; intentar approve/publish por UI y API con Origin local válido   | UI restringida y rechazo por rol; no cambiar estado/publicación                                   | Solo envío a revisión permitido                          |
| Editor                                           | Publisher/admin: revisar, aprobar, publicar fixture; caso con nota bloqueante independiente  | Transiciones válidas; bloqueo impide publicar; anónimo solo lee publicación                       | Publicaciones locales; nunca datos alojados              |
| Editor, dos contextos                            | Abrir misma versión; A guarda; B guarda versión antigua                                      | API 409, mensaje de conflicto; A permanece, B no sobrescribe; recargar y resolver                 | Una revisión válida; comparar lock_version               |
| Editor/versiones                                 | Restaurar revisión anterior y recargar                                                       | Nueva revisión auditable; revisar autorización real según SQL; no publicar automáticamente        | Historial local preservado                               |
| `/studio/recover`, `/studio/recover/complete`    | Solicitar reset al correo local; abrir link en otro contexto; repetir token y token caducado | Recuperación válida funciona; token usado/caducado falla; URL limpia de tokens; sesión comprobada | Correos y sesiones solo locales                          |
| `/studio/media`                                  | Subir PNG/JPEG sintético, alt/crédito/derechos; recargar y seleccionar en fixture            | Original y variantes reales, metadata y selección persistentes; imagen renderiza                  | Storage y filas media locales                            |
| Media y API                                      | Archivo corrupto, MIME discordante, >15 MB, sesión caducada, fallo/reintento                 | Rechazo visible; sin duplicados silenciosos; registrar objetos staging residuales                 | Inspeccionar residuos, limpiar solo instancia desechable |
| Página editable                                  | Override sintético permitido; campo desconocido; slug de página alterado                     | Campo desconocido descartado; slug fijo; vacío conserva diseño; draft no filtra al público        | Overrides solo locales; PAGE_FIELDS intacto              |
| Todas las rutas                                  | Teclado, foco, errores, móvil/escritorio, consola/red                                        | Sin overflow; controles operables; privados/noindex; ninguna petición alojada                     | Evidencias sin credenciales                              |

## Informe y criterio de cierre

Cada caso debe llevar PASS/FAIL/BLOCKED, pasos, expected/actual, status HTTP, resultado DB/Storage pertinente y captura sin tokens. No considerar suficiente un console.log ni una simulación SQL para validar UI/Auth.

Distinguir: tests unitarios, navegador local, CI, despliegue preexistente, conexión alojada y revisión humana. Para recuperación distinguir correo local de entrega real; para Media distinguir transformación sharp de subida/Storage completa. Solo cerrar el bloque tras todos los casos críticos PASS; cualquier dependencia ausente queda BLOCKED.

La revisión alojada posterior necesita autorización específica para datos de prueba porque Preview comparte BD con producción. No pedir contraseñas por chat, reinvitar cuentas, cambiar roles reales, OTP global, secrets, proveedores o publicación en este bloque.

## Resultado de preparación de esta continuación

PASS: guardas y seis casos negativos/positivos de preflight, suite completa 476/476 con HTML capturado, 55 rutas HTTP, lint/tipos/build. BLOCKED: navegador contra stack local real, roles completos, dos sesiones/conflictos/restauración, reset por correo y Storage end-to-end. No se interpreta el PASS de preparación como PASS de toda la matriz.
