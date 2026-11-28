---
name: tokens-to-figma
description: Pasa los tokens de Lumine-DS a Figma como variables, estilos de texto y estilos de sombra, con una página Fundamentos que los documenta. Úsala cuando pidan llevar, sincronizar o actualizar los tokens en Figma, o después de cambiar tokens/tokens.json. No sirve para iconos ni para componentes.
---

# Tokens a Figma

Archivo de destino: <https://www.figma.com/design/AnNYIBhMWsMimOzOKaTrEx/Lumine-DS>

## Alcance

Pasa los tokens a Figma. Los iconos los pasa `icons-to-figma` y los componentes, `components-to-figma`.

El código manda ([ADR-008](../../../docs/adr/008-fuente-de-verdad.md)): Figma se actualiza para parecerse a los tokens, nunca al revés. Si en Figma falta algo del código se crea; si en Figma sobra algo, se avisa y no se borra sin que una persona lo apruebe.

Se ejecuta desde `main` al día, justo después de fusionar un cambio de tokens: lo que no está fusionado no se pasa.

## Archivos que lee

- `tokens/*.json`: los tokens están en `tokens.json`. `contrast-pairs.json` no tiene tokens y no se pasa.
- `tokens/README.md`: las capas, los nombres y las reglas de uso.
- `src/styles/tokens.css`: los nombres del código. Antes de empezar, `npm run tokens -- --check` debe pasar; si no, se para.

## Pasos

### 1. Preparar

1. Usa el conector de Figma que esté conectado y uno solo en toda la ejecución: el MCP de Figma (`use_figma`), Figma Console (`figma_execute`, con el plugin Figma Desktop Bridge abierto) o `figma-cli`. Si no hay ninguno, para y dilo.
2. Con el MCP de Figma, carga antes las skills `figma-use` y `figma-generate-library`.
3. Lee lo que ya hay en el archivo: colecciones, variables, estilos y páginas. Lo que exista con el mismo nombre se actualiza, conservando su identificador; no se duplica ni se borra y se vuelve a crear. Si existe `figma/variables.json`, sus identificadores ayudan a encontrarlo.
4. Resume qué se va a crear, actualizar y qué sobra en Figma.

### 2. Nombres

| Capa del código | Colección | Nombre en Figma | Sintaxis de código (CSS) |
| --- | --- | --- | --- |
| `primitive` | `Primitives` | `color/brand/800` | `var(--primitive-color-brand-800)` |
| `semantic` | `Semantic` | `color/background/brand` | `var(--semantic-color-background-brand-default)` |
| `component` | `Component` | `button/background/brand` | `var(--component-button-background-brand-default)` |

- El nombre en Figma es la ruta del token con `/`, sin la capa y sin el `default` final.
- La sintaxis de código se guarda en la plataforma `WEB` y es la variable que está en `tokens.css`: `--` y la ruta completa unida con guiones, `default` incluido. Así quien inspecciona en Figma ve el nombre del código.
- La `$description` del token es la descripción de la variable.
- Cada colección tiene un solo modo.
- Al quitar `default`, algunos nombres son a la vez variable y carpeta (`color/background/brand` y `color/background/brand/hover`). Antes de crear todo, prueba con esa pareja; si Figma no la admite, para y pregunta.

### 3. Valores

Orden: `Primitives`, después `Semantic` y después `Component`.

- No se pasan los breakpoints (`primitive.breakpoint`).
- `Semantic` son alias de `Primitives`, y `Component`, alias de `Semantic`. Ninguna de las dos lleva un valor escrito.
- Las sombras (`$type: shadow`) no pueden ser variables; ver el paso 5.

| Tipo del token | Tipo en Figma | Conversión |
| --- | --- | --- |
| `color` | `COLOR` | A sRGB, de 0 a 1, conservando `alpha`. Desde `oklch` se calcula como en `scripts/contrast.mjs` y lo que quede fuera se recorta; anota qué colores se recortaron |
| `dimension` | `FLOAT` | En píxeles: 1rem son 16px, así que 1.5rem son 24. Lo que ya está en px se deja |
| `fontWeight` | `FLOAT` | El número: 400, 500, 600 o 700 |
| `fontFamily` | `STRING` | El nombre de una sola familia: la primera de la lista que exista en Figma (`Inter` para `sans`) |

Crea las variables por tandas, para poder repetir una si falla.

### 4. Dónde se ofrece cada variable

Ninguna variable queda con `ALL_SCOPES`. Las de `Primitives` no se ofrecen en ningún selector (`[]`): se usan a través de sus alias.

