# Paquete A — conocimiento y fuentes del asistente (10 octubre 2026)

Base: main `9f89ab2b7012e81bacc659d16f6dbaad89a0a656` (PR60). Handoff de referencia: `docs/HANDOFF-CLAUDE-CODE-2026-10-10.md` en la rama `docs/claude-continuation-2026-10-10` (PR61, Draft, **no fusionado**). Este paquete no edita los archivos que modifica PR61 (README, PROJECT-STATE, ROADMAP, CONTRACT) para no generar conflictos; el estado de roadmap del paquete queda aquí hasta que PR61 se fusione.

## Auditoría del catálogo v1

| Hallazgo                                 | Antes                                                                     | Ahora                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Etiquetas de fuente                      | `sources: ['S01','S02','CONTRACT']` sin extracto, versión ni comprobación | Registro tipado con extracto exacto, huella, fecha, SHA, caducidad y estado por afirmación                         |
| Enlaces relacionados                     | Podían leerse como respaldo                                               | Son afirmaciones `route` ("la página existe"); nunca se muestran como cita                                         |
| A08 citaba S04 (`direct.channelsSource`) | S04 respalda canales, no "una solicitud no es cita confirmada"            | Respaldo interno correcto: límite del contrato (`G02`)                                                             |
| A06/A07/A11                              | Advertencias sin respaldo trazable                                        | Límites internos `G02` con extracto verificado en CONTRACT.md                                                      |
| A09 dirección                            | Única afirmación factual; sin cita visible                                | Cita pública `Contact page · Office` → `/preview/contact#office`, claim `confirmed` y contraste con `ENTITY_FACTS` |
| Texto de la respuesta                    | Sin control de cambios                                                    | Huella de texto+destinos; editar sin revisión bloquea la respuesta                                                 |
| Catálogo documental                      | Sin comprobación con el runtime                                           | Test: cada texto EN del runtime aparece literal en RESPONSE-CATALOGUE.md                                           |
| A10                                      | Documentado como respuesta                                                | Es el aviso WhatsApp (`assistantCopy.whatsappNotice`), no una respuesta del catálogo; sin cambio                   |
| Fuentes oficiales O01–O04                | Inventario                                                                | `reference_only`; ninguna respuesta puede apoyarse en ellas (test)                                                 |
| Contenido Studio con `sources`           | —                                                                         | No se importa ni indexa; artículos publicados ≠ aprobación normativa                                               |

## Modelo implementado

- `lib/assistant/knowledge.ts`: tipos, huella FNV-1a (no criptográfica), normalización de hechos y `evaluateResponse`.
- `content/en/assistant-evidence.ts`: fuentes `W01–W03` (web), `G01–G03` (gobernanza interna), `O01–O04` (oficiales, solo referencia) y un registro de evidencia por respuesta (A02–A12).
- Tres clases de afirmación: `route` (página existe; enlace relacionado), `fact` (hecho de negocio; única clase citada) y `limit` (lo que el asistente no hace; fuente interna, nunca cita).
- Bloqueos: `no-evidence`, `answer-changed`, `not-approved-for-context`, `approval-expired`, `source-missing`, `source-not-eligible`, `source-not-confirmed`, `source-changed`, `excerpt-missing`, `source-expired`, `contradiction`.
- Respuesta bloqueada → se muestra el texto aprobado A12 y Contact; WhatsApp sigue disponible. Atributo `data-knowledge` para QA.
- Contexto `production` exige `PUBLIC_PRODUCTION`: hoy bloquea todas las respuestas (doble guarda además de `assistantReviewEnabled`).
- Revisión propuesta: 90 días (vence 2027-01-07) para navegación/contacto; O01–O04 a 30 días como inventario. Cadencia propuesta, no requisito legal.

## Registro de aprobación por respuesta

| ID  | Versión | Clase                           | Fuente                    | Estado                                       | Aprobador/fecha   | Público (Sarah) | Revisión   |
| --- | ------- | ------------------------------- | ------------------------- | -------------------------------------------- | ----------------- | --------------- | ---------- |
| A02 | 1       | route                           | W01                       | APPROVED_WITH_CONDITION · INTERNAL_TEST_ONLY | Juanma 2026-10-09 | PENDING         | 2027-01-07 |
| A03 | 1       | route                           | W01                       | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A04 | 1       | route + limit                   | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A05 | 1       | route                           | W01                       | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A06 | 1       | route + limit                   | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A07 | 1       | route + limit                   | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A08 | 1       | route + limit                   | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A09 | 1       | fact (citada)                   | W02, W03 (+G01 contraste) | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A11 | 1       | route + limit                   | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |
| A12 | 1       | route + limit (fallback humano) | W01, G02                  | ídem                                         | ídem              | PENDING         | 2027-01-07 |

