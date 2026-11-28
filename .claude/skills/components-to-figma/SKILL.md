---
name: components-to-figma
description: Pasa un componente de Lumine-DS del código a Figma, con las propiedades de docs/figma-map.md, el aspecto de su historia principal de Storybook y las variantes en una cuadrícula. Úsala cuando pidan llevar, dibujar o actualizar un componente en Figma. No pasa tokens ni iconos, y no crea contratos.
---

# Componentes a Figma

Archivo de destino: <https://www.figma.com/design/AnNYIBhMWsMimOzOKaTrEx/Lumine-DS>

## Alcance

Pinta en Figma un componente. Las propiedades (nombres, tipos, valores y orden) las decide `docs/figma-map.md`, y cómo se ve (contenido, iconos, qué está visible por defecto), su historia principal de Storybook. La skill no cambia ninguna de las dos cosas.

Requisito: `tokens-to-figma` e `icons-to-figma` ya ejecutadas, y en Figma los componentes que lleva dentro (`composedOf` del contrato). No cubre crear el contrato (`ds-component-creator`).

**Si algo no está resuelto en el mapa y cambia cómo se ve el componente, para y pregunta.** Solo lo que no cambia cómo se ve (el orden de una etiqueta, un margen de la cuadrícula) lo decides tú y lo apuntas en la PR, en una lista «Decisiones que he tomado».

## Archivos que lee

- `docs/figma-map.md`, después de ejecutar `npm run figma-map`. Si el comando falla, para.
- `contracts/<componente>.json`.
- Sus historias: `src/components/<Componente>.stories.tsx`.
- `figma/variables.json`.
- `figma/components.json`. Si no existe, todavía no hay ningún componente en Figma.

## Antes de dibujar

1. Si el contrato tiene `composedOf`, comprueba en `figma/components.json` que esos componentes ya están en Figma. Si falta alguno, para y di cuál hay que pasar antes. Nunca se dibuja a mano un componente que ya existe.
2. Arranca Storybook (`npm run storybook`, recién arrancado; uno que lleve horas abierto puede no estar al día; si el puerto 6006 está ocupado, `npx storybook dev -p <puerto> --ci --no-open`), abre la **historia principal** y haz una captura. Es el modelo: el componente en Figma tiene que verse igual.
   - La historia principal es `Default` y, si no existe, la primera que exporta el archivo.
   - Si esa historia no enseña el componente (como `Default` de `Dialog`, que solo muestra el botón que lo abre), vale la primera que lo enseñe (`Open`).
3. Mira si el componente ya está en Figma. Si está, se actualiza sin borrarlo ni volver a crearlo, para no romper sus instancias.

Usa el conector de Figma que esté conectado y uno solo en toda la ejecución: el MCP de Figma (`use_figma`), Figma Console (`figma_execute`) o `figma-cli`. Con el MCP de Figma, carga antes las skills `figma-use` y `figma-generate-library`.

## Pasos

### Nombres y propiedades

- Todo lo que se crea en Figma se nombra en inglés: páginas, marcos, capas, propiedades, valores y etiquetas. Solo el contenido de ejemplo (los textos que salen de las historias) va en el idioma de la historia.
- Las propiedades, exactamente como dice el mapa, con sus nombres, tipos, valores y orden. Si Figma no admite un nombre o el orden, para y pregunta.
- Cada componente va en su propia página, que se llama como el componente. Todo con auto layout.

### Valores por defecto y contenido

Salen de la historia principal: sus `args` (las del archivo y las suyas) y lo que pinta, incluidos su `render` y sus `decorators` (los botones del `footer` de `Dialog`, el ancho de `Card`). Nunca se inventan.

| Propiedad | Valor por defecto |
| --- | --- |
| `VARIANT` | El de la historia principal; si no lo indica, el del contrato. `state` es `default` |
| `BOOLEAN` | `true` si la historia principal enseña esa parte |
| `TEXT` | El de la historia principal; si no lo tiene, el de la primera historia que lo use |
| `INSTANCE_SWAP` | El icono de la historia principal; si no tiene, el de la primera historia que use esa prop |

