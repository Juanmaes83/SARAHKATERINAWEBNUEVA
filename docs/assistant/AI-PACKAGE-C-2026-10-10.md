# Paquete C — conversación IA y recuperación: evaluación y preparación (10 octubre 2026)

Apilado sobre el paquete A (PR62): usa su registro de elegibilidad. Sin proveedor, claves, dependencias nuevas, endpoint ni gasto. Nada de esto activa IA en Preview ni en production.

## Qué queda preparado (código y pruebas)

| Pieza                | Archivo                                       | Comportamiento                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Corpus aprobado      | `content/en/assistant-corpus.ts`              | Solo respuestas del catálogo elegibles **ahora** (paquete A). Vacío en contexto production. Sin Studio, drafts, documentos del repo ni fuentes oficiales. A12 es la abstención, no un pasaje.                      |
| Filtro de pregunta   | `lib/assistant/grounding.ts` `screenQuestion` | Abstención antes de recuperar si hay datos personales (email, teléfono, NIE/DNI, IBAN, pasaporte) o petición de evaluación individual (cuánto pago, ¿debería…?, mis ingresos, importes). El proveedor no se llama. |
| Recuperación         | `rank`/`retrieve`                             | Palabras clave revisadas por tema, máx. 3 pasajes. Empate entre temas distintos → abstención `ambiguous`. Sin vector DB: el corpus es de 9 pasajes.                                                                |
| Prompt               | `buildPrompt`                                 | Reglas primero; pasajes y pregunta en bloques de datos delimitados; delimitadores y caracteres de control/bidi neutralizados; pregunta truncada a 240.                                                             |
| Verificación         | `isGrounded`                                  | Rechaza: vacío/ABSTAIN, >600 caracteres, ids no recuperados o ausentes, cifras que no estén en los pasajes usados, URLs o rutas.                                                                                   |
| Proveedor            | `AnswerProvider` + `MockAnswerProvider`       | Interfaz con `AbortSignal`; timeout 8 s; cualquier error → abstención `provider-error` sin exponer detalle. El mock devuelve el texto aprobado del mejor pasaje.                                                   |
| Límite de frecuencia | `lib/assistant/rate-limit.ts`                 | Ventana fija con almacén inyectable; propuesta 6/min y 30/día por clave no identificativa. El almacén en memoria NO sirve en serverless.                                                                           |

Pruebas: `tests/assistant-grounding.test.ts` (18) y `tests/assistant-rate-limit.test.ts` (2): corpus elegible/vacío en production/bloqueados fuera; respuesta con cita; sin evidencia, empate y vacío; datos personales sin llamar al proveedor; asesoramiento individual; cifras/enlaces/ids inventados; salida no fundamentada; error y timeout; inyección en pregunta, cierre de bloque, control/bidi, pasaje envenenado; ausencia de claves/SDK/red.

## Evaluación de librerías (npm, consultado 10 oct 2026)

| Criterio         | Vercel AI SDK (`ai` 7.0.x, `@ai-sdk/react` 4.0.x)                                                                                            | assistant-ui (`@assistant-ui/react` 0.15.x)                                                                                             | CopilotKit (`@copilotkit/react-core` 1.78)                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Licencia         | Apache-2.0                                                                                                                                   | MIT                                                                                                                                     | MIT                                                                      |
| Mantenimiento    | Publicación 9 oct 2026; mayor 7                                                                                                              | Publicación 9 oct 2026; **pre-1.0** (rupturas frecuentes)                                                                               | Publicación 9 oct 2026                                                   |
| Compatibilidad   | zod ^3.25.76 (repo 3.25.76 ✓); React ^19.2.1 (repo 19.3.0 ✓)                                                                                 | Arrastra **zod 4** (segunda versión), radix-ui, zustand, `assistant-cloud`                                                              | zod ≥3.25 ✓                                                              |
| Tamaño publicado | `ai` ~8 MB desempaquetado (servidor)                                                                                                         | ~2,8 MB + dependencias UI                                                                                                               | —                                                                        |
| Encaje           | Servidor: streaming, proveedores intercambiables, abort/timeout. Incluye dependencia `@ai-sdk/gateway` (Vercel AI Gateway) aunque no se use. | Sustituiría un panel propio **ya aprobado** por Juanma, con tokens y accesibilidad verificados.                                         | Orientado a acciones dentro de la app; aquí no hay acciones autorizadas. |
| Recomendación    | **Adoptar** solo en servidor cuando se decida proveedor, fijando versión exacta.                                                             | **No adoptar ahora**: coste de migración/QA sin beneficio para un catálogo pequeño. Reevaluar si se pide conversación multi-turno rica. | **Descartado**: sin necesidad.                                           |

Cifras de tamaño y fechas son de `npm view` en esta fecha; no son una auditoría de seguridad. Antes de instalar: `npm audit`, revisar changelog y fijar versión exacta.

## Arquitectura propuesta tras decisiones

