# Estado de los componentes

| Componente | Storybook | Solo tokens | Accesibilidad | Contrato | Figma | Aprobación |
| --- | --- | --- | --- | --- | --- | --- |
| Badge | ✅ | ✅ | ✅ | ✅ | — | Anterior a la regla |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | Anterior a la regla |
| Card | ✅ | ✅ | ✅ | ✅ | — | Anterior a la regla |
| Dialog | ✅ | ✅ | ✅ | ✅ | — | [#51](https://github.com/RileyBlue/Lumine-DS/issues/51) |
| Input | ✅ | ✅ | ✅ | ✅ | — | Anterior a la regla |
| Textarea | ✅ | ✅ | ✅ | ✅ | — | [#50](https://github.com/RileyBlue/Lumine-DS/issues/50) |
| Toast | ✅ | ✅ | ✅ | ✅ | — | [#52](https://github.com/RileyBlue/Lumine-DS/issues/52) |

**Solo tokens** significa que el color, la letra, el espaciado, el radio, el borde y la sombra del
componente salen de sus tokens. Las alturas y los tamaños de icono no tienen token: usan la escala de
Tailwind y las tallas de cada componente ([ADR-003](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/003-clases-de-tokens.md)). En `Input`, el hueco
que deja el icono se calcula con dos tokens y el tamaño del icono. El ancho de `Dialog` es disposición y
usa la escala de Tailwind. El icono de `Toast` mide 20 px, como en la talla `md`.

**Accesibilidad** significa que el componente pasa lo que le toca de las cinco reglas de la
[guía de accesibilidad](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/accesibilidad.md): contraste, teclado, nombre accesible, lectura con lector de pantalla y zona
táctil. Se comprobó con la revisión de contraste, las historias `Keyboard`, el panel **Accessibility**,
las comprobaciones del código y una revisión a mano. `Card` y `Badge` no se pueden pulsar, así que el
nombre accesible y la zona táctil no les aplican.

**VoiceOver:** el 27 de noviembre de 2026, Riley Sainz escuchó en Storybook los botones, el
encabezado y la zona inferior de `Card`, el mensaje de error de `Input` y los iconos, y se anunciaron
como se esperaba. El mismo día revisó con VoiceOver `Dialog`, `Textarea` y `Toast`, y los aprobó.

**Aprobación** enlaza el issue que aprobó el componente
([ADR-001](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/001-alcance.md), principio 2). Los cuatro
componentes anteriores a esa regla no lo necesitan.

**Contrato** significa que el componente tiene su ficha en
[`contracts/`](https://github.com/RileyBlue/Lumine-DS/tree/main/contracts), que cumple el esquema y que
todos los tokens que nombra existen. Sus reglas de uso (`guidelines`)
y de textos (`content`) están en cada ficha.

**Figma** significa que el componente está en el
[archivo de Figma](https://www.figma.com/design/AnNYIBhMWsMimOzOKaTrEx/Lumine-DS) con las propiedades
del [mapa](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/figma-map.md), y que
[`figma/components.json`](https://github.com/RileyBlue/Lumine-DS/blob/main/figma/components.json) guarda
cómo quedó. El guion marca los que todavía no se han pasado.