- Si una variante necesita otro texto, sale de su propia historia.
- Si ninguna historia da un valor, para y pregunta.
- En Figma, una propiedad de texto o de icono tiene un solo valor por defecto en todo el conjunto. Si una variante necesita otro (como el mensaje de cada tono de `Toast`) y no se puede poner sin desenlazar la propiedad, para y pregunta.

### Contenido y capas

- Las capas llevan los nombres de `anatomy` del contrato, en inglés y en camelCase como las props (`icon`, `label`). `root` es el propio componente: no se crea una capa aparte. Si una parte no es algo que se dibuje, o dos props comparten nombre de parte y no queda claro, para y pregunta.
- Lo que lleva dentro otro componente (un botón de cerrar, los botones de un `footer`) es una instancia de ese componente, con sus propiedades puestas como en el código.
- Los iconos son instancias de la página `Icons`. Si falta alguno, di cuál y añádelo con `icons-to-figma`.

### Estilos y variables

- Los textos usan el estilo de texto de Figma al que apunta su token (por ejemplo `typography/label`): vale cuando el tamaño, el interlineado y el peso apuntan al mismo estilo. Solo si no hay estilo se enlazan las variables sueltas (las del componente y `font-family`), y avisas de que falta un estilo de tipografía para que la persona elija si crearlo o dejarlo sin estilo. Si elige crearlo, no se crea a mano en Figma: se pide en un issue, se añade a los tokens y `tokens-to-figma` lo lleva a Figma ([ADR-008](../../../docs/adr/008-fuente-de-verdad.md)).
- Colores, espacios, radius, sombras y border width van enlazados a variables, nunca como valores sueltos. Se usan las de la colección `Component`; las sombras, con el estilo de sombra que nombre su token. Esta skill no crea variables ni estilos: si falta alguno, para.
- Las medidas de un componente no tienen tokens: se toman de la historia en Storybook.
- Figma no tiene `outline` y el anillo blanco exterior del foco se calcula sumando tokens. Antes de dibujar `state=focus` por primera vez, propón cómo hacerlo y pregunta.

### Variantes: la cuadrícula

Las variantes son las propiedades `VARIANT` del mapa. La cuadrícula sirve para cualquier componente:

- Todo va dentro de un único marco blanco con esquinas redondeadas y margen por dentro, que se llama como el componente. Dentro, de arriba abajo: el nombre del componente como título grande en negrita (capa `Title`, sin descripción), una línea fina gris de lado a lado (capa `Divider`) y debajo la cuadrícula. Nada queda fuera del marco.
- Si el componente no tiene variantes, es un solo componente dentro del marco, sin cuadrícula.
- El component set es la propia cuadrícula: las variantes van dentro, ordenadas en filas y columnas. Las etiquetas van fuera del component set, pero dentro del marco.

Las filas y las columnas se agrupan igual, en niveles, uno por propiedad. Un booleano **es un estado** si el contrato lo nombra en `states.authored` o en `states.intrinsic` (`disabled`, `isLoading`, `invalid`). Los estados nunca forman filas ni grupos.

- **Filas:** las dos primeras variantes del mapa que no sean `state` ni un estado, en su orden. La primera es el grupo de fuera y la segunda, el de dentro. Por ejemplo, `variant` agrupa a sus valores, y dentro de cada uno van `sm`, `md` y `lg`. Si solo hay una, hay un nivel.
- **Columnas:** las demás variantes, en su orden, cada una un nivel de grupo (por ejemplo `fullWidth`; los booleanos que no son estados son un nivel de grupo). En el último nivel, cada valor de `state` y después una columna por cada booleano que sea un estado, con `state` en su valor por defecto y los demás estados en `false`. Sin ninguna columna que poner, hay una sola.
- Todos los grupos de un mismo nivel tienen las mismas columnas. No se crean las combinaciones que no tienen casilla.
- Las propiedades de texto y de intercambio de instancia no crean filas ni columnas.

### Etiquetas, corchetes y casillas

`Label`, `Bracket` y `Separator` no son variantes: van en el marco, colocadas junto a la cuadrícula o encima de ella.

