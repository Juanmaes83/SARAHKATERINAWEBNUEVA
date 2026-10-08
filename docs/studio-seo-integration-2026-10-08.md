# Studio + SEO: integración para revisión, 8 octubre 2026

## Objetivo y fuentes

Priorizar la edición de artículos y casos, conservar el diseño aprobado e integrar las mejoras de PR #46 y #47 sobre Studio PR #43. Rama conjunta: `feat/studio-seo-unified-2026-10-08`, basada en `9b18ff2`. Referencia visual: `d3f8fa0`; los cambios posteriores de la rama de Studio eran documentación QA.

Fuentes de código: PR #46 `61e8663` (manifiesto, registro de redirecciones, validación de entidades y puertas de indexación); PR #47 `178ce98` (enlaces internos, contraste, semántica, pruebas HTML/FAQ). Se aplicaron sus commits funcionales, sin sustituir la rama visual por main. Se incorporaron también los arreglos SUMA `da241d8` y listas descriptivas `fe59db8`, necesarios para no reintroducir sus fallos. Las capturas y documentación histórica de PR #47 no se importaron como evidencia de esta versión.

## Resultado

- Artículos y Casos son las primeras opciones del menú de Studio. Sus editores existentes conservan texto, bloques, SEO, guardado e imágenes. No se reconstruyó la base de datos ni se modificaron usuarios.
- Páginas editables explica que Home e Investment son las dos páginas con campos conectados actualmente. No es un recuento de las rutas ni un indicador de indexación.
- Enlaces y páginas muestra por separado documentos publicados, inventario de rutas y advertencias editoriales. Explica expresamente que no hay conexión a Search Console ni medición de páginas indexadas.
- Se conservan los 133 archivos de `public/media` byte a byte respecto a `d3f8fa0`. La integración mantiene las sobrescrituras de Home/Investment, los textos de CTA y los destacados editoriales.
- Registro SEO ampliado a las listas/detalles editoriales y a todas las plantillas de páginas Studio. Studio/API Studio siguen con cabecera noindex incluso si se habilitase posteriormente la puerta global.
- El constructor de entidades no se conecta a JSX; su emisión exige una ruta pública aprobada y el path realmente servido. Preview o ausencia de path fallan de forma cerrada.
- CI captura respuestas HTTP reales antes de comprobar enlaces/semántica; Home e Investment son SSR y no pueden auditarse buscando solamente HTML prerenderizado.

## Auditoría ejecutada

`npm run lint`: 0 errores, 8 avisos existentes de img. `npm run typecheck`: correcto. Build: correcto. Vitest: 28 suites, 444 pruebas correctas, sin skips tras capturar HTML. Comprobaciones HTML renderizado: 48 correctas incluidas en ese total.

El entorno local restringido carece de /proc; el build se ejecutó con el SWC WASM de Next (`NEXT_TEST_WASM=1`) y un preload temporal externo al repositorio para process.memoryUsage. Ese workaround no se incorpora al código ni al CI. El build nativo remoto de Vercel es una comprobación separada.

`scripts/qa/capture-routes.mjs` ejecutado contra build local sin credenciales Supabase: 45 respuestas verificadas, status y noindex. Evidencia reproducible: `docs/qa-unified-routes-2026-10-08.json`.

| Grupo | Rutas / comprobaciones | Resultado |
|---|---|---|
| Base y laboratorio | /, /foundation | 200, noindex |
| Landings | /preview/home, investment, property-purchase, tax-advisory, team, contact | 200, noindex |
| Listas editoriales | /preview/insights, /preview/case-studies | 200, noindex |
| Auth | /studio/login, recover, recover/complete, accept-invite | 200, noindex |
| Studio privado | /studio, pages, articles, cases, documents/[id], media, links, new, team | 307 a login sin sesión, noindex |
| Diez contenidos originales | 6 slugs insights y 4 case-studies de la importación | 404 sin sesión y sin entorno Supabase local; no prueba de contenido real |
| Servicios SEO | /robots.txt, /sitemap.xml | 200; Disallow / y sitemap sin loc |
| APIs privadas | session GET; export GET; team/documentos/notas/media POST; media PATCH | 403 sesión; 401 restantes sin sesión |
| Modo revisión | preview GET, preview/exit GET | 307, noindex |

## Límites y pendientes

- No hubo merge, despliegue en producción, cambio DNS ni apertura de indexación. Tampoco acciones SEO off page, directorios o Search Console.
- La aprobación visual anterior del usuario no sustituye la revisión visual humana de esta integración. Chromium no pudo instalarse en este entorno: archivo descargado vacío/inválido. No se afirma que el QA interactivo FAQ ni la comparación visual por navegador hayan pasado.
- Se mantiene el hallazgo A11Y-LM-01 de PR #47: el main raíz envuelve parte de los landmarks. Los tests heredados lo reconocen; no equivale a accesibilidad completa.
- Falta repetir con sesiones reales: abrir los diez contenidos en revisión, editar/guardar/subir imágenes, comprobar permisos de admin/contributor y recuperación. No se usaron contraseñas del equipo ni se cambió Auth.
- Preview global ya dispone de Supabase URL y publishable key. En esta rama se conserva NEXT_PUBLIC_STUDIO_ORIGIN de la rama estable original para no inventar un retorno Auth no autorizado. La recuperación vuelve al Studio original; no cambiar esa URL sin actualizar la allowlist y comprobar correos reales.
- El inventario incluye plantillas dinámicas, no todas las instancias futuras de documentos. Publicación en preview no implica Google indexado ni aprobación de producción.

## Continuación coordinada

Usar únicamente esta rama para los siguientes ajustes conjuntos; evitar editar simultáneamente main u otra rama. Antes de continuar: git fetch, comprobar HEAD y cambios locales, leer este documento y QA previo de Studio. No aplicar merge hasta revisión conjunta. Artículos/Casos primero; ampliar los campos editables del resto de páginas después. Revisar Vercel y CI del SHA final y registrar sus resultados por separado de QA local.
