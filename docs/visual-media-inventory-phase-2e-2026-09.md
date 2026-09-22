# Inventario visual de medios — Fase 2E

**Estado:** APROBADO PARA IMPLEMENTACIÓN PROVISIONAL EN PREVIEW · NO PRODUCCIÓN  
**Fecha:** 2026-09-22  
**Rama:** `feat/phase-2e-premium-media-motion-2026-09-22`  
**Alcance:** Investment, Tax Advisory y Property Purchase

Este documento inventaría los medios disponibles para enriquecer visualmente las tres
landings. La implementación provisional de los medios aprobados 1–8 queda autorizada
exclusivamente en Preview. No autoriza su publicación, indexación ni producción. La
selección final, el crop, el retoque y el uso público requieren revisión visual humana.

---

## 1. Fuentes revisadas

### Aplicación nueva

- `/preview/investment`
- `/preview/tax-advisory`
- `/preview/property-purchase`
- Preview de referencia de la rama Phase 2E:
  `https://sarahkaterina-web-nueva-7t5uuce69-juanma-espinosas-projects.vercel.app`

### Landing pública de referencia

- `https://www.sarahkaterina.com/services/property-purchase`

La landing pública se utilizó para localizar y contrastar la arquitectura de
Property Purchase, su ritmo editorial, la navegación y la secuencia del expediente.
No se ha tratado como fuente de assets reutilizables.

### Repositorio

- Repositorio de trabajo: `Juanmaes83/SARAHKATERINAWEBNUEVA`
- Repositorio madre: `Juanmaes83/sarahkaterina`, solo lectura
- Buyer System: solo lectura

La revisión visual asistida se realizó con Chromium en desktop y se cruzó con el
código, la documentación de assets y las rutas de preview.

---

## 2. Diagnóstico actual

| Elemento | Estado verificado |
|---|---|
| Imágenes nuevas candidatas | 24 piezas visuales únicas |
| Duplicados exactos | 8 archivos repetidos entre raíz e `IMAGES/` |
| Vídeos `.mp4`, `.webm` u otros | No hay ninguno en el repositorio |
| Imágenes nuevas referenciadas por la aplicación | Ninguna |
| Logo canónico | Ya importado en `public/brand/` |
| Retratos auténticos de Sarah | Ya importados en `public/sarah/` |
| Hero fotográfico real | Pendiente de asignación |
| Fotografía de propiedades/Costa Blanca | Candidatos disponibles, ninguno asignado todavía |
| Casos y testimonios verificables | Bloqueados por permisos y evidencias |
| Imágenes con logo o copy incrustado | Permitidas provisionalmente para composición |
| Retoque final | Necesario antes de producción |

Las imágenes subidas sirven para avanzar visualmente. No deben interpretarse todavía
como assets finales aprobados ni como pruebas de resultados, testimonios, clientes o
propiedades reales.

---

## 3. Regla de uso provisional

Las piezas que contienen el logo, titulares o copy incrustado pueden utilizarse
durante la fase de composición visual para comprobar escala, ritmo, color y
jerarquía. Antes de una publicación deberán:

- limpiarse o retocarse;
- conservar únicamente texto aprobado;
- eliminar cifras, testimonios o afirmaciones no verificadas;
- mantener proporción, textura y tratamiento editorial;
- registrar el crop y el alt text definitivo.

No se utilizarán como evidencia documental de un cliente, inmueble, resultado o
testimonio.

---

## 4. Inventario completo de assets

### 4.1 Home, Sarah y marca

| Asset | Descripción visual | Encaje recomendado | Prioridad | Estado |
|---|---|---|---:|---|
| `IMAGES/sarahkaterina_home.png` | Sarah en un interior oscuro y elegante, composición de marca | Hero Investment o Tax Advisory | A | Candidata fuerte; revisar copy incrustado |
| `IMAGES/sarahkaterina_home2.png` | Sarah en una escena premium de conversación/asesoría | Hero Property Purchase | A | Candidata fuerte; retocar texto |
| `IMAGES/sarahkaterina_home3.png` | Sarah en interior contemporáneo con pantalla y contexto de trabajo | Hero Property Purchase o Tax Advisory | A | Candidata fuerte; revisar legibilidad |
| `IMAGES/sarahkaterina_blog.png` | Composición editorial de Sarah en blanco y negro con varias exposiciones | About/Authority, blog o transición editorial | B | Buena pieza de marca; no usar como caso |
| `IMAGES/sarahkaterina_testimonios_clientes.png` | Sarah en entorno editorial con referencia visual a clientes | Sección de casos solo como composición | C | No publicar claims ni testimonios sin permisos |

### 4.2 Lifestyle y territorio

