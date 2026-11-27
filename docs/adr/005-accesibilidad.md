# ADR-005 · Accesibilidad: cuatro reglas

- **Estado:** Propuesto
- **Fecha:** 2026-11-27
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El [ADR-001](001-alcance.md) dice que todo cumple WCAG 2.2 nivel AA, sin excepciones, y su principio 4 pide comprobar cuatro criterios: contraste, teclado y foco, nombre accesible y tamaño de pulsación de 24 por 24 píxeles.

La accesibilidad engloba muchos más criterios de los que hoy se comprueban en Lumine-DS, que mantiene una sola persona.

## Decisión

- Lumine-DS cubre cuatro reglas, explicadas en [`docs/accesibilidad.md`](../accesibilidad.md): contraste, navegación por teclado, nombre accesible y lectura con lector de pantalla.
- Esto sustituye los cuatro criterios del principio 4 del ADR-001. El tamaño de pulsación deja de comprobarse y entra la lectura con lector de pantalla.
- Esto sustituye también la frase «todo cumple WCAG 2.2 nivel AA, sin excepciones»: en cada PR se comprueban estas cuatro reglas, con WCAG 2.2 AA como referencia. El resto todavía no se comprueba.
- El anillo de foco es doble: uno de color y otro blanco por fuera, con al menos 9:1 entre los dos.

### Cómo se comprueba

Con los checklists de `docs/accesibilidad.md`, en cada historia de los componentes cambiados. La plantilla de PR los resume.

## Consecuencias

- Lumine-DS no puede afirmar que cumple WCAG 2.2 AA completo. Varios criterios sin cubrir son requisitos de ese estándar.
- Hay tres cosas que hoy no cumplen estas reglas: el anillo de foco es sencillo, `Input` se puede usar sin `label` y el título de `Card` es siempre un `h3`.
- El anillo doble necesita tokens nuevos, con su issue, y cambiar los componentes.
- La sección «Anillo de foco» de `tokens/README.md` se actualizará cuando se aplique.
- Ampliar lo que se cubre pide un ADR nuevo.
