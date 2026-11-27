import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Toast } from '@/components'

const message = 'La asistencia se guardó.'

afterEach(() => {
  vi.useRealTimers()
})

describe('Toast', () => {
  it('variant: por defecto es info', async () => {
    render(<Toast onClose={() => {}}>{message}</Toast>)
    expect(await screen.findByRole('img', { name: 'Información' })).toHaveClass('text-toast-icon-info')
    expect(screen.getByRole('status')).toHaveTextContent(message)
  })

  it.each([
    ['info', 'status', 'Información'],
    ['success', 'status', 'Correcto'],
    ['warning', 'status', 'Advertencia'],
    ['error', 'alert', 'Error'],
  ] as const)('variant %s: se anuncia como %s, con el icono «%s» y su color', async (variant, role, icon) => {
    render(
      <Toast data-testid="aviso" variant={variant} onClose={() => {}}>
        {message}
      </Toast>,
    )
    expect(await screen.findByRole('img', { name: icon })).toHaveClass(`text-toast-icon-${variant}`)
    expect(screen.getByRole(role)).toHaveTextContent(message)
    expect(screen.getByTestId('aviso')).toHaveClass(`border-toast-border-${variant}`)
  })

  it('children: el texto aparece un instante después que la zona que se anuncia', () => {
    vi.useFakeTimers()
    render(<Toast onClose={() => {}}>{message}</Toast>)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('status')).toHaveTextContent(message)
  })

  it('onClose: «Cerrar» avisa una vez y no quita el aviso por su cuenta', async () => {
    const onClose = vi.fn()
    render(<Toast onClose={onClose}>{message}</Toast>)
    await screen.findByText(message)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('onClose: no desaparece solo con el tiempo', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast onClose={onClose}>{message}</Toast>)
    act(() => vi.advanceTimersByTime(60_000))
    expect(screen.getByText(message)).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('className: se suma a las clases del aviso', () => {
    render(
      <Toast data-testid="aviso" className="max-w-sm" onClose={() => {}}>
        {message}
      </Toast>,
    )
    expect(screen.getByTestId('aviso')).toHaveClass('max-w-sm', 'rounded-toast-radius')
  })
})
