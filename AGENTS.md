# AGENTS.md

Manual que se lee antes de cada tarea en este repo.

## Qué es

Lumine-DS es el design system de Lumine, la plataforma escolar interna de la academia de ballet Lumine. Lo usan las maestras y la administración. La interfaz está en español.

## Tecnología

- React con TypeScript y Vite.
- Tailwind para los estilos.
- Tabler Icons para los iconos.
- Ninguna librería de componentes: los componentes se crean desde cero.

## Cómo trabajamos

- Todo se escribe y se responde en español.
- A partir de ahora, todo cambio va en una rama con su PR. No se sube directamente a `main`.
- Los cambios se explican sin jerga.
- Si la interfaz cambia de idioma, se cambia el idioma declarado en `index.html` y en `.storybook/preview.ts`.
- Si cambia `package.json`, se actualiza `package-lock.json` en la misma PR.
- Cada PR rellena en su descripción la lista de `.github/pull_request_template.md`, también si se abre desde la terminal o la abre un asistente. Una casilla solo se marca si se comprobó; si no aplica, se marca y se escribe «no aplica».

## Decisiones

- Las decisiones del design system viven en `docs/adr/`.
- Se leen antes de proponer cualquier cambio que afecte al alcance o a los principios.
- Nunca se contradicen sin escribir un ADR nuevo.
- Cada ADR nuevo se apunta en esta lista, en la misma PR que lo crea.

Lista de ADR:

- [ADR-001 · Alcance y principios](docs/adr/001-alcance.md)
- [ADR-002 · Enlace al issue en los tokens](docs/adr/002-issue-en-tokens.md)
- [ADR-003 · Clases de tokens en los componentes](docs/adr/003-clases-de-tokens.md)
- [ADR-004 · Letra de la interfaz](docs/adr/004-letra-de-la-interfaz.md)
- [ADR-005 · Accesibilidad: cinco reglas](docs/adr/005-accesibilidad.md)
