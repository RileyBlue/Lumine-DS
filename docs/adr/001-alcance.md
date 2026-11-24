# ADR-001 · Alcance y principios

- **Estado:** Aceptado
- **Fecha:** 2026-11-24
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

Lumine es un estudio de danza que da clases de ballet a niñas, adolescentes y adultas. Lumine-DS es el design system de su plataforma web. Lo mantiene una sola persona, que cubre diseño y desarrollo.

Hoy hay cuatro componentes (`Badge`, `Button`, `Card`, `Input`), una página de referencia de Tailwind y una pantalla de prueba, `src/screens/antes.tsx`. Se construyeron sin reglas de diseño a propósito, para ver qué salía mal. [La auditoría](../audit.md) recoge el resultado:

- Los valores visuales están escritos a mano en cada archivo: colores de la paleta de Tailwind, radios, rellenos y tamaños de icono en píxeles, y un valor arbitrario (`max-w-[85%]`).
- Hay piezas copiadas en vez de reutilizadas. La burbuja de mensaje copia los colores de `Button` y `Badge`, y el estado vacío copia el título de `Card` con otro tamaño.
- Los nombres no son coherentes: `user` y `assistant` frente a `brand` y `neutral`, `aria-label` frente a `label`, tamaños en píxeles frente a `sm`, `md` y `lg`, y nombres en español frente a nombres en inglés.

Existe un manual de marca con una paleta de cinco colores (`#812D45`, `#AE5470`, `#D08099`, `#D2B1C2` y `#FFFFFF`) y dos tipografías: Cormorant Garamond para los títulos y Be Vietnam para el texto descriptivo.

La paleta no cumple por sí sola el nivel AA de WCAG 2.2. Estos son los contrastes calculados sobre blanco; el texto necesita 4,5:1 y los elementos de interfaz, 3:1.

| Color | Contraste sobre blanco | Resultado |
| --- | --- | --- |
| `#812D45` | 8,77:1 | Cumple para texto |
| `#AE5470` | 4,88:1 | Cumple para texto |
| `#D08099` | 2,90:1 | No cumple ni como texto ni como elemento de interfaz |
| `#D2B1C2` | 1,94:1 | No cumple |

Además, `#812D45` sobre `#D2B1C2` da 4,51:1, que apenas cumple para texto.

## Decisión

### Alcance

- **Dentro:** componentes web hechos en React, con Tailwind para los estilos y Tabler Icons para los iconos. Se crean desde cero, sin librería de componentes.
- **Fuera, por ahora:** gráficas y paneles de datos, aplicaciones móviles nativas, más de una marca y temas alternativos.
- **Una sola marca:** Lumine-DS sirve solo a Lumine.
- **Accesibilidad:** todo cumple WCAG 2.2 nivel AA, sin excepciones.

### Principios

Cada principio se comprueba como indica la tabla de debajo.

1. **Todo valor visual sale de un token.** Los colores, las tipografías, los radios y las sombras se usan por el nombre de un token definido en el tema de Tailwind (`src/index.css`). El espaciado usa solo la escala de Tailwind (`p-4`, `gap-2`) y el tamaño de los iconos, los tamaños `sm`, `md` y `lg` del componente. En `src/components/` y `src/screens/` no se escribe ningún color hex, ninguna medida en píxeles, ningún valor arbitrario de Tailwind (`[...]`) ni ningún color de la paleta de Tailwind (`rose-600`, `gray-100`).
2. **Nada nuevo sin aprobación previa.** Si una pantalla o un componente necesita un token o un componente que no existe, se para y se abre un issue que lo pida, sin construir nada. La pieza nueva solo se añade cuando el issue está aprobado, y queda enlazado desde `docs/componentes.md` (componentes) o desde un comentario junto al token (tokens).
3. **Las pantallas usan componentes, no los imitan.** En `src/screens/` solo hay clases de disposición (`flex`, `grid`, `gap`, `p-*`, `m-*`, anchos, altos, `overflow`, posición). Todo lo que tiene color, borde, radio, sombra o tipografía viene de un componente de `src/components/`.
4. **Accesibilidad WCAG 2.2 AA.** Cada componente cumple, en todas sus historias de Storybook, estos cuatro criterios como mínimo:
   - el texto tiene un contraste de al menos 4,5:1 y los elementos de interfaz, de 3:1;
   - se maneja entero con el teclado y el foco se ve;
   - cada control tiene un nombre accesible;
   - los elementos pulsables miden al menos 24 por 24 píxeles.