Ninguna respuesta contiene contenido fiscal, legal o financiero normativo. A04 solo remite a Tax Advisory y declara un límite.

## Copy nuevo pendiente de aprobación

`Source on this website` y `Checked 10 Oct 2026` (UI de cita). PENDING_APPROVAL de Juanma en la revisión visual del Preview.

## Verificación local (10 octubre 2026)

- `npm run lint`: 0 errores, 8 avisos heredados de Studio (`<img>`).
- `npm run typecheck`: PASS. `npm run build` con entorno de CI: PASS.
- `node scripts/qa/capture-routes.mjs`: 55 rutas verificadas.
- `REQUIRE_RENDERED_HTML=1 npm run test`: 499/499 en 35 suites, sin skips (17 nuevas en `tests/assistant-knowledge.test.ts`: positivas, producción, citas, extractos internos, catálogo, oficiales y bloqueo por cambio, ausencia, salida de navegación, caducidad, contradicción, claim no confirmado, respuesta editada, sin evidencia y gobernanza como cita).
- Chromium local `scripts/qa/assistant-knowledge-review.mjs` a 1440×900, 390×640, 320×640: respuesta tax sin bloque de fuente y con página relacionada; A09 con cita, fecha, objetivo táctil ≥44px, sin overflow; la cita navega a `#office` visible con la dirección; almacenamiento sin cambios; sin errores JS ni peticiones no GET. Capturas en `docs/screenshots/assistant-knowledge-2026-10-10/`, inspeccionadas.
- Regresión `assistant-conversation-review.mjs` (tax, historial de 8, resumen WhatsApp, borrado) ejecutada en siete tamaños con salida fuera del repo: 7/7 PASS; capturas 320px de tax con historial inspeccionadas.
- No se ejecutó navegador alojado ni QA contra Preview/producción.

## Estado del paquete

| Elemento                                           | Estado                                | Responsable                     | Evidencia                         |
| -------------------------------------------------- | ------------------------------------- | ------------------------------- | --------------------------------- |
| Trazabilidad/versionado por respuesta              | PASS local                            | Claude                          | tests + este documento            |
| Bloqueo ausente/caducada/modificada/contradictoria | PASS local (unit)                     | Claude                          | tests/assistant-knowledge.test.ts |
| UI de cita y fallback humano                       | PASS local; revisión visual PENDIENTE | Claude → Juanma                 | capturas + Preview del PR         |
| Aprobación del corpus/textos para público          | BLOCKED                               | Juanma/Sarah                    | `publicCopy: PENDING`             |
| Fuentes normativas (AEAT/BOE/ATV/SUMA)             | BLOCKED                               | Revisor fiscal/legal competente | `reference_only`                  |
| Activación production del asistente                | BLOCKED                               | Juanma (aprobación separada)    | política + contexto `production`  |

## Entrega

Draft PR #62 (`claude/relaxed-hopper-bj882p`). Primer commit `2e2ea5e`: CI de GitHub en verde (lint/typecheck/test/build y secretos); el deployment de Vercel de ese commit falló al instante en el push sin registro accesible desde este entorno (vercel.com bloqueado por la red del contenedor). El PR hermano #63, mismo autor y base, desplegó correctamente, por lo que se trata como fallo de plataforma no reproducido; este commit documental vuelve a desplegar. La URL exacta de Preview se registra en el PR, no aquí, para evitar un SHA autorreferencial.

## Qué necesita una respuesta nueva

ID, texto exacto en el catálogo documental, afirmaciones clasificadas con fuente y extracto, huella regenerada tras revisión humana, aprobador/fecha, permiso y fecha de revisión. Una afirmación fiscal/legal/financiera exige además documento oficial concreto, versión y vigencia, jurisdicción y revisión profesional fechada. Nunca actualizar una huella sin esa revisión.
