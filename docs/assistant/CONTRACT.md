> Actualización 10 octubre 2026: PR60 fusionado, UI guiada aprobada por Juanma; búsqueda local, historial efímero, borrado y resumen revisable sustituyen los límites históricos v1. Producción del asistente sigue deshabilitada. [Handoff y propuesta de invitación contextual](../HANDOFF-CLAUDE-CODE-2026-10-10.md): la captura de atención pasa de exclusión v1 a nuevo alcance planificado, SIN implementar aún; una invitación por visita, sin autoapertura, perfil o persistencia. Umbrales/copy son hipótesis para revisión. No se habilita IA o fuente normativa por este cambio documental.

> Review-layer amendment, 2026-10-10: [local topic finder and reviewed WhatsApp topics](CONVERSATION-REVIEW-2026-10-10.md) supersedes v1 input/memory/fixed-opener limits for INTERNAL_TEST_ONLY. Production remains disabled. The following text records the v1 baseline.

# Contrato funcional propuesto v1

Actualización: contrato guiado autorizado por Juanma para implementación/revisión de Preview el 2026-10-09; APPROVED_WITH_CONDITION + INTERNAL_TEST_ONLY. Ver ../ASSISTANT-WHATSAPP-REVIEW-2026-10-09.md para el código realizado. La ampliación generativa y fuentes normativas permanecen propuestas; no se describe una API conectada o publicación definitiva.

## Identidad y propósito

Identificarse como asistente digital de Sarah Katerina, nunca como Sarah. Ayudar a encontrar las páginas existentes de Property Purchase, Investment, Tax Advisory, Team, Insights, Case Studies y Contact. Usar exclusivamente respuestas del catálogo aprobado.

No interpretar normativa, determinar obligaciones individuales, calcular impuestos, recomendar inversiones, prometer rentabilidad, precios, disponibilidad, tiempos de respuesta, credenciales o resultados. No reservar citas ni asegurar qué persona responderá. No convertir un formulario de solicitud en confirmación.

## Conocimiento y aprobación

Cada respuesta necesita ID, texto exacto, fuente concreta, versión/SHA, alcance, estado y registro de aprobación. Solo se incorpora a la compilación cuando esté aprobada y sus fuentes sean elegibles. El catálogo documental de esta rama está pendiente; no debe importarse al runtime.

Una página accesible, un artículo publicado o un campo marcado confirmed no bastan por sí solos para aprobar una respuesta nueva. No importar automáticamente contenido de Studio, notas, drafts, repositorio estratégico completo, Media Library ni documentos legales de revisión.

Cambios de fuente que alteren una afirmación suspenden la respuesta hasta revisión. Ante conflicto, ausencia o aprobación caducada se muestra el fallback A12 y contacto humano. La jerarquía estratégica upstream resuelve autoridad de marca; asuntos normativos requieren revisor competente. No mezclar reglas de distintas jurisdicciones.

## Memoria

Solo estado React en memoria: opción activa y navegación dentro del panel abierto. Al cerrar, salir de la ruta o recargar, volver al inicio y liberar el estado. Sin localStorage, sessionStorage, cookies, identificadores de visitante, historial, sincronización entre dispositivos ni memoria compartida.

No guardar ni transmitir elecciones del panel, conversaciones o perfiles. No registrar mensajes en analytics, errores, consola o backend. Esta especificación no promete que los servicios de infraestructura externos carezcan de registros técnicos: deben auditarse por separado.

V1 no admite texto libre, uploads ni solicitud de nombre, email, teléfono, pasaporte, NIE, ingresos o documentos. Si en el futuro se añade texto libre, es un cambio de contrato con minimización, avisos, tratamiento y evaluación específicos.

## Acciones autorizadas para la implementación posterior

| Acción                            | Efecto                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------- |
| Abrir/cerrar, elegir tema, volver | Solo estado efímero; sin petición al backend                                     |
| Ver una página                    | Navegación a una ruta existente; sin mutación                                    |
| Contact                           | Ruta /preview/contact para revisión; resolver canónico para entornos posteriores |
| WhatsApp                          | Abrir wa.me del teléfono ya confirmado, solo tras clic                           |
| Teléfono/email                    | Usar el resolver de canales existente; no crear destinos nuevos                  |
| Reserva                           | Ir a Contact; no crear una cita desde el panel                                   |

WhatsApp usa un saludo neutro aprobado para el asistente, sin elecciones previas, URL visitada, identidad, documentación ni historial. El visitante decide enviar desde WhatsApp. Advertir que se abre un servicio externo; no cargar SDK, iframe, pixel, embed ni API antes o después de abrir el panel.

Cuando email o reserva no estén configurados no mostrar un enlace ficticio ni prometer que funcionan. Derivar a Contact y al canal confirmado disponible. Ninguna acción consume tokens de IA; abrir WhatsApp implica comunicación directa del visitante con ese servicio, no automatización nuestra.

## Interfaz e idioma

Inglés inicial para mantener coherencia con las rutas EN. Español del catálogo es traducción de revisión, no aprobación de rutas ES. No hreflang nuevo. Un solo launcher de ayuda; WhatsApp dentro del panel y en Contact, sin dos controles flotantes compitiendo.

Panel cerrado inicialmente, sin apertura automática, sonido o captura de atención. No tapar menú, banners de consentimiento ni CTA; coordinar exclusión con menú móvil. Semántica de diálogo, etiqueta de botón, foco visible, trap y retorno al launcher, Escape, 44px mínimo, reducido movimiento, sin overflow desde 320px. Usar componentes y tokens existentes.

## Seguridad y futuro generativo

V1 es una máquina de estados determinista: no interpreta instrucciones del visitante ni ejecuta herramientas. Si posteriormente hay modelo, las fuentes recuperadas se tratan como datos; no pueden cambiar reglas, habilitar herramientas o acceder a sistemas privados. Sin herramientas de escritura, pagos, reservas o CRM por defecto.

Generativo requiere nueva aprobación concreta de proveedor/modelo, límite de gasto, credenciales gestionadas fuera del repo, retención, transferencias, recuperación con referencias por respuesta, vigencia de cada regla y responsable humano. Un disclaimer no sustituye estos controles.
