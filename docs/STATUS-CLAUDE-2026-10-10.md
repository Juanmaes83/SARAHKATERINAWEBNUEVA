# Estado por paquete y pendientes — 10 octubre 2026 (Claude Code)

Complementa el handoff de PR61 (`docs/HANDOFF-CLAUDE-CODE-2026-10-10.md`, rama `docs/claude-continuation-2026-10-10`, aún no fusionado). No sustituye ROADMAP ni PROJECT-STATE; cuando PR61 se fusione, este estado se traslada a la tabla del roadmap.

Distinguir siempre: implementado ≠ probado ≠ fusionado ≠ desplegado ≠ conectado ≠ aprobado ≠ publicado/indexado.

## Hecho hoy

| Paquete                                | PR  | Estado                                                  | Evidencia                                           |
| -------------------------------------- | --- | ------------------------------------------------------- | --------------------------------------------------- |
| A Conocimiento y fuentes               | #62 | FUSIONADO (`7c96457`); copy y PR aprobados por Juanma   | `docs/assistant/KNOWLEDGE-PACKAGE-A-2026-10-10.md`  |
| B Invitación contextual                | #63 | FUSIONADO (`1634eb3`); validado por Juanma ("funciona") | `docs/assistant/INVITATION-PACKAGE-B-2026-10-10.md` |
| C Preparación IA (mock, sin proveedor) | #64 | Merge autorizado por Juanma                             | `docs/assistant/AI-PACKAGE-C-2026-10-10.md`         |

El asistente sigue **deshabilitado en production** y la web sigue **no indexable**. El deployment de Vercel de `main` tras cada merge no se pudo verificar desde el entorno de Claude (vercel.com bloqueado por la red del contenedor): comprobar en el panel de Vercel.

## Pendiente

| Paquete                          | Qué falta                                                                                                                                                                                                                                                          | Responsable                                  | Estado                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- |
| A                                | Aprobación pública del corpus por Sarah; revisor fiscal/legal para cualquier respuesta normativa (AEAT/BOE/ATV/SUMA siguen `reference_only`)                                                                                                                       | Sarah + revisor competente                   | PENDIENTE                                    |
| B                                | Medir exposición/apertura/contacto: requiere proveedor de analítica y consentimiento; los umbrales siguen siendo hipótesis                                                                                                                                         | Juanma/Sarah (F)                             | BLOCKED                                      |
| C                                | Proveedor **Gemini u OpenAI (ChatGPT)** decidido por Juanma; falta elegir uno, modelo, cuenta API, límite de gasto, DPA/retención/región, almacén rate limit, responsable humano; después endpoint y QA real                                                       | Juanma → Claude                              | PENDIENTE / BLOCKED (ver tabla en paquete C) |
| D Integraciones                  | WhatsApp sigue manual (`wa.me`). Decidir si hacen falta Business API, CRM, email transaccional y agenda; cuentas y permisos mínimos. Sin decisiones no se implementa nada real                                                                                     | Juanma/Sarah → Claude                        | PENDIENTE                                    |
| E Studio aislado                 | Matriz completa (roles, RLS, conflictos 409, restauración, invitaciones, Media Library, overrides) en stack Supabase local desechable. El contenedor de Claude no tiene daemon Docker: ejecutar en el equipo de Juanma con Docker o autorizar arrancar Docker aquí | Juanma (entorno) → Claude                    | BLOCKED                                      |
| F Legal/consentimiento/contenido | Reconciliar PR53 (consentimiento) y revisar PR52 (tres drafts) sin publicar; banner real; textos de privacidad que describan el stack real (Supabase, WhatsApp, IA elegida); derechos de imágenes, testimonios y casos                                             | Claude (preparar) + Sarah/asesor (aprobar)   | PENDIENTE — siguiente trabajo propuesto      |
| G Migración/lanzamiento/SEO      | Diagnóstico fiscal de pago, URLs ES/legales y dominio antiguo; QA del candidato, redirects, callbacks Auth, rendimiento y seguridad; DNS/HTTPS preservando correo; GSC/sitemap; autorización vigente de corte e indexación                                         | Juanma/Sarah (decisiones y accesos) → Claude | PENDIENTE                                    |
| PRs antiguos                     | #61 (handoff) por fusionar; #52, #53, #47, #46, #45, #37, #31, #15, #14, #12, #6 por reconciliar uno a uno, sin fusionarlos en bloque                                                                                                                              | Claude (análisis) → Juanma (decisión)        | PENDIENTE                                    |

## Aprobaciones separadas que siguen abiertas

- Activación pública del asistente (production).
- Corte de dominio e indexación.
- Cada merge futuro, tras revisión visual en Preview.
