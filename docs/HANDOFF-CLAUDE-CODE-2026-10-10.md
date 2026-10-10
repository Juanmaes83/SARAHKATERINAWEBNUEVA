# Handoff a Claude Code — 10 octubre 2026

Documento operativo interno. Estado comprobado contra main `9f89ab2b7012e81bacc659d16f6dbaad89a0a656`. No acredita conexiones o pruebas alojadas nuevas. Este handoff supersede los estados anteriores de asistente pendiente de revisión/merge, sin cancelar decisiones históricas de marca o publicación.

## Objetivo y meta de cierre

Completar una web fiable de Sarah Katerina con Studio funcional, asistente digital útil y cercano, respuestas sustentadas en conocimiento aprobado, derivación humana y captación por canales realmente conectados. Meta: candidato completo revisable y, tras resolver decisiones humanas y aprobar el corte, lanzamiento verificable con dominio/HTTPS, legal, consentimiento y SEO. No equiparar código, merge, despliegue, conexión, aprobación humana, lead o indexación.

Repositorio de trabajo: Juanmaes83/SARAHKATERINAWEBNUEVA. Juanmaes83/sarahkaterina es autoridad estratégica/activos, solo lectura; Sarah-Katerina-Buyer-System solo lectura. No trabajar en Rubik ni otros proyectos.

## Checkpoint verificado

- PR #60 fusionado por squash el 10 octubre: `9f89ab2b7012e81bacc659d16f6dbaad89a0a656`. HEAD aprobado: `03745faca8aae41b0c77328a873b8da96e7a8e1b`.
- PR #59 cerrado como sustituido. Su HEAD 28ce048 está íntegramente incluido en #60; no fusionarlo ni reconstruirlo.
- Juanma confirmó escritorio, móvil, transferencia WhatsApp, borrado y cierre OK. Aprobación de UI guiada; no de IA generativa, corpus fiscal, producción del asistente o integraciones futuras.
- QA del HEAD: lint 0 errores/8 avisos Studio heredados, typecheck/build PASS, 482/482 tests en 34 suites sin skips; captura de 55 rutas; Chromium local en siete tamaños. CI tres checks success. No afirmar ejecución remota del navegador.
- Preview aprobado: https://sarahkaterina-web-nueva-hrktbib00-juanma-espinosas-projects.vercel.app/preview/home. Vercel dpl_FzRMLajCLfDwF8xiiJ2jY3hCcq26 READY para HEAD aprobado; protegido. Es el Preview de la rama, no prueba del nuevo deployment main. Verificar despliegue del merge por separado.
- Implementado: catálogo fijo EN, búsqueda local por palabras clave, historial efímero de ocho respuestas, borrado, enlaces relacionados y resumen WhatsApp seleccionable. La pregunta escrita no se guarda ni se comparte; wa.me abre un mensaje que el visitante decide enviar. No Business API.
- Asistente fuera de Studio/foundation/API y deshabilitado en deployments production según contrato/código; merge no habilita producción. Auditar feature gate antes de cualquier activación.
- Sin assistant-ui/AI SDK/CopilotKit, modelo generativo, RAG o fuentes que fundamenten cada respuesta.
- Publicaciones alojadas 8 artículos + 4 casos: evidencia histórica del 8 octubre, no nueva consulta. PR52 declara otros tres drafts, no publicados. No reimportar ni sobrescribir.
- Preview y producción comparten BD según documentación. Ninguna QA mutadora contra esos entornos.
- Titular/CIF/domicilio y contactos ya aportados por Juanma. No volver a pedirlos ni publicarlos desde recuerdos; recuperar por canal privado autorizado si el redactor no tiene los valores.

## Lectura inicial obligatoria y comprobaciones

