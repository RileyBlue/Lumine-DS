# ADR-003 · Clases de tokens en los componentes

- **Estado:** Aceptado
- **Fecha:** 2026-11-26
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

El principio 1 del [ADR-001](001-alcance.md) pide que todo valor visual salga de un token definido en el tema de Tailwind (`src/index.css`). También dice que el espaciado usa solo la escala de Tailwind (`p-4`, `gap-2`).

Desde entonces, los tokens se diseñan en `tokens/tokens.json`, y hay tokens de espaciado para cada parte de cada componente. Para usarlos, los componentes necesitan clases propias.

## Decisión

- `tokens/tokens.json` es la única fuente. `npm run tokens` genera `src/styles/tokens.css`, `src/styles/theme.css` y `docs/tokens.md`, y esos tres archivos no se editan a mano. `src/index.css` importa los dos primeros.
- En `src/components/`, el color, la letra, el espaciado, el radio, el borde y la sombra usan las clases de los tokens del componente. Para el espaciado, esto sustituye a la escala de Tailwind que pedía el ADR-001.
- Las alturas y las clases de disposición siguen usando la escala de Tailwind. El tamaño de los iconos lo fija cada talla del componente. Si un espaciado depende de ese tamaño, como el hueco del icono en `Input`, se calcula con las variables de los tokens y el tamaño del icono.
- Las clases generadas no se llaman igual que ninguna de Tailwind y no cambian sus escalas.
- El enlace al issue de un token vive solo en `tokens.json` ([ADR-002](002-issue-en-tokens.md)). Los archivos generados no lo repiten como comentario.
- Las pantallas (`src/screens/`) siguen las reglas del ADR-001.

### Cómo se comprueba

Los tres comandos se ejecutan antes de fusionar:

1. `npm run tokens -- --check` termina sin errores.
2. El comando 1 del ADR-001 no devuelve ninguna línea en `src/components/`.
3. Este comando no devuelve ninguna línea:

   ```bash
   grep -rnE "\b(p|px|py|pl|pr|pt|pb|gap|left)-[0-9]|\btext-(xs|sm|base|lg|[0-9]?xl|white|black)\b|\brounded-(xs|sm|md|lg|[0-9]?xl|full)\b|\bshadow-(xs|sm|md|lg|[0-9]?xl)\b|\bfont-(normal|medium|semibold|bold)\b|\bopacity-[0-9]" src/components --include='*.tsx' --exclude='*.stories.tsx'
   ```

## Consecuencias

- Cambiar un token cambia los componentes que lo usan, sin tocar su código.
- Los nombres de las clases son más largos que los de Tailwind.
- Quien cambie `tokens.json` tiene que ejecutar `npm run tokens`. GitHub comprueba en cada PR que los archivos generados están al día; los otros dos comandos se ejecutan a mano.
- `src/screens/antes.tsx` no cambia, pero se ve distinta porque usa los componentes. La versión original sigue en la rama `antes`.
