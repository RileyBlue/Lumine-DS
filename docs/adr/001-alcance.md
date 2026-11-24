# ADR-001 · Alcance y principios

- **Estado:** Propuesto
- **Fecha:** 2026-11-24
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

Lumine es un estudio de danza que da clases de ballet a jóvenes y adultas. Lumine-DS es el design system de su plataforma web. Lo mantiene una sola persona, que cubre diseño y desarrollo.

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

Cada principio se comprueba con la lista de comprobación de la PR (ver Consecuencias).

1. **Todo valor visual sale de un token.** Color, tipografía, espaciado, radio, sombra y tamaño de icono. *Se comprueba:* ningún archivo de `src/components/` ni de `src/screens/` contiene colores hex, medidas en píxeles, valores arbitrarios de Tailwind (`[...]`) ni colores de la paleta de Tailwind sueltos (por ejemplo `rose-600`).
2. **Si falta algo, se para y se avisa.** Cuando una pantalla o un componente necesita un token o un componente que no existe, no se inventa ni se copia: se detiene el trabajo y se pregunta, sin construir nada. *Se comprueba:* la PR no añade ningún valor visual que no esté en los tokens ni ninguna pieza nueva que no se haya aprobado antes.
3. **Los componentes se usan, no se copian.** Las pantallas se construyen con los componentes de `src/components/`. *Se comprueba:* ninguna pantalla repite las clases de un componente existente para imitarlo.
4. **Accesibilidad WCAG 2.2 AA en todo.** *Se comprueba* en cada componente nuevo o cambiado:
   - el texto tiene un contraste de al menos 4,5:1 y los elementos de interfaz, de 3:1;
   - se maneja entero con el teclado y el foco se ve;
   - cada control tiene un nombre accesible;
   - los elementos pulsables miden al menos 24 por 24 píxeles.
5. **Un solo vocabulario de nombres.** Las props y las variantes se escriben en inglés, y el mismo nombre significa lo mismo en todos los componentes (`variant`, `size` con `sm`, `md` y `lg`). Los textos que ve la usuaria están en español. *Se comprueba:* ningún nombre nuevo repite un significado que ya existe con otra palabra.

## Consecuencias

- **Lista de comprobación en cada PR.** Hace falta una plantilla de PR con estos cinco principios, y cada PR se revisa a mano contra ella. Se crea en una PR aparte.
- **Primer trabajo pendiente: los tokens.** Antes de seguir con componentes hay que convertir la paleta y las tipografías del manual en tokens. Eso exige decidir qué colores se usan para texto, qué fondos y qué estados, y cómo se arregla el color `#D08099`, que no cumple AA por sí solo (por ejemplo, solo para decoración, nunca para texto ni controles).
- **Los componentes actuales no cumplen los principios.** `Button`, `Input`, `Card` y `Badge` usan colores de Tailwind sueltos y habrá que migrarlos a tokens. La pantalla `antes.tsx` se queda como está: es la foto de partida y vive también en la rama `antes`.
- **Pueden faltar piezas.** La burbuja de mensaje, el estado vacío y la barra del campo de escribir no existen como componentes. Por el principio 2, hay que decidir si se crean antes de volver a usarlas.
- **La revisión es manual.** No hay reglas automáticas todavía, así que el principio 1 depende de que quien revisa lo compruebe. Si falla a menudo, se podrá automatizar con reglas de ESLint en otro ADR.
- **Los límites son una decisión, no un olvido.** Las gráficas y los paneles de datos quedan fuera. Si hacen falta, se escribe un ADR nuevo antes de construirlos.
