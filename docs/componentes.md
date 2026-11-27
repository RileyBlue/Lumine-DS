# Estado de los componentes

| Componente | Storybook | Solo tokens | Accesibilidad |
| --- | --- | --- | --- |
| Badge | ✅ | ✅ | ✅ |
| Button | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ |

**Solo tokens** significa que el color, la letra, el espaciado, el radio, el borde y la sombra del
componente salen de sus tokens. Las alturas y los tamaños de icono no tienen token: usan la escala de
Tailwind y las tallas de cada componente ([ADR-003](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/adr/003-clases-de-tokens.md)). En `Input`, el hueco
que deja el icono se calcula con dos tokens y el tamaño del icono.

**Accesibilidad** significa que el componente pasa lo que le toca de las cinco reglas de la
[guía de accesibilidad](https://github.com/RileyBlue/Lumine-DS/blob/main/docs/accesibilidad.md): contraste, teclado, nombre accesible, lectura con lector de pantalla y zona
táctil. Se comprobó con la revisión de contraste, las historias `Keyboard`, el panel **Accessibility**,
las comprobaciones del código y una revisión a mano. `Card` y `Badge` no se pueden pulsar, así que el
nombre accesible y la zona táctil no les aplican.

**VoiceOver:** el 27 de noviembre de 2026, Riley Sainz escuchó en Storybook los botones, el
encabezado y la zona inferior de `Card`, el mensaje de error de `Input` y los iconos, y se anunciaron
como se esperaba.
