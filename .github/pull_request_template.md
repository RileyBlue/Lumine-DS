## Qué cambia

<!-- En pocas frases y sin jerga. -->

## Lista de comprobación

Marca cada casilla. Si algo no aplica a esta PR, márcala y escribe «no aplica».

Reglas: [ADR-001](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/001-alcance.md), [ADR-002](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/002-issue-en-tokens.md), [ADR-003](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/003-clases-de-tokens.md) y [ADR-005](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/005-accesibilidad.md).

### 1. Todo valor visual sale de un token

- [ ] El comando 1 del ADR-001 no devuelve líneas nuevas.
- [ ] El comando 3 del ADR-003 no devuelve ninguna línea.
- [ ] Si cambió `tokens/tokens.json`, se ejecutó `npm run tokens` y `npm run tokens -- --check` pasa.
- [ ] Revisé los archivos cambiados: colores, letras, espaciados, radios, bordes y sombras usan clases de token.

### 2. Nada nuevo sin aprobación previa

- [ ] Cada token nuevo enlaza su issue, y el issue tiene el comentario «Aprobado».
- [ ] Cada componente nuevo enlaza su issue aprobado en `docs/componentes.md`.

### 3. Las pantallas usan componentes, no los imitan

- [ ] El comando 2 del ADR-001 no devuelve líneas nuevas.
- [ ] Cada pieza con aspecto propio es un componente de `src/components/`.

### 4. Accesibilidad

En cada historia de Storybook de los componentes cambiados, según [la guía](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/accesibilidad.md):

- [ ] El contraste es de al menos 4,5:1 en el texto y 3:1 en iconos, bordes de campos y anillo de foco.
- [ ] Todo se maneja con el teclado, en un orden lógico, y el foco se ve.
- [ ] Cada control tiene un nombre accesible.
- [ ] Los encabezados van en orden, los iconos e imágenes con significado tienen texto alternativo y los decorativos están ocultos.
- [ ] Los elementos pulsables miden al menos 24 por 24 píxeles.

### 5. Un solo vocabulario de nombres

- [ ] Componentes, props y variantes en inglés; textos que se ven, en español.
- [ ] El estilo es `variant` y el tamaño es `size`, con `sm`, `md` y `lg`.

### Proyecto

- [ ] Si cambió `package.json`, se actualizó `package-lock.json`.
- [ ] Si hay un ADR nuevo, está apuntado en `AGENTS.md`.
