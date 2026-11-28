# AGENTS.md

Manual que se lee antes de cada tarea en este repo.

## Qué es

Lumine-DS es el design system de Lumine, la plataforma escolar interna de la academia de ballet Lumine. La usan las maestras y la administración. La interfaz está en español.

## Tecnología

- React con TypeScript y Vite; Tailwind para los estilos y Tabler Icons para los iconos. Ninguna librería de componentes: se crean desde cero.
- Storybook para revisar los componentes; Vitest con Testing Library para sus pruebas. Node 22, la misma versión que usa GitHub: con Node 20.14, Storybook no arranca.

## Cómo trabajamos

- Todo se escribe y se responde en español, salvo los nombres en el código, que van en inglés ([ADR-001](docs/adr/001-alcance.md), principio 5). Los cambios se explican sin jerga.
- Todo cambio va en una rama con su PR. No se sube directamente a `main`. Si cambia `package.json`, se actualiza `package-lock.json` en la misma PR.
- Si la interfaz cambia de idioma, se cambia el idioma declarado en `index.html` y en `.storybook/preview.ts`, y los textos escritos dentro de los componentes, como «Cerrar».
- Cada PR rellena en su descripción la lista de `.github/pull_request_template.md`, también si se abre desde la terminal o la abre un asistente. Una casilla solo se marca si se comprobó; si no aplica, se marca y se escribe «no aplica».

## Decisiones

- Las decisiones del design system viven en `docs/adr/` y se leen antes de proponer cualquier cambio que afecte a lo que deciden.
- Nunca se contradicen sin escribir un ADR nuevo.

| ADR | Decisión | Estado |
| --- | --- | --- |
| [ADR-001 · Alcance y principios](docs/adr/001-alcance.md) | Qué entra en Lumine-DS y los principios que cumple | Aceptado |
| [ADR-002 · Enlace al issue en los tokens](docs/adr/002-issue-en-tokens.md) | Cada token nuevo enlaza su issue aprobado | Aceptado |
| [ADR-003 · Clases de tokens en los componentes](docs/adr/003-clases-de-tokens.md) | Los componentes usan clases generadas desde los tokens | Aceptado |
| [ADR-004 · Letra de la interfaz](docs/adr/004-letra-de-la-interfaz.md) | La interfaz web usa Inter | Aceptado |
| [ADR-005 · Accesibilidad: cinco reglas](docs/adr/005-accesibilidad.md) | Las cinco reglas de accesibilidad que se comprueban | Aceptado |
| [ADR-006 · Nombres de props y variantes](docs/adr/006-api.md) | Cómo se nombran props y variantes y quién decide un nombre nuevo | Aceptado |
| [ADR-007 · Título en Dialog](docs/adr/007-titulo-en-dialog.md) | `title` es el título visible también en `Dialog` | Aceptado |
| [ADR-008 · Fuente de verdad](docs/adr/008-fuente-de-verdad.md) | Tokens y contratos mandan; Figma y Storybook son reflejos | Aceptado |

## Antes de escribir código

- Usa las skills de `.claude/skills/` que sirvan para la tarea, lee el contrato del componente en `contracts/`, usa los nombres de `docs/prop-map.md` y pasa el checklist de `docs/accesibilidad.md`.
- Antes de crear un componente, busca uno parecido. Si hace la misma función, se añade una variante o un prop al que existe. Si hace otra función, aunque se parezca (un acordeón no es un desplegable), se crea uno nuevo. En los dos casos, primero se pide aprobación (ver Permisos).

## Antes de terminar

Todo lo nuevo, sea un componente, una pantalla o un prototipo:

- Usa solo componentes del design system (si falta uno, se pide), tokens y nombres del prop map. Las pantallas añaden las clases de disposición que permite el ADR-001.
- Cumple las cinco reglas de `docs/accesibilidad.md` y pasa `npm run tokens -- --check`, `npm run build` y `npm test`.

## Reglas críticas

