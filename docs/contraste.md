<!-- Generado con `npm run contrast` desde tokens/tokens.json y tokens/contrast-pairs.json. No editar a mano. -->

# Contraste

445 parejas: 384 pasan, 9 no pasan y 52 están exentas.

| Regla | Tipo | Mínimo | Parejas | Pasan | No pasan | Exentas |
| --- | --- | --- | --- | --- | --- | --- |
| Texto que no es inverted, sobre los fondos claros. | text | 4.5:1 | 104 | 88 | 3 | 13 |
| Texto inverted, sobre los fondos fuertes. | text | 4.5:1 | 60 | 60 | 0 | 0 |
| Bordes, sobre los fondos claros. | ui | 3:1 | 117 | 88 | 3 | 26 |
| Iconos como el texto: los que no son inverted sobre los fondos claros y los inverted sobre los fuertes. | ui | 3:1 | 164 | 148 | 3 | 13 |

Los valores se truncan a dos decimales. Los colores fuera de sRGB se recortan antes de calcular.

## Sin regla

Todos los textos, iconos y bordes semánticos entran en alguna regla.

## Parejas que no pasan

### color.text.neutral.subtle.default

- Apunta a `primitive.color.gray.600`.
- Lo usan: `component.input.placeholder.text.neutral.subtle.default`, `component.input.message.text.neutral.subtle.default`, `component.card.description.text.neutral.subtle.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.text.neutral.subtle.default` | `color.background.brand.subtle.pressed` | 4.25:1 | 4.5:1 | **No pasa** |

### color.text.success.default

- Apunta a `primitive.color.green.800`.
- Lo usan: `component.badge.text.success.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.text.success.default` | `color.background.brand.subtle.pressed` | 3.98:1 | 4.5:1 | **No pasa** |

### color.text.warning.default

- Apunta a `primitive.color.orange.800`.
- Lo usan: `component.badge.text.warning.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.text.warning.default` | `color.background.brand.subtle.pressed` | 4.13:1 | 4.5:1 | **No pasa** |

### color.border.neutral.strong.default

- Apunta a `primitive.color.gray.500`.
- Lo usan: `component.button.border.neutral.strong.default`, `component.input.border.neutral.strong.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.border.neutral.strong.default` | `color.background.brand.subtle.pressed` | 2.71:1 | 3:1 | **No pasa** |

### color.border.success.default

- Apunta a `primitive.color.green.700`.
- Lo usan: ningún token de componente.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.border.success.default` | `color.background.brand.subtle.pressed` | 2.78:1 | 3:1 | **No pasa** |

### color.border.warning.default

- Apunta a `primitive.color.orange.700`.
- Lo usan: ningún token de componente.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.border.warning.default` | `color.background.brand.subtle.pressed` | 2.94:1 | 3:1 | **No pasa** |

### color.icon.neutral.subtle.default

- Apunta a `primitive.color.gray.500`.
- Lo usan: `component.input.icon.neutral.subtle.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.icon.neutral.subtle.default` | `color.background.brand.subtle.pressed` | 2.71:1 | 3:1 | **No pasa** |

### color.icon.success.default

- Apunta a `primitive.color.green.700`.
- Lo usan: `component.badge.icon.success.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.icon.success.default` | `color.background.brand.subtle.pressed` | 2.78:1 | 3:1 | **No pasa** |

### color.icon.warning.default

