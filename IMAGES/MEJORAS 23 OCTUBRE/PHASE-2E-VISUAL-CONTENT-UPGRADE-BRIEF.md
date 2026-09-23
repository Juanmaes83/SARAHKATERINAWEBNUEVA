# Sarah Katerina — Visual Content Upgrade Brief

## Auditoría de referencias y guía de implementación para Claude Code

**Estado:** documento de trabajo para la siguiente iteración visual. No implica merge ni aprobación de producción.

**Ámbito:** Investment, Property Purchase y Tax Advisory.

**Referencias auditadas:**

1. `MEJORAR Y COMPARAR CONTENIDO INVESTMENT 1 Y ADAPTAR ESTILO.png`
2. `MEJORAR Y COMPARAR CONTENIDO INVESTMENT 3 Y ADAPTAR ESTILO.png`
3. `MEJORAR Y COMPARAR CONTENIDO INVESTMENT. PREVIEW DEL INFORME COMPLETO  Y ADAPTAR ESTILO.png`
4. `MEJORAR Y COMPARAR CONTENIDO PROPERTY PURCHASE Y ADAPTAR ESTILO.png`
5. `MEJORAR Y COMPARAR CONTENIDO TAX ADVISORY Y ADAPTAR ESTILO.png`

---

## 1. Decisiones ya aprobadas

- La intensidad actual del hilo dorado de Phase 2E queda aprobada.
- Se aprueban los recortes compactos que eliminan lockups o textos incrustados en tarjetas pequeñas.
- En Property Purchase se elimina la duplicidad del eyebrow `The file, front to back`.
- En Property Purchase se corrige el pie de imagen para que describa la imagen real de entrega de llaves, no una revisión de documentos.
- Las imágenes con texto incrustado se mantienen provisionalmente.
- Los vídeos existentes no se incorporan en esta iteración; se reservarán los slots de hero para una fase posterior.
- El etalonaje común todavía falta y debe diseñarse como sistema de derivados de imagen, no como filtros improvisados en CSS.
- El report band necesita una mejora interactiva posterior o dentro de esta línea de trabajo, conservando cifras y resultados como ilustrativos hasta su aprobación.
- Team queda fuera de este encargo. No alterar su composición editorial salvo que una dependencia compartida lo haga inevitable.

---

## 2. Regla crítica sobre las cinco imágenes de referencia

Las imágenes adjuntas son capturas/referencias de la plantilla y de su arquitectura de contenido. **No deben insertarse en la web como una única imagen**, ni usarse como sustituto de una sección HTML.

Claude debe:

- reconstruir cada bloque con HTML semántico, CSS y componentes reutilizables;
- conservar accesibilidad, responsive, foco, teclado y reduced motion;
- usar las imágenes reales ya aprobadas solo en los slots de media correspondientes;
- reutilizar el registro de claims y `APPROVED_MEDIA` existente;
- no copiar automáticamente cifras, resultados, testimonios, precios, plazos o promesas visibles en la captura;
- marcar como `Illustrative`, `Pending` o mantener ocultos los datos que no estén aprobados;
- no crear una nueva cabecera, footer, token file, sistema de iconos o sistema de motion paralelo.

La referencia sirve para mejorar **claridad, densidad informativa, orden, proporción, jerarquía y ritmo editorial**.

---

## 3. Diagnóstico transversal

Las nuevas landings ya tienen la estructura correcta, pero varias secciones todavía se leen como una composición técnica o como un placeholder:

- demasiados esquemas genéricos en lugares donde la plantilla comunica una decisión concreta;
- información importante distribuida en tarjetas aisladas en vez de una narrativa visual continua;
- procesos y expedientes con menor legibilidad que las referencias;
- reportes correctos en estructura, pero estáticos y con demasiado espacio vacío;
- falta de un tratamiento común de color para las fotografías;
- falta de un lenguaje consistente para mostrar relación entre etapa, riesgo, entregable y decisión;
- algunos datos de la referencia son más claros visualmente, pero no todos son publicables.