| Asset | Descripción visual | Encaje recomendado | Prioridad | Estado |
|---|---|---|---:|---|
| `sarahkaterina_LifeStyle_1.png` | Costa/playa con pieza cerámica y atmósfera mediterránea | CTA final, Costa Blanca, transición | A | Mejor candidato territorial |
| `sarahkaterina_LifeStyle_2.png` | Interior cálido con sillón, luz natural y café | Investment, Property Purchase, CTA | A | Muy usable; retocar logo/copy |
| `sarahkaterina_LifeStyle_3.png` | Sillón de fibras, libro y luz de ventana | Investment, pausa editorial, autoridad indirecta | A | Buena textura y aire |
| `sarahkaterina_LifeStyle_4.png` | Interior con sofá de cuero y mesa de trabajo | Property Purchase, proceso, decisión | B | Útil para apoyar workflow |
| `sarahkaterina_LifeStyle_5.png` | Interior gris claro y sobrio con sofá | Tax Advisory, fondos de sección | B | Buena neutralidad; revisar contraste |
| `IMAGES/sarahkaterina_LifeStyle_6.png` | Naturaleza muerta con teléfono, llaves, café y textiles | CTA, contacto, handoff a conversación | A | Excelente para CTA/contacto |

### 4.3 Servicios, análisis y propiedades

| Asset | Descripción visual | Encaje recomendado | Prioridad | Estado |
|---|---|---|---:|---|
| `IMAGES/sarahkaterina_services_1.png` | Escena oscura de análisis con pantalla y Sarah | Report preview, Tax Advisory, Investment | A | Buena para prueba visual |
| `IMAGES/sarahkaterina_services_2.png` | Persona observando una presentación en un interior | Process, report, decision doors | A | Útil para explicar acompañamiento |
| `IMAGES/sarahkaterina_services_3.png` | Sarah trabajando en exterior/mesa de piedra con contexto territorial | Hero o CTA Property Purchase | A | Potente; revisar texto incrustado |
| `sarahkaterina_services_6.png` | Interior contemporáneo con personas, mesa y visualización | Tax Advisory/report/process | B | Candidata de apoyo |
| `IMAGES/sarahkaterina_Services 8.png` | Interior arquitectónico luminoso de alta gama | Asset types: Residential | A | Muy buena como tarjeta de propiedad |
| `IMAGES/sarahkaterina_Services_9.png` | Maqueta/visualización arquitectónica residencial | Asset types, due diligence, Property Purchase | A | Muy buena para análisis de inmueble |
| `IMAGES/sarahkaterina_Services_10.png` | Plano o modelo tridimensional de vivienda | Property Purchase, report, file | A | Ideal para la idea de expediente |
| `sarahkaterina_Services_11.png` | Composición editorial para compradores extranjeros en España | Hero/section de audiencia | B | Útil, pero requiere limpieza de textos |
| `sarahkaterina_Services_12.png` | Sarah en un interior oscuro con presentación/pantalla | Hero Investment o autoridad | A | Candidata fuerte; revisar copy |
| `sarahkaterina_Services_14.png` | Sarah asesorando junto a una mesa/pantalla | Hero Property Purchase o process | A | Candidata fuerte |
| `sarahkaterina_Services 8.png` | Copia exacta de Services 8 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_Services_9.png` | Copia exacta de Services 9 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_Services_10.png` | Copia exacta de Services 10 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |

### 4.4 Contacto y conversación

