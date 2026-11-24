import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconArrowRight, IconPlus, IconSettings, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Inscribir alumna' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Eliminar' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Pequeño</Button>
      <Button {...args} size="md">Mediano</Button>
      <Button {...args} size="lg">Grande</Button>
    </div>
  ),
}

export const IconLeft: Story = { args: { icon: IconPlus, children: 'Nueva clase' } }
export const IconRight: Story = {
  args: { icon: IconArrowRight, iconPosition: 'right', children: 'Continuar' },
}
export const FullWidth: Story = { args: { fullWidth: true } }
export const Disabled: Story = { args: { disabled: true } }

export const IconOnly: Story = {
  args: { iconOnly: true, icon: IconSettings, 'aria-label': 'Ajustes' },
}

export const IconOnlyVariants: Story = {
  args: { iconOnly: true, icon: IconSettings, 'aria-label': 'Ajustes' },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="outline" />
      <Button {...args} variant="ghost" />
      <Button {...args} variant="danger" icon={IconTrash} aria-label="Eliminar" />
    </div>
  ),
}

export const IconOnlySizes: Story = {
  args: { iconOnly: true, icon: IconPlus, 'aria-label': 'Añadir' },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
}