- Apunta a `primitive.color.orange.700`.
- Lo usan: `component.badge.icon.warning.default`.

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.icon.warning.default` | `color.background.brand.subtle.pressed` | 2.94:1 | 3:1 | **No pasa** |

## Exentas

### color.text.neutral.disabled

Los controles desactivados quedan fuera de los mínimos de contraste (docs/accesibilidad.md). Con más contraste parecerían activos.

<details>
<summary>Contraste en sus 13 parejas</summary>

| Fondo | Contraste |
| --- | --- |
| `color.background.neutral.default` | 2.60:1 |
| `color.background.neutral.subtle.default` | 2.49:1 |
| `color.background.neutral.strong.default` | 2.10:1 |
| `color.background.neutral.hover` | 2.36:1 |
| `color.background.neutral.pressed` | 2.10:1 |
| `color.background.neutral.disabled` | 2.36:1 |
| `color.background.brand.subtle.default` | 2.19:1 |
| `color.background.brand.subtle.hover` | 1.86:1 |
| `color.background.brand.subtle.pressed` | 1.46:1 |
| `color.background.info.subtle.default` | 2.13:1 |
| `color.background.success.subtle.default` | 2.36:1 |
| `color.background.warning.subtle.default` | 2.26:1 |
| `color.background.error.subtle.default` | 2.13:1 |

</details>

### color.border.neutral.default

Es la línea de los divisores: es decorativa y no delimita un control. Para los controles está color.border.neutral.strong.

<details>
<summary>Contraste en sus 13 parejas</summary>

| Fondo | Contraste |
| --- | --- |
| `color.background.neutral.default` | 1.23:1 |
| `color.background.neutral.subtle.default` | 1.18:1 |
| `color.background.neutral.strong.default` | 1.00:1 |
| `color.background.neutral.hover` | 1.12:1 |
| `color.background.neutral.pressed` | 1.00:1 |
| `color.background.neutral.disabled` | 1.12:1 |
| `color.background.brand.subtle.default` | 1.04:1 |
| `color.background.brand.subtle.hover` | 1.12:1 |
| `color.background.brand.subtle.pressed` | 1.43:1 |
| `color.background.info.subtle.default` | 1.01:1 |
| `color.background.success.subtle.default` | 1.12:1 |
| `color.background.warning.subtle.default` | 1.07:1 |
| `color.background.error.subtle.default` | 1.01:1 |

</details>

### color.border.focus-outer

Es el anillo blanco exterior del foco. El foco cumple junto con color.border.focus, que tiene al menos 9:1 con él (ADR-005); una pareja suelta no lo puede medir.

<details>
<summary>Contraste en sus 13 parejas</summary>

| Fondo | Contraste |
| --- | --- |
| `color.background.neutral.default` | 1.00:1 |
| `color.background.neutral.subtle.default` | 1.04:1 |
| `color.background.neutral.strong.default` | 1.23:1 |
| `color.background.neutral.hover` | 1.10:1 |
| `color.background.neutral.pressed` | 1.23:1 |
| `color.background.neutral.disabled` | 1.10:1 |
| `color.background.brand.subtle.default` | 1.18:1 |
| `color.background.brand.subtle.hover` | 1.39:1 |
| `color.background.brand.subtle.pressed` | 1.77:1 |
| `color.background.info.subtle.default` | 1.21:1 |
| `color.background.success.subtle.default` | 1.09:1 |
| `color.background.warning.subtle.default` | 1.14:1 |
| `color.background.error.subtle.default` | 1.22:1 |

</details>

### color.icon.neutral.disabled

Los controles desactivados quedan fuera de los mínimos de contraste (docs/accesibilidad.md). Con más contraste parecerían activos.

<details>
<summary>Contraste en sus 13 parejas</summary>

| Fondo | Contraste |
| --- | --- |
| `color.background.neutral.default` | 2.60:1 |
| `color.background.neutral.subtle.default` | 2.49:1 |
| `color.background.neutral.strong.default` | 2.10:1 |
| `color.background.neutral.hover` | 2.36:1 |
| `color.background.neutral.pressed` | 2.10:1 |
| `color.background.neutral.disabled` | 2.36:1 |
| `color.background.brand.subtle.default` | 2.19:1 |
| `color.background.brand.subtle.hover` | 1.86:1 |
| `color.background.brand.subtle.pressed` | 1.46:1 |
| `color.background.info.subtle.default` | 2.13:1 |
| `color.background.success.subtle.default` | 2.36:1 |
| `color.background.warning.subtle.default` | 2.26:1 |
| `color.background.error.subtle.default` | 2.13:1 |

</details>

## Todas las parejas que se exigen

<details>
<summary>Texto que no es inverted, sobre los fondos claros. (91)</summary>

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.text.neutral.default` | `color.background.neutral.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.neutral.subtle.default` | 17.00:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.neutral.strong.default` | 14.35:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.neutral.hover` | 16.12:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.neutral.pressed` | 14.35:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.neutral.disabled` | 16.12:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.brand.subtle.default` | 14.95:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.brand.subtle.hover` | 12.72:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.brand.subtle.pressed` | 9.98:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.info.subtle.default` | 14.54:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.success.subtle.default` | 16.14:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.warning.subtle.default` | 15.46:1 | 4.5:1 | Pasa |
| `color.text.neutral.default` | `color.background.error.subtle.default` | 14.53:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.default` | 7.56:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.subtle.default` | 7.24:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.strong.default` | 6.11:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.hover` | 6.87:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.pressed` | 6.11:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.neutral.disabled` | 6.87:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.brand.subtle.default` | 6.37:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.brand.subtle.hover` | 5.41:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.brand.subtle.pressed` | 4.25:1 | 4.5:1 | **No pasa** |
| `color.text.neutral.subtle.default` | `color.background.info.subtle.default` | 6.19:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.success.subtle.default` | 6.87:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.warning.subtle.default` | 6.59:1 | 4.5:1 | Pasa |
| `color.text.neutral.subtle.default` | `color.background.error.subtle.default` | 6.19:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.subtle.default` | 8.40:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.strong.default` | 7.09:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.hover` | 7.96:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.pressed` | 7.09:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.neutral.disabled` | 7.96:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.brand.subtle.default` | 7.39:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.brand.subtle.hover` | 6.28:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.brand.subtle.pressed` | 4.93:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.info.subtle.default` | 7.18:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.success.subtle.default` | 7.97:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.warning.subtle.default` | 7.64:1 | 4.5:1 | Pasa |
| `color.text.brand.default` | `color.background.error.subtle.default` | 7.18:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.default` | 8.83:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.subtle.default` | 8.46:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.strong.default` | 7.14:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.hover` | 8.03:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.pressed` | 7.14:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.neutral.disabled` | 8.03:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.brand.subtle.default` | 7.44:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.brand.subtle.hover` | 6.33:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.brand.subtle.pressed` | 4.97:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.info.subtle.default` | 7.24:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.success.subtle.default` | 8.04:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.warning.subtle.default` | 7.70:1 | 4.5:1 | Pasa |
| `color.text.info.default` | `color.background.error.subtle.default` | 7.24:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.default` | 7.09:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.subtle.default` | 6.79:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.strong.default` | 5.73:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.hover` | 6.44:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.pressed` | 5.73:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.neutral.disabled` | 6.44:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.brand.subtle.default` | 5.97:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.brand.subtle.hover` | 5.08:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.brand.subtle.pressed` | 3.98:1 | 4.5:1 | **No pasa** |
| `color.text.success.default` | `color.background.info.subtle.default` | 5.81:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.success.subtle.default` | 6.45:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.warning.subtle.default` | 6.18:1 | 4.5:1 | Pasa |
| `color.text.success.default` | `color.background.error.subtle.default` | 5.81:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.default` | 7.35:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.subtle.default` | 7.04:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.strong.default` | 5.94:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.hover` | 6.68:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.pressed` | 5.94:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.neutral.disabled` | 6.68:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.brand.subtle.default` | 6.19:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.brand.subtle.hover` | 5.27:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.brand.subtle.pressed` | 4.13:1 | 4.5:1 | **No pasa** |
| `color.text.warning.default` | `color.background.info.subtle.default` | 6.02:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.success.subtle.default` | 6.69:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.warning.subtle.default` | 6.41:1 | 4.5:1 | Pasa |
| `color.text.warning.default` | `color.background.error.subtle.default` | 6.02:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.default` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.subtle.default` | 8.02:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.strong.default` | 6.77:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.hover` | 7.61:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.pressed` | 6.77:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.neutral.disabled` | 7.61:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.brand.subtle.default` | 7.05:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.brand.subtle.hover` | 6.00:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.brand.subtle.pressed` | 4.70:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.info.subtle.default` | 6.86:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.success.subtle.default` | 7.61:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.warning.subtle.default` | 7.29:1 | 4.5:1 | Pasa |
| `color.text.error.default` | `color.background.error.subtle.default` | 6.86:1 | 4.5:1 | Pasa |