| Asset | Descripción visual | Encaje recomendado | Prioridad | Estado |
|---|---|---|---:|---|
| `sarahkaterina_Contacto.png` | Interior oscuro con ventanales y mesa de decisión | CTA/contacto o conversation section | B | Buena atmósfera; revisar copy |
| `IMAGES/sarahkaterina_contacto_2.png` | Interior gris/contemporáneo con plano o pantalla | Tax Advisory/report/process | B | Útil como apoyo |
| `IMAGES/sarahkaterina_contacto_3.png` | Composición de Sarah/entorno con elementos de contacto | CTA/contacto | B | Retocar texto y logo |
| `sarahkaterina_contacto_2.png` | Copia exacta de Contacto 2 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_contacto_3.png` | Copia exacta de Contacto 3 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_services_1.png` | Copia exacta de Services 1 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_services_2.png` | Copia exacta de Services 2 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |
| `sarahkaterina_services_3.png` | Copia exacta de Services 3 en raíz/IMAGES | No duplicar en la selección | — | Usar solo la ruta de `IMAGES/` |

> Nota: las ocho entradas marcadas como copia exacta no son piezas adicionales.
> La selección operativa debe utilizar una única ruta canónica en `IMAGES/`.
> El inventario visual contiene 24 piezas únicas, no 32 piezas distintas.

---

## 5. Selección recomendada por landing

### 5.1 Investment

| Sección | Selección primaria | Alternativa | Motivo |
|---|---|---|---|
| Hero | `sarahkaterina_Services_12.png` | `sarahkaterina_home.png` | Sarah + contexto de decisión/inversión |
| Decision doors | `sarahkaterina_Services 8.png` / `Services_9.png` | `Services_10.png` | Propiedad, arquitectura y análisis |
| Asset types | `Services 8`, `Services_9`, `Services_10` | `LifeStyle_4` | Tres familias visuales coherentes |
| Report preview | `services_1.png` | `contacto_2.png` | Lectura de datos y asesoría |
| Scenarios/risk | `services_6.png` | `services_2.png` | Contexto de revisión y conversación |
| Authority | `public/sarah/sk-real-2.jpg` | `sarahkaterina_blog.png` | Mantener retrato auténtico gobernado |
| CTA final | `LifeStyle_1.png` | `LifeStyle_6.png` | Territorio y cierre editorial |

### 5.2 Tax Advisory

| Sección | Selección primaria | Alternativa | Motivo |
|---|---|---|---|
| Hero | `sarahkaterina_home.png` | `Services_12.png` | Autoridad y lectura del sistema español |
| Problem/context | `LifeStyle_5.png` | `LifeStyle_2.png` | Fondo sobrio, no inmobiliario |
| Calendar/process | `services_1.png` | `services_6.png` | Trabajo, documentos y asesoría |
| Report preview | `contacto_2.png` | `services_2.png` | Pantallas y revisión guiada |
| Services | `Services_10.png` | `Services_9.png` | Visuales de análisis, no claims de resultado |
| Authority | `public/sarah/sk-real-2.jpg` | `sarahkaterina_blog.png` | Retrato gobernado |
| CTA final | `LifeStyle_6.png` | `Contacto.png` | Paso hacia conversación |

### 5.3 Property Purchase

| Sección | Selección primaria | Alternativa | Motivo |
|---|---|---|---|
| Hero | `sarahkaterina_home2.png` | `sarahkaterina_home3.png` | Sarah en contexto de comprador/decisión |
| Audience/property | `Services 8.png` | `Services_9.png` | Vivienda y arquitectura |
| One-file document | `Services_10.png` | `services_1.png` | Plano, expediente y análisis |
| Process/tracker | `services_2.png` | `Contacto.png` | Acompañamiento y coordinación |
| Services | `Services_8`, `Services_9`, `Services_10` | `LifeStyle_4` | Propiedad, modelo y entorno |
| Authority | `public/sarah/sk-real-2.jpg` | `Services_14.png` | La autoridad debe seguir usando retrato real |
| CTA final | `LifeStyle_1.png` o `LifeStyle_6.png` | `services_3.png` | Costa Blanca + conversación |

---

## 6. Ranking general de implementación

### Grupo A — Implementar primero

1. `sarahkaterina_home2.png` — hero Property Purchase.
2. `sarahkaterina_home.png` — hero Tax Advisory.
3. `sarahkaterina_Services_12.png` — hero Investment/autoridad.
4. `sarahkaterina_LifeStyle_1.png` — Costa Blanca y CTA.
5. `sarahkaterina_LifeStyle_6.png` — contacto/CTA.
6. `sarahkaterina_Services 8.png` — vivienda.
7. `sarahkaterina_Services_9.png` — arquitectura/maqueta.
8. `sarahkaterina_Services_10.png` — plano/análisis.
9. `sarahkaterina_services_1.png` — report/proceso.
10. `sarahkaterina_services_3.png` — Sarah + contexto territorial.

### Grupo B — Implementar después

- `home3.png`
- `LifeStyle_2.png`
- `LifeStyle_3.png`
- `LifeStyle_4.png`
- `LifeStyle_5.png`
- `services_2.png`
- `services_6.png`
- `contacto_2.png`
- `contacto_3.png`
- `Contacto.png`
- `Services_11.png`
- `Services_14.png`

### Grupo C — Solo con retouching o como referencia

- `sarahkaterina_blog.png`
- `sarahkaterina_testimonios_clientes.png`

Motivo: contienen composiciones editoriales o lenguaje de testimonios/clientes
que no debe publicarse como prueba sin evidencias, permisos y copy aprobado.

---

## 7. Vídeo

No se ha encontrado ningún vídeo en el repositorio nuevo ni en el lote subido.

Por tanto:

- no se debe simular un vídeo con una imagen fija sin etiquetarlo;
- los slots de hero video permanecen pendientes;
- se puede implementar primero una imagen poster de calidad;
- el vídeo podrá añadirse después sin cambiar la estructura si conserva la misma
  relación de aspecto;
- el vídeo debe tener poster, fallback, control de sonido, accesibilidad y
  comportamiento específico para `prefers-reduced-motion`.

Candidatos de dirección para un futuro vídeo:

- Sarah revisando documentos junto a una propiedad;
- recorrido lento por arquitectura/interior Costa Blanca;
- mesa con documentos, plano y portátil;
- gesto de acompañamiento del comprador antes de firmar.

La producción o selección del vídeo requiere una decisión independiente de Juanma.

---

## 8. Retoque pendiente

Antes de considerar estas piezas listas para producción:

1. eliminar logos y textos incrustados cuando no sean copy aprobado;
2. limpiar claims, cifras, testimonios y nombres no verificados;
3. corregir posibles artefactos de generación o composición;
4. preparar versiones desktop y mobile;
5. definir crops seguros para títulos y botones;
6. exportar WebP/AVIF optimizado conservando PNG/JPG de origen;
7. registrar dimensiones, peso, hash, alt text y slot final;
8. verificar contraste y legibilidad encima de cada imagen.

El retoque puede realizarlo Juanma. La implementación web debe respetar después
los encuadres aprobados y no volver a recortar de forma arbitraria.

---

## 9. Decisiones que debe aprobar Juanma

### A. Investment

- Hero: `Services_12` o `home`.
- Uso de `Services 8/9/10` como sistema de tarjetas de asset types.
- Uso de `LifeStyle_1` como territorio/CTA.

### B. Tax Advisory

- Hero: `home` o `Services_12`.
- Uso de `services_1` y `contacto_2` en report/process.
- Uso de `LifeStyle_6` en CTA.

### C. Property Purchase

- Hero: `home2` o `home3`.
- Uso de `Services_8/9/10` en audience, file y services.
- Uso de `LifeStyle_1` o `LifeStyle_6` en CTA.

### D. General

- Confirmar si las piezas con logo/copy incrustado se utilizan solo como
  composición provisional.
- Confirmar si `sarahkaterina_testimonios_clientes.png` queda fuera hasta tener
  permisos.
- Confirmar si se mantiene el retrato auténtico actual de autoridad.
- Decidir si se encarga o aporta un vídeo.
- Confirmar qué imágenes retocará Juanma antes de la siguiente implementación.

---

## 10. Estado de aprobación

Juanma aprobó el bloque de implementación provisional registrado en §11:

- se implementan provisionalmente los puntos 1–8;
- el punto 9 queda excluido;
- no se incorpora vídeo todavía;
- la navegación premium queda fuera de esta entrega.

Esta aprobación permite trabajar en previews y no autoriza publicación, indexación,
producción ni uso de las piezas como prueba de clientes, inmuebles, resultados o
testimonios. El retoque final, el crop definitivo, el alt text y la validación
visual de cada integración siguen siendo gates antes de producción.


## 11. Registro de aprobación humana

**Aprobado por Juanma:** 2026-09-22

Queda aprobado el bloque de selección e implementación provisional de medios:

1. Heroes provisionales:
   - Investment: `sarahkaterina_Services_12.png`
   - Tax Advisory: `sarahkaterina_home.png`
   - Property Purchase: `sarahkaterina_home2.png`
2. Visuales de propiedades y asset types:
   - `sarahkaterina_Services 8.png`
   - `sarahkaterina_Services_9.png`
   - `sarahkaterina_Services_10.png`
3. Visuales de territorio y CTA:
   - `sarahkaterina_LifeStyle_1.png`
   - `sarahkaterina_LifeStyle_6.png`
4. Visuales de proceso y análisis:
   - `sarahkaterina_services_1.png`
   - `sarahkaterina_services_2.png`
   - `sarahkaterina_contacto_2.png`
   - `sarahkaterina_services_6.png`
5. Uso provisional permitido de imágenes con logo o copy incrustado.
6. Se mantiene el retrato auténtico actual de Sarah como autoridad.
7. `sarahkaterina_testimonios_clientes.png` queda excluida hasta disponer de
   permisos, evidencias y copy aprobado.
8. No se incorpora vídeo todavía. Se implementan imágenes y se dejan los slots
   preparados para vídeo futuro.

### Alcance explícitamente excluido de esta entrega

La navegación premium, el menú inspirado en ThreeUI, el scrollspy y las
transiciones de navegación **no forman parte de esta implementación**. Se
trabajarán en una fase posterior, después de revisar visualmente las imágenes
integradas.

### Condición de uso

La aprobación es visual y provisional para previews. No autoriza publicación,
indexación ni producción. Las imágenes deberán poder sustituirse por versiones
retocadas sin cambiar la arquitectura ni los slots de las landings.
