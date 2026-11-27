import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/` es la carpeta src. Está también en tsconfig.app.json; Storybook lee este archivo.
    alias: { '@': '/src' },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
