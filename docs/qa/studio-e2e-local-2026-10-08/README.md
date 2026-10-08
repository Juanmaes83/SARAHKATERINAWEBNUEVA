# Studio: flujo editorial completo y artículos nuevos (QA local, 8 octubre 2026)

**Rama:** `feat/studio-new-articles-seo-2026-10-08`, desde la consolidada `feat/sarah-studio-editorial-2026-10-07` en `025f144`.
**Entorno:** Supabase **local**: las 12 migraciones del repo y los 10 contenidos importados con los scripts del repo. **No se tocó el proyecto alojado** `wiswwjxshdknjihjpgcu`, ni sus usuarios, ni Vercel, ni la producción.

## Qué demuestra

El Studio permite crear, editar, revisar, aprobar y publicar artículos **desde el panel**, con los permisos de cada rol. Lo publicado aparece en la web nueva (`/preview/insights`) con su SEO y sus datos estructurados.

| # | Paso, ejecutado en un navegador real (Chromium 141) contra el Studio de la rama | Resultado |
|---|---|---|
| 1 | Una colaboradora (`contributor`) entra, abre el borrador «IBI…» y pulsa **Send to review** | Estado `in_review` |
| 2 | La colaboradora no ve el botón **Approve** e intenta aprobar llamando a la API | Botón oculto; la API responde **403** |
| 3 | Un administrador (`admin`) pulsa **Approve** y después **Publish to preview** | `approved` → `published` |
| 4 | El segundo artículo, «calendario», pasa revisión → aprobación → publicación | `published` |
| 5 | El administrador crea un **artículo nuevo desde el panel** (`/studio/new`), edita la entradilla, guarda y recarga | El cambio persiste tras la recarga |
| 6 | Un visitante anónimo abre `/preview/insights` y los dos artículos | 200; aparecen en la lista; `noindex, nofollow` (preview) |

Los cinco primeros pasos usan los botones reales del editor (`components/studio/DocumentEditor.tsx`) y la API real (`/api/studio/*`). El script es `scripts/qa/studio-e2e-local.mjs`.

## Artículos nuevos (SEO/GEO)

Fichero: `scripts/studio/import/new-articles-2026-10-08.json`. Validado por `tests/studio-new-articles.test.ts` con el mismo esquema que usa el editor.

| Slug | Título SEO (≤ 70 con el sufijo « · Sarah Katerina») | Fuentes primarias (comprobadas) |
|---|---|---|
| `ibi-alicante-province-non-resident-owners` | IBI in Alicante province 2026: how non-residents pay | SUMA, calendario 2026 y periodo voluntario (8 oct 2026); BOE, LGT art. 28 (8 oct 2026); AEAT, plazos del Modelo 210 (7 oct 2026) |
| `non-resident-owner-tax-calendar-alicante-2026` | Non-resident owner tax calendar 2026, Alicante | SUMA, calendario 2026 (8 oct 2026); AEAT, plazos del Modelo 210 (7 oct 2026) |

**SEO on page, comprobado en la página publicada:**
- un título y una descripción propios;
- un único H1 y un esquema de H2 con anclas e índice «On this page»;
- canonical propio de cada artículo;
- `BlogPosting` y `BreadcrumbList` en JSON-LD;
- un CTA hacia el servicio de fiscalidad.

**GEO:** respuesta corta al principio («At a glance»), supuestos visibles, tablas de fechas y una lista de fuentes con la fecha de comprobación.

**No incluye:** imagen principal (hay una nota para elegirla en la Biblioteca), cifras sin fuente, promesas de resultado ni casos de estudio.

**Notas de revisión que viajan con cada artículo:**
- `tax` / `review`: Sarah debe confirmar la redacción y que SUMA recauda en los municipios de sus clientes.
- `media` / `info`: falta la imagen principal.
- `seo` / `info`: enlazar los artículos relacionados desde el Studio.

## Llevarlos al Studio real (Juanma, unos 2 minutos)

Los artículos entran como **borrador pendiente de aprobación**; no se publica nada.

