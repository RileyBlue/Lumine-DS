# ADR-004 · Letra de la interfaz

- **Estado:** Aceptado
- **Fecha:** 2026-11-26
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El manual de marca pide Cormorant Garamond para los títulos y Be Vietnam para el texto descriptivo. El [ADR-001](001-alcance.md) dejó como trabajo pendiente convertir esas tipografías en tokens. Son letras que funcionan para marketing, pero no para la web.

## Decisión

- La interfaz web de Lumine usa **Inter** para todo: títulos y texto. Esto sustituye, para la tipografía, lo que pedía el ADR-001.
- Cormorant Garamond y Be Vietnam siguen siendo las letras de marketing, fuera de Lumine-DS.
- El token `semantic.font-family.default` apunta a `primitive.font-family.sans`. `src/index.css` lo aplica a la página y los componentes lo heredan: ninguno fija su propia familia.
- Los archivos de Inter se alojan en el proyecto con el paquete `@fontsource/inter`, en los pesos 400, 500, 600 y 700. No se piden a servicios externos.

### Cómo se comprueba

En Storybook, la letra calculada de cada componente es Inter, y en `src/components/` no hay ninguna clase de familia de letra.

## Consecuencias

- Una sola letra en toda la interfaz, igual en todos los equipos.
- La aplicación descarga además los archivos de la letra.
- No se incluye la cursiva: si se usa, el navegador la simula.
- `src/screens/antes.tsx` no cambia, pero se ve con Inter. La versión original sigue en la rama `antes`.
