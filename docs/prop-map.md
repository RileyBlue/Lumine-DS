# Mapa de props

Cómo se llaman las props y los valores de variante de los componentes de Lumine-DS. Entre varios nombres posibles, se elige el que un agente usaría por defecto.

> **Estado: propuesta.** Se aplica cuando se acepte el [ADR-006](adr/006-api.md). Hasta entonces, el código, los contratos y [`tokens/README.md`](../tokens/README.md) siguen como están.

## 1. Vocabulario

| Correcto | Prohibido | Notas |
| --- | --- | --- |
| `variant` | `appearance`, `kind`, `color` | El estilo. Sus valores están en la sección 2. |
| `size` | `sizes`, `scale` | La talla. Solo admite `sm`, `md` y `lg` ([ADR-001](adr/001-alcance.md), principio 5). |
| `isLoading` | `loading`, `pending` | La acción está en curso. Ningún componente la tiene todavía. |
| `disabled` | `isDisabled` | No se puede usar. Es el atributo de HTML. |
| `invalid` | `isInvalid`, `hasError` | Verdadero o falso: el valor del campo no es válido. |
| `errorMessage` | `error` (como texto), `errorText` | El texto que explica el error. Se muestra cuando `invalid` es verdadero. |
| `onClick` | `onPress`, `handleClick` | Al pulsar. |
| `onSubmit` | `onSend` | Al enviar un formulario. Va en el formulario; un botón lo envía con `type="submit"`. |
| `onChange` | `onValueChange`, `onUpdate` | Al cambiar el valor de un campo. |
| `label` | `labelText` | El nombre visible de un campo. |
| `children` | `text`, `content` | El contenido de un componente, como el texto de un botón o lo que va dentro de una tarjeta. |
| `iconStart` | `icon`, `iconPosition`, `leftIcon`, `startIcon`, `iconLeft` | El icono delante del texto. |
| `iconEnd` | `iconPosition`, `rightIcon`, `endIcon`, `iconRight` | El icono detrás del texto. |

## 2. Valores de `variant`

| Correcto | Prohibido | Notas |
| --- | --- | --- |
| `primary` | — | Usa los tokens del rol `brand`; el texto, `brand.inverted`. |
| `secondary` | — | Usa los tokens del rol `brand` en su versión suave, `brand.subtle`. |
| `ghost` | — | Usa los tokens del rol `neutral`. No tiene fondo en reposo: solo bajo el puntero y al pulsar. |
| `error` | `danger` | Usa los tokens del rol `error`. |

Todavía no tienen sitio en esta tabla, así que no están ni permitidos ni prohibidos: `outline` de `Button`; `outlined` y `elevated` de `Card`; y `neutral`, `brand`, `info`, `success` y `warning` de `Badge`.

## 3. Excepciones

### Atributos de HTML

Los atributos de HTML no se renombran: se llaman como en HTML.

`type`, `name`, `title`, `id`, `value`, `defaultValue`, `checked`, `placeholder`, `href`, `required`, `readOnly`, `autoComplete`, `className`, `style`, `aria-*` y `data-*`.

La única diferencia es `size`: en los componentes es la talla (`sm`, `md`, `lg`) y no el atributo de HTML del mismo nombre, porque así lo fija el ADR-001.

### Iconos en Figma

Un icono que se puede quitar lleva en Figma dos propiedades:

| Propiedad | Para qué sirve |
| --- | --- |
| `iconStart` | Elegir el icono. |
| `iconStart.` | Booleana, con el mismo nombre y un punto: mostrar u ocultar el icono. |

Con el icono de detrás es igual: `iconEnd` e `iconEnd.`. La booleana con punto solo existe en Figma; en el código, sin icono no se pasa la prop.