Leer README.md, AGENTS.md, docs/PROJECT-STATE-2026-10-09.md y su actualización del 10, docs/ROADMAP-LAUNCH-2026-10-08.md, este documento; después:
- docs/assistant/CONTRACT.md, KNOWLEDGE-REGISTER.md, CONVERSATION-REVIEW-2026-10-10.md, UX-REVIEW-2026-10-10.md y catálogo/README del asistente.
- docs/STUDIO-ISOLATED-QA-2026-10-09.md, STUDIO-LOCAL-EXECUTION-HANDOFF-2026-10-09.md.
- docs/SARAH-CLOSEOUT-REQUEST-2026-10-09.md, LEGACY-MIGRATION-2026-10-09.md y registros SEO/publicación.
Hacer fetch; comprobar main, ramas, PRs y HEAD/CI reales antes de editar. Respetar cambios paralelos. Los documentos de septiembre y algunos párrafos del 9 son históricos. Una decisión posterior explícita prevalece solo para su alcance.

## Plan de trabajo, responsables y aceptación

### A. Conocimiento y fuentes — siguiente implementación

Claude: auditar respuestas existentes y fuentes exactas; catálogo tipado versionado con ID, texto, fuente pública, extracto que sostiene la afirmación, versión/SHA, ámbito/jurisdicción si aplica, estado, aprobador/fecha y caducidad/revisión. Separar fuentes internas de gobernanza de citas públicas. Enlazar a contenido que sostenga la respuesta, no etiquetar como fuente un enlace solo relacionado. Filtrar drafts/proposal/notas/secretos/medios sin permiso. Fuente modificada, ausente, caducada o contradictoria bloquea respuesta y ofrece ayuda humana. Preparar UI de fuentes y pruebas positivas/negativas antes de añadir generación.
Juanma/Sarah/revisor competente: aprobar textos/corpus y responsables de revisión, especialmente fiscal/legal/financiero. Un artículo publicado no equivale a aprobación normativa.
Aceptación: cada respuesta habilitada tiene evidencia aplicable y trazabilidad; las no aprobadas no se presentan como conocimiento fiable. No indexar todo el repositorio ni Studio.

### B. Invitación contextual de ayuda — nueva tarea, sin implementar

Claude: desarrollar en rama propia después del paquete A o en paralelo con archivos independientes. Implementar señales locales en memoria, una intervención discreta por visita:
1. 45 segundos activos en la página de servicio actual Y >=50% recorrido.
2. O tres páginas distintas durante la visita, incluyendo un servicio.
Estas cifras son hipótesis iniciales; no prueba de intención comercial. Pausar el contador cuando la pestaña no esté visible; reiniciar tiempo/progreso por ruta. Definir el 50% con altura desplazable y resolver páginas sin scroll sin disparos instantáneos. Contar rutas elegibles distintas normalizadas, no cambios de hash/query ni navegación repetida; excluir Studio/API/auth/foundation/legal/error y visitas programáticas.
Usar provider/layout existente para mantener señales en memoria entre rutas cliente; no identidad, cookies, almacenamiento persistente o perfiles. Una recarga inicia visita nueva si no existe decisión específica para otra persistencia. Definir claramente esta limitación.
Invitación: luminosidad suave + un pulso con tokens existentes; mensaje breve y acciones Resolver una duda / Ahora no (web EN: propuesta equivalente a revisar). No autoabrir panel, sonido, parpadeo repetido, engaño o urgencia artificial. Reducido movimiento: señal estática. No superponer menú, consentimiento, CTA o controles móviles. Cancelar temporizadores/listeners al desmontar.
Si abre el asistente, descarta o cierra invitación: suprimir más avisos durante la visita, incluso al cambiar ruta. Si menú/overlay está abierto: diferir sin consumir la única invitación; probar coordinación.
Contexto de compra/fiscalidad prioriza temas pertinentes sin fingir que conoce al visitante. Identificarse como digital y permitir hablar con Sarah. Revisar resumen antes de compartir; no incluir rutas, señales, pregunta libre o datos personales automáticamente.
Juanma: revisar EN/copy, intensidad visual y relevancia en móvil/escritorio; aprobar umbrales tras prueba. Analítica real requiere decisión de proveedor y consentimiento aparte.
Aceptación: probar tiempo con pestaña oculta, scroll, tres rutas, navegación/revisitas, supresión entre rutas, reduced-motion, teclado, exclusión Studio y no interferencia. Mostrar Preview específico y capturas.
Medición futura: exposición, apertura, ayuda y contacto iniciado; abrir WhatsApp no equivale a lead ni reserva. No almacenar texto de conversación o activar tracking antes del consentimiento.

