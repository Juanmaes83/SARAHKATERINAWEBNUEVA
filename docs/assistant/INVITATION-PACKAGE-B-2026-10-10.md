# Paquete B — invitación contextual de ayuda (10 octubre 2026)

Base: main `9f89ab2b7012e81bacc659d16f6dbaad89a0a656`. Especificación: handoff del 10 de octubre (PR61, Draft, no fusionado). Rama independiente del paquete A (PR62); ambos tocan `GuidedAssistant.tsx`/`content/en/assistant.ts` en zonas distintas y se reconciliarán al fusionar el primero.

## Comportamiento implementado

- **Disparadores** (hipótesis iniciales, `INVITATION_THRESHOLDS`):
  1. 45 s visibles en la página de servicio actual **y** ≥50 % de su altura desplazable; o
  2. tres páginas distintas de la visita, al menos una de servicio.
  - Añadido de implementación: 5 s visibles en la página antes de cualquier aviso, para que nunca aparezca al cargar o durante una transición. Revisar junto con los umbrales.
- Servicios: Investment, Property Purchase, Tax Advisory (rutas `/preview/*` y legacy). Team no es servicio.
- **Tiempo**: solo visible; `visibilitychange` pausa y reanuda. Tiempo y scroll se reinician por ruta.
- **Scroll**: profundidad máxima alcanzada; una página sin scroll cuenta como leída pero sigue necesitando los 45 s (nunca instantánea).
- **Páginas distintas**: ruta normalizada (sin query, hash ni barra final); repetir una página no suma. Cuentan solo rutas públicas del asistente; Studio, API, auth, foundation, desconocidas y error quedan fuera. Legal y Contact cuentan, pero en ellas nunca se muestra el aviso.
- **Una por visita**: mostrar, abrir el asistente (por invitación o launcher), aceptar o descartar la cierra para el resto de la visita, también al cambiar de ruta.
- **Memoria**: `useRef` en el layout raíz, en memoria; sin cookies, storage, identidad, perfil ni red. **Limitación**: una recarga o pestaña nueva es una visita nueva.
- **Capas**: con menú/herramientas abiertos (`sk:web-overlay`), un `dialog[open]`, `[aria-modal="true"]` o un futuro banner marcado `data-sk-consent-open`, el aviso se **difiere sin consumirse**. Si aparece y luego se abre el menú, se oculta y vuelve al cerrarlo.
- **Automatización**: con `navigator.webdriver` no se muestra.
- **Visual**: tarjeta encima del launcher (tokens web); halo dorado suave y **un solo pulso** (`--sk-web-motion-settle`, 1 iteración) en el launcher; entrada con `--sk-web-motion-reveal`. `prefers-reduced-motion`: halo estático, sin animación. Nunca abre el panel ni emite sonido.
- **Acciones**: «Ask a question» abre el panel con el tema de la página primero (Tax → Tax questions, Purchase → Buying a property, Investment → Investment); «Not now» descarta. Escape dentro de la tarjeta descarta y devuelve el foco al launcher. El panel mantiene contacto humano (WhatsApp/Contact).
- No se registra, mide ni envía nada. La futura medición (exposición/apertura/ayuda/contacto iniciado) requiere proveedor y consentimiento aprobados; abrir WhatsApp no es un lead ni una reserva.

## Copy EN — PENDING_APPROVAL (Juanma)

| Elemento  | EN propuesto                                                                  | Brief ES                 |
| --------- | ----------------------------------------------------------------------------- | ------------------------ |
| Etiqueta  | Digital assistant                                                             | (identificación digital) |
| Mensaje   | Have a question? I can point you to the right page or help you contact Sarah. | —                        |
| Aceptar   | Ask a question                                                                | Resolver una duda        |
| Descartar | Not now                                                                       | Ahora no                 |

## Verificación local (10 octubre 2026)

- lint 0 errores (8 avisos Studio heredados); typecheck y build con entorno de CI PASS; 55 rutas capturadas.
- `REQUIRE_RENDERED_HTML=1 npm run test`: 499/499, 35 suites, sin skips; 17 nuevas en `tests/assistant-invitation.test.ts` (umbrales, servicio vs no servicio, 3 páginas, normalización, exclusiones, legal/contact, una por visita, scroll sin altura, límites de almacenamiento/red/sonido/pulso/reduced-motion).
- Chromium local con reloj simulado (`scripts/qa/assistant-invitation-review.mjs`), 9/9 PASS:
  - 1440×900, 390×740, 320×640: 20 s visibles + 120 s oculta + 20 s → sin aviso; +7 s → aviso; sin autoabrir; encima del launcher, dentro del viewport, botones ≥44px, sin overflow, opacidad final 1; aceptar abre el panel con Tax questions primero; tras cerrar, ningún aviso más.
  - 390 y 320: menú móvil abierto 60 s → sin aviso; al cerrar → aparece (diferido, no consumido).
  - 1440: Home → Investment → (hash) → Team con navegación cliente: dos páginas no bastan, gracia de llegada respetada, aviso en Team; Escape lo descarta con foco al launcher; Tax Advisory después con scroll 80 % y 120 s → sin aviso.
  - Reduced motion: `animation-name: none` en tarjeta y launcher.
  - Privacy (scroll completo, 120 s) y `/studio/login` → sin aviso ni launcher.
  - Navegador automatizado real (`webdriver`) → sin aviso.
  - En todos: almacenamiento sin cambios, sin errores JS, sin peticiones no GET.
- Regresión `assistant-conversation-review.mjs` (tax, historial, WhatsApp, borrado) en siete tamaños: 7/7 PASS.
- Capturas inspeccionadas en `docs/screenshots/assistant-invitation-2026-10-10/`.
- No se ejecutó navegador alojado ni QA contra Preview/producción. El reloj simulado no sustituye la prueba humana con tiempo real.

## Observación para la revisión visual

En 320–390px la tarjeta ocupa unos 250px sobre el contenido hasta que se responde (no tapa cabecera/menú, y el menú la oculta). Es una sola vez por visita, pero Juanma debe valorar intensidad y tamaño en móvil; alternativas preparables: botones en una fila desde 390px o mensaje más corto.

## Estado

| Elemento                                               | Estado                                                                                                | Responsable  |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------ |
| Señales, una por visita, pausa, supresión, exclusiones | PASS local                                                                                            | Claude       |
| Coordinación menú/diálogos                             | PASS local; banner de consentimiento real no existe aún (PR53) → solo contrato `data-sk-consent-open` | Claude / F   |
| Copy EN, intensidad, umbrales                          | PENDING_APPROVAL                                                                                      | Juanma       |
| Medición/analítica                                     | BLOCKED (proveedor + consentimiento)                                                                  | Juanma/Sarah |
| Production                                             | BLOCKED: el asistente sigue deshabilitado en production                                               | Juanma       |
