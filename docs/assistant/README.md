# Asistente Sarah Katerina — contrato propuesto v1

Fecha: 2026-10-09. Base auditada: `5b3b5cc45bfefe1afb87228a846945c47edcc6e9`.
Actualización: Juanma autorizó implementar este catálogo y continuar hasta revisión visual. Alcance APPROVED_WITH_CONDITION + INTERNAL_TEST_ONLY: asistente guiado en Preview; revisión humana antes de merge. No se atribuye aprobación a Sarah ni permiso PUBLIC_PRODUCTION.

- [Contrato, memoria y acciones](CONTRACT.md)
- [Registro de conocimiento y fuentes oficiales](KNOWLEDGE-REGISTER.md)
- [Catálogo de respuestas para revisión](RESPONSE-CATALOGUE.md)
- [Matriz de aceptación y entrega](ACCEPTANCE.md)
- [Paquete B: invitación contextual de ayuda (10 octubre)](INVITATION-PACKAGE-B-2026-10-10.md)

La primera versión propuesta es un asistente guiado por opciones, sin campo de texto libre ni modelo generativo. Un botón de ayuda abre un panel y ofrece derivación voluntaria al WhatsApp existente. No es una API de WhatsApp, no envía mensajes y no representa a Sarah como interlocutora presente.

El PR documental inicial #58 se continúa en el bloque de implementación: panel guiado y derivación al WhatsApp existente. Ver [entrega de revisión](../ASSISTANT-WHATSAPP-REVIEW-2026-10-09.md). No añade consultas a Studio, proveedor, cookies, almacenamiento ni API WhatsApp. El único Project State sigue siendo ../PROJECT-STATE-2026-10-09.md; Page Registry y Media Library se preservan.

## Secuencia de ejecución

1. Autorización de Juanma para implementación/revisión registrada en la entrega y en content/en/assistant.ts.
2. Panel guiado implementado con contactos del resolver existente y sin datos alojados.
3. Pruebas locales y entrega de Draft PR/Preview; resultados específicos en la entrega.
4. Revisión visual humana pendiente antes de merge. Datos básicos confirmados no se vuelven a pedir.
5. Publicación, indexación, copy comercial nuevo y proveedores siguen teniendo gates propios.

La propuesta de IA generativa quedará en otra decisión: conocimiento recuperado y citado, proveedor, contrato de tratamiento, retención, costes máximos, defensa ante inyección, supervisión y evaluación. No se habilita por disponer de una clave.

## Autoridad y permiso de publicación

Separar dos ejes upstream: decisión del sistema y permiso de publicación. La implementación de revisión está APPROVED_WITH_CONDITION + INTERNAL_TEST_ONLY por Juanma. Las fuentes normativas y la IA generativa permanecen NEEDS_DECISION + REFERENCE_ONLY. Aprobar una demo de Preview no habilita PUBLIC_PRODUCTION.