### C. Conversación generativa y recuperación documental

Claude: evaluar compatibilidad/licencias/mantenimiento/seguridad/tamaño de assistant-ui y Vercel AI SDK con stack real; CopilotKit solo si acciones justifican complejidad. No integrar los tres por defecto ni elegir por estrellas/forks. Fijar versiones; fork solo si modifica upstream. Preparar respuestas simuladas y fallback sin consumo, motor de recuperación de corpus aprobado con pruebas de relevancia, evidencia y contradicciones. No exigir vector DB si un corpus pequeño permite búsqueda simple.
Tras decisiones: proveedor en servidor, claves fuera del repo, límites de tokens/presupuesto/rate, protección abuso, timeouts/cancelación/reintentos limitados, errores y fallback humano; monitorización sin mensajes sensibles. Modelo no ejecuta instrucciones de documentos recuperados ni herramientas de escritura. Sin respuestas fiscales personalizadas, promesas o precios inventados. Probar alucinaciones, fuentes caducadas, prompt injection, falta de evidencia, idiomas y caída proveedor. No llamar modelo en cada scroll.
Juanma/Sarah: aprobar alcance/idiomas, proveedor/modelo, presupuesto y límite de gasto, retención/transferencias/tratamiento y responsable humano. Claude entrega opciones concretas antes de pedir decisiones; no necesita esas decisiones para preparar código/mocks.
Aceptación: respuesta apoyada en fuentes elegibles o abstención útil, costes limitados, privacidad aprobada, experiencia accesible y QA real del proveedor conectado solo tras autorización.

### D. Contacto e integraciones

Claude: inventariar resolver lib/contact/channels.ts y conexiones existentes. Mantener WhatsApp manual revisable como opción inmediata. Email/teléfono solo confirmados/configurados. No renderizar reserva/video ficticios.
Para WhatsApp Business API, CRM y agenda: diseñar interfaces/mock, seleccionar integración, permisos mínimos, consentimiento de compartir, webhooks autenticados/verificados, idempotencia, deduplicación, reintento/error, trazabilidad y borrado/retención. Sandbox separado; no enviar mensajes reales de prueba a clientes. Diferenciar contacto solicitado, lead registrado y cita confirmada; probar recepción/entrega con cuenta autorizada. Email: comprobar entrega/reply-to/errores; configurar DNS de correo solo con aprobación y valores reales. Videollamada depende de agenda/proveedor real, no de un botón.
Juanma/Sarah: decidir necesidad y prioridad (no implantar todo por obligación), CRM/agenda/cuenta Business, presupuesto, propietario/permisos, destinatarios, atención real y tratamiento. Facilitar accesos delegados/secrets por canales seguros; no passwords en chat.
Aceptación: cada canal visible funciona de extremo a extremo y el visitante entiende qué ha sucedido; no confundir sandbox con producción.

### E. Studio — QA aislada y correcciones