1. Sin valores escritos a mano: comando 1 del ADR-001 y comando 3 del ADR-003.
2. Solo nombres de `docs/prop-map.md`: se comparan las props y los valores de `variant`.
3. Cada componente tiene un contrato que cumple `contracts/contract.schema.json`.
4. Accesibilidad según `docs/accesibilidad.md`: checklists, historias `Keyboard` y panel Accessibility.
5. Tokens y Figma sin diferencias ([ADR-008](docs/adr/008-fuente-de-verdad.md)): se comprueba a mano con el checklist de la skill de tokens.

## Reglas de uso

Las de cada componente están en `guidelines` y `content` de su contrato; las de los tokens, en [Reglas de uso](tokens/README.md#reglas-de-uso).

## Permisos

- **Claude decide** (lo hace solo): crear la rama, escribir código, historias y pruebas que respeten el contrato, corregir fallos sin cambiarlo, poner al día la documentación y abrir la PR.
- **Una persona decide** (Claude lo propone y espera a que se apruebe):
  - Un token, un componente o un nombre de prop o `variant` nuevos, con un issue «Aprobado» ([ADR-001](docs/adr/001-alcance.md), [ADR-002](docs/adr/002-issue-en-tokens.md), [ADR-006](docs/adr/006-api.md)).
  - Un cambio de contrato o de un ADR, y fusionar a `main`.

## Dónde está cada cosa

- `src/components/`: componentes, con sus historias y pruebas.
- `src/screens/`: pantallas.
- `src/styles/`: estilos generados desde los tokens.
- `src/stories/`: páginas de Storybook y ayuda para las pruebas de teclado.
- `src/test/`: preparación de las pruebas.
- `contracts/`: contrato de cada componente y su esquema.
- `tokens/tokens.json`: los tokens.
- `tokens/README.md`: cómo se construyen y se usan.
- `tokens/contrast-pairs.json`: colores que se comprueban entre sí.
- `docs/componentes.md`: estado de cada componente.
- `docs/prop-map.md`: nombres de props y variantes.
- `docs/accesibilidad.md`: reglas y checklists.
- `docs/tokens.md`: clase de cada token (generado).
- `docs/contraste.md`: informe de contraste (generado).
- `docs/audit.md`: auditoría inicial.
- `docs/adr/`: decisiones.
- `figma/`: lo que quedó en Figma en la última sincronización.
- `scripts/`: generadores de tokens y contraste.
- `.storybook/`: configuración de Storybook.
- `.claude/skills/`: tareas guiadas para el asistente.
- `.github/`: plantilla de PR y lo que GitHub ejecuta solo.
- `package.json`: versiones y comandos.

## Comandos

- `npm run dev`: abrir la aplicación.
- `npm run storybook`: ver los componentes.
- `npm test`: pruebas de lógica.
- `npm run lint`: revisar el código.
- `npm run build`: comprobar tipos y compilar.
- `npm run preview`: ver lo compilado.
- `npm run build-storybook`: compilar Storybook.
- `npm run tokens`: generar los estilos; con `-- --check`, solo comprobar.
- `npm run contrast`: informe de contraste; con `-- --check`, solo comprobar.

## Errores típicos

- Usar colores de la paleta de Tailwind en vez de las clases de los tokens.
- Escribir medidas sueltas en una pantalla, como `max-w-[85%]` o `size={48}` en un icono.
- Rehacer una pieza copiando las clases de un componente, en vez de usarlo o pedir uno.
- Pasar un icono como texto o elemento: se pasa el componente, `iconStart={IconPlus}`.
- Poner en `className` colores o radios que chocan con los del componente: solo disposición.
- Esperar que el `className` de `Input` o `Textarea` llegue al campo: va a la caja.
- Esperar que un botón `iconOnly` muestre `children` o respete `fullWidth`.
- Suponer que todos los componentes tienen las mismas tallas y variantes: míralo en su contrato.

## Mantenimiento

- Lo que se crea o cambia se actualiza en la misma PR en su propio archivo: el contrato, los tokens, `docs/componentes.md`, la skill o el ADR.
- En este archivo solo se añade una línea en «Dónde está cada cosa» si hay un archivo nuevo, y una fila en «Decisiones» si hay un ADR nuevo (si cambia su estado, se actualiza la fila). Nunca se copia aquí lo que ya está en otro archivo.
