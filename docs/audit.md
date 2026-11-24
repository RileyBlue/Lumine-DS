# Auditoría del design system

Estado de `src/components/` (Badge, Button, Card, Input) en el commit `db1bb11`. Los números de línea se refieren a ese estado.

## 1. Inventario de componentes

| Componente | Archivo | Variantes (`variant`) | Tamaños (`size`) | Otras opciones |
| --- | --- | --- | --- | --- |
| Badge | [Badge.tsx](../src/components/Badge.tsx) | `neutral`, `brand`, `info`, `success`, `warning`, `danger` (por defecto `neutral`) | `sm`, `md` (por defecto `md`) | `icon` |
| Button | [Button.tsx](../src/components/Button.tsx) | `primary`, `secondary`, `outline`, `ghost`, `danger` (por defecto `primary`) | `sm`, `md`, `lg` (por defecto `md`) | `icon`, `iconPosition` (`left`, `right`), `iconOnly`, `fullWidth` |
| Card | [Card.tsx](../src/components/Card.tsx) | `outlined`, `elevated` (por defecto `outlined`) | no tiene | `title`, `description`, `footer` |
| Input | [Input.tsx](../src/components/Input.tsx) | no tiene | `sm`, `md`, `lg` (por defecto `md`) | `label`, `hint`, `error`, `icon` |

Estados que resuelven los componentes: `disabled` en Button (línea 64) y en Input (línea 62); error en Input (líneas 63 a 65); foco con teclado en Button (línea 63) y en Input (línea 61). Badge y Card no tienen estados interactivos.

Las historias de Storybook están en `src/components/*.stories.tsx`, una por componente, y la tabla de estado está en [componentes.md](componentes.md).

## 2. Colores, espaciados y radios de Tailwind por componente

### Button

- **Colores:**
  - `rose` 100, 200, 300, 500, 600, 700, 800
  - `red` 600, 700, 800
  - `gray` 50, 100, 200, 300, 700, 800
  - `white`
- **Espaciado:**
  - Alto: `h-8`, `h-10`, `h-12`
  - Lados: `px-4`, `px-5`, `px-7`
  - Separación con el icono: `gap-1.5`, `gap-2`, `gap-2.5`
  - Solo icono: `size-8`, `size-10`, `size-12`
  - Borde de foco: `outline-2`, `outline-offset-2`
- **Radio:** `rounded-full`
- **Texto:** `text-sm`, `text-base`, `text-lg`, `font-medium`
- **Otros:** `opacity-50` (deshabilitado), `w-full`

### Input

- **Colores:**
  - `gray` 100, 300, 400, 500, 800, 900
  - `rose` 500
  - `red` 500, 600
  - `white`
- **Espaciado:**
  - Alto: `h-8`, `h-10`, `h-12`
  - Lados: `px-3`, `px-4`
  - Hueco para el icono: `pl-9`, `pl-10`, `pl-12`
  - Posición del icono: `left-3`
  - Separación entre etiqueta, campo y mensaje: `gap-1.5`
  - Borde de foco: `outline-2`, `outline-offset-0`
- **Radio:** `rounded-lg`
- **Texto:** `text-sm`, `text-base`, `text-lg`, `font-medium`

### Card

- **Colores:**
  - `gray` 50, 200, 500, 700, 900
  - `white`
- **Espaciado:**
  - Cuerpo: `p-6`, `gap-4`
  - Cabecera: `gap-1`
  - Pie: `px-6`, `py-3`, `gap-2`
- **Radio:** `rounded-xl`
- **Sombra:** `shadow-md`
- **Texto:** `text-lg`, `text-sm`, `font-semibold`

### Badge

- **Colores:**
  - `gray` 100, 700
  - `rose` 100, 800
  - `sky` 100, 800
  - `emerald` 100, 800
  - `amber` 100, 800
  - `red` 100, 800
- **Espaciado:**
  - Lados: `px-2`, `px-2.5`
  - Alto: `py-0.5`, `py-1`
  - Separación con el icono: `gap-1`, `gap-1.5`
- **Radio:** `rounded-full`
- **Texto:** `text-xs`, `text-sm`, `font-medium`

## 3. Valores escritos a mano dentro de los componentes

No hay colores hex ni valores arbitrarios de Tailwind (`[...]`) en ningún componente. Lo que hay son dos cosas.

### Colores de la paleta de Tailwind escritos directamente

Ningún color pasa por un token con significado. El color de marca (`rose`) y los de estado (`red`, `emerald`, `amber`, `sky`) están repetidos en cada archivo.

