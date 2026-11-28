---
name: icons-to-figma
description: Lleva a la página Icons de Figma los iconos de Tabler Icons que usan los componentes de src/components, como componentes de 24 × 24 px. Úsala cuando pidan pasar o actualizar los iconos en Figma, cuando un componente empiece a usar un icono nuevo, o antes de components-to-figma. No pasa tokens ni componentes.
---

# Iconos a Figma

Archivo de destino: <https://www.figma.com/design/AnNYIBhMWsMimOzOKaTrEx/Lumine-DS>

## Alcance

Pasa a Figma los iconos que usan los componentes, no toda la librería, y solo en versión outline: nunca los filled.

Se usa antes de `components-to-figma`. Requisito: `tokens-to-figma` ya ejecutada. Los tokens los pasa `tokens-to-figma` y los componentes, `components-to-figma`.

Los iconos que sobren en Figma se avisan y no se borran sin que una persona lo apruebe ([ADR-008](../../../docs/adr/008-fuente-de-verdad.md)).

## Archivos que lee

- `src/components/*.tsx`: qué iconos importan de `@tabler/icons-react`. Solo los componentes: no cuentan `*.stories.tsx` ni `*.test.tsx`. No cuentan las importaciones de tipos (`type Icon`). Con un nombre cambiado (`IconX as Close`) vale el original.
- `node_modules/@tabler/icons-react/dist/esm/icons/<Nombre>.mjs`: el dibujo de cada icono, en `__iconNode`. Si falta la carpeta, `npm ci`.
- `node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs`: lo común a todos (lienzo de 24 × 24, sin relleno, trazo de 2 y extremos y uniones redondos).

Un icono vale solo si su archivo dice `createReactComponent("outline", …)`. Si un componente importa un icono `…Filled`, no se pasa: avisa.

## Pasos

**Antes de empezar**

- Usa el conector de Figma que esté conectado y uno solo en toda la ejecución: el MCP de Figma (`use_figma`), Figma Console (`figma_execute`) o `figma-cli`. Con el MCP de Figma, carga antes la skill `figma-use`.
- En la colección `Semantic` tienen que estar las variables `color/icon/neutral` y `border-width/strong`. Búscalas por su nombre. Si falta alguna, para: antes hay que ejecutar `tokens-to-figma`.

### 1. Crear solo lo que falta

Mira si la página `Icons` ya existe y qué componentes tiene. Compara por nombre y crea solo los que falten, sin duplicar ninguno. Un icono que ya está no se borra ni se vuelve a crear, porque se romperían las instancias que lo usan: si algo suyo no cumple el checklist, avisa. Así, cuando un componente use un icono nuevo, basta con volver a usar la skill.

### 2. Nombre

El del código sin el prefijo `Icon`: `IconPlus` → `Plus`, `IconAlertCircle` → `AlertCircle`. Nunca `IconPlus` ni `tabler/Plus`.

### 3. Componente

Cada icono es un componente nativo de Figma (`figma.createComponent()`) de 24 × 24 px, sin relleno, listo para intercambiarse dentro de otros componentes.

### 4. Dibujo

El de Tabler Icons tal cual, sin cambiar nada: todos sus paths en un único trazo vectorizado, en una sola capa que se llama siempre `SVG`.

1. Escribe el SVG completo con los elementos de `__iconNode` y lo común a todos, con `stroke="#000"`, y créalo con `figma.createNodeFromSvg`. No escribas los paths a mano en `vectorPaths`: Tabler usa arcos, que ahí no se admiten.
2. Anota el rectángulo que ocupan juntos los vectores recién creados: posición y tamaño.
3. Júntalos en uno con `figma.flatten`. Es un vector que conserva su trazo: nunca uses *Outline stroke*, que lo convertiría en un relleno.
4. Pásalo al componente con la misma posición y el mismo tamaño, llámalo `SVG` y borra el marco temporal.
5. Déjalo sin relleno, con `strokeCap` y `strokeJoin` en `ROUND` (sin eso desaparecen los puntos, como el de `AlertCircle`).
6. Pon su color con la variable `color/icon/neutral` (el token `color.icon.neutral`) en el trazo.
7. Fija `constraints` en `SCALE` en los dos ejes: conserva su tamaño y su posición naturales dentro de los 24 px, no se estira ni se deforma, y escala con el componente.

### 5. Grosor

Enlaza `strokeWeight` del vector a la variable `border-width/strong`.

### 6. Descripción

Dice que es un icono outline de Tabler Icons, su nombre completo y su trazo, con el número que tenga la variable. No dice qué componentes lo usan.

> Icono outline de Tabler Icons · IconPlus · trazo 2px

### 7. Cuadrícula

Los iconos van directamente en la página, sin marcos que los agrupen, con 24 px entre uno y otro: ocho por fila, a 48 px de paso, en orden alfabético la primera vez. Los nuevos van después del último y los que ya estaban no se mueven. Revisa la página con una captura.

### 8. Lista para los componentes

Devuelve la lista para que `components-to-figma` la use en el intercambio de instancia:

| En el código | En Figma | `id` del componente | `key` |
| --- | --- | --- | --- |
| `IconPlus` | `Plus` | … | … |

La lista se puede rehacer en cualquier momento leyendo por nombre los componentes de la página `Icons`.

## Resultado

La página `Icons` en Figma, con un componente por icono, y en la respuesta la lista nombre → componente, los iconos creados, los que ya estaban, los que sobran y lo que no se pudo hacer. No cambia archivos del repositorio.

## Checklist

Se comprueba leyendo Figma después de escribir.

- [ ] Los nombres van sin el prefijo `Icon`.
- [ ] Cada icono es un componente de 24 × 24 px, sin relleno.
- [ ] Cada componente tiene una sola capa, `SVG`, que es un único vector con trazo.
- [ ] El dibujo es igual que el de Tabler Icons, incluidos los puntos, con extremos y uniones redondos.
- [ ] Ningún icono está deformado: la capa `SVG` ocupa la misma posición y el mismo tamaño que los vectores antes de juntarlos, y escala con el componente.
- [ ] El grosor está enlazado a la variable `border-width/strong` y el color al token `color.icon.neutral`.
- [ ] La descripción tiene el nombre completo y el trazo.
- [ ] No hay ningún duplicado.
- [ ] En la página están solo los iconos que usan los componentes; si sobra alguno, se avisó.