```bash
git checkout feat/studio-new-articles-seo-2026-10-08 && npm ci
read -s -p "Contraseña del Studio: " STUDIO_ADMIN_PASSWORD; echo; export STUDIO_ADMIN_PASSWORD
SUPABASE_URL=https://wiswwjxshdknjihjpgcu.supabase.co \
SUPABASE_PUBLISHABLE_KEY=<clave publicable del proyecto> \
STUDIO_ADMIN_EMAIL=marketing@sarahkaterina.com \
node scripts/studio/import/import-payloads.mjs scripts/studio/import/new-articles-2026-10-08.json
```

**Antes de ejecutarlo:**
- La contraseña se escribe en un prompt oculto (`read -s`), así no queda en el historial de la terminal ni en el repo.
- Si se repite, no duplica nada: un slug que ya existe se salta. Solo funciona con una cuenta `admin`.

**Después de importar,** en el Studio:
1. Abrir cada artículo.
2. Elegir la imagen principal.
3. Enlazar los artículos relacionados.
4. **Send to review** → Sarah revisa → **Approve** → **Publish to preview**.

## Auditoría SEO on page de la web nueva (build local, 8 oct 2026)

Medido con Chromium sobre las 10 rutas públicas de preview. Todas:
- responden 200;
- tienen un único H1, canonical y Open Graph;
- no tienen ninguna imagen sin `alt`.

| Hallazgo | Páginas | Estado |
|---|---|---|
| Títulos de los artículos nuevos por encima de 70 caracteres al sumar « · Sarah Katerina» | Los 2 artículos nuevos | **Corregido** en este PR: 69 y 63 caracteres; el test incluye el sufijo |
| Marca repetida en el título («… \| Sarah Katerina · Sarah Katerina») | Team | Pendiente (hallazgo A2). Es copy aprobado en un fichero de contenido protegido: decide el propietario |
| Meta description de más de 160 caracteres | Home (176), Investment (163), Tax Advisory (229), Team (179) | Pendiente: acortar con Sarah, porque es copy aprobado |
| Meta description muy corta | Insights (58), Case studies (44) | Propuesta: describir qué encuentra el lector. Requiere copy nuevo |
| Las landings no llevan JSON-LD de entidad | 6 landings | Diseño: AGENTS §7.4. El constructor está listo y se emite cuando se apruebe el lanzamiento |
| Artículos con `BlogPosting` + `BreadcrumbList` | Artículos | Correcto |

## Evidencias (esta carpeta)

| Captura | Qué muestra |
|---|---|
| `01-contributor-overview.jpg` | Resumen del Studio para la colaboradora |
| `02-contributor-editor-draft.jpg` | Editor del borrador |
| `03-contributor-in-review.jpg` | En revisión; sin botón Approve para la colaboradora |
| `04-admin-published.jpg` | Publicado por el administrador |
| `05-admin-new-article-editor.jpg` | Artículo creado desde el panel |
| `06-admin-overview.jpg` | Resumen del administrador |
| `07-public-insights-list-1440.jpg` | Lista pública con el artículo nuevo |
| `08-public-*-1440.jpg`, `09-public-*-375.jpg` | Los dos artículos publicados, escritorio y móvil |

## Límites (no se afirma más de lo probado)

- **Subida de imágenes no probada.** El contenedor de storage de Supabase no se pudo descargar en este entorno (proxy). Para que las migraciones aplicasen, en local se creó un esquema `storage` mínimo, fuera del repo.
- **Conexión por HTTPS solo en local.** La app exige `https` para Supabase (correcto). En local se usó un proxy TLS con certificado autofirmado. No hay cambios de código para eso.
- **Una migración de datos omitida en local.** Se marcó como aplicada `20261007200000_studio_private_case_copy` porque depende del historial de ediciones de los casos alojados. Los casos quedan fuera de esta tarea.
- **Cuentas del Studio real no probadas.** Las dos cuentas reales y la protección de Vercel están fuera de esta prueba.
