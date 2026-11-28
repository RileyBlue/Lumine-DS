# ADR-008 · Fuente de verdad

- **Estado:** Aceptado
- **Fecha:** 2026-11-27
- **Creado por:** Riley Sainz (RileyBlue)

## Contexto

Los tokens se escriben en `tokens/tokens.json` y cada componente tiene su contrato en `contracts/`. Lo que dicen se ve en dos sitios más: Figma, con sus variables, estilos y página Fundamentos, y Storybook.

El [ADR-003](003-clases-de-tokens.md) ya dice que `tokens.json` es la única fuente para el código. Faltaba decidir quién manda cuando Figma o Storybook no coinciden.

## Decisión

- Los tokens y los contratos mandan.
- Figma y Storybook son reflejos: muestran lo que dicen los tokens y los contratos.
- Si Figma y los tokens no coinciden, se actualiza Figma, no los tokens.
- Si Storybook no coincide, se corrigen los componentes o sus historias, no los tokens ni los contratos.
- Un cambio de diseño, aunque nazca en Figma, se hace primero en los tokens o en los contratos y después llega a Figma. Lo nuevo se pide antes en un issue, como indican el [ADR-001](001-alcance.md) (principio 2) y el [ADR-002](002-issue-en-tokens.md).

### Cuándo se actualiza Figma

- Justo después de fusionar a `main` un cambio de tokens, ejecutando la skill desde `main`. Así Figma nunca muestra algo que todavía no está aprobado.
- `figma/variables.json` se actualiza en la PR que abre la skill.
- Entre la fusión y la sincronización hay diferencias. Son esperadas y duran hasta que la sincronización termina.

### Cuándo no hay diferencias

Figma no guarda los valores igual que el código. No hay diferencias cuando Figma tiene lo que la skill [`tokens-to-figma`](../../.claude/skills/tokens-to-figma/SKILL.md) pide a partir de los tokens: los mismos nombres, tipos, valores ya convertidos (color en sRGB, medidas en píxeles y una familia de letra), alias, nombres de código, permisos y estilos enlazados. Lo que la skill deja fuera, como los breakpoints, no cuenta.

Una variable o un estilo que sobre en Figma también es una diferencia. No se borra sin que una persona lo apruebe.

## Cómo se comprueba

- Figma: con el checklist de la skill `tokens-to-figma`, leyendo el archivo. `figma/variables.json` guarda lo que había en la última sincronización, con su fecha en `syncedAt`.
- Storybook: comparando las historias de cada componente con su contrato.

Las dos revisiones son manuales.

## Consecuencias

- Cada cambio de `tokens.json` se lleva a Figma con la skill y actualiza `figma/variables.json`.
- Un cambio de tokens que se descarta nunca llega a Figma.
- Un valor cambiado a mano en Figma se sobrescribe en la siguiente sincronización.
- Quien diseña en Figma no puede cambiar un token desde allí.