La implementación debe mejorar la comprensión en los primeros segundos: el visitante debe entender qué problema resuelve Sarah, qué decisión puede tomar, qué recibe y cómo se conecta cada etapa.

---

# 4. Investment — referencia 1

## Referencia

`MEJORAR Y COMPARAR CONTENIDO INVESTMENT 1 Y ADAPTAR ESTILO.png`

## Qué comunica mejor que la landing actual

La referencia organiza el servicio como una decisión guiada:

1. por qué existe el servicio;
2. qué punto de partida tiene el visitante;
3. qué tipo de activo puede analizarse;
4. cómo se realiza el análisis;
5. qué recibe el cliente al final.

La frase visual equivalente a `A bridge between opportunity and peace of mind` funciona mejor que una explicación abstracta porque resume el valor del servicio en una sola tensión: oportunidad + tranquilidad.

También mejora la lectura porque cada bloque responde a una pregunta concreta:

- ¿Por qué debería confiar en este enfoque?
- ¿Qué puedo hacer ahora?
- ¿Mi tipo de activo entra en el servicio?
- ¿Qué pasos se siguen?

## Mapeo con la landing actual

| Referencia | Componente actual | Tratamiento solicitado |
|---|---|---|
| Why we exist | `ApproachBand` | Reforzar propuesta de valor, cuerpo explicativo y visual territorial sin cambiar la arquitectura compartida. |
| Choose your starting point | `DoorsBand` | Hacer que las puertas sean decisiones claras, con visual, título, criterios y CTA; evitar que parezcan tres tarjetas genéricas. |
| Types of assets | `AssetTypesBand` | Mantener las cuatro categorías, pero hacer más visible la diferencia entre tipo de activo, riesgo principal y entregable. |
| How we analyse | `ProcessBand` | Mantener la línea dorada aprobada y hacer que cada etapa lea como método + entregable. |

## Implementación

### `ApproachBand`

- Mantener el bloque de introducción actual, pero elevar la jerarquía del titular.
- Priorizar una frase corta de valor y un párrafo de explicación.
- Presentar el visual territorial como apoyo editorial, no como el mensaje principal.
- Mantener la lista de problemas/objeciones, pero evitar que compita con el titular.
- La sección debe leerse en este orden: promesa → explicación → prueba del método → objeciones que se resuelven.

### `DoorsBand`

- Usar dos decisiones principales como referencia visual: analizar una propiedad existente o explorar oportunidades.
- Si el contenido actual requiere una tercera vía, no eliminarla sin revisar el copy: integrarla como opción secundaria o dentro de la puerta que corresponda.
- Cada puerta debe tener:
  - imagen o visual claramente relacionado;
  - eyebrow breve;
  - título orientado a la decisión;
  - tres criterios concretos;
  - CTA propio.
- Evitar botones grandes repetidos que hagan que las tarjetas parezcan un catálogo.

### `AssetTypesBand`

- Conservar Residential, Land, Commercial y Redevelopment.
- No usar una fotografía residencial para representar Land o Commercial.
- Mantener esquema conceptual cuando no exista media adecuada.
- Dar prioridad visual al nombre de la categoría y a una descripción de una línea.
- Las filas `Analysed / Main risk / Deliverable` deben quedar compactas y legibles, no convertirse en párrafos secundarios.
- El CTA debe ser discreto y no competir con la decisión principal.

### `ProcessBand`

- Mantener las cinco etapas existentes y la línea dorada aprobada.
- Cada etapa debe tener: número, nombre, explicación breve y entregable.
- El hilo debe unir las etapas sin crear una línea falsa entre filas en móvil.
- En móvil, convertirlo en una secuencia vertical clara, sin forzar una timeline horizontal ilegible.

---

# 5. Investment — referencia 2

## Referencia

`MEJORAR Y COMPARAR CONTENIDO INVESTMENT 3 Y ADAPTAR ESTILO.png`

## Qué mejora

La referencia convierte la parte final de la landing en una promesa de acompañamiento continuo:

