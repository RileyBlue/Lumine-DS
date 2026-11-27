# ADR-005 · Accesibilidad: cinco reglas

- **Estado:** Aceptado
- **Fecha:** 2026-11-27
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El [ADR-001](001-alcance.md) dice que todo cumple WCAG 2.2 nivel AA, sin excepciones, y su principio 4 pide comprobar cuatro criterios: contraste, teclado y foco, nombre accesible y tamaño de pulsación de 24 por 24 píxeles.

La accesibilidad engloba muchos más criterios de los que hoy se comprueban en Lumine-DS, que mantiene una sola persona.

## Decisión

- Lumine-DS cubre cinco reglas, explicadas en [`docs/accesibilidad.md`](../accesibilidad.md): contraste, navegación por teclado, nombre accesible, lectura con lector de pantalla y zona táctil.
- El principio 4 del ADR-001 conserva sus cuatro criterios y suma la lectura con lector de pantalla.
- Esto sustituye la frase «todo cumple WCAG 2.2 nivel AA, sin excepciones»: en cada PR se comprueban estas cinco reglas, con WCAG 2.2 AA como referencia. El resto todavía no se comprueba.
- El anillo de foco es doble: uno de color y otro blanco por fuera, con al menos 9:1 entre los dos.

### Cómo se comprueba

Con los checklists de `docs/accesibilidad.md`, en cada historia de los componentes cambiados. La plantilla de PR los resume.

## Consecuencias

- Lumine-DS no puede afirmar que cumple WCAG 2.2 AA completo. Varios criterios sin cubrir son requisitos de ese estándar.
- Al escribir este ADR, tres cosas no cumplían las reglas: el anillo de foco era sencillo, `Input` se podía usar sin `label` y el título de `Card` era siempre un `h3`.
- El anillo doble necesita tokens nuevos, con su issue, y cambiar los componentes.
- La sección «Anillo de foco» de `tokens/README.md` se actualizará cuando se aplique.
- Ampliar lo que se cubre pide un ADR nuevo.
