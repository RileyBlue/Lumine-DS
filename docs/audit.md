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

## 5. Prueba sin reglas

Prueba hecha con la pantalla [antes.tsx](../src/screens/antes.tsx) (commit `b331942`), escrita con los componentes del proyecto pero sin ninguna regla de diseño. Esta sección recoge lo que salió mal. La pantalla no se ha cambiado.

Lo que sí salió bien: `Button` (líneas 55 y 94), `Input` (línea 87) y `Badge` (línea 68) se usaron con sus props reales y sin errores de TypeScript. Las tres cosas que la sección 4 advertía como difíciles de adivinar (`iconOnly` con `aria-label`, `type="submit"` y `className` de `Input`) se resolvieron bien.

### 5.1 Valores escritos a mano

Ningún valor viene de un token. Todo son clases de Tailwind y números escritos directamente, y se podrían escribir distinto en la próxima pantalla.

| Qué | Archivo y línea | Valor |
| --- | --- | --- |
| Valor arbitrario de Tailwind (el primero que aparece en el proyecto) | [antes.tsx:73](../src/screens/antes.tsx) | `max-w-[85%]` |
| Tamaño de icono en píxeles | [antes.tsx:48](../src/screens/antes.tsx) | `size={48}` (los componentes llegan a 24) |
| Grosor de línea del icono | [antes.tsx:48](../src/screens/antes.tsx) | `stroke={1.25}` (el resto de iconos usa el valor por defecto) |
| Color del icono del estado vacío | [antes.tsx:48](../src/screens/antes.tsx) | `text-gray-400` |
| Color del texto de apoyo | [antes.tsx:51](../src/screens/antes.tsx) | `text-gray-500` |
| Color del borde del campo de escribir | [antes.tsx:86](../src/screens/antes.tsx) | `border-gray-200` |
| Colores de las burbujas | [antes.tsx:74](../src/screens/antes.tsx) | `bg-rose-600 text-white` y `bg-gray-100 text-gray-900` |
| Radio de la burbuja | [antes.tsx:73](../src/screens/antes.tsx) | `rounded-2xl` (ningún componente usa este radio) |
| Relleno de la burbuja | [antes.tsx:73](../src/screens/antes.tsx) | `px-4 py-2` |
| Relleno de la zona de mensajes | [antes.tsx:45](../src/screens/antes.tsx) | `px-6 py-6` |
| Relleno del campo de escribir | [antes.tsx:86](../src/screens/antes.tsx) | `p-4` |
| Ancho máximo de la pantalla | [antes.tsx:44](../src/screens/antes.tsx) | `max-w-3xl` |
| Separaciones entre elementos | [antes.tsx:47, 53, 62, 66, 86](../src/screens/antes.tsx) | `gap-4`, `gap-2`, `gap-4`, `gap-1`, `gap-2` |
| Margen bajo el título | [antes.tsx:51](../src/screens/antes.tsx) | `mt-1` |
| Tamaño y peso del título | [antes.tsx:50](../src/screens/antes.tsx) | `text-xl font-semibold` |

### 5.2 Componentes copiados en vez de usados

Estas piezas no usan un componente del proyecto. Se construyeron con clases sueltas, y varias copian valores de componentes que ya existen.

| Pieza | Archivo y línea | Qué copia o qué falta |
| --- | --- | --- |
| Burbuja de mensaje | [antes.tsx:71 a 78](../src/screens/antes.tsx) | No existe un componente de burbuja y se hizo a mano con un `<p>`. El color del usuario copia el de `Button` primary ([Button.tsx:31](../src/components/Button.tsx): `bg-rose-600 text-white`). El del asistente copia el de `Badge` neutral ([Badge.tsx:16](../src/components/Badge.tsx): `bg-gray-100`, con un texto más oscuro, `text-gray-900` en vez de `text-gray-700`). |
| Estado vacío | [antes.tsx:47 a 60](../src/screens/antes.tsx) | No existe un componente de estado vacío (icono, título, texto y acciones). El título copia el de `Card` pero con otro tamaño: `text-xl` aquí y `text-lg` en [Card.tsx:38](../src/components/Card.tsx). El texto de apoyo copia el de `Card` ([Card.tsx:39](../src/components/Card.tsx)) con otro tamaño: sin `text-sm` aquí. |
| Barra del campo de escribir | [antes.tsx:86](../src/screens/antes.tsx) | Copia la franja inferior de `Card` ([Card.tsx:45](../src/components/Card.tsx): `border-t border-gray-200`), con otro relleno. |
| Fila de mensaje (etiqueta y burbuja) | [antes.tsx:64 a 79](../src/screens/antes.tsx) | Combina `Badge` y la burbuja a mano. No hay un componente que junte quién habla y qué dijo. |

### 5.3 Nombres distintos de los de los componentes

| Qué | Archivo y línea | Diferencia |
| --- | --- | --- |
| Rol del mensaje | [antes.tsx:6, 68](../src/screens/antes.tsx) | La pantalla dice `user` y `assistant`. `Badge` dice `brand` y `neutral`. Hay que traducir a mano: `user` pasa a `brand` y `assistant` a `neutral`. Ningún nombre de `Badge` expresa quién habla. |
| Etiqueta del campo | [antes.tsx:89](../src/screens/antes.tsx) | Se usó `aria-label="Mensaje"`, que es el nombre nativo, en vez de la prop `label` de `Input`. `label` pinta texto visible y el campo no tiene forma de llevar una etiqueta solo para lectores de pantalla. |
| Tamaño del icono | [antes.tsx:48](../src/screens/antes.tsx) | Los componentes usan `size` con `sm`, `md` y `lg`. Aquí `size` es un número de píxeles. No hay un nombre de tamaño para un icono grande. |
| Idioma de los nombres | [antes.tsx:14](../src/screens/antes.tsx) | La pantalla se llama `Antes` y su archivo `antes.tsx`, en español. Los componentes se llaman `Button`, `Input`, `Card` y `Badge`, en inglés. No hay regla sobre qué idioma usar. |
| Nombre de la pieza de arriba | [antes.tsx:62 a 81](../src/screens/antes.tsx) | El historial es una lista `<ol>` sin nombre en el proyecto. En el código se llama `messages`, en la interfaz "historial" y en la petición "mensajes". |

### Lo que esto indica

- La pantalla no es mala, pero cada decisión se tomó de cero. Sin reglas, los valores salen distintos cada vez.
- Faltan al menos tres piezas: burbuja de mensaje, estado vacío y barra de campo de escribir. Hoy cada pantalla las reconstruiría a su manera.
- Los colores, radios y tamaños escritos a mano (5.1) son los que habría que convertir en tokens cuando llegue el manual de identidad.