- tres operaciones o casos comparables;
- un único interlocutor a lo largo de la operación;
- una cadena de acompañamiento entendible;
- preguntas frecuentes agrupadas de forma ligera.

La landing actual contiene `CasesBand`, `JourneyBand` y `WebFaq`, pero la relación entre las tres secciones puede ser mucho más clara. Actualmente se perciben como módulos sucesivos; la referencia las convierte en el cierre lógico del servicio.

## Implementación

### `CasesBand`

- Mantener tres tarjetas.
- Usar una jerarquía de caso: tipo de operación → localización/estado si está aprobado → pregunta o riesgo → resultado.
- Si el resultado no está verificado, no inventarlo. Mostrar una estructura bloqueada o un texto de evidencia pendiente.
- No copiar automáticamente `+42%`, `6,1%` o `2,8x` desde la referencia. Esas cifras solo pueden aparecer si están registradas y aprobadas.
- Mantener el CTA de casos como acción secundaria.
- El diseño debe parecer un expediente editorial, no una galería de tarjetas vacías.

### `JourneyBand`

- Presentar el acompañamiento como una única cadena: analizar → comprar → declarar → operar, o el equivalente aprobado en el contenido actual.
- La línea debe reforzar continuidad, no convertirse en otra animación protagonista.
- Cada etapa debe tener una acción y un resultado comprensible.
- Mantener el hilo dorado y su intensidad aprobada.

### `WebFaq`

- Mantener preguntas independientes y accesibles.
- Visualmente, adoptar la ligereza de la referencia: grupos limpios, bordes discretos y títulos claros.
- No introducir una matriz de tres columnas si perjudica la legibilidad móvil o el comportamiento del acordeón.

---

# 6. Investment — referencia 3: informe completo

## Referencia

`MEJORAR Y COMPARAR CONTENIDO INVESTMENT. PREVIEW DEL INFORME COMPLETO  Y ADAPTAR ESTILO.png`

## Diagnóstico actual

`ReportBand` ya contiene cinco paneles y una lista de entregables. La estructura es correcta, pero todavía se percibe como una fila estática de tarjetas. La referencia comunica mejor que el informe es una herramienta para decidir, no una colección de gráficos decorativos.

## Objetivo

Convertir el report band en un **sample report exploratorio**, manteniendo la seguridad del preview:

- resumen de inversión;
- flujos de caja;
- distribución de resultados;
- estacionalidad;
- análisis de riesgo;
- entregables y CTA.

## Implementación recomendada

- Mantener los cinco paneles actuales y su orden.
- Permitir explorar cada panel con interacción accesible: tabs, selección de panel o una alternativa equivalente que no obligue a usar el ratón.
- En móvil, usar una secuencia horizontal controlable o paneles apilados; no comprimir cinco tarjetas ilegibles.
- El panel activo debe mostrar una explicación breve de qué decisión ayuda a tomar.
- Mantener `Illustrative` visible y no presentar cifras como resultados reales.
- No animar ni contar números. Solo pueden animarse formas de gráficos o indicadores de selección.
- Mantener la línea dorada como hilo de navegación interna del informe si no añade ruido.
- Reducir el espacio vacío mediante contenido contextual, no mediante una simple reducción de padding.
- Mantener CTA de descarga/solicitud como placeholder de preview si la ruta real todavía no existe.

## Prohibiciones

- No incorporar las cifras de la captura sin validación.
- No convertir el informe en una dashboard compleja.
- No añadir dependencias de charts si los componentes `SampleChart` existentes son suficientes.
- No hacer que la interacción oculte información esencial con reduced motion o JavaScript desactivado.

---

# 7. Property Purchase — referencia 4

## Referencia

`MEJORAR Y COMPARAR CONTENIDO PROPERTY PURCHASE Y ADAPTAR ESTILO.png`

## Qué comunica mejor

La referencia hace visible el concepto de un expediente único de compra:

