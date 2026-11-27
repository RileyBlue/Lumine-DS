import type { Meta, StoryObj } from '@storybook/react-vite'
import TailwindPage from './TailwindPage'

const meta = {
  title: 'Páginas/Tailwind',
  component: TailwindPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TailwindPage>

export default meta

/** La página Tailwind de la aplicación, para revisarla en el panel Accessibility. */
export const Page: StoryObj<typeof meta> = {}
