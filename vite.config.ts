/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/` es la carpeta src. Está también en tsconfig.app.json; Storybook lee este archivo.
    alias: { '@': '/src' },
  },
  // `npm test`: las pruebas de lógica que están junto a cada componente.
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
    setupFiles: ['src/test/setup.ts'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