Panel actual → `POST /api/assistant` (Route Handler, runtime Node, solo Preview hasta aprobación) → rate limit con almacén compartido → `screenQuestion` → `retrieve` sobre `approvedCorpus` → `streamText`/`generateText` del AI SDK con el proveedor elegido, `maxOutputTokens` fijo, timeout y una sola reintentada → `isGrounded` → respuesta con citas del paquete A o abstención con contacto humano. Clave solo en variables de entorno del servidor en Vercel, nunca en el repo ni con prefijo `NEXT_PUBLIC_`. Registros sin texto de conversación. El modelo no recibe herramientas ni acceso de escritura.

## Decisiones necesarias (Juanma/Sarah) — opciones concretas

1. **Alcance**: (a) mantener catálogo guiado sin IA (coste 0, recomendado hasta aprobar corpus público); (b) IA solo para reformular respuestas del corpus aprobado con citas; (c) IA con corpus ampliado a artículos publicados revisados — requiere revisor fiscal/legal por artículo.
2. **Idiomas**: EN solo (coherente con rutas actuales) / EN + ES (requiere revisor ES y rutas ES decididas).
3. **Proveedor/modelo — DECIDIDO PARCIALMENTE (Juanma, 10 oct 2026): Google Gemini u OpenAI (ChatGPT).** Falta elegir uno de los dos y el modelo concreto. Integración prevista con el mismo AI SDK: `@ai-sdk/google` (Gemini API o Vertex AI) o `@ai-sdk/openai` (OpenAI API). Importante: se usa la **API de pago por uso** con cuenta del titular, no una suscripción ChatGPT/Gemini de consumo. Antes de conectar: condiciones de tratamiento de datos (DPA) del titular, opción sin uso de datos para entrenamiento, retención mínima, región/transferencias (Vertex AI permite fijar región UE; en OpenAI revisar la residencia de datos disponible), y precios vigentes en la web del proveedor en la fecha de decisión (no se citan aquí).
4. **Presupuesto**: límite mensual de gasto en la cuenta del proveedor + límites de la app (propuesta 6/min, 30/día por visitante, 600 caracteres de salida). Fijar importe máximo mensual y alerta.
5. **Datos**: no enviar datos personales (filtro implementado); retención del proveedor (cero o mínima), transferencias internacionales, base jurídica y texto de privacidad (paquete F).
6. **Almacén de rate limit**: Vercel KV/Upstash u otro; cuenta y coste.
7. **Responsable humano**: quién revisa abstenciones/quejas y quién aprueba ampliaciones del corpus.

Sin estas decisiones no se instala SDK, no se crea endpoint ni se conecta proveedor. La QA real del proveedor (latencia, coste, alucinación con tráfico real) solo es posible tras autorización.

## Qué falta para conectar IA (pendiente, por responsable)

| #   | Pendiente                                                                                                                          | Responsable                 | Estado                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------- |
| 1   | Elegir entre Gemini y OpenAI y el modelo concreto                                                                                  | Juanma                      | PENDIENTE (los dos candidatos ya decididos) |
| 2   | Crear cuenta API del titular, activar facturación y límite de gasto mensual con alerta                                             | Juanma/Sarah                | PENDIENTE                                   |
| 3   | Revisar DPA, uso para entrenamiento desactivado, retención y región                                                                | Juanma + asesor privacidad  | PENDIENTE                                   |
| 4   | Alcance (catálogo / reformulación con citas / corpus ampliado) e idiomas                                                           | Juanma/Sarah                | PENDIENTE                                   |
| 5   | Almacén compartido para rate limit (Vercel KV/Upstash u otro)                                                                      | Juanma                      | PENDIENTE                                   |
| 6   | Responsable humano de abstenciones y ampliación del corpus                                                                         | Juanma/Sarah                | PENDIENTE                                   |
| 7   | Texto de privacidad que mencione el proveedor IA (paquete F)                                                                       | Sarah + asesor              | PENDIENTE                                   |
| 8   | Clave API en variables de entorno de Vercel (solo servidor, sin `NEXT_PUBLIC_`), entregada por canal seguro, nunca en chat ni repo | Juanma                      | PENDIENTE                                   |
| 9   | Implementar endpoint `POST /api/assistant` con el proveedor elegido, conectado a `grounding.ts`                                    | Claude                      | BLOCKED por 1–8                             |
| 10  | QA real del proveedor en Preview: latencia, coste, fundamentación, inyección, caída                                                | Claude + Juanma             | BLOCKED por 9                               |
| 11  | Activación pública del asistente (production)                                                                                      | Juanma, aprobación separada | BLOCKED                                     |

## Estado

| Elemento                                                      | Estado                   | Responsable        |
| ------------------------------------------------------------- | ------------------------ | ------------------ |
| Evaluación librerías                                          | PASS (documentada)       | Claude             |
| Corpus, recuperación, verificación, inyección, límites (mock) | PASS local               | Claude             |
| Endpoint + SDK + proveedor                                    | BLOCKED — decisiones 1–7 | Juanma/Sarah       |
| Revisión fiscal/legal de corpus ampliado                      | BLOCKED                  | Revisor competente |

## Entrega

PR #64: merge autorizado por Juanma el 10 octubre 2026. #62 y #63 ya estaban en main; este PR solo añade el paquete C, sin cambios de interfaz ni proveedor conectado.