| Variable de `Semantic` o `Component` | `scopes` |
| --- | --- |
| Color `background` | `FRAME_FILL`, `SHAPE_FILL` |
| Color `text` | `TEXT_FILL` |
| Color `icon` | `STROKE_COLOR`: solo el trazo de los vectores |
| Color `border` | `STROKE_COLOR` |
| Color `border…focus-outer` | `STROKE_COLOR`, `EFFECT_COLOR` |
| Espacio, `padding`, `padding-x`, `padding-y` y `gap` | `GAP` |
| `radius` | `CORNER_RADIUS` |
| `border-width` | `STROKE_FLOAT` |
| `focus-offset` | `[]` |
| `font-family`, `font-size`, `line-height`, `font-weight` | `FONT_FAMILY`, `FONT_SIZE`, `LINE_HEIGHT`, `FONT_WEIGHT` |

Figma no tiene un permiso solo para vectores: `STROKE_COLOR` es el más cercano y deja los iconos fuera de rellenos y textos.

### 5. Estilos

**Texto.** Un estilo por cada estilo de `semantic.typography`, con el nombre `typography/<estilo>`. Enlaza sus cuatro campos con `setBoundVariable` a variables de `Semantic`: `fontFamily` a `font-family`, y `fontSize`, `fontWeight` y `lineHeight` a las de su estilo. Antes, carga la familia en todos sus pesos, con los nombres exactos que devuelva Figma.

**Sombras.** Un estilo de efecto por cada `semantic.elevation`, con el nombre `elevation/<talla>`, con color, desplazamiento, desenfoque y extensión enlazados a sus variables de `Primitives`. Las sombras de componente no tienen estilo propio: en Fundamentos se indica cuál usa cada uno.

### 6. Página Fundamentos

Una página llamada `Fundamentos`, con una sección para color, tipografía, espaciado, radios, grosor de borde, sombras y tokens de componente.

- Cada muestra está enlazada a su variable o estilo, para que cambie con él.
- Cada token muestra su nombre en Figma, su nombre del código, su valor o el token al que apunta y su descripción.
- Al repetir la skill se rehacen sus propias secciones; no se toca lo que haya puesto otra persona.
- Revisa la página con una captura.

### 7. Guardar el resultado

Escribe `figma/variables.json` en una rama y abre una PR:

```json
{
  "syncedAt": "2026-01-31T18:00:00Z",
  "fileKey": "AnNYIBhMWsMimOzOKaTrEx",
  "collections": [
    {
      "name": "Semantic",
      "id": "…",
      "variables": [
        {
          "name": "color/background/brand",
          "id": "…",
          "type": "COLOR",
          "codeSyntax": "var(--semantic-color-background-brand-default)",
          "scopes": ["FRAME_FILL", "SHAPE_FILL"],
          "alias": "color/brand/800"
        }
      ]
    }
  ],
  "textStyles": [{ "name": "typography/body", "id": "…" }],
  "effectStyles": [{ "name": "elevation/sm", "id": "…" }]
}
```

- `syncedAt` es la fecha y hora de esta ejecución, no la del ejemplo.
- Las variables de `Primitives` llevan `value` en lugar de `alias`.
- Se escribe con lo que se lee de Figma al terminar, no con lo que se quería escribir.
- Si el archivo es nuevo, añade `figma/` a «Dónde está cada cosa» de `AGENTS.md`, sin pasar de 119 líneas.

## Resultado

- Las variables en las colecciones `Primitives`, `Semantic` y `Component`.
- Los estilos de texto y los de sombra.
- La página `Fundamentos`.
- `figma/variables.json` con la fecha en `syncedAt`.
- Un resumen: cuántas variables se crearon y actualizaron, qué sobra en Figma, qué colores se recortaron y qué no se pudo hacer.

## Checklist

Se comprueba leyendo Figma después de escribir.

- [ ] Están las tres colecciones, y cada una tiene tantas variables como tokens de su capa, sin contar breakpoints ni sombras.
- [ ] No hay nombres repetidos ni variables de breakpoints.
- [ ] Todo valor de `Semantic` es un alias a `Primitives`, y todo valor de `Component`, un alias a `Semantic`.
- [ ] Cada variable tiene en `WEB` una sintaxis que existe en `tokens.css`.
- [ ] Ninguna variable tiene `ALL_SCOPES`, y las de color `icon` solo `STROKE_COLOR`.
- [ ] Las medidas están en píxeles, los pesos son números y las familias, nombres.
- [ ] Cada estilo de texto tiene `fontFamily`, `fontSize`, `fontWeight` y `lineHeight` enlazados.
- [ ] Los estilos de sombra están enlazados a sus variables.
- [ ] La página `Fundamentos` se ve bien y repetir la skill no duplica nada.
- [ ] No se borró nada sin aprobación.
- [ ] `figma/variables.json` es JSON válido, tiene `syncedAt` de hoy y coincide con Figma.