| Archivo | Líneas |
| --- | --- |
| [Button.tsx](../src/components/Button.tsx) | 31 a 35 (colores de cada variante), 63 (`outline-rose-500`) |
| [Input.tsx](../src/components/Input.tsx) | 43, 52, 60, 62, 64, 65 (campo y etiqueta), 73 (`text-red-600`, `text-gray-500`) |
| [Card.tsx](../src/components/Card.tsx) | 17, 18, 38, 39, 42, 45 |
| [Badge.tsx](../src/components/Badge.tsx) | 16 a 21 (colores de cada variante) |

El color de marca `rose` aparece en Button (31, 32, 63), Input (65) y Badge (17).

### Píxeles escritos como números

Son los tamaños de icono, pasados como número de píxeles a Tabler. Tailwind no los controla.

| Archivo | Línea | Valores |
| --- | --- | --- |
| [Button.tsx](../src/components/Button.tsx) | 39, 40, 41 | 16, 20, 24 |
| [Input.tsx](../src/components/Input.tsx) | 20, 21, 22 | 16, 20, 24 |
| [Badge.tsx](../src/components/Badge.tsx) | 25, 26 | 12, 16 |

Cada tamaño de icono está atado a mano a la altura del componente (por ejemplo, `h-8` con `16`). Si cambia una, hay que acordarse de cambiar la otra.

### Medidas repetidas en varios archivos

- `h-8`, `h-10`, `h-12` para los tres tamaños: Button (39 a 41) e Input (20 a 22).
- `gap-1.5` aparece en Button (39), Input (41) y Badge (26), con significados distintos.
- Una cadena de texto fija: el sufijo `-mensaje` del identificador del mensaje de Input ([Input.tsx:37](../src/components/Input.tsx)).

## 4. Nombres de props y variantes que un agente no adivinaría

1. **`variant` no significa lo mismo en cada componente.**
   - Button: `primary`, `secondary`, `outline`, `ghost`, `danger`.
   - Badge: `neutral`, `brand`, `info`, `success`, `warning`, `danger`.
   - Card: `outlined`, `elevated`.
   - `danger` existe en Button y Badge, pero `brand` solo en Badge y `primary` solo en Button. Los dos son el mismo rosa.
2. **`icon` recibe el componente de Tabler, no un nombre ni un elemento.** Se usa así: `icon={IconPlus}`, no `icon="plus"` ni `icon={<IconPlus />}`.
3. **`iconOnly` cambia las reglas de Button** ([Button.tsx:20 a 28](../src/components/Button.tsx)).
   - Exige `icon` y `aria-label`.
   - Ignora `children` y `fullWidth`.
   - Usa los tamaños cuadrados `size-8`, `size-10` y `size-12`.
   - Con `iconPosition="right"` el icono se dibuja igual, porque solo hay uno.
4. **`error` es un texto, no un booleano.** Además sustituye a `hint` en pantalla ([Input.tsx:38](../src/components/Input.tsx)).
5. **`className` va a un sitio distinto en cada componente.**
   - En Input va a la caja que envuelve etiqueta, campo y mensaje, no al `<input>` ([Input.tsx:41](../src/components/Input.tsx)).
   - En Button, Card y Badge va al elemento raíz.
   - No se resuelven los choques: si pasas `className="rounded-lg"` a un Button, conviven con `rounded-full` y gana el que Tailwind ordene después.
6. **`size` de Input no es el atributo nativo `size`.** El nativo se ha quitado con `Omit` ([Input.tsx:7](../src/components/Input.tsx)).
7. **`title` de Card no es el atributo nativo `title`.** Es un `ReactNode` que pinta un `<h3>`, así que no se puede poner un tooltip nativo ([Card.tsx:5](../src/components/Card.tsx)).
8. **Card usa `description` y `footer`, no `subtitle` ni `actions`.** La cabecera solo se pinta si hay `title` o `description`, y el cuerpo solo si hay `children` ([Card.tsx:36, 42, 44](../src/components/Card.tsx)).
9. **Los tamaños no son los mismos en todos los componentes.** Button e Input tienen `sm`, `md` y `lg`; Badge solo `sm` y `md`; Card ninguno.
10. **Button usa `type="button"` por defecto, no `submit`** ([Button.tsx:51](../src/components/Button.tsx)). Dentro de un formulario hay que pedir `type="submit"` a mano.
11. **`label` e `hint` son solo texto** (`string`), mientras que `title` y `description` de Card admiten cualquier contenido de React.
12. **Los tipos se importan desde `src/components`**, con nombres como `ButtonVariant` y `InputSize`. El tipo base de Button, `ButtonBaseProps`, no se exporta ([Button.tsx:7](../src/components/Button.tsx)).
13. **Los títulos de Storybook están en español** (`Componentes/Button`) y los ejemplos usan textos de la academia, no `Lorem ipsum`.
