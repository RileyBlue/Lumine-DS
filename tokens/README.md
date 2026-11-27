# Cómo se construye un token

Este manual fija la estructura de cualquier token nuevo de Lumine-DS. Los tokens se diseñan en [`tokens.json`](tokens.json), en formato [DTCG](https://www.designtokens.org/tr/2025.10/format/).

Antes de crear uno, hay que respetar el [ADR-001](../docs/adr/001-alcance.md): si el token no existe, se abre un issue que lo pida y no se construye nada hasta que esté aprobado (principio 2). Los nombres van en inglés (principio 5).

## Los tres niveles

| Nivel | Qué guarda | Su `$value` | Ejemplo de ruta |
| --- | --- | --- | --- |
| `primitive` | Los valores básicos, sin significado | El valor escrito | `primitive.color.brand.800` |
| `semantic` | Para qué se usa un valor | Un alias a `primitive` | `semantic.color.background.brand.default` |
| `component` | Qué usa una parte de un componente | Un alias a `semantic` | `component.badge.color.background.brand.default` |

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

Describen el valor, no su uso. Se nombran por grupo y paso: `primitive.color.[familia].[paso]`, `primitive.spacing.[paso]`. No siguen la fórmula de color.

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
- En `component`, entre el nivel y la fórmula va el nombre del componente: `component.[componente].[category].[element].[role].[modifier].[state]`. En `role` se usa el nombre de la variante del componente (por ejemplo, `primary` o `ghost` en `Button`).
- Si hace falta un valor que no está en la tabla, se añade primero a este manual, en la misma PR que el token.

### Por qué el estado se escribe siempre

En DTCG, un nombre con `$value` es un token y no puede contener otros. Si existiera el token `semantic.color.background.brand`, no se podría crear `…brand.hover` dentro de él. Por eso el estado de reposo se escribe como `default`:

| Mal | Bien |
| --- | --- |
| `semantic.color.background.brand` | `semantic.color.background.brand.default` |
| `semantic.color.background.brand.subtle` | `semantic.color.background.brand.subtle.default` |

El formato ofrece también el nombre reservado `$root` para esto. Aquí no se usa: `default` sigue la fórmula y se lee igual que los demás estados.

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
- La forma de nombrar estas categorías en `component` está sin decidir. Se añade a este manual antes de crear el primero.

## Formato DTCG

### Reglas

1. **Cada token tiene `$value` y `$description`.** La descripción va en español y dice cuándo usarlo, sin repetir el valor.
2. **El `$type` va en el grupo, no en el token.** Lo llevan el grupo de la categoría (`color`) y cada grupo que contiene tokens directamente. Un grupo que mezcla tipos, como `primitive`, no lo lleva. Si un grupo contiene directamente tokens de tipos distintos, como un estilo de `typography`, cada token lleva su propio `$type`.
3. **Un alias es el `$value` completo, escrito `{ruta.del.token}`.** La ruta empieza por el nivel y termina en un token, nunca en un grupo. Se escribe `{primitive.color.brand.800}`, no `{color.brand.800}`.
4. **El tipo del alias coincide con el del token al que apunta.**
5. **En un token compuesto**, como una sombra, cada pieza de `$value` es un alias al nivel de abajo.

### Cómo se escribe un valor en `primitive`

| `$type` | `$value` |
| --- | --- |
| `color` | `{ "colorSpace": "oklch", "components": [0.42675, 0.11745, 5.955], "hex": "#812D45" }`. `hex` es opcional; `alpha` también, y si falta vale 1 |
| `dimension` | `{ "value": 1, "unit": "rem" }`. La unidad es `px` o `rem` y se escribe también cuando el valor es 0 |
| `fontFamily` | `["Inter", "sans-serif"]`, de la preferida a la última opción |
| `fontWeight` | `600` |

## Ejemplo completo

La etiqueta de marca (`Badge`, variante `brand`), de abajo arriba. Los tokens `component` de este ejemplo todavía no existen en `tokens.json`.

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
      "color": {
        "$type": "color",
        "background": {
          "brand": {
            "$type": "color",
            "default": {
              "$value": "{semantic.color.background.brand.subtle.default}",
              "$description": "Fondo de la etiqueta de marca."
            }
          }
        },
        "text": {
          "brand": {
            "$type": "color",
            "default": {
              "$value": "{semantic.color.text.brand.default}",
              "$description": "Texto de la etiqueta de marca."
            }
          }
        }
      }
    }
  }
}
```

## Antes de abrir la PR

- [ ] El issue que pide el token está aprobado.
- [ ] El token está en su nivel y su alias apunta solo al nivel de abajo.
- [ ] El nombre sigue las reglas de este manual.
- [ ] Tiene `$value` y `$description`, y su grupo tiene `$type`.
- [ ] El alias apunta a un token que existe.
- [ ] Las parejas de color cumplen el contraste de WCAG 2.2 AA: 4,5:1 para texto y 3:1 para elementos de interfaz.

## Pendiente

- `tokens.json` todavía no tiene el nivel `component`.
- Falta decidir dónde se enlaza el issue aprobado de un token de `tokens.json`. El ADR-001 pide un comentario junto al token, y JSON no admite comentarios.
- Falta conectar estos tokens con el tema de Tailwind (`src/index.css`), que es de donde el ADR-001 pide que los usen los componentes.