- **Etiquetas** (capas `Label`): el nombre de la propiedad no aparece nunca solo, ni como título de un nivel ni de una fila o columna. Cada etiqueta lleva solo el valor: «primary», «sm», «md», «hover». Si los valores son `false` y `true`, lleva el nombre, dos puntos y el valor, porque solos no se entienden: «fullWidth: false», «disabled: true», «isLoading: true».
- Cada grupo tiene una línea lila en forma de corchete (capa `Bracket`) que abarca todo lo que contiene: horizontal y encima en las columnas, vertical y a la izquierda en las filas. Su etiqueta va centrada junto al corchete.
- Las etiquetas son pequeñas, en lila, y van centradas con su fila, columna o grupo.
- Cada variante, centrada en su casilla. Las casillas de una misma columna tienen el mismo ancho y las de una misma fila, el mismo alto; las de `fullWidth=true` son más anchas, con el ancho que fije el decorador de su historia (como `max-w-sm` en `Card`); si ninguno lo fija, para y pregunta.
- Una línea discontinua lila (capa `Separator`) separa cada casilla, en horizontal y en vertical.
- El lila es `#9747FF`, el que Figma usa para los componentes. No hay token para él: solo lo usan estas capas de anotación. El marco usa `color/background/neutral`; `Divider`, `color/border/neutral`; y `Title`, el estilo `typography/heading`.

## Al acabar

1. Haz una captura de cada variante principal y ponla al lado de su historia de Storybook. Para comparar, usa una instancia con los valores de esa historia. Si no se parecen (contenido, tamaño, color, texto, qué se ve y qué no), arréglalo antes de seguir.
2. Haz una captura de la cuadrícula y comprueba que el título y la línea están dentro del marco, que no hay casillas vacías ni variantes fuera de su sitio y que cada grupo tiene su corchete.
3. Guarda el resultado en una rama y abre una PR, con las capturas descritas y la lista «Decisiones que he tomado».

## Resultado

- El componente en Figma.
- `figma/variables.json` actualizado: se vuelve a leer de Figma, con la fecha en `syncedAt`. Si algo difiere de los tokens, avisa antes de guardarlo.
- En `figma/components.json`, la clave del componente, su archivo de código y sus propiedades tal como han quedado en Figma, leídas de Figma:

```json
{
  "fileKey": "AnNYIBhMWsMimOzOKaTrEx",
  "components": [
    {
      "name": "Button",
      "key": "…",
      "id": "…",
      "page": "Button",
      "file": "src/components/Button.tsx",
      "icons": ["Plus", "ArrowRight"],
      "properties": [
        { "order": 1, "name": "variant", "type": "VARIANT", "values": ["primary", "secondary", "outline", "ghost", "error"], "default": "primary" }
      ]
    }
  ]
}
```

`icons` son los iconos de la página `Icons` que usa el componente en Figma.

- La columna `Figma` de `docs/componentes.md`. La primera vez se añade después de `Contrato`.

## Checklist

Se comprueba leyendo Figma después de escribir.

- [ ] Se ve igual que su historia de Storybook.
- [ ] Todos los nombres en Figma están en inglés.
- [ ] Cada propiedad es igual que en el mapa, con el valor por defecto de la historia principal.
- [ ] No hay ningún texto ni contenido inventado.
- [ ] Los componentes de dentro son instancias.
- [ ] Los textos usan su estilo de texto, o se avisó de que falta.
- [ ] No hay ningún valor suelto en el componente.
- [ ] Las capas llevan los nombres de `anatomy`, en inglés.
- [ ] La cuadrícula está dentro de un marco con el título y la línea, sin descripción, con las filas y las columnas agrupadas por niveles y cada grupo con su corchete y su etiqueta lila.
- [ ] Ningún nombre de propiedad aparece suelto: solo el valor, salvo en las de `false` y `true`, que llevan «nombre: valor».
- [ ] Hay una línea discontinua lila entre cada casilla.
- [ ] `figma/components.json` y `figma/variables.json` son JSON válido y coinciden con Figma.
