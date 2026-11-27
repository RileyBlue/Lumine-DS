import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import { expect, userEvent } from 'storybook/test'
import { resetFocus } from '../stories/keyboard'
import { Badge } from './Badge'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Etiqueta' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = { args: { variant: 'neutral', children: 'Inactiva' } }
export const Brand: Story = { args: { variant: 'brand', children: 'Nueva' } }
export const Info: Story = { args: { variant: 'info', children: 'Evento' } }
export const Success: Story = { args: { variant: 'success', children: 'Pagado' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pendiente' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Vencido' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge {...args} size="sm">Pequeña</Badge>
      <Badge {...args} size="md">Mediana</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge {...args} variant="success" icon={IconCheck}>Asistió</Badge>
      <Badge {...args} variant="warning" icon={IconAlertTriangle}>Falta</Badge>
    </div>
  ),
}

/** La etiqueta solo informa: Tab no se detiene en ella. */
export const Keyboard: Story = {
  render: () => (
    <div className="flex items-center gap-space-md p-space-md">
      <Button size="sm">Antes</Button>
      <Badge variant="success" icon={IconCheck}>Asistió</Badge>
      <Button size="sm">Después</Button>
    </div>
  ),
  play: async ({ canvas }) => {
    resetFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Antes' })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Después' })).toHaveFocus()
    await expect(canvas.getByText('Asistió').tabIndex).toBe(-1)
  },
}
