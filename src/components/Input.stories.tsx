import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconSearch } from '@tabler/icons-react'
import { expect, userEvent } from 'storybook/test'
import { expectFocusRing, resetFocus } from '../stories/keyboard'
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
  args: { label: undefined, 'aria-label': 'Buscar alumna', iconStart: IconSearch, placeholder: 'Buscar alumna' },
}
export const WithHint: Story = {
  args: { label: 'Correo', hint: 'Lo usaremos para enviar avisos.' },
}
export const WithError: Story = {
  args: { label: 'Correo', defaultValue: 'maria@', invalid: true, errorMessage: 'Escribe un correo válido.' },
}
export const WithIcon: Story = {
  args: { label: 'Buscar alumna', iconStart: IconSearch, placeholder: 'Nombre o grupo' },
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

/** Recorre los campos con el teclado. El resultado se ve en el panel Interactions. */
export const Keyboard: Story = {
  render: () => (
    <div className="flex flex-col gap-space-lg p-space-md">
      <Input label="Nombre" />
      <Input label="Buscar alumna" iconStart={IconSearch} />
      <Input label="Correo" invalid errorMessage="Escribe un correo válido." />
      <Input label="Grupo" disabled />
      <Input aria-label="Mensaje" size="sm" />
    </div>
  ),
  play: async ({ canvas, step }) => {
    const fields = canvas.getAllByRole<HTMLInputElement>('textbox')
    const enabled = fields.filter((field) => !field.disabled)
    resetFocus()

    await step('Tab recorre los campos activos, con foco visible, y se puede escribir', async () => {
      for (const field of enabled) {
        await userEvent.tab()
        await expectFocusRing(field, 'input')
        await userEvent.keyboard('Ana')
        await expect(field).toHaveValue('Ana')
      }
    })

    await step('Mayús + Tab vuelve al anterior y del último se puede salir', async () => {
      await userEvent.tab({ shift: true })
      await expectFocusRing(enabled[enabled.length - 2], 'input')
      await userEvent.tab()
      await userEvent.tab()
      await expect(enabled[enabled.length - 1]).not.toHaveFocus()
    })
  },
}
