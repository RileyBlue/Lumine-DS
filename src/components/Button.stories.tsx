import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconArrowRight, IconPlus, IconSettings, IconTrash } from '@tabler/icons-react'
import { expect, fn, userEvent } from 'storybook/test'
import { expectFocusRing, resetFocus } from '../stories/keyboard'
import { Button } from '@/components'

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
export const ErrorVariant: Story = { name: 'Error', args: { variant: 'error', children: 'Eliminar' } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Pequeño</Button>
      <Button {...args} size="md">Mediano</Button>
      <Button {...args} size="lg">Grande</Button>
    </div>
  ),
}

export const IconStart: Story = { args: { iconStart: IconPlus, children: 'Nueva clase' } }
export const IconEnd: Story = {
  args: { iconEnd: IconArrowRight, children: 'Continuar' },
}
export const FullWidth: Story = { args: { fullWidth: true } }
export const Disabled: Story = { args: { disabled: true } }

export const IconOnly: Story = {
  args: { iconOnly: true, iconStart: IconSettings, 'aria-label': 'Ajustes' },
}

export const IconOnlyVariants: Story = {
  args: { iconOnly: true, iconStart: IconSettings, 'aria-label': 'Ajustes' },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="outline" />
      <Button {...args} variant="ghost" />
      <Button {...args} variant="error" iconStart={IconTrash} aria-label="Eliminar" />
    </div>
  ),
}

export const IconOnlySizes: Story = {
  args: { iconOnly: true, iconStart: IconPlus, 'aria-label': 'Añadir' },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
}

/** Recorre los botones con el teclado. El resultado se ve en el panel Interactions. */
export const Keyboard: Story = {
  args: { onClick: fn() },
  render: ({ onClick }) => (
    <div className="flex flex-wrap items-center gap-space-md p-space-md">
      <Button onClick={onClick} variant="primary">Principal</Button>
      <Button onClick={onClick} variant="secondary">Secundario</Button>
      <Button onClick={onClick} variant="outline">Contorno</Button>
      <Button onClick={onClick} variant="ghost">Sin fondo</Button>
      <Button onClick={onClick} variant="error">Eliminar</Button>
      <Button onClick={onClick} disabled>Desactivado</Button>
      <Button onClick={onClick} iconOnly iconStart={IconSettings} aria-label="Ajustes" />
    </div>
  ),
  play: async ({ args, canvas, step }) => {
    const buttons = canvas.getAllByRole<HTMLButtonElement>('button')
    const enabled = buttons.filter((button) => !button.disabled)
    resetFocus()

    await step('Tab recorre los botones activos, con foco visible, y Enter y Espacio los activan', async () => {
      let clicks = 0
      for (const button of enabled) {
        await userEvent.tab()
        await expectFocusRing(button, 'button')
        await userEvent.keyboard('{Enter}')
        await expect(args.onClick).toHaveBeenCalledTimes(++clicks)
        await userEvent.keyboard(' ')
        await expect(args.onClick).toHaveBeenCalledTimes(++clicks)
      }
    })

    await step('Mayús + Tab vuelve al anterior y del último se puede salir', async () => {
      await userEvent.tab({ shift: true })
      await expectFocusRing(enabled[enabled.length - 2], 'button')
      await userEvent.tab()
      await userEvent.tab()
      await expect(enabled[enabled.length - 1]).not.toHaveFocus()
    })
  },
}
