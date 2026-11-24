import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    title: 'Ballet clásico, nivel 2',
    description: 'Martes y jueves, 17:00',
    children: 'Grupo de 12 alumnas con la maestra Lucía.',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = { args: { variant: 'outlined' } }
export const Elevated: Story = { args: { variant: 'elevated' } }
export const WithFooter: Story = {
  args: {
    footer: (
      <>
        <Button variant="ghost" size="sm">Cancelar</Button>
        <Button size="sm">Ver grupo</Button>
      </>
    ),
  },
}
export const OnlyContent: Story = { args: { title: undefined, description: undefined } }
