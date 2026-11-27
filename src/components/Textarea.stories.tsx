import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { expectFocusRing, resetFocus } from '../stories/keyboard'
import { Textarea } from './Textarea'

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Observaciones de la clase', placeholder: 'Escribe aquí' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutVisibleLabel: Story = {
  args: { label: undefined, 'aria-label': 'Mensaje para las familias', placeholder: 'Mensaje para las familias' },
}
export const WithHint: Story = {
  args: { hint: 'Solo lo ven las maestras y la administración.' },
}
export const WithError: Story = {
  args: { defaultValue: 'Ok', invalid: true, errorMessage: 'Escribe al menos una frase completa.' },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'La clase terminó con una variación en el centro.' },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Textarea {...args} size="sm" label="Campo pequeño" />
      <Textarea {...args} size="md" label="Campo mediano" />
      <Textarea {...args} size="lg" label="Campo grande" />
    </div>
  ),
}

/** Recorre los campos con el teclado. El resultado se ve en el panel Interactions. */
export const Keyboard: Story = {
  render: () => (
    <div className="flex flex-col gap-space-lg p-space-md">
      <Textarea label="Observaciones" />
      <Textarea label="Aviso" invalid errorMessage="Escribe el aviso." />
      <Textarea label="Historial" disabled />
      <Textarea aria-label="Mensaje" size="sm" />
    </div>
  ),
  play: async ({ canvas, step }) => {
    const fields = canvas.getAllByRole<HTMLTextAreaElement>('textbox')
    const enabled = fields.filter((field) => !field.disabled)
    resetFocus()

    await step('Tab recorre los campos activos, con foco visible, y Enter empieza otra línea', async () => {
      for (const field of enabled) {
        await userEvent.tab()
        await expectFocusRing(field, 'textarea')
        await userEvent.keyboard('Plié{Enter}Relevé')
        await expect(field).toHaveValue('Plié\nRelevé')
      }
    })

    await step('Mayús + Tab vuelve al anterior y del último se puede salir', async () => {
      await userEvent.tab({ shift: true })
      await expectFocusRing(enabled[enabled.length - 2], 'textarea')
      await userEvent.tab()
      await userEvent.tab()
      await expect(enabled[enabled.length - 1]).not.toHaveFocus()
    })
  },
}
