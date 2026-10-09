# Asistente guiado y WhatsApp — entrega de revisión

## Alcance autorizado y realizado

Juanma autorizó continuar el contrato hasta revisión visual humana. Autorización específica: «HAZLO Y CONTINUA HASTA QUE PUEDA HACER REVISIÓN VISUAL HUMANA». A01–A12 se incorporan para esta revisión, con registro explícito de Juanma, fecha y permiso INTERNAL_TEST_ONLY; no atribuir aprobación de Sarah ni publicación definitiva.

Rama propia: feat/guided-assistant-whatsapp-review. Base main auditada: 5b3b5cc45bfefe1afb87228a846945c47edcc6e9. Continúa el contrato del PR58/a189fc737db8b06cfb972855a3059441257b84fb. El PR de implementación conserva ese paquete; el documental separado se cierra como sustituido, sin fusionar.

Panel EN con diez temas (A02–A09/A11/A12), presentación A01 y aviso/acción WhatsApp A10. Una sola entrada How can I help?, sin avatar que suplante a Sarah, mensajes libres, IA generativa, embeds, analytics o API WhatsApp. El sitio conserva contenido principal y SEO; no crea schema, hreflang o nuevas rutas.

Código: content/en/assistant.ts; lib/assistant/policy.ts; components/web/GuidedAssistant.tsx y CSS; integración única desde app/layout.tsx y ciclo de menú de WebHeader. Extensión chat del sistema de iconos existente; no nueva marca. No se modifican tokens canónicos, Page Registry, Media Library, contenido alojado o permisos Studio.

## Entorno y acceso

El PR contiene URL exacta de su deployment/SHA y estado de CI. Usar ese enlace para revisión, no el alias main. Visitante público; no requiere cuenta/rol Studio. Si Vercel solicita acceso, usar el acceso de propietario o el enlace temporal autorizado del PR. El panel aparece en deployments Vercel Preview y local preview; production queda cerrado explícitamente incluso con modo preview. No se cambian secretos, variables Vercel, DNS o indexación.

Rutas visuales: /preview/home, /preview/property-purchase, /preview/tax-advisory, /preview/contact. SiteLink mantiene el resolver canónico de rutas del entorno; no crea un segundo Page Registry. No se muestra asistente en Studio, foundation, API o rutas desconocidas.

## Revisión humana

| Cambio visible   | Escritorio 1440 px                                     | Móvil 390 y 320 px                                     | Resultado esperado y efecto                                                                                |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Entrada de ayuda | Abrir Home y pulsar How can I help? abajo a la derecha | Misma acción; comprobar CTA visibles con panel cerrado | Abre diálogo modal; sin carga de proveedor o escritura                                                     |
| Temas            | Elegir Buying a property, Investment y Tax questions   | Recorrer opciones y More topics                        | Respuesta fija; ninguna evaluación personal o coste de IA                                                  |
| Navegación       | Pulsar Explore… o View contact options                 | Misma acción y volver a abrir                          | Ruta existente, panel cerrado y selección descartada; no reserva ni guarda                                 |
| WhatsApp         | Revisar aviso y pulsar Open WhatsApp si se desea       | Se abre web/app según dispositivo                      | Servicio externo, número existente y saludo neutro; solo el visitante decide enviar. No se copia historial |
| Cierre/foco      | Escape, Tab/Shift-Tab y X                              | X o Escape con teclado; desplazar More topics          | Foco vuelve al launcher; header del diálogo mantiene cierre accesible; al reabrir empieza de cero          |
| Menú             | Comprobar header y herramientas                        | Abrir Menu y cerrarlo                                  | Ayuda oculta durante menú/herramientas; no dos paneles compitiendo                                         |

La revisión puede abrir WhatsApp, pero no necesita enviar un mensaje real. No probar reservas, formularios o Studio sobre Preview compartida. No hay entrada de datos en el panel.

## Pruebas y límites

Script reproducible: scripts/qa/assistant-review.mjs, con Playwright instalado fuera del proyecto mediante PLAYWRIGHT_MODULE y opcional QA_CHROMIUM_PATH. Inicia su propio next start local, bloquea destinos externos y todos los métodos distintos de GET/HEAD. No añade dependencias de navegador a package.json/CI. El script verifica estados visibles, diez temas, foco, Escape, destinos, menú móvil, recarga, almacenamiento y ausencia de asistente en Studio.

Evidencia local: docs/screenshots/assistant-review-2026-10-09/qa-results.json y PNG a 1440/390/320. Son pruebas de la UI local, no validación humana ni prueba del contenido alojado. Las capturas se inspeccionaron y se corrigió el botón WhatsApp para evitar su salto de línea a 320 px.

Las fuentes oficiales siguen como candidatos de futura fase; ningún portal se consulta desde el asistente. Fuente publicada no equivale a respuesta aprobada. Revisión de vigencia y conflictos del catálogo está gobernada por git y revisión humana, sin ingestión dinámica ni mecanismo autónomo de actualización.

CI, SHA y deployment concretos se registran en el PR y checkpoint final. Merge y revisión humana pendientes. Generativo requiere decisión separada de proveedor, conocimiento normativo profesionalmente revisado, tratamiento/retención y presupuesto.

Studio: QA completa de roles, conflictos, recuperación y Storage sigue pendiente del stack local aislado; no se ejecuta ni declara cerrada aquí. Pendientes legales/Sarah continúan en su solicitud canónica. Este bloque no afecta Rubik ni los otros repositorios.