- un archivo completo desde la primera visita hasta las llaves;
- siete estados ordenados;
- seis pasos de proceso;
- una revisión antes de firmar;
- una decisión clara: comprar, renegociar o retirarse.

La landing actual ya tiene estos bloques, pero la referencia los conecta mejor y les da más peso editorial.

## Mapeo e implementación

| Referencia | Componente actual | Mejora |
|---|---|---|
| One file / one team | `OneFileBand` | Reforzar el concepto del expediente único y hacer que las capacidades parezcan partes del mismo sistema. |
| File tracker | `FileTrackerBand` | Mantener las siete etapas y reforzar código, estado, entregable y continuidad de la línea. |
| End-to-end process | `ProcessBand` | Mantener seis pasos, con explicación breve y dueño/entregable. No publicar plazos no aprobados. |
| Before you sign | `BeforeSignBand` | Mantener checklist, estados ilustrativos y decisión visible sin fingir resultado real. |
| Final CTA | `FinalCtaBand` | Mantener imagen y copy coherentes con entrega de llaves. |

## Correcciones obligatorias

- Eliminar la repetición consecutiva del eyebrow `The file, front to back`.
- Mantener ese concepto en el tracker y usar un eyebrow distinto y correcto en el proceso de seis pasos.
- Cambiar el pie de la imagen del hero/final CTA para que hable de entrega de llaves o handover, no de revisión de documentos.
- No usar una captura completa de la plantilla como asset.

## Mejora visual

- Dar más presencia al expediente y al tracker sin aumentar innecesariamente el texto.
- El tracker debe leerse como una única secuencia, no como siete tarjetas desconectadas.
- El panel `Before you sign` debe priorizar la lista de riesgos y la decisión, no los adornos.
- En móvil, cada bloque debe conservar el orden: etapa → estado → explicación → entregable.
- Mantener el hilo dorado aprobado, con conectores verticales en móvil.

---

# 8. Tax Advisory — referencia 5

## Referencia

`MEJORAR Y COMPARAR CONTENIDO TAX ADVISORY Y ADAPTAR ESTILO.png`

## Qué comunica mejor

La referencia crea una lectura inmediata del servicio fiscal:

1. cada obligación está situada en un orden;
2. el visitante entiende las seis áreas de revisión;
3. el informe fiscal resume exposición, calendario, convenio y desglose;
4. el CTA aparece después de comprender el sistema.

La landing actual ya contiene `TaxProcessBand`, `TaxCalendarBand` y `TaxReportBand`, pero se pueden percibir como piezas independientes. La referencia las convierte en un sistema: obligaciones → calendario → informe → acción.

## Implementación

### `TaxProcessBand`

- Presentar seis áreas en este orden conceptual:
  1. Fiscal map
  2. ITP / VAT
  3. Modelo 210
  4. Plusvalía
  5. Wealth tax
  6. Annual review
- Mantener los nombres y claims gobernados por el contenido actual si difieren de la referencia.
- Cada tarjeta debe indicar análisis y entregable.
- Mantener la línea dorada aprobada, sin profundidad ni desplazamientos ornamentales.
- En móvil, mostrar una columna vertical y conservar la secuencia.

### `TaxCalendarBand`

- Mantener el calendario anual como la capa que convierte las obligaciones en meses y alertas.
- No duplicar el proceso: el proceso responde a “qué se revisa”; el calendario responde a “cuándo se ordena”.
- Las barras y fechas deben seguir siendo ilustrativas si no existe calendario aprobado para publicación.

### `TaxReportBand`

- Organizar el report preview alrededor de cuatro decisiones:
  - exposición fiscal;
  - calendario anual;
  - convenio con el país de residencia;
  - desglose de impuestos.
- Mantener el quinto elemento si es necesario como análisis de riesgo o entregables, pero no forzar una quinta columna ilegible.
- Hacer visible el CTA y la lista de entregables sin que tape la información.
- Mantener `Illustrative` y las notas legales.
- No copiar automáticamente los `€24.500`, `-18%`, `€8.200` ni ninguna cifra de la captura.

### Orden narrativo recomendado