Claude: comprobar Docker/Supabase CLI disponibles en equipo local; crear stack desechable específico con Auth/PostgreSQL/Storage/SMTP/TLS y egreso restringido. No usar contenedores ajenos ni copiar datos reales. Ejecutar guardas/scripts existentes, fixtures sintéticos y matriz completa:
anónimo y miembro inactivo; contributor/editor/publisher/admin; create/save/reload/send/review/approve/publish; notas bloqueantes; API y RLS; dos sesiones/conflicto409 sin sobrescritura; restauración auditable; recuperación e invitaciones/cuenta nueva-existente y tokens usados/caducados; Media Library original/variantes/metadatos/derechos/selección, MIME falso/corrupto/tamaño>15MB, fallo/reintento/residuos; overrides permitidos y ausencia de filtraciones draft; teclado/móvil/consola/red.
Leer migrations/roles actuales, no inventar permisos. Clasificar PASS/FAIL/BLOCKED con DB/Storage/HTTP y capturas sin secretos. Corregir fallos reproducidos. Preparación/unit tests no cierra E2E.
Juanma: permitir uso del equipo local con Docker y validar UI final; cualquier ensayo mutador alojado requiere alcance y dataset autorizados aparte. Confirmar roles reales deseados; no reinvitar cuentas por defecto.
Aceptación: todos los críticos PASS en stack real aislado; no sustitución con mocks/console.log.

### F. Consentimiento, legal y contenido

Claude: reconciliar PR53 antes de implementar banner/preferencias/adapter real; preparación no equivale a consent management funcionando. Denegar servicios opcionales hasta elección válida, posibilidad de rechazo/retirada y pruebas de carga de terceros. Mapear tratamiento real Supabase, consultas, email, WhatsApp, IA, CRM y agenda; preparar textos marcados borrador para revisor. No copiar política antigua Analytics/Stripe/Web3Forms si no describe stack actual. Mantener grafo institucional bloqueado hasta resolver autoridad y reglas.
Revisar PR52 y sus tres drafts sin reimportar/publicar. Corregir notas bloqueantes solo con evidencia. Inventariar permisos de imágenes/testimonios/casos y selección de imágenes principales; no inventar ni repetir imágenes por comodidad.
Juanma/Sarah/asesor: aprobar avisos/privacidad/cookies/condiciones, datos registrales aplicables, retención/base jurídica/transferencias y flujo real de atención; resolver derechos/notas y aprobación editorial. Titular/contactos ya confirmados, no volver a pedir el lote completo.
Aceptación: textos aprobados describen implementación real; consentimiento funciona y servicios opcionales respetan decisión; contenido publicado autorizado.

### G. Migración, rendimiento, lanzamiento y SEO

Claude: conciliar inventario de URLs antiguas, 7 redirects y 10 detalles preservados; pendientes /tax-diagnostic (pago), ES/legales y antiguo dominio español/external. No redirigir checkout a servicio ocultando compra ni enviar ES a EN sin decisión. Verificar rutas públicas/listados/detalles contra datos publicados, no mocks; sitemap/robots/canonical/noindex/HTTP/redirecciones y auth callbacks en dominio final. QA candidato y contrastes/semántica/teclado; medir rendimiento real/Lighthouse y CWV con evidencia disponible, sin declarar CWV aprobados con una captura local. Auditar dependencias/avisos actuales y distinguir runtime/dev sin actualizaciones mayores indiscriminadas.
Preparar TXT/propiedad y A/CNAME reales de Vercel, comprobar HTTPS; preservar MX/TXT/correo, no inventar IPs universales ni cambiar nameservers por comodidad. Verificar autorización vigente antes de corte/indexación: aprobación histórica del 8 seguida de pausa, este merge no reautoriza corte. Asistente production tiene gate adicional: validar antes de abrirlo.
Juanma/Sarah: decidir mantener/adaptar/retirar diagnóstico de pago y sus condiciones/precio/pagos; ES lanzamiento o fase2 y traductor/revisor; dominio/delegación Namecheap, propiedad/acceso GSC/GA y aprobación final de lanzamiento. Claude realiza ingeniería, no trasladar eso a Sarah.
Tras aprobación: deployment exacto y DNS/HTTPS verificados, activar indexación solo en rutas públicas autorizadas y reconstruir, enviar sitemap/inspeccionar GSC. Indexación efectiva depende de Google y se comprueba aparte. SEO off-page: paquete repo estratégico PR38 preparado, no altas ejecutadas; Google Business Profile/Bing/Apple/Hotfrog/Infobel y consistencia NAP requieren titular/accesos. Preparar cambios sin enviar/crear fichas externas sin autorización.
Aceptación: cero bloqueantes críticos, candidato validado humano, migración decidida, dominio/HTTPS/retornos Auth/sitemap/robots comprobados, plan de seguimiento real. Monitorizar404/errores/formularios, consentimiento, costeIA y coberturaGSC; plan de reversión antes del corte.

