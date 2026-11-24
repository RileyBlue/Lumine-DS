import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import { Badge } from './Badge'

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
