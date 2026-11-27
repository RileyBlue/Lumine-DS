import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Dialog, type DialogProps } from '@/components'

// El entorno de estas pruebas no sabe abrir un `<dialog>`. Se imita lo justo: abrir, cerrar y avisar
// del cierre. El comportamiento del navegador (foco, Esc, fondo) se comprueba en Storybook.
const showModal = vi.fn(function (this: HTMLDialogElement) {
  this.open = true
})
const close = vi.fn(function (this: HTMLDialogElement) {
  if (!this.open) return
  this.open = false
  this.dispatchEvent(new Event('close'))
})

beforeEach(() => {
  vi.clearAllMocks()
  Object.assign(HTMLDialogElement.prototype, { showModal, close })
})
afterAll(() => {
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
})

function example(props: Partial<DialogProps> = {}) {
  return (
    <Dialog open onClose={() => {}} title="¿Eliminar la clase?" {...props}>
      {props.children ?? 'Las alumnas dejarán de verla.'}
    </Dialog>
  )
}
const dialog = () => screen.getByRole<HTMLDialogElement>('dialog')

describe('Dialog', () => {
  it('open falso: la ventana está cerrada', () => {
    const { container } = render(example({ open: false }))
    expect(showModal).not.toHaveBeenCalled()
    expect(container.querySelector('dialog')).not.toHaveAttribute('open')
  })

  it('open verdadero: se abre como ventana modal, con showModal', () => {
    render(example())
    expect(showModal).toHaveBeenCalledTimes(1)
    expect(dialog()).toHaveAttribute('open')
  })

  it('open: al cambiar abre y cierra la ventana, sin repetir la apertura', () => {
    const onClose = vi.fn()
    const { rerender } = render(example({ open: false, onClose }))
    rerender(example({ open: true, onClose }))
    rerender(example({ open: true, onClose }))
    expect(showModal).toHaveBeenCalledTimes(1)
    rerender(example({ open: false, onClose }))
    expect(close).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('onClose: se llama cuando el navegador cierra la ventana', () => {
    const onClose = vi.fn()
    render(example({ onClose }))
    dialog().dispatchEvent(new Event('close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('onClose: «Cerrar» cierra la ventana y avisa una vez', async () => {
    const onClose = vi.fn()
    render(example({ onClose }))
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(close).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('onClose: cerrar una ventana de dentro no avisa a la de fuera', () => {
    const outer = vi.fn()
    const inner = vi.fn()
    render(
      example({
        onClose: outer,
        children: (
          <Dialog open onClose={inner} title="Ventana de dentro">
            Contenido
          </Dialog>
        ),
      }),
    )
    screen.getByRole('dialog', { name: 'Ventana de dentro' }).dispatchEvent(new Event('close'))
    expect(inner).toHaveBeenCalledTimes(1)
    expect(outer).not.toHaveBeenCalled()
  })

  it('title: es un encabezado y el nombre de la ventana', () => {
    render(example())
    expect(dialog()).toHaveAccessibleName('¿Eliminar la clase?')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('¿Eliminar la clase?')
  })

  it('children: es el contenido de la ventana', () => {
    render(example({ children: 'Ballet clásico, nivel 2' }))
    expect(dialog()).toHaveTextContent('Ballet clásico, nivel 2')
  })

  it('footer: muestra los botones de abajo', () => {
    render(example({ footer: <button type="button">Cancelar</button> }))
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
  })

  it('footer: sin él solo queda el botón «Cerrar»', () => {
    render(example())
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('className: se suma a las clases de la ventana', () => {
    render(example({ className: 'max-w-lg' }))
    expect(dialog()).toHaveClass('max-w-lg', 'rounded-dialog-radius')
  })
})
