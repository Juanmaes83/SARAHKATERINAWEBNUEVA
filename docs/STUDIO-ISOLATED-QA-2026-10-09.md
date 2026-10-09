# QA aislada del Studio — plan ejecutable, 9 octubre 2026

Estado: PREPARADA, NO EJECUTADA. Alcance: permisos, persistencia, conflictos, recuperación, Media Library y registros canónicos. No prueba cuentas reales ni producción.

## Condiciones previas obligatorias

1. Instancia local desechable de Supabase con PostgreSQL, Auth, correo local y Storage reales. Aplicar las migraciones del repositorio; registrar cualquier migración dependiente de datos alojados como bloqueada, sin marcarla aplicada artificialmente ni sustituir Storage por un esquema mínimo.
2. Build nuevo de la app, modo preview/noindex, contra HTTPS local. Registrar SHA y las URLs efectivas compiladas del navegador y del servidor. `QA_BASE_URL=localhost` por sí sola NO demuestra aislamiento: el build puede conservar una URL Supabase alojada.
3. Confirmar que app, Auth, redirect de recuperación, REST, Storage y contenedor DB apuntan al entorno local. Revisar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_STUDIO_ORIGIN` sin imprimir claves/tokens. Bloquear egreso hacia servicios alojados durante las pruebas; abortar si aparece una petición externa o no se demuestra el destino efectivo.
4. Crear únicamente cuentas ficticias admin, publisher, contributor y usuario Auth sin membresía, con correos `example.test`; credenciales fuera de Git. Fixtures sintéticas identificadas `qa-isolated-*`, sin datos fiscales ni personales reales.
5. Capturar estado inicial, publicaciones y objetos. Eliminar el entorno desechable al terminar; no limpiar mediante comandos que puedan seleccionar el proyecto alojado.

El script existente `scripts/qa/studio-e2e-local.mjs` publica y crea datos. Comprueba solo el origen local de la web, no el Supabase compilado. No ejecutarlo hasta verificar todas las condiciones anteriores. Sus pasos que solo registran resultados necesitan aserciones explícitas antes de servir como gate: permiso 403, botón oculto, texto persistido y listado público.

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
