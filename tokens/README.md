# Cómo se construye un token

Este manual fija la estructura de cualquier token nuevo de Lumine-DS. Los tokens se diseñan en [`tokens.json`](tokens.json), en formato [DTCG](https://www.designtokens.org/tr/2025.10/format/).

Antes de crear uno, hay que respetar el [ADR-001](../docs/adr/001-alcance.md): si el token no existe, se abre un issue que lo pida y no se construye nada hasta que esté aprobado (principio 2). El token nuevo guarda el enlace a ese issue, como indica el [ADR-002](../docs/adr/002-issue-en-tokens.md). Los nombres van en inglés (principio 5).

## Los tres niveles

| Nivel | Qué guarda | Su `$value` | Ejemplo de ruta |
| --- | --- | --- | --- |
| `primitive` | Los valores básicos, sin significado | El valor escrito | `primitive.color.brand.800` |
| `semantic` | Para qué se usa un valor | Un alias a `primitive` | `semantic.color.background.brand.default` |
| `component` | Qué usa una parte de un componente | Un alias a `semantic` | `component.badge.background.brand.subtle.default` |

Cada nivel es un grupo en la raíz del archivo, y solo apunta al de abajo:

```text
component  →  semantic  →  primitive  →  valor
```

No está permitido:

- que `component` apunte a `primitive`;
- que un token apunte a otro de su mismo nivel o de uno superior;
- escribir un valor directo en `semantic` o `component`;
- que `primitive` use alias.

Si falta el token del nivel de abajo, primero se crea ese (con su issue aprobado) y después el que lo usa.

## Nombres

Todos los nombres van en inglés, en minúsculas y con guiones entre palabras (`border-width`). No pueden empezar por `$` ni contener `.`, `{` o `}`.

### Primitivos

Describen el valor, no su uso. Se nombran por grupo y paso: `primitive.color.[familia].[paso]`, `primitive.spacing.[paso]`. No siguen la fórmula de color. La excepción es `primitive.color.white`, que es un solo color y no lleva paso.

### Color en `semantic` y `component`

```text
[category].[element].[role].[modifier].[state]
```

| Parte | Qué responde | Valores permitidos | ¿Obligatoria? |
| --- | --- | --- | --- |
| `category` | ¿Qué tipo de token es? | `color` | Sí |
| `element` | ¿Qué se pinta? | `background`, `text`, `border`, `icon` | Sí |
| `role` | ¿Qué significa? | `neutral`, `brand`, `info`, `success`, `warning`, `error` | Sí, salvo en `color.border.focus` |
| `modifier` | ¿Con qué intensidad? | `subtle`, `strong`, `inverted` | No: se omite en la versión normal |
| `state` | ¿En qué estado está? | `default`, `hover`, `pressed`, `focus`, `disabled` | Sí |

- El orden no cambia.
- El nombre dice el significado, no el color: `error`, nunca `red`.
- Hay una sola excepción sin `role`: `color.border.focus`, porque el anillo de foco es el mismo para todos los significados.
- En `semantic`, la fórmula va detrás del nivel: `semantic.color.text.brand.default`.
- En `component`, el nombre del componente va delante y `category` no se escribe: `component.[componente].[element].[role].[modifier].[state]`. Desde `element`, la ruta es igual que la del token semántico al que apunta. Si el color es de una parte con nombre, la parte va antes de `element`.
- Si hace falta un valor que no está en la tabla, se añade primero a este manual, en la misma PR que el token.

### Por qué el estado se escribe siempre

En DTCG, un nombre con `$value` es un token y no puede contener otros. Si existiera el token `semantic.color.background.brand`, no se podría crear `…brand.hover` dentro de él. Por eso el estado de reposo se escribe como `default`:

| Mal | Bien |
| --- | --- |
| `semantic.color.background.brand` | `semantic.color.background.brand.default` |
| `semantic.color.background.brand.subtle` | `semantic.color.background.brand.subtle.default` |

El formato ofrece también el nombre reservado `$root` para esto. Aquí no se usa: `default` sigue la fórmula y se lee igual que los demás estados.

### Anillo de foco

- Se dibuja con `semantic.color.border.focus` y el grosor `semantic.border-width.focus`.
- Va separado del control por la medida de `semantic.space.2xs` (en CSS, `outline-offset`). Así lo que rodea al anillo es el fondo de la pantalla, y contra ese fondo se mide su contraste.
- Cumple el mínimo de 3:1 sobre blanco, los grises claros (hasta `gray.200`) y `gray.900`. Sobre un fondo de marca u otro color intenso no llega.
- Cuando una pantalla necesite un control sobre uno de esos fondos, se pide el token `semantic.color.border.neutral.inverted.focus`, en blanco. Hasta entonces no se crea.

### Otras categorías en `semantic`

| Qué | Nombre | Valores permitidos |
| --- | --- | --- |
| Tipografía | `semantic.typography.[estilo].[propiedad]` | Estilos: `display`, `heading`, `title`, `body`, `label`, `caption`. Propiedades: `font-size`, `line-height`, `font-weight` |
| Espaciado | `semantic.space.[talla]` | `none`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` |
| Radio | `semantic.radius.[talla]` | `none`, `sm`, `md`, `lg`, `xl`, `full` |
| Grosor de borde | `semantic.border-width.[uso]` | `default`, `strong`, `focus` |
| Sombra | `semantic.elevation.[talla]` | `sm`, `md`, `lg` |

- `line-height` es un alias a la escala `primitive.line-height`, nunca una proporción. Por eso no se usa el tipo compuesto `typography` de DTCG, que pide una proporción.
- No hay tokens de disposición (*layout*).

### Nombres en `component`

El color repite la ruta semántica sin `color`, detrás del componente y de la parte si la hay: `component.button.background.brand.hover` apunta a `{semantic.color.background.brand.hover}`. El resto se nombra por la parte del componente:

| Qué | Nombre |
| --- | --- |
| Color de una parte | `component.[componente].[parte].[element].[role].[modifier].[state]` |
| Relleno y separación | `component.[componente].[parte].[propiedad].[talla]`, con propiedades `padding`, `padding-x`, `padding-y` y `gap` |
| Radio | `component.[componente].radius` |
| Grosor de borde | `component.[componente].border-width.[default\|focus]` |
| Separación del foco | `component.[componente].focus-offset` |
| Tipografía | `component.[componente].[parte].[font-size\|line-height\|font-weight].[talla]` |
| Sombra | `component.[componente].elevation` |

- `[parte]` y `[talla]` se omiten cuando no hacen falta. `[talla]` solo admite `sm`, `md` y `lg`. En `gap` también puede nombrar qué se separa: `stack`, `icon`, `sections` o `header`.
- Se nombra por el significado, no por la variante: las variantes `primary`, `secondary` y `danger` usan `brand`, `brand.subtle` y `error`. La `$description` dice a qué variante sirve.
- `danger` y `error` no son sinónimos: `danger` es la variante de una acción que puede causar una pérdida, como eliminar; `error` es el significado de color de algo que salió mal. La variante `danger` usa los tokens `error`.
- Las alturas y los tamaños de icono no tienen token: las alturas usan la escala de Tailwind y cada componente fija el tamaño de sus iconos con `sm`, `md` o `lg` ([ADR-001](../docs/adr/001-alcance.md), principio 1).
- Cada parte tiene su token, aunque apunte al mismo semántico que otra: `card.title.text.neutral.default` y `card.content.text.neutral.default`. Lleva `[parte]` todo texto de un componente con varios (`input.label`, `input.field`, `input.placeholder`, `input.message`) y toda zona propia (`card.footer`). Lo que pertenece a la caja principal o es único, como `button.text` o `input.icon`, va sin parte.
- Solo hay token si hay algo que pintar o medir: un fondo transparente no lo tiene.

## Formato DTCG

### Reglas

1. **Cada token tiene `$value` y `$description`.** La descripción va en español y dice cuándo usarlo, sin repetir el valor.
2. **El `$type` va en el grupo, no en el token.** Lo llevan el grupo de la categoría (`color`) y cada grupo que contiene tokens directamente. Un grupo que mezcla tipos, como `primitive` o `component.button`, no lo lleva. Los tokens que cuelgan directamente de un grupo así, contando sus subgrupos, llevan su propio `$type`: pasa en los estilos de `typography` y en `component.button.radius`.
3. **Un alias es el `$value` completo, escrito `{ruta.del.token}`.** La ruta empieza por el nivel y termina en un token, nunca en un grupo. Se escribe `{primitive.color.brand.800}`, no `{color.brand.800}`.
4. **El tipo del alias coincide con el del token al que apunta.**
5. **En un token compuesto**, como una sombra, cada pieza de `$value` es un alias al nivel de abajo.
6. **Un token nuevo enlaza su issue aprobado** en `$extensions`, con la clave `com.lumine.issue`. Si un issue aprueba juntos los tokens de un grupo, el enlace puede ir una sola vez en el grupo. Vale solo para esos tokens: los que se añadan después llevan el suyo, que tiene preferencia sobre el del grupo ([ADR-002](../docs/adr/002-issue-en-tokens.md)).

### Cómo se escribe un valor en `primitive`

| `$type` | `$value` |
| --- | --- |
| `color` | `{ "colorSpace": "oklch", "components": [0.42675, 0.11745, 5.955], "hex": "#812D45" }`. `hex` es opcional; `alpha` también, y si falta vale 1 |
| `dimension` | `{ "value": 1, "unit": "rem" }`. La unidad es `px` o `rem` y se escribe también cuando el valor es 0 |
| `fontFamily` | `["Inter", "sans-serif"]`, de la preferida a la última opción |
| `fontWeight` | `600` |

### Enlace al issue

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "white": {
        "$value": { "colorSpace": "oklch", "components": [1, 0, 0], "hex": "#FFFFFF" },
        "$description": "Blanco del manual de marca. Para el fondo base y para texto e iconos sobre fondos oscuros o intensos.",
        "$extensions": { "com.lumine.issue": "https://github.com/RileyBlue/Lumine-DS/issues/18" }
      }
    }
  }
}
```

## Ejemplo completo

La etiqueta de marca (`Badge`, variante `brand`), de abajo arriba. Los tokens de este ejemplo están en `tokens.json`.

### 1. `primitive`: el valor

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "brand": {
        "$type": "color",
        "100": {
          "$value": { "colorSpace": "oklch", "components": [0.9449, 0.0262, 5.955], "hex": "#FDE6EA" },
          "$description": "Tono muy claro de la marca."
        },
        "800": {
          "$value": { "colorSpace": "oklch", "components": [0.42675, 0.11745, 5.955], "hex": "#812D45" },
          "$description": "Color principal del manual de marca."
        }
      }
    }
  }
}
```

### 2. `semantic`: para qué se usa

```json
{
  "semantic": {
    "color": {
      "$type": "color",
      "background": {
        "brand": {
          "subtle": {
            "$type": "color",
            "default": {
              "$value": "{primitive.color.brand.100}",
              "$description": "Selección y destacados suaves de la marca."
            }
          }
        }
      },
      "text": {
        "brand": {
          "$type": "color",
          "default": {
            "$value": "{primitive.color.brand.800}",
            "$description": "Texto de marca sobre fondos neutros o sobre su fondo suave."
          }
        }
      }
    }
  }
}
```

### 3. `component`: qué usa el componente

```json
{
  "component": {
    "badge": {
      "background": {
        "brand": {
          "subtle": {
            "$type": "color",
            "default": {"$value": "{semantic.color.background.brand.subtle.default}", "$description": "Fondo de la etiqueta `brand`."}
          }
        }
      },
      "text": {
        "brand": {
          "$type": "color",
          "default": {"$value": "{semantic.color.text.brand.default}", "$description": "Texto de la etiqueta `brand`."}
        }
      }
    }
  }
}
```

## Del token a la clase

`npm run tokens` lee `tokens.json` y genera:

- [`src/styles/tokens.css`](../src/styles/tokens.css): una variable CSS por token;
- [`src/styles/theme.css`](../src/styles/theme.css): las clases de Tailwind de `semantic` y `component`;
- [`docs/tokens.md`](../docs/tokens.md): la tabla de cada token y su clase.

No se editan a mano. `npm run tokens -- --check` avisa si están desactualizados, sin escribirlos.

La clase es la utilidad de Tailwind seguida del nombre del token, sin el nivel, sin `color` y sin el `default` del color: `component.button.background.brand.default` es `bg-button-background-brand`. La regla completa está en [`scripts/token-classes.mjs`](../scripts/token-classes.mjs).

## Antes de abrir la PR

- [ ] El issue que pide el token está aprobado y su enlace está en el `$extensions` del propio token (o en el del grupo, si ese issue aprobó el grupo).
- [ ] Se ejecutó `npm run tokens` y se guardaron los archivos generados.
- [ ] El token está en su nivel y su alias apunta solo al nivel de abajo.
- [ ] El nombre sigue las reglas de este manual.
- [ ] Tiene `$value` y `$description`. El `$type` está en su grupo o, si el grupo mezcla tipos, en el propio token.
- [ ] El alias apunta a un token que existe.
- [ ] Las parejas de color cumplen el contraste de WCAG 2.2 AA: 4,5:1 para texto y 3:1 para elementos de interfaz.

## Pendiente

- Los estilos de texto no incluyen familia de letra. Falta decidir entre Inter y las letras del manual de marca, y cargar la elegida.
