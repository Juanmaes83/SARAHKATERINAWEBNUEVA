# Asistente Sarah Katerina — contrato propuesto v1

Fecha: 2026-10-09. Base auditada: `5b3b5cc45bfefe1afb87228a846945c47edcc6e9`.
Estado: PROPOSAL / PENDING_CONTENT_APPROVAL. La autorización de Juanma cubre preparar este paquete; no convierte textos nuevos en aprobados por Sarah.

- [Contrato, memoria y acciones](CONTRACT.md)
- [Registro de conocimiento y fuentes oficiales](KNOWLEDGE-REGISTER.md)
- [Catálogo de respuestas para revisión](RESPONSE-CATALOGUE.md)
- [Matriz de aceptación y entrega](ACCEPTANCE.md)

La primera versión propuesta es un asistente guiado por opciones, sin campo de texto libre ni modelo generativo. Un botón de ayuda abre un panel y ofrece derivación voluntaria al WhatsApp existente. No es una API de WhatsApp, no envía mensajes y no representa a Sarah como interlocutora presente.

Este paquete solo documenta. No añade UI, consultas a Studio, proveedor, cookies, almacenamiento, costes ni publicación. No altera Project State, Page Registry o Media Library como sistemas: el único Project State sigue siendo ../PROJECT-STATE-2026-10-09.md.

## Secuencia de ejecución

1. Juanma revisa el texto exacto del catálogo y resuelve con Sarah únicamente nuevas afirmaciones comerciales si las hubiera. Los datos de contacto ya confirmados no se vuelven a pedir.
2. Registrar aprobador, fecha, versión y respuestas aprobadas; no aprobar todo por inferencia.
3. Implementar panel guiado con catálogo explícitamente permitido, contactos del resolver existente y pruebas de la matriz.
4. Entregar Draft PR y enlaces exactos de Preview, escritorio/móvil, sin escribir datos alojados.
5. Revisión visual humana antes de merge. Publicación, indexación y proveedores siguen teniendo gates propios.

La propuesta de IA generativa quedará en otra decisión: conocimiento recuperado y citado, proveedor, contrato de tratamiento, retención, costes máximos, defensa ante inyección, supervisión y evaluación. No se habilita por disponer de una clave.

## Autoridad y permiso de publicación

Separar dos ejes upstream: decisión del sistema y permiso de publicación. Este paquete es NEEDS_DECISION + REFERENCE_ONLY; PROPOSAL/PENDING_APPROVAL son etiquetas de trabajo locales, no un estado aprobado upstream. La aprobación posterior debe registrar ambos ejes, alcance y condiciones. Aprobar una demo de Preview no habilita PUBLIC_PRODUCTION.
