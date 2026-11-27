import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { expectFocusRing, resetFocus } from '../stories/keyboard'
import { Toast } from './Toast'

const meta = {
  title: 'Componentes/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { children: 'El horario cambia a partir del lunes.', onClose: fn() },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = { args: { variant: 'info' } }
export const Success: Story = { args: { variant: 'success', children: 'La asistencia se guardó.' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Quedan dos plazas en nivel 2.' } }
export const ErrorVariant: Story = {
  name: 'Error',
  args: { variant: 'error', children: 'No se pudo guardar la asistencia. Inténtalo de nuevo.' },
}
export const LongText: Story = {
  args: {
    children:
      'La clase de ballet clásico del martes pasa a la sala grande durante las dos próximas semanas por las obras de la sala pequeña.',
    className: 'max-w-sm',
  },
}

/** Recorre los avisos con el teclado. El resultado se ve en el panel Interactions. */
export const Keyboard: Story = {
  render: ({ onClose }) => (
    <div className="flex flex-col gap-space-lg p-space-md">
      <Toast onClose={onClose} variant="success">
        La asistencia se guardó.
      </Toast>
      <Toast onClose={onClose} variant="error">
        No se pudo enviar el aviso.
      </Toast>
    </div>
  ),
  play: async ({ args, canvas, step }) => {
    // El texto aparece un instante después que el aviso.
    await canvas.findByText('No se pudo enviar el aviso.')
    const buttons = canvas.getAllByRole('button', { name: 'Cerrar' })
    resetFocus()

    await step('Los avisos no se llevan el foco y se anuncian con su tipo', async () => {
      await expect(canvas.getByRole('status')).toHaveTextContent('La asistencia se guardó.')
      await expect(canvas.getByRole('alert')).toHaveTextContent('No se pudo enviar el aviso.')
      await expect(canvas.getByRole('img', { name: 'Correcto' })).toBeVisible()
      await expect(canvas.getByRole('img', { name: 'Error' })).toBeVisible()
      for (const button of buttons) await expect(button).not.toHaveFocus()
    })

    await step('Tab lleva a «Cerrar», con foco visible, y Enter y Espacio lo activan', async () => {
      for (const [index, button] of buttons.entries()) {
        await userEvent.tab()
        await expectFocusRing(button, 'button')
        await userEvent.keyboard(index === 0 ? '{Enter}' : ' ')
        await expect(args.onClose).toHaveBeenCalledTimes(index + 1)
      }
    })

    await step('Mayús + Tab vuelve al anterior y del último se puede salir', async () => {
      await userEvent.tab({ shift: true })
      await expectFocusRing(buttons[0], 'button')
      await userEvent.tab()
      await userEvent.tab()
      await expect(buttons[1]).not.toHaveFocus()
    })
  },
}
