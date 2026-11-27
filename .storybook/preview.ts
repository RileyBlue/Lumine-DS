import type { Preview } from '@storybook/react-vite'
import '../src/fonts'
import '../src/index.css'

// Las historias y la documentación están en español: sin esto, Storybook las marca como inglés y el
// lector de pantalla las pronuncia mal. Si la interfaz cambia de idioma, cambiar aquí y en index.html.
document.documentElement.lang = 'es'

const preview: Preview = {
  parameters: {
    // Cada historia muestra sus fallos en el panel Accessibility. 'todo' avisa sin hacer fallar nada.
    a11y: {
      test: 'todo',
      config: {
        rules: [
          {
            // axe da por bueno un campo que solo tiene texto de ejemplo. La regla de nombre accesible
            // de docs/accesibilidad.md no: se quita 'non-empty-placeholder' de sus formas válidas.
            id: 'label',
            any: [
              'implicit-label',
              'explicit-label',
              'aria-label',
              'aria-labelledby',
              'non-empty-title',
              'presentational-role',
            ],
          },
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