5. **Un solo vocabulario de nombres.** Los nombres de componentes, props y variantes están en inglés, y el texto que ve la usuaria, en español. El estilo se llama siempre `variant` y el tamaño siempre `size`, y `size` solo usa `sm`, `md` y `lg`.

### Cómo se comprueba cada principio

| Principio | Cómo se comprueba | Dónde |
| --- | --- | --- |
| 1. Todo valor visual sale de un token | Ejecutar el comando 1 (abajo): no debe devolver ninguna línea. Después, abrir los archivos cambiados y confirmar que los colores, tipografías, radios y sombras usan nombres de token. | Código |
| 2. Nada nuevo sin aprobación previa | Si la PR crea un componente en `src/components/`, su fila en `docs/componentes.md` enlaza el issue aprobado. Si añade un token en `src/index.css`, hay un comentario con el enlace del issue. Los cuatro componentes actuales son anteriores a esta regla y no la necesitan. | Código |
| 3. Las pantallas usan componentes, no los imitan | Ejecutar el comando 2 (abajo): no debe devolver ninguna línea. Después, abrir la pantalla y confirmar que cada pieza con aspecto propio es un componente de `src/components/`. | Código |
| 4. Accesibilidad WCAG 2.2 AA | En cada historia del componente cambiado: **contraste**, midiendo el texto y los bordes con el selector de color del inspector del navegador, que muestra la relación; **teclado**, recorriendo con Tab, activando con Enter y con Espacio y comprobando que el foco se ve; **nombre accesible**, leyendo el código para confirmar que cada control tiene texto visible, `label` o `aria-label`; **tamaño**, midiendo con el inspector que los elementos pulsables miden al menos 24 por 24 píxeles. | Storybook y código |
| 5. Un solo vocabulario de nombres | Leer las props y las variantes del componente: están en inglés, el estilo es `variant`, el tamaño es `size` y sus valores son `sm`, `md` y `lg`. En Storybook, el panel de controles muestra los mismos nombres y los textos de las historias están en español. | Código y Storybook |

Comando 1, valores visuales escritos a mano:

```bash
grep -rnE '#[0-9a-fA-F]{3,8}\b|\b[0-9]+px\b|-\[[^]]+\]|size=\{[0-9]+\}|\b(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]{2,3}\b' src/components src/screens --include='*.tsx' --exclude='*.stories.tsx'
```

Comando 2, estilos propios dentro de una pantalla:

```bash
grep -rnE '\b(bg|border|ring|outline|shadow|rounded|font|divide|fill|stroke)-|\btext-(xs|sm|base|lg|[0-9]xl|white|black|[a-z]+-[0-9]{2,3})\b|[" ](border|rounded|shadow)[" ]' src/screens --include='*.tsx'
```

Hoy los dos comandos devuelven líneas: los componentes actuales y `src/screens/antes.tsx` se escribieron antes de estas reglas (ver Consecuencias).

## Consecuencias

- **Lista de comprobación en cada PR.** Hace falta una plantilla de PR con estos cinco principios, y cada PR se revisa a mano contra ella. Se crea en una PR aparte.
- **Primer trabajo pendiente: los tokens.** Antes de seguir con componentes hay que convertir la paleta y las tipografías del manual en tokens. Eso exige decidir qué colores se usan para texto, qué fondos y qué estados, y cómo se arregla el color `#D08099`, que no cumple AA por sí solo (por ejemplo, solo para decoración, nunca para texto ni controles).
- **Los componentes actuales no cumplen los principios.** `Button`, `Input`, `Card` y `Badge` usan colores de Tailwind sueltos y habrá que migrarlos a tokens. La pantalla `antes.tsx` se queda como está: es la foto de partida y vive también en la rama `antes`.
- **Pueden faltar piezas.** La burbuja de mensaje, el estado vacío y la barra del campo de escribir no existen como componentes. Por el principio 2, hay que decidir si se crean antes de volver a usarlas.
- **La revisión es manual.** No hay reglas automáticas todavía, así que el principio 1 depende de que quien revisa lo compruebe. Si falla a menudo, se podrá automatizar con reglas de ESLint en otro ADR.
- **Los límites son una decisión, no un olvido.** Las gráficas y los paneles de datos quedan fuera. Si hacen falta, se escribe un ADR nuevo antes de construirlos.
- **La comprobación de accesibilidad es un mínimo.** Las cuatro revisiones del principio 4 se hacen en cada PR, pero no sustituyen a una auditoría completa de WCAG 2.2 AA.
- **Hay que preparar dos archivos para poder comprobar.** `docs/componentes.md` necesita una columna con el enlace a la decisión (principio 2) y `src/index.css` necesita el tema de Tailwind con los tokens (principio 1). Se hace en PR aparte.