## PRs pendientes: no duplicar trabajo

Inventario leído el 10 octubre: #53, #52, #47, #46, #45, #37, #31, #15, #14, #12, #6. Revalidar estados.
PR52 (tres drafts) y PR53 (consentimiento) siguen abiertos; revisar diff/CI, dependencia y decisión antes de merge. PR45/46/47 y otros antiguos pueden estar total/parcialmente incorporados según documentación: comparar árbol/diff/ancestros, rescatar solo pendientes válidos y cerrar como sustituidos únicamente tras justificar y autorización. No fusionar todos por estar abiertos, no borrar ramas como limpieza automática.

## Trabajo inmediato de Juanma, agrupado

1. Revisar/aprobar respuestas/corpus y responsables; contenido fiscal/legal necesita revisor competente.
2. Resolver una ficha de decisiones IA (alcance, idiomas, proveedor/modelo, límite gasto, datos) y una de contacto (quién atiende, CRM/agenda/API si necesarios).
3. Coordinar con Sarah/asesor privacidad, registro aplicable, permisos de contenido y notas bloqueantes; datos básicos ya cerrados.
4. Resolver diagnóstico de pago y ES; facilitar delegación dominio/GSC/cuentas sin contraseñas.
5. Validar cada Preview visual y autorizar merge por paquete. Confirmar aparte corte/indexación y activación del asistente público.
Claude debe preparar opciones/borradores primero y agrupar preguntas imprescindibles; continuar trabajos independientes sin esperar decisiones ajenas.

## Método de ejecución y entrega a auditoría Codex

- Trabajar desde main actualizado en ramas acotadas; no editar main directamente. Handoff documental puede estar en PR nuevo: leer esa rama antes de empezar, no suponer que fue fusionada.
- Orden: reconciliación → A conocimiento/fuentes → B invitación contextual → C IA tras decisiones; E QA aislada y F legal/consentimiento pueden avanzar en paralelo sin pisar archivos; D integraciones según prioridad; G lanzamiento al final.
- Respetar diseño/tokens/imagenes aprobadas y gobernanza upstream. Web EN, no rutas ES ficticias. No ampliar avisos de captación a producción sin gate revisado.
- Ejecutar lint/typecheck/tests/build y HTML capturado para cambios de producto. Pruebas significativas de cada nuevo bloque, Playwright/Chromium con capturas inspeccionadas en móvil/escritorio; buscar específicamente regresión de lectura tras tax/compra/historial/WhatsApp. CI/deployment del mismo SHA.
- No instalar/forkear librerías o activar servicios como sustituto de resolver requisitos. Sin gasto, secrets, cambios DNS, mensajes externos, datos reales o activación proveedor sin decisión concreta.
- Draft PR con problema, comportamiento, pruebas, límites, decisiones y URL exacta; merge visual requiere aprobación humana. No esperar créditos Codex para ingeniería que Claude puede ejecutar.
- Actualizar roadmap/estado por paquete con responsable, dependencias, PASS/FAIL/BLOCKED y evidencia. No declarar todo finalizado si existe dependencia humana; preparar lo concreto antes de pedir aprobación.
- Entrega final para Codex: SHA main, PRs/CI, URLs de deployment/producción, matriz pruebas/evidencias, decisiones humanas, fuentes/corpus versionado, proveedores reales y costes previstos (sin secretos), resultados aislados Studio, estado legal/consentimiento/migración/DNS/indexación y pendientes honestos. Auditoría Codex posterior no sustituye estos checks.
