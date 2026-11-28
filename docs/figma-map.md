<!-- Generado desde contracts/ y figma/reglas.json con `npm run figma-map`. No editar a mano. -->

# Props en Figma

Qué propiedad de Figma le toca a cada prop del código, según [`figma/reglas.json`](../figma/reglas.json). Las props van en el orden de su contrato; con «—», la prop no pasa a Figma. Las capas son las partes de `anatomy`.

## Badge

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `children` | `children` | `TEXT` | — | `text` | Es un texto que siempre se ve. |
| `variant` | `variant` | `VARIANT` | `neutral`, `brand`, `info`, `success`, `warning`, `error` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `size` | `size` | `VARIANT` | `sm`, `md` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `iconStart` | `iconStart` | `INSTANCE_SWAP` | — | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconStart` | `iconStart.` | `BOOLEAN` | `false`, `true` | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |

Capas: `root`, `icon`, `label`.

## Button

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `variant` | `variant` | `VARIANT` | `primary`, `secondary`, `outline`, `ghost`, `error` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `size` | `size` | `VARIANT` | `sm`, `md`, `lg` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `children` | `children.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `children` | `children` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `iconStart` | `iconStart` | `INSTANCE_SWAP` | — | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconStart` | `iconStart.` | `BOOLEAN` | `false`, `true` | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconEnd` | `iconEnd` | `INSTANCE_SWAP` | — | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconEnd` | `iconEnd.` | `BOOLEAN` | `false`, `true` | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconOnly` | `iconOnly` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `fullWidth` | `fullWidth` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `aria-label` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `type` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `disabled` | `disabled` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |
| — | `state` | `VARIANT` | `default`, `hover`, `focus`, `pressed` | `browser-state` | Solo existe en Figma, para los estados que pone el navegador. Lleva `default` y los que declare el contrato; sin ninguno, no existe. |

Capas: `root`, `icon`, `label`.

## Card

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `title` | `title.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `title` | `title` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `headingLevel` | `headingLevel` | `VARIANT` | `2`, `3`, `4`, `5`, `6` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `description` | `description.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `description` | `description` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `children` | `children` | `BOOLEAN` | `false`, `true` | `slot` | Es un hueco para otro contenido: se enseña o se oculta. |
| `footer` | `footer` | `BOOLEAN` | `false`, `true` | `slot` | Es un hueco para otro contenido: se enseña o se oculta. |
| `variant` | `variant` | `VARIANT` | `outlined`, `elevated` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |

Capas: `root`, `header`, `title`, `description`, `content`, `footer`.

## Dialog

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `open` | — | — | — | `exception` | `open` es verdadero o falso y muestra la ventana entera, no una parte. El componente de Figma la enseña siempre abierta: ponerlo en la pantalla es abrirla. |
| `onClose` | — | — | — | `event` | Es un evento: no tiene nada que dibujar. |
| `title` | `title` | `TEXT` | — | `text` | Es un texto que siempre se ve. |
| `children` | `children` | `BOOLEAN` | `false`, `true` | `slot` | Es un hueco para otro contenido: se enseña o se oculta. |
| `footer` | `footer` | `BOOLEAN` | `false`, `true` | `slot` | Es un hueco para otro contenido: se enseña o se oculta. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |

Capas: `root`, `backdrop`, `title`, `close`, `content`, `footer`.

## Input

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `label` | `label.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `label` | `label` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `aria-label` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `hint` | `hint.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `hint` | `hint` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `invalid` | `invalid` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `errorMessage` | `errorMessage.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `errorMessage` | `errorMessage` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `iconStart` | `iconStart` | `INSTANCE_SWAP` | — | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `iconStart` | `iconStart.` | `BOOLEAN` | `false`, `true` | `icon` | Es un icono con un nombre del mapa de props: se intercambia y, si es opcional, se puede ocultar. |
| `size` | `size` | `VARIANT` | `sm`, `md`, `lg` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `id` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |
| `disabled` | `disabled` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `aria-describedby` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |
| `style` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| — | `state` | `VARIANT` | `default`, `focus` | `browser-state` | Solo existe en Figma, para los estados que pone el navegador. Lleva `default` y los que declare el contrato; sin ninguno, no existe. |

Capas: `root`, `label`, `field`, `placeholder`, `icon`, `message`.

## Textarea

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `label` | `label.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `label` | `label` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `aria-label` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `hint` | `hint.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `hint` | `hint` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `invalid` | `invalid` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `errorMessage` | `errorMessage.` | `BOOLEAN` | `false`, `true` | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `errorMessage` | `errorMessage` | `TEXT` | — | `optional-text` | Es un texto opcional: se puede ocultar y se puede escribir. |
| `size` | `size` | `VARIANT` | `sm`, `md`, `lg` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `rows` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `id` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |
| `disabled` | `disabled` | `VARIANT` | `false`, `true` | `look-boolean` | Es verdadero o falso y cambia cómo se ve: color, tamaño o ancho. |
| `aria-describedby` | — | — | — | `html-attribute` | Es un atributo de HTML. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |
| — | `state` | `VARIANT` | `default`, `focus` | `browser-state` | Solo existe en Figma, para los estados que pone el navegador. Lleva `default` y los que declare el contrato; sin ninguno, no existe. |

Capas: `root`, `label`, `field`, `placeholder`, `message`.

## Toast

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
| `variant` | `variant` | `VARIANT` | `info`, `success`, `warning`, `error` | `fixed-values` | Tiene valores fijos: la variante usa los mismos. |
| `children` | `children` | `TEXT` | — | `text` | Es un texto que siempre se ve. |
| `onClose` | — | — | — | `event` | Es un evento: no tiene nada que dibujar. |
| `className` | — | — | — | `technical` | Es un identificador, una referencia, una clase o un dato del código. |

Capas: `root`, `message`, `icon`, `close`.