</details>

<details>
<summary>Texto inverted, sobre los fondos fuertes. (60)</summary>

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.text.neutral.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.neutral.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.brand.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.info.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.success.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.warning.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.brand.default` | 8.76:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.brand.hover` | 10.75:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.info.default` | 6.82:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.success.default` | 4.94:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.warning.default` | 5.22:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.error.default` | 6.42:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.error.hover` | 8.37:1 | 4.5:1 | Pasa |
| `color.text.error.inverted.default` | `color.background.error.pressed` | 10.05:1 | 4.5:1 | Pasa |

</details>

<details>
<summary>Bordes, sobre los fondos claros. (91)</summary>

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.border.neutral.strong.default` | `color.background.neutral.default` | 4.83:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.neutral.subtle.default` | 4.63:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.neutral.strong.default` | 3.91:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.neutral.hover` | 4.39:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.neutral.pressed` | 3.91:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.neutral.disabled` | 4.39:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.brand.subtle.default` | 4.07:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.brand.subtle.hover` | 3.46:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.brand.subtle.pressed` | 2.71:1 | 3:1 | **No pasa** |
| `color.border.neutral.strong.default` | `color.background.info.subtle.default` | 3.96:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.success.subtle.default` | 4.39:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.warning.subtle.default` | 4.21:1 | 3:1 | Pasa |
| `color.border.neutral.strong.default` | `color.background.error.subtle.default` | 3.96:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.default` | 6.36:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.subtle.default` | 6.10:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.strong.default` | 5.14:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.hover` | 5.78:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.pressed` | 5.14:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.neutral.disabled` | 5.78:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.brand.subtle.default` | 5.36:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.brand.subtle.hover` | 4.56:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.brand.subtle.pressed` | 3.58:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.info.subtle.default` | 5.22:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.success.subtle.default` | 5.79:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.warning.subtle.default` | 5.55:1 | 3:1 | Pasa |
| `color.border.brand.default` | `color.background.error.subtle.default` | 5.21:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.default` | 6.82:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.subtle.default` | 6.53:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.strong.default` | 5.51:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.hover` | 6.20:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.pressed` | 5.51:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.neutral.disabled` | 6.20:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.brand.subtle.default` | 5.75:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.brand.subtle.hover` | 4.89:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.brand.subtle.pressed` | 3.83:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.info.subtle.default` | 5.59:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.success.subtle.default` | 6.20:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.warning.subtle.default` | 5.94:1 | 3:1 | Pasa |
| `color.border.info.default` | `color.background.error.subtle.default` | 5.58:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.default` | 4.94:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.subtle.default` | 4.73:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.strong.default` | 3.99:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.hover` | 4.49:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.pressed` | 3.99:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.neutral.disabled` | 4.49:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.brand.subtle.default` | 4.16:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.brand.subtle.hover` | 3.54:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.brand.subtle.pressed` | 2.78:1 | 3:1 | **No pasa** |
| `color.border.success.default` | `color.background.info.subtle.default` | 4.05:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.success.subtle.default` | 4.49:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.warning.subtle.default` | 4.30:1 | 3:1 | Pasa |
| `color.border.success.default` | `color.background.error.subtle.default` | 4.04:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.default` | 5.22:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.subtle.default` | 5.00:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.strong.default` | 4.22:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.hover` | 4.75:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.pressed` | 4.22:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.neutral.disabled` | 4.75:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.brand.subtle.default` | 4.40:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.brand.subtle.hover` | 3.74:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.brand.subtle.pressed` | 2.94:1 | 3:1 | **No pasa** |
| `color.border.warning.default` | `color.background.info.subtle.default` | 4.28:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.success.subtle.default` | 4.75:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.warning.subtle.default` | 4.55:1 | 3:1 | Pasa |
| `color.border.warning.default` | `color.background.error.subtle.default` | 4.28:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.default` | 6.42:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.subtle.default` | 6.15:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.strong.default` | 5.19:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.hover` | 5.83:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.pressed` | 5.19:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.neutral.disabled` | 5.83:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.brand.subtle.default` | 5.41:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.brand.subtle.hover` | 4.60:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.brand.subtle.pressed` | 3.61:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.info.subtle.default` | 5.26:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.success.subtle.default` | 5.84:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.warning.subtle.default` | 5.59:1 | 3:1 | Pasa |
| `color.border.error.default` | `color.background.error.subtle.default` | 5.25:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.default` | 10.75:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.subtle.default` | 10.30:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.strong.default` | 8.69:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.hover` | 9.77:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.pressed` | 8.69:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.neutral.disabled` | 9.77:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.brand.subtle.default` | 9.06:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.brand.subtle.hover` | 7.70:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.brand.subtle.pressed` | 6.04:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.info.subtle.default` | 8.81:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.success.subtle.default` | 9.78:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.warning.subtle.default` | 9.37:1 | 3:1 | Pasa |
| `color.border.focus` | `color.background.error.subtle.default` | 8.80:1 | 3:1 | Pasa |

