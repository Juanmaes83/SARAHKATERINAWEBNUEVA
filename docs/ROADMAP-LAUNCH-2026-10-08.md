# Roadmap de lanzamiento — reconciliado el 9 octubre 2026

> Estado canónico actual: [Project State](PROJECT-STATE-2026-10-09.md). El registro del 8 de octubre se conserva como evidencia histórica; las actualizaciones del 9 de octubre al final prevalecen para los bloques entregados.

Este registro sustituye los estados históricos de importación/publicación de los handoffs anteriores. El propietario ha aprobado expresamente el lanzamiento y la indexación el 8 de octubre. La aprobación existe; no equivale a que el dominio o Google ya estén configurados.

| Fase | Estado comprobado | Pendiente |
| --- | --- | --- |
| Diseño y páginas editoriales | Aprobación visual del propietario; diseño compartido preservado | Selección de imágenes principales por el propietario; comprobación completa de subida alojada |
| Studio/Supabase | Conexión recuperada; marketing admin e info contributor activos y vinculados; 8 artículos + 4 casos publicados | QA interactiva alojada de edición, recuperación, conflictos y Storage; no confundir con los tests locales de roles |
| SEO on page y accesibilidad | PR46/47, PR49 y parche PR45 incorporados en la rama consolidada; metadatos y landmarks corregidos | Medición real de rendimiento/CWV; no se afirma posicionamiento ni cumplimiento WCAG completo |
| Preparación del lanzamiento | Rutas públicas creadas: /, /investment, /services/property-purchase, /services/tax-advisory, /about, /contact, /insights y /case-studies, con sus 12 detalles. Diseño/copy compartidos con previews. Tres redirecciones equivalentes aprobadas | QA del despliegue de producción; auditoría de todas las URLs antiguas, incluidas ES, herramientas y páginas legales antes del corte |
| Producción | Variables Supabase ampliadas a producción, misma BD y cuentas; modo production y canonical configurables. Indexación mantiene false mientras se cierra el corte | Verificación de propiedad de www, DNS/HTTPS y política de privacidad ajustada al stack real; después activar indexación y reconstruir |
| Google | Búsqueda en marketing@ solo encontró inventario de septiembre; no se encontró invitación de Search Console | Confirmar acceso/propiedad, enviar sitemap público, inspeccionar URLs y monitorizar cobertura. Google decide la incorporación al índice |
| SEO off page | Paquete de directorios preparado en repo madre PR38, sin ejecutar altas | Bing, Apple, correcciones Hotfrog/Infobel, Google Business Profile y consistencia de datos con las cuentas titulares |

## Preparación técnica del lanzamiento

La aprobación del propietario se registra con fecha y los 22 identificadores de copy existentes; no se atribuye a Sarah una revisión nueva. Los identificadores nuevos/desconocidos siguen bloqueando producción. El grafo de entidad pendiente no se habilita.

- Los seis landings y ambas colecciones públicas reutilizan las composiciones aprobadas. No se cambian imágenes ni tokens.
- En modo production, los enlaces compartidos apuntan a destinos públicos; en modo preview conservan /preview.
- El sitemap incorpora solo rutas públicas aprobadas y publicaciones reales; excluye borradores, Studio, /preview y /foundation.
- Los detalles públicos leen publicaciones aunque haya una cookie de revisión; las relaciones de un documento publicado tampoco leen borradores.
- /services, /services/investment-advisory y /book-a-call tienen redirecciones 308 a sus equivalentes públicos. Los artículos y casos conservan sus slugs originales.
- /preview, /foundation y Studio mantienen noindex en todo modo. No se añade hreflang de idiomas inexistentes ni se activa el grafo institucional pendiente.
- La migración de main se resolvió conservando los metadatos cortos aprobados e incorporando sus mejoras de semántica y consistencia SUMA. No se descartan cambios paralelos sin revisar.

## Bloqueo concreto de dominio

Vercel aceptó añadir www al proyecto nuevo y devuelve `verified=false`: exige un TXT de propiedad en el DNS autoritativo. El inventario aportado identifica Namecheap, bajo control de Sarah, sin delegación. No hay herramienta autenticada de Namecheap disponible. El valor exacto se facilita privadamente al propietario desde la respuesta de Vercel; no se guarda junto a credenciales ni enlaces privados.

