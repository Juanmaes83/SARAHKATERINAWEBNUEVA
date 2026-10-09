# Catálogo de respuestas v1 para revisión humana

Estado de TODOS los textos: PROPOSAL / PENDING_APPROVAL. Idioma de implementación propuesto: EN. ES se ofrece para revisión de Juanma; no habilita traducciones del sitio.
Base de las fuentes S01–S08: `5b3b5cc45bfefe1afb87228a846945c47edcc6e9`; ver KNOWLEDGE-REGISTER.md.

V1 muestra opciones, sin interpretar texto libre. Los nombres de temas internos no son un compromiso de navegación nuevo. Las rutas /preview son destinos de revisión; usar el registro canónico existente al decidir otros entornos.

## A01 — Inicio / identidad

EN: I’m the Sarah Katerina digital assistant. I can help you find information on this website or open a contact option.

ES revisión: Soy el asistente digital de Sarah Katerina. Puedo ayudarte a encontrar información en esta web o abrir una opción de contacto.

Acción: Opciones temáticas

Fuente: CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A02 — Comprar una propiedad

EN: You can explore the Property Purchase page or contact the team about your plans.

ES revisión: Puedes consultar la página Property Purchase o contactar con el equipo sobre tus planes.

Acción: /preview/property-purchase; /preview/contact

Fuente: S01,S02. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A03 — Inversión

EN: You can explore the Investment page. For a question about your own situation, use Contact.

ES revisión: Puedes consultar Investment. Para una pregunta sobre tu situación, utiliza Contact.

Acción: /preview/investment; /preview/contact

Fuente: S01,S02. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A04 — Fiscalidad

EN: You can explore Tax Advisory or contact the team. This assistant does not assess your personal tax situation.

ES revisión: Puedes consultar Tax Advisory o contactar con el equipo. Este asistente no evalúa tu situación fiscal personal.

Acción: /preview/tax-advisory; /preview/contact

Fuente: S01,S02,CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A05 — Equipo

EN: You can read the Team page here.

ES revisión: Puedes consultar aquí la página Team.

Acción: /preview/team

Fuente: S01,S02. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A06 — Artículos

EN: You can browse Insights. Articles do not provide an assessment of your individual situation.

ES revisión: Puedes consultar Insights. Los artículos no evalúan tu situación individual.

Acción: /preview/insights

Fuente: S01,CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A07 — Casos

EN: You can browse Case Studies. They are not a promise of a particular result for you.

ES revisión: Puedes consultar Case Studies. No son una promesa de un resultado concreto para ti.

Acción: /preview/case-studies

Fuente: S01,CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A08 — Contacto

EN: Choose a contact option on the Contact page. A request is not a confirmed appointment.

ES revisión: Elige una opción en Contact. Una solicitud no es una cita confirmada.

Acción: /preview/contact

Fuente: S04,CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A09 — Oficina

EN: The office address shown on the website is Calle Bazán 10, 03181 Torrevieja, Alicante. Office meetings are by prior request.

ES revisión: La dirección publicada es Calle Bazán 10, 03181 Torrevieja, Alicante. Las reuniones en la oficina se solicitan previamente.

Acción: /preview/contact

Fuente: S03. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A10 — WhatsApp

EN: This opens WhatsApp, an external service. Nothing is sent until you choose to send it there.

ES revisión: Se abrirá WhatsApp, un servicio externo. No se envía nada hasta que decidas enviarlo allí.

Acción: Resolver existente; saludo: Hi Sarah, I would like to get in touch.

Fuente: S04,CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A11 — Precios/disponibilidad

EN: I can’t confirm prices or availability here. Please contact the team.

ES revisión: Aquí no puedo confirmar precios ni disponibilidad. Contacta con el equipo.

Acción: /preview/contact

Fuente: CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## A12 — Sin respuesta aprobada

EN: I don’t have an approved answer for that. Please contact the team about your question.

ES revisión: No tengo una respuesta aprobada para eso. Contacta con el equipo para consultar tu pregunta.

Acción: /preview/contact

Fuente: CONTRACT. Aprobador: pendiente. Fecha de aprobación: pendiente. Alcance: orientación y navegación, no asesoramiento.

## Cómo aprobar y modificar

La revisión debe indicar IDs aceptados, texto exacto o corrección, idioma, aprobador y fecha. Juanma coordina la aprobación de marca con Sarah; un nuevo contenido fiscal/legal/financiero necesita además revisión competente. Al editar un texto se invalida la aprobación anterior de ese texto. Mantener historial en git y acta de decisión; nunca sustituir pending por approved en bloque por el mero merge de documentación.

Se propone que el primer menú ofrezca A02, A03, A04 y A08, y un grupo de recursos A05–A07/A09. A10 es una acción voluntaria, A11 y A12 alternativas guiadas. La composición final del panel requiere revisión visual.
