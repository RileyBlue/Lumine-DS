import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconSearch } from '@tabler/icons-react'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Nombre de la alumna', placeholder: 'Escribe aquí' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutVisibleLabel: Story = {
  args: { label: undefined, 'aria-label': 'Buscar alumna', icon: IconSearch, placeholder: 'Buscar alumna' },
}
export const WithHint: Story = {
  args: { label: 'Correo', hint: 'Lo usaremos para enviar avisos.' },
}
export const WithError: Story = {
  args: { label: 'Correo', defaultValue: 'maria@', error: 'Escribe un correo válido.' },
}
export const WithIcon: Story = {
  args: { label: 'Buscar alumna', icon: IconSearch, placeholder: 'Nombre o grupo' },
}
export const Disabled: Story = { args: { label: 'Grupo', disabled: true, defaultValue: 'Nivel 2' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="sm" label="Campo pequeño" />
      <Input {...args} size="md" label="Campo mediano" />
      <Input {...args} size="lg" label="Campo grande" />
    </div>
  ),
}