</details>

<details>
<summary>Iconos como el texto: los que no son inverted sobre los fondos claros y los inverted sobre los fuertes. (151)</summary>

| Delante | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- |
| `color.icon.neutral.default` | `color.background.neutral.default` | 10.30:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.neutral.subtle.default` | 9.87:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.neutral.strong.default` | 8.33:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.neutral.hover` | 9.36:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.neutral.pressed` | 8.33:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.neutral.disabled` | 9.36:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.brand.subtle.default` | 8.68:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.brand.subtle.hover` | 7.38:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.brand.subtle.pressed` | 5.79:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.info.subtle.default` | 8.44:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.success.subtle.default` | 9.37:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.warning.subtle.default` | 8.98:1 | 3:1 | Pasa |
| `color.icon.neutral.default` | `color.background.error.subtle.default` | 8.44:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.default` | 4.83:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.subtle.default` | 4.63:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.strong.default` | 3.91:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.hover` | 4.39:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.pressed` | 3.91:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.neutral.disabled` | 4.39:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.brand.subtle.default` | 4.07:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.brand.subtle.hover` | 3.46:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.brand.subtle.pressed` | 2.71:1 | 3:1 | **No pasa** |
| `color.icon.neutral.subtle.default` | `color.background.info.subtle.default` | 3.96:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.success.subtle.default` | 4.39:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.warning.subtle.default` | 4.21:1 | 3:1 | Pasa |
| `color.icon.neutral.subtle.default` | `color.background.error.subtle.default` | 3.96:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.default` | 6.36:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.subtle.default` | 6.10:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.strong.default` | 5.14:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.hover` | 5.78:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.pressed` | 5.14:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.neutral.disabled` | 5.78:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.brand.subtle.default` | 5.36:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.brand.subtle.hover` | 4.56:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.brand.subtle.pressed` | 3.58:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.info.subtle.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.success.subtle.default` | 5.79:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.warning.subtle.default` | 5.55:1 | 3:1 | Pasa |
| `color.icon.brand.default` | `color.background.error.subtle.default` | 5.21:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.subtle.default` | 6.53:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.strong.default` | 5.51:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.hover` | 6.20:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.pressed` | 5.51:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.neutral.disabled` | 6.20:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.brand.subtle.default` | 5.75:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.brand.subtle.hover` | 4.89:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.brand.subtle.pressed` | 3.83:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.info.subtle.default` | 5.59:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.success.subtle.default` | 6.20:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.warning.subtle.default` | 5.94:1 | 3:1 | Pasa |
| `color.icon.info.default` | `color.background.error.subtle.default` | 5.58:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.subtle.default` | 4.73:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.strong.default` | 3.99:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.hover` | 4.49:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.pressed` | 3.99:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.neutral.disabled` | 4.49:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.brand.subtle.default` | 4.16:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.brand.subtle.hover` | 3.54:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.brand.subtle.pressed` | 2.78:1 | 3:1 | **No pasa** |
| `color.icon.success.default` | `color.background.info.subtle.default` | 4.05:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.success.subtle.default` | 4.49:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.warning.subtle.default` | 4.30:1 | 3:1 | Pasa |
| `color.icon.success.default` | `color.background.error.subtle.default` | 4.04:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.subtle.default` | 5.00:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.strong.default` | 4.22:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.hover` | 4.75:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.pressed` | 4.22:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.neutral.disabled` | 4.75:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.brand.subtle.default` | 4.40:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.brand.subtle.hover` | 3.74:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.brand.subtle.pressed` | 2.94:1 | 3:1 | **No pasa** |
| `color.icon.warning.default` | `color.background.info.subtle.default` | 4.28:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.success.subtle.default` | 4.75:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.warning.subtle.default` | 4.55:1 | 3:1 | Pasa |
| `color.icon.warning.default` | `color.background.error.subtle.default` | 4.28:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.subtle.default` | 6.15:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.strong.default` | 5.19:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.hover` | 5.83:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.pressed` | 5.19:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.neutral.disabled` | 5.83:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.brand.subtle.default` | 5.41:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.brand.subtle.hover` | 4.60:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.brand.subtle.pressed` | 3.61:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.info.subtle.default` | 5.26:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.success.subtle.default` | 5.84:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.warning.subtle.default` | 5.59:1 | 3:1 | Pasa |
| `color.icon.error.default` | `color.background.error.subtle.default` | 5.25:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.neutral.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.brand.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.info.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.success.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.warning.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.neutral.inverted.default` | 17.74:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.brand.default` | 8.76:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.brand.hover` | 10.75:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.brand.pressed` | 15.97:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.info.default` | 6.82:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.success.default` | 4.94:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.warning.default` | 5.22:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.error.default` | 6.42:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.error.hover` | 8.37:1 | 3:1 | Pasa |
| `color.icon.error.inverted.default` | `color.background.error.pressed` | 10.05:1 | 3:1 | Pasa |

</details>
