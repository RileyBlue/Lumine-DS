import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  // El alias `@/` no se repite aquí: Storybook usa vite.config.ts.
  framework: '@storybook/react-vite',
}

export default config
