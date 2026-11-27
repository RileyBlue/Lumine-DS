import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { expectFocusRing, expectRingInside, resetFocus } from '../stories/keyboard'
import { Button } from './Button'
import { Dialog, type DialogProps } from './Dialog'

/** Cada historia empieza cerrada, con el botón que abre la ventana. */
function Demo({ onClose, footer, ...args }: DialogProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir ventana</Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => {
          close()
          onClose()
        }}
        footer={
          footer === undefined ? (
            <>
              <Button variant="ghost" onClick={close}>
                Cancelar
              </Button>
              <Button variant="error" onClick={close}>
                Eliminar clase
              </Button>
            </>
          ) : (
            footer
          )
        }
      />
    </>
  )
}

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    open: false,
    onClose: fn(),
    title: '¿Eliminar la clase?',
    children: 'Ballet clásico, nivel 2, del martes. Las alumnas dejarán de verla en su horario.',
  },
  argTypes: { open: { control: false }, footer: { control: false } },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Abre la ventana y comprueba que se ve con su título como nombre. */
const openDialog: NonNullable<Story['play']> = async ({ args, canvas }) => {
  await userEvent.click(canvas.getByRole('button', { name: 'Abrir ventana' }))
  await expect(canvas.getByRole('dialog', { name: args.title })).toBeVisible()
}

export const Open: Story = { play: openDialog }

export const WithoutFooter: Story = {
  args: {
    title: 'Horario de verano',
    children: 'Del 1 de julio al 31 de agosto las clases empiezan una hora antes.',
    footer: null,
  },
  play: openDialog,
}

/**
 * Abre y cierra la ventana con el teclado. El resultado se ve en el panel Interactions.
 * La tecla Esc y que Tab no salga de la ventana las resuelve el navegador y una prueba
 * no puede imitarlas: se comprueban a mano.
 */
export const Keyboard: Story = {
  play: async ({ args, canvas, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Abrir ventana' })
    const dialog = () => canvas.getByRole('dialog')
    const button = (name: string) => canvas.getByRole('button', { name })
    // El navegador puede tardar en avisar del cierre, sobre todo si la ventana no está a la vista.
    const expectClosed = (times: number) =>
      waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(times), { timeout: 5000 })
    resetFocus()

    await step('Enter abre la ventana y el foco pasa dentro', async () => {
      await userEvent.tab()
      await expectFocusRing(trigger, 'button')
      await userEvent.keyboard('{Enter}')
      await expect(dialog()).toBeVisible()
      await expectFocusRing(button('Cerrar'), 'button')
      await expectRingInside(button('Cerrar'), dialog(), 'button')
    })

    await step('Tab recorre los botones, con foco visible', async () => {
      for (const name of ['Cancelar', 'Eliminar clase']) {
        await userEvent.tab()
        await expectFocusRing(button(name), 'button')
        await expectRingInside(button(name), dialog(), 'button')
      }
    })

    await step('Cerrar con el teclado avisa y devuelve el foco', async () => {
      await userEvent.tab({ shift: true })
      await userEvent.keyboard('{Enter}')
      await expectClosed(1)
      await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      await expect(trigger).toHaveFocus()
    })

    await step('Se vuelve a abrir y Espacio sobre «Cerrar» la cierra', async () => {
      await userEvent.keyboard(' ')
      await expect(button('Cerrar')).toHaveFocus()
      await userEvent.keyboard(' ')
      await expectClosed(2)
      await expect(trigger).toHaveFocus()
    })
  },
}
