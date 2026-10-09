# Chatbot y WhatsApp — siguiente bloque, 9 octubre 2026

Estado: propuesta técnica ejecutable, NO IMPLEMENTADA, NO CONECTADA. Juanma exige avanzar después del cierre técnico/legal pendiente; la definición puede prepararse mientras se espera QA local.

## Lo que existe

`lib/contact/channels.ts` define teléfono/WhatsApp +34 647 754 589 y genera enlace wa.me con texto neutro. Contacto incluye teléfono, WhatsApp y email configurado por entorno. No existe por ello chatbot, WhatsApp Business API, proveedor OAuth ni automatización real. No pedir otra vez número/calle/email.

## Primera entrega propuesta

- Un solo acceso discreto de ayuda, identificado como asistente de Sarah Katerina; apertura deliberada, sin popups automáticos.
- Opciones de compra, fiscalidad, inversión, artículos y hablar con una persona; respuestas limitadas a contenido aprobado y enlaces reales. No aparentar un modelo IA si solo hay navegación guiada.
- Reutilizar WhatsApp existente para derivación manual. El clic abre un tercero con mensaje genérico; no envía el mensaje automáticamente ni transmite historial/datos del usuario por defecto.
- Escritorio: acceso que no tape CTA; móvil: sin superponerse con menú, footer legal o consentimiento. Panel operable con teclado, foco controlado/restaurado, Escape y cierre visible; targets44 y movimiento reducido.
- UI y contenido propuestos en rama propia/Draft PR, desktop1440/mobile390 y320, Preview noindex. Human review ANTES del merge de cambios visibles. Preservar tokens, Page Registry, Studio, Media Library y Project State.
- Preguntas generales sobre proceso/servicios; derivar consultas fiscales personales. No recoger pasaportes, NIF personales, documentos financieros ni prometer horarios/resultados no confirmados.
- Sin proveedores, embeds, almacenamiento de conversaciones ni analítica opcional hasta decisión expresa. No costes ni secretos nuevos.

## Segunda entrega, condicionada

Conversación generativa requiere elegir proveedor/modelo, presupuesto/límites, retención y responsable; confirmar base de conocimiento y evaluación de respuestas. Automatización WhatsApp requiere cuenta/proveedor/API y webhook/auth verificados, decisión explícita de costes y privacidad. No usar sesión personal/QR ni repositorios ajenos como prueba de integración autorizada.

## Validación y cierre

Distinguir demostración/navegación guiada de chatbot IA real, enlace WhatsApp de envío/automatización, tests de UI de conexión del proveedor. Entregar URLs exactas, rol, pasos y efecto de botones. QA aislada Studio sigue en handoff local; datos básicos legales ya completos, textos/decisiones pendientes siguen identificados en solicitud breve. Esta preparación no cierra todas las URLs ES ni el diagnóstico de pago.
