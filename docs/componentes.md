# Estado de los componentes

| Componente | Storybook | Solo tokens |
| --- | --- | --- |
| Badge | ✅ | ✅ |
| Button | ✅ | ✅ |
| Card | ✅ | ✅ |
| Input | ✅ | ✅ |

**Solo tokens** significa que el color, la letra, el espaciado, el radio, el borde y la sombra del
componente salen de sus tokens. Las alturas y los tamaños de icono no tienen token: usan la escala de
Tailwind y las tallas de cada componente ([ADR-003](adr/003-clases-de-tokens.md)). En `Input`, el hueco
que deja el icono se calcula con dos tokens y el tamaño del icono.
