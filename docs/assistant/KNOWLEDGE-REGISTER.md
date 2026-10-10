> Actualización 10 octubre 2026 (paquete A): el registro se implementa como código verificado en `content/en/assistant-evidence.ts` con extracto, huella, versión, caducidad y bloqueo por respuesta. Las etiquetas S01–S08 quedan como inventario histórico. Ver [paquete A](KNOWLEDGE-PACKAGE-A-2026-10-10.md).

# Registro propuesto de conocimiento y fuentes

Base auditada: `5b3b5cc45bfefe1afb87228a846945c47edcc6e9`. Fecha: 2026-10-09.
Las fuentes de negocio se inspeccionaron en ese SHA; no se consultó ni modificó la BD alojada.

## Inventario de negocio

| ID  | Fuente exacta                                                               | Uso permitido tras aprobación del catálogo                     | Exclusión                                                              |
| --- | --------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| S01 | content/en/site-navigation.ts                                               | Nombres y rutas existentes del menú                            | No inferir alcance de servicios                                        |
| S02 | content/en/service-journey.ts, SERVICE_ROUTES                               | Rutas de Investment, Property Purchase, Tax Advisory y Team    | Preguntas y copy mayoritariamente proposal; no respuestas comerciales  |
| S03 | content/en/contact.ts, office.addressSource y office.visiting               | Dirección pública y reunión por solicitud previa               | No inventar visitas libres ni horarios de respuesta                    |
| S04 | content/en/contact.ts, direct.channelsSource; resolver de canales existente | Contact como destino; reutilizar teléfono/WhatsApp configurado | Email/booking dependen de configuración; sin asumir conexión OAuth/API |
| S05 | lib/content/claims.ts                                                       | Estados de claims y promesa aprobada                           | Confirmed no equivale a aprobación de cualquier paráfrasis             |
| S06 | AGENTS.md + README.md                                                       | Límites y gobernanza de esta aplicación                        | No exponer documentos internos al visitante                            |
| S07 | docs/PROJECT-STATE-2026-10-09.md                                            | Estado técnico y prohibición de QA alojada mutadora            | No fuente pública de respuestas                                        |
| S08 | docs/CHATBOT-WHATSAPP-NEXT-BLOCK-2026-10-09.md                              | Propuesta de UX y separación de conexión real                  | No afirmar que el asistente existe                                     |

Contrato de aprobación: registrar para cada ID versión, aprobador, fecha, fuente y SHA vigente. Revisión propuesta antes de cada release y a los 90 días para contacto/navegación; una modificación relevante obliga a revisar antes, sin esperar ese plazo. Cadencia propuesta, no requisito legal.

Upstream estratégico es autoridad, solo lectura. Consultar decisiones concretas si se amplía copy; registrar SHA/path y estado. No indexarlo entero ni convertir activos en conocimiento. No hay corpus vectorial, embeddings o buscador implementado.

## Fuentes oficiales candidatas para una fase futura

Estas referencias son un inventario de descubrimiento, NO conocimiento normativo aprobado ni conexión API. V1 no responde tipos impositivos, plazos o instrucciones tributarias. No habilitar extracción automática de estos sitios.

| ID  | Organismo y URL exacta                                       | Ámbito candidato                                                                            | Comprobación del 9 octubre                                                        | Habilitado para respuestas |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------- |
| O01 | AEAT — https://sede.agenciatributaria.gob.es/                | Información estatal; seleccionar página/modelo concreto en cada expediente de conocimiento  | Página raíz abierta; no validación de una regla fiscal                            | No                         |
| O02 | BOE — https://www.boe.es/legislacion/                        | Texto normativo; identificar norma, artículo, versión y vigencia                            | Índice abierto; sin selección o interpretación de norma                           | No                         |
| O03 | Agència Tributària Valenciana — https://atv.gva.es/es/itpajd | ITP/AJD de Comunitat Valenciana, sujeto a revisión                                          | Resultado de búsqueda localizado; apertura directa falló. Accesibilidad pendiente | No                         |
| O04 | SUMA — https://www.suma.es/                                  | Información tributaria local del organismo; comprobar municipio/tributo/delegación concreta | Página raíz abierta; sin validar ámbito de un caso individual                     | No                         |

La oficialidad del portal no resuelve aplicabilidad, actualidad, convenios, excepciones ni diferencias municipales. Para ampliar el asistente hacen falta: URL de documento concreto, editor, jurisdicción, materia, fecha efectiva, versión/publicación, fecha de consulta, extracto mínimo autorizado, respuesta propuesta y revisión profesional fechada.

Propuesta de revisión normativa: antes de cada publicación y cada 30 días como máximo; cualquier cambio o discrepancia bloquea la respuesta inmediatamente. La fecha de consulta no es la fecha de vigencia. No resolver conflictos por antigüedad o por el primer resultado de búsqueda.

## Fuentes explícitamente excluidas

Drafts, contenido pending/proposal, artículo publicado sin revisión aplicable, notas editoriales, datos de usuarios, roles/membresías, correos, documentos legales en revisión, secretos/env, registros de formularios, calendarios privados, Media Library, testimonios sin consentimiento y proyectos Rubik/Buyer System. Publicación técnica y aprobación normativa son decisiones distintas.

## Gobernanza estratégica consultada (solo lectura)

SHA: `4b8e190b589d45683aaba294e34641e4b6bb7e32`. Se leyeron brand-system/SOURCE-HIERARCHY.md y brand-system/governance/decision-status-model.md. La primera diferencia realidad comprobada, decisión humana y sistema canónico; el segundo exige estado de decisión y permiso de publicación separados. Una síntesis nueva no queda aprobada porque use datos aprobados. La reproducción de estas reglas no aprueba el catálogo. Antes de implementar verificar que no haya supersesión.