`TaxContextBand` → `TaxProcessBand` → `TaxCalendarBand` → `TaxReportBand` → `TaxConcernsBand`.

No añadir una segunda trust band ni repetir las mismas credenciales en varios puntos.

---

# 9. Etalonaje común de imágenes

El etalonaje falta y debe convertirse en un sistema editorial común para las tres landings.

## Dirección visual

- temperatura cálida y controlada;
- negros profundos sin perder detalle en ropa o interiores;
- pieles naturales, sin dominante naranja;
- blancos ivory coherentes con la interfaz;
- contraste editorial moderado;
- teal reservado para identidad y pequeños acentos;
- gold reservado para llamadas, reglas y puntos de decisión;
- ningún filtro CSS que degrade o esconda texto incrustado.

## Proceso

- Crear derivados optimizados por slot y no aplicar un filtro global destructivo.
- Registrar para cada imagen: origen, uso, crop, focal point, ratio y estado de retocado.
- Usar `object-position` por composición, especialmente cuando aparece Sarah.
- Mantener una misma temperatura y contraste entre Investment, Tax Advisory y Property Purchase.
- No retocar todavía las imágenes con texto incrustado salvo que afecten a legibilidad o contengan errores evidentes.

---

# 10. Motion y límites de esta iteración

- Mantener aprobada la intensidad del hilo dorado y los tokens de Phase 2E.
- No añadir una segunda capa de efectos para compensar una mala jerarquía de contenido.
- El movimiento debe apoyar la secuencia: entender → comparar → decidir.
- No añadir vídeo en esta fase; conservar slots y poster/fallback.
- No modificar Team en este encargo.
- No introducir page transitions todavía si el routing real no está aprobado.
- Toda nueva interacción del report debe funcionar con teclado, reduced motion y fallback estático.

---

# 11. Criterios de aceptación

Claude debe entregar una Preview nueva y reportar:

- qué componentes ha modificado por landing;
- qué bloques nuevos se han reconstruido en HTML/CSS;
- qué cifras o claims se han mantenido como ilustrativos o pendientes;
- qué imágenes reales ha reutilizado y con qué crop;
- qué duplicidades de Property se han eliminado;
- cómo se ha aplicado el etalonaje común;
- cómo funciona el report exploratorio con teclado y móvil;
- capturas Playwright/Chromium a 375 y 1440 px de las tres landings;
- comprobación de 320, 390, 768 y 1024 px;
- reduced motion, JavaScript desactivado, scroll rápido, foco y teclado;
- lint, typecheck, tests y build;
- confirmación de que no se ha hecho merge ni se ha tocado producción.

La aceptación visual no será “se parece a la captura”. Debe demostrar que la web comunica mejor el servicio, que las secciones tienen una función clara y que la referencia se ha traducido a una experiencia web viva, accesible y premium.

---

# 12. Orden de ejecución recomendado

1. **Correcciones de contenido sin riesgo:** eliminar la duplicidad de Property Purchase y corregir el pie de imagen.
2. **Investment — narrativa principal:** Approach, Doors, Asset Types y Process tomando como referencia la imagen 1.
3. **Investment — cierre editorial:** Cases, Journey y FAQ tomando como referencia la imagen 2.
4. **Investment — report interactivo:** convertir la estructura actual en una muestra explorable, tomando como referencia la imagen 3.
5. **Property Purchase:** reforzar expediente, tracker, proceso y Before You Sign tomando como referencia la imagen 4.
6. **Tax Advisory:** ordenar proceso, calendario e informe fiscal tomando como referencia la imagen 5.
7. **Etalonaje común:** aplicar derivados y focal points consistentes a las tres landings.
8. **QA visual y técnico:** revisar primero Investment, después extender el patrón a Tax y Property.

Cada paso debe generar una comprobación visual antes de continuar. Si una mejora de contenido exige cambiar claims, precios, plazos, resultados o testimonios, debe detenerse y registrarse como decisión pendiente; no debe resolverse inventando copy.
