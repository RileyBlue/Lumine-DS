# ADR-007 · Título en Dialog

- **Estado:** Aceptado
- **Fecha:** 2026-11-27
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El [ADR-006](006-api.md) dice que el nombre de un atributo de HTML no se usa para otra cosa, con dos excepciones: `size`, y `title` en `Card`.

`Dialog` necesita un título visible, que además es su nombre para los lectores de pantalla. En HTML, `title` es el texto que aparece al dejar el puntero encima.

## Decisión

- En `Dialog`, `title` es el título visible de la ventana. Es obligatorio.
- Amplía la excepción que el ADR-006 hace para `Card`, con el mismo motivo: es el nombre que un agente usaría por defecto.
- Vale solo para `Card` y `Dialog`. En otro componente, `title` sigue siendo el atributo de HTML.
- Todo lo demás del ADR-006 sigue igual.

La propuesta se aprobó en el issue [#51](https://github.com/RileyBlue/Lumine-DS/issues/51).

## Consecuencias

- `Card` y `Dialog` nombran su título igual.
- En esos dos componentes no se puede poner el texto emergente de HTML.