Añadir el TXT no es el corte DNS. Después hay que verificar en Vercel, obtener los registros A/CNAME exactos del proyecto (sin inventar valores universales), comprobar HTTPS y preservar MX/TXT de correo. No modificar nameservers ni servicios de correo para este cambio.

## Privacidad y migración

La política actual /privacy se leyó como fuente del propio sitio el 8 de octubre. Describe Analytics, Stripe y Web3Forms; el nuevo proyecto usa Supabase para Studio y no activa esos servicios de la misma manera. Copiarla sin revisión dejaría una descripción inexacta. Hace falta texto legal aprobado que describa el tratamiento real, más decidir/preservar las restantes URLs legales y antiguas. No se inventa entidad ni descriptor institucional.

## Orden de cierre

1. QA y registro del candidato de lanzamiento en GitHub/Vercel.
2. Verificación TXT de propiedad por quien controla Namecheap; política y URLs de migración restantes.
3. Configurar retornos Auth del dominio público, conservando la preview durante la transición; no reinvitar al equipo.
4. Construir y comprobar el candidato de producción: 20 páginas EN, enlaces, permisos, sitemap, robots, canonical y redirecciones.
5. Corte DNS/HTTPS; activar NEXT_PUBLIC_SITE_INDEXABLE=true solo en producción, reconstruir y comprobar ausencia de noindex en las URLs públicas.
6. Search Console: enviar sitemap e inspeccionar URLs, sin declarar indexación efectiva hasta verla en Google.
7. Completar off page y monitorización después del lanzamiento.

## QA del candidato

- Build local en modo preview correcto y build local en modo production con indexación cerrada correcto.
- Lint: cero errores y ocho avisos de imágenes existentes. Typecheck correcto.
- Suite local: 467 tests en 30 suites, con captura previa de 45 respuestas para evitar saltar los controles de HTML.
- Comprobación HTTP local de las rutas públicas en modo production: las páginas comprobadas responden 200 con un H1 y enlaces públicos; noindex sigue presente conforme al bloqueo del corte. No demuestra todavía lectura de los doce detalles en el despliegue de producción.
- Los doce detalles alojados y los listados de la preview se verificaron antes: 14 respuestas 200, ocho artículos y cuatro casos enlazados (registro separado studio-hosted-publication-2026-10-08.md).
- El entorno local requiere SWC WASM y un preload temporal externo al repositorio para APIs del sistema no disponibles. Ninguno de esos ajustes se incorpora al producto ni a CI.

## Legacy continuation, 9 October 2026

Owner instructed legacy implementation/publication and postponed chatbot/WhatsApp. See [implementation and remaining blockers](LEGACY-MIGRATION-2026-10-09.md). Seven legacy entry-point redirects and the ten-source preservation registry are implemented; legal, paid-tool, Spanish and external-domain work is not declared complete. No DNS, indexation or hosted content changes in this continuation.

## Cierre y pendientes — 9 octubre 2026

PR55 y PR56 fusionados y desplegados READY; main `846fb72d901940deae12f5fe4079dcc9f76b9c12`. Siete redirects, diez URLs heredadas preservadas. Footer legal fuera de menú y páginas legales /preview revisadas visualmente por Juanma; contenido definitivo y consentimiento siguen pendientes, demo no conectada.

Orden operativo actualizado:
1. Reconciliar PR54 con estos resultados y preparar QA aislada con guardas; no ejecutar mutaciones sobre Preview compartida.
2. Obtener [datos/decisiones de Sarah](SARAH-CLOSEOUT-REQUEST-2026-10-09.md); redactar y revisar textos legales conforme al stack real.
3. Ejecutar matriz completa local de Studio cuando Docker, Auth, Storage, correo y TLS aislados estén disponibles.
4. Resolver legado pago/español, consentimiento/proveedores y candidate QA; no declarar completada toda la migración.
5. Dominio/DNS/HTTPS/indexación y Search Console según autorización y registros efectivos, sin alterar correo.
6. Chatbot y WhatsApp: bloque posterior con alcance y tratamiento de datos definidos.
