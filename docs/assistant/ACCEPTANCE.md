# QA y entrega del asistente propuesto

Actualización: matriz original de aceptación; implementación guiada añadida después de autorización de Juanma. Las pruebas concretas realizadas se distinguen de los criterios de futura ampliación en ../ASSISTANT-WHATSAPP-REVIEW-2026-10-09.md y el JSON de evidencia. No afirmar que toda esta matriz ni la revisión humana están cerradas.
No usar formularios, Studio o BD alojada: Preview comparte datos de producción.

| ID  | Caso                                 | Resultado exigido                                                                  |
| --- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| Q01 | Abrir panel                          | Cerrado inicialmente; A01, sin petición a proveedor/backend                        |
| Q02 | A02–A09                              | Texto aprobado exacto y destino existente del registro                             |
| Q03 | A11: precio/disponibilidad           | Sin cifra/promesa; contacto                                                        |
| Q04 | Pregunta individual fiscal/inversión | Sin diagnóstico/cálculo; opción contacto                                           |
| Q05 | Fuente o respuesta pending           | Ausente del bundle habilitado                                                      |
| Q06 | Fuente modificada/caducada           | Respuesta suspendida; fallback/contacto                                            |
| Q07 | Fuentes contradictorias              | No combinar ni resolver automáticamente                                            |
| Q08 | Cerrar y reabrir                     | Estado vuelve a inicio                                                             |
| Q09 | Recargar/salir de ruta               | Sin memoria conservada                                                             |
| Q10 | Inspección storage/cookies           | Ningún almacenamiento del asistente                                                |
| Q11 | DevTools/red                         | Sin texto/elecciones en logs o analytics; sin proveedor IA                         |
| Q12 | WhatsApp sin clic                    | Ninguna carga/conexión WhatsApp del asistente                                      |
| Q13 | WhatsApp con clic                    | Destino existente; saludo neutro; sin historial; no autoenvío                      |
| Q14 | Reserva/email sin configuración      | Sin href inventado; alternativa Contact                                            |
| Q15 | Inyección/exfiltración               | V1 sin input; sin acceso a datos privados/herramientas                             |
| Q16 | Escape/Tab/Shift-Tab                 | Escape cierra; foco atrapado y restaurado                                          |
| Q17 | Lectores de pantalla                 | Nombre/rol/estado accesibles; navegación comprensible                              |
| Q18 | 320 y 390px                          | Sin overflow, 44px, sin tapar CTA/menú/footer                                      |
| Q19 | 1440px y zoom 200%                   | Panel usable, contenido y cierre accesibles                                        |
| Q20 | Menú móvil/consentimiento            | Sin capas competidoras ni control inaccesible                                      |
| Q21 | Reduced motion                       | Sin animación esencial ni scroll-jacking                                           |
| Q22 | Idioma/rutas                         | EN coherente; sin rutas ES/hreflang ficticios                                      |
| Q23 | SEO/GEO                              | Contenido principal sigue en HTML; chatbot no sustituye FAQ ni añade claims/schema |
| Q24 | Entorno Preview                      | Noindex conservado; sin escrituras alojadas                                        |
| Q25 | Bundle y secretos                    | Sin IDs de proveedor, credenciales, SDK WhatsApp o IA                              |
| Q26 | Deshabilitar asistente               | Sitio y canales Contact siguen utilizables                                         |

Automatizar lo que corresponda al implementar: elegibilidad del catálogo, destinos, memoria y componentes con teclado, ausencia de persistencia/proveedor y guardas. Verificación humana complementa móvil, desktop, foco, zoom y red real; CI no equivale a revisión humana.

## Entrega visual posterior obligatoria

Para cada cambio visible: URL exacta de Preview (no el alias mutable como única evidencia), SHA, ruta, login/rol si se requiere, instrucciones a 1440px y 390/320px, resultado y efectos de botones. Visitante público; si Vercel protege el Preview, acceso mediante su autorización existente. Abrir/cerrar/opciones no escriben ni consumen IA; WhatsApp abre servicio externo y solo el visitante envía. Navegar/call/mail puede activar el servicio elegido.

El Preview del PR documental original #58 no demuestra la UI. Usar el deployment exacto del PR de implementación y su SHA. Merge, deploy de infraestructura, proveedor conectado y validación humana deben reportarse por separado.

## Checkpoint y pendientes independientes

Base: `5b3b5cc45bfefe1afb87228a846945c47edcc6e9`. Cambios únicamente en docs/assistant y enlace de Project State. SHA/PR/CI de entrega constarán en el PR, evitando SHA autorreferencial.
Árbol local inicial vacío; clonación completada en sarah-web y rama propia docs/assistant-contract-2026-10-09. Las comprobaciones de esta continuación constarán en el PR; no atribuir pruebas antiguas a esta rama.

La QA completa del Studio (roles, conflictos, recuperación y Media Library) sigue pendiente del stack local demostrado aislado. Este contrato no la ejecuta ni la cierra. Mantener ../STUDIO-ISOLATED-QA-2026-10-09.md y ../STUDIO-LOCAL-EXECUTION-HANDOFF-2026-10-09.md. Legal: decisiones de privacidad, revisión de textos, registro aplicable y cierre de servicios siguen en la solicitud a Sarah; no resolverlas con el chatbot.
