import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconArrowRight, IconPlus } from '@tabler/icons-react'
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
