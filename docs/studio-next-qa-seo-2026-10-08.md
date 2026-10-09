# Continuación Studio / SEO, 8 octubre 2026

> **Reconciliación 2026-10-09:** [Project State](PROJECT-STATE-2026-10-09.md) distingue los resultados posteriores y pendientes actuales. Las instrucciones antiguas de importación, invitación o publicación no deben repetirse como trabajo pendiente.

El usuario autorizó revisar/integrar PR49, importar borradores y comprobar el Studio, incorporar el parche de dependencias y resolver accesibilidad/metadatos. Reservó para sí la selección de imágenes, revisión del contenido y aprobación de publicación. No se interpreta como publicación automática de artículos ni lanzamiento de producción.

## Integración y cambios

- PR49 mergeado en `feat/sarah-studio-editorial-2026-10-07`: `d8231530751c944681626191382bbb818b64e35b`. Los dos artículos están en el repositorio; NO se han importado al proyecto Supabase alojado.
- Parche PR45 aplicado a esta continuación. Next/eslint-config-next 15.5.27, sharp 0.35.5 y source-map-js 1.2.2. El lockfile se fusionó preservando las dependencias Studio. La dependencia directa sharp era exacta (0.35.4): se alinearon package.json y la raíz del lockfile con 0.35.5 para que npm ci funcione. No se mergeó PR45 a main ni se hizo un salto mayor.
- A11Y-LM-01: el layout raíz deja de envolver header/footer en main. Cada landing y AppChrome tienen su propio main, con id main y tabIndex=-1; las páginas editoriales y Studio usan sus main existentes sin anidar. El enlace Skip to content conserva su destino.
- Las siete páginas de la suite de HTML ahora comprueban un banner, un contentinfo y un main reales. No se afirma cumplimiento completo de WCAG ni QA visual por navegador.
- Metadatos: se elimina el sufijo duplicado de Team, se ajustan Home/Investment/Tax Advisory/Team (152/156/138/153 caracteres) y se amplían las descripciones de Insights/Cases. Sin cambios de texto visible, imágenes, canonicals o puertas de indexación. Estos tamaños son objetivos editoriales, no garantías de posicionamiento.
- El importador rechaza payloads no draft o con publish_revision y no importa si falla la consulta de duplicados. La RPC sigue controlando admin. No se ejecutó contra el proyecto real.

## Comprobaciones

- npm ci correcto tras adaptar sharp.
- Lint: cero errores, ocho avisos img existentes.
- Typecheck correcto.
- Build correcto con SWC WASM; este entorno sin /proc requirió un preload temporal externo al repositorio para process.memoryUsage. No se añade al código ni CI.
- Auditoría HTTP: 45 respuestas correctas de páginas/APIs, privacidad, robots/sitemap y noindex. Sin credenciales Supabase; no demuestra funcionamiento autenticado de los detalles alojados.
- 29 suites / 463 tests correctos después de capturar HTML, sin skips, incluidos siete controles nuevos de landmarks.
- sharp 0.35.5: transformación real en memoria de fixture sintética PNG 800x600 a WebP y AVIF 480x360. Esto comprueba procesamiento de imagen, no Storage ni el flujo completo de subida.
- PR49 ya tenía CI remoto correcto antes del merge. Esta continuación requiere CI/build remoto de su SHA final antes de integrarla.

## Bloqueos de acceso comprobados

Supabase: get_project(wiswwjxshdknjihjpgcu) devuelve «You do not have permission to perform this action»; list_projects devuelve []. No se modificaron usuarios, Auth, datos o Storage. No se inventa una causa de OAuth frente a falta de permisos de la cuenta.

Gmail marketing@sarahkaterina.com: búsquedas de Search Console/webmasters/sc-domain/search.google.com, incluyendo in:anywhere, solo devolvieron el correo de inventario del 18 septiembre. No se encontró invitación. Una búsqueda ampliada posterior fue limitada por rate limit y no se considera evidencia negativa adicional.

Adjuntos proporcionados por el usuario: respuesta-accesos-web e INVENTARIO-ACCESOS-CREDENCIALES. Describen Search Console pendiente/prometida, y el stack de la web antigua en la cuenta de Igor/Annexa. No prueban accesos actuales de la nueva web Juanma/Vercel ni credenciales Studio. No se copian adjuntos ni credenciales al repositorio.

## Continuación pendiente

1. Recuperar una conexión autorizada a Supabase. No pedir contraseñas por chat; no recrear cuentas ni reinvitar por actualizar la web.
2. Importar los dos payloads como borradores con sesión admin y comprobar los documentos/resultados, notas y ausencia de publicación/duplicados.
3. QA con cuentas reales: login/recovery, abrir los diez contenidos existentes y los dos nuevos, editar/guardar/recargar, subir/seleccionar imagen y verificar permisos, incluyendo casos. Usar datos de prueba y restaurarlos.
4. El usuario elige imágenes, revisa el contenido y aprueba su publicación en preview. Mantener sin publicar mientras tanto.
5. Confirmar acceso a Search Console en marketing@ y propiedad correcta. No crear otra propiedad ni cambiar DNS por asumir que no existe. Si la invitación está en otro correo, pedir el remitente/asunto/fecha o verificar en la sesión autorizada del servicio.
6. Revisar visualmente el nuevo main por desktop/móvil y las páginas editoriales después de recuperar acceso. No afirmar paridad visual solo por tests de HTML.
7. Lanzamiento público, redirects, sitemap e indexación siguen pendientes de autorización específica. El paquete de directorios del repo madre PR38 es documentación: no se han ejecutado altas externas.
