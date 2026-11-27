import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Textarea } from '@/components'

const field = () => screen.getByRole<HTMLTextAreaElement>('textbox')

describe('Textarea', () => {
  it('label: se ve y da nombre al campo', () => {
    render(<Textarea label="Observaciones" />)
    expect(screen.getByText('Observaciones').tagName).toBe('LABEL')
    expect(field()).toHaveAccessibleName('Observaciones')
  })

  it('aria-label: da nombre al campo cuando no hay label', () => {
    const { container } = render(<Textarea aria-label="Mensaje" />)
    expect(field()).toHaveAccessibleName('Mensaje')
    expect(container.querySelector('label')).toBeNull()
  })

  it('sin ayuda ni error: el campo no tiene descripción ni se marca como no válido', () => {
    render(<Textarea label="Observaciones" />)
    expect(field()).not.toHaveAttribute('aria-describedby')
    expect(field()).not.toHaveAttribute('aria-invalid')
    expect(field()).toHaveClass('border-textarea-border-neutral-strong')
  })

  it('hint: muestra la ayuda y la enlaza con el campo', () => {
    render(<Textarea label="Observaciones" hint="Solo lo ven las maestras." />)
    expect(field()).toHaveAccessibleDescription('Solo lo ven las maestras.')
    expect(screen.getByText('Solo lo ven las maestras.')).toHaveClass('text-textarea-message-text-neutral-subtle')
  })

  it('invalid: marca el campo como no válido y cambia el borde', () => {
    render(<Textarea label="Observaciones" invalid />)
    expect(field()).toBeInvalid()
    expect(field()).toHaveClass('border-textarea-border-error')
  })

  it('invalid con errorMessage: enlaza el mensaje de error, que reemplaza la ayuda', () => {
    render(<Textarea label="Observaciones" hint="Ayuda" invalid errorMessage="Escribe una frase." />)
    expect(field()).toHaveAccessibleDescription('Escribe una frase.')
    expect(screen.getByText('Escribe una frase.')).toHaveClass('text-textarea-message-text-error')
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument()
  })

  it('errorMessage sin invalid: no se muestra y la ayuda sigue', () => {
    render(<Textarea label="Observaciones" hint="Ayuda" errorMessage="Escribe una frase." />)
    expect(screen.queryByText('Escribe una frase.')).not.toBeInTheDocument()
    expect(field()).toHaveAccessibleDescription('Ayuda')
    expect(field()).not.toHaveAttribute('aria-invalid')
  })

  it('invalid sin errorMessage: mantiene la ayuda con su color', () => {
    render(<Textarea label="Observaciones" hint="Ayuda" invalid />)
    expect(field()).toBeInvalid()
    expect(field()).toHaveAccessibleDescription('Ayuda')
    expect(screen.getByText('Ayuda')).toHaveClass('text-textarea-message-text-neutral-subtle')
  })

  it('aria-describedby: se suma a la ayuda o al error, no los sustituye', () => {
    render(
      <>
        <p id="norma">Máximo 200 letras.</p>
        <Textarea label="Observaciones" aria-describedby="norma" invalid errorMessage="Es demasiado largo." />
      </>,
    )
    expect(field()).toHaveAccessibleDescription('Máximo 200 letras. Es demasiado largo.')
  })

  it('aria-describedby: sin ayuda ni error, queda solo el que llega', () => {
    render(<Textarea label="Observaciones" aria-describedby="norma" />)
    expect(field()).toHaveAttribute('aria-describedby', 'norma')
  })

  it('aria-invalid: con invalid manda el componente', () => {
    render(<Textarea label="Observaciones" invalid aria-invalid={false} />)
    expect(field()).toHaveAttribute('aria-invalid', 'true')
  })

  it('aria-invalid: sin invalid se respeta el que llega', () => {
    render(<Textarea label="Observaciones" aria-invalid />)
    expect(field()).toHaveAttribute('aria-invalid', 'true')
  })

  it('id: si no se indica, cada campo recibe uno distinto', () => {
    render(
      <>
        <Textarea label="Primero" />
        <Textarea label="Segundo" />
      </>,
    )
    const [first, second] = screen.getAllByRole('textbox')
    expect(first.id).not.toBe('')
    expect(first.id).not.toBe(second.id)
  })

  it('id: si se indica, se usa en el campo, el label y el mensaje', () => {
    render(<Textarea id="notas" label="Observaciones" hint="Ayuda" />)
    expect(field()).toHaveAttribute('id', 'notas')
    expect(screen.getByText('Observaciones')).toHaveAttribute('for', 'notas')
    expect(field()).toHaveAccessibleDescription('Ayuda')
  })

  it('disabled: desactiva el campo y no deja escribir', async () => {
    render(<Textarea label="Observaciones" disabled />)
    expect(field()).toBeDisabled()
    await userEvent.type(field(), 'Hola')
    expect(field()).toHaveValue('')
  })

  it('size: por defecto es md', () => {
    render(<Textarea label="Observaciones" />)
    expect(field()).toHaveClass('text-textarea-field-md')
  })

  it.each(['sm', 'md', 'lg'] as const)('size %s: cambia la letra y el relleno', (size) => {
    render(<Textarea label="Observaciones" size={size} />)
    expect(field()).toHaveClass(
      `text-textarea-field-${size}`,
      `px-textarea-padding-x-${size}`,
      `py-textarea-padding-y-${size}`,
    )
  })

  it('rows: por defecto muestra 3 líneas', () => {
    render(<Textarea label="Observaciones" />)
    expect(field()).toHaveAttribute('rows', '3')
  })

  it('rows: se puede cambiar', () => {
    render(<Textarea label="Observaciones" rows={6} />)
    expect(field()).toHaveAttribute('rows', '6')
  })

  it('className: va al contenedor, no al campo', () => {
    const { container } = render(<Textarea label="Observaciones" className="max-w-sm" />)
    expect(container.firstElementChild).toHaveClass('max-w-sm')
    expect(field()).not.toHaveClass('max-w-sm')
  })

  it('el resto de atributos pasa al campo', async () => {
    const onChange = vi.fn()
    render(<Textarea label="Observaciones" placeholder="Escribe aquí" onChange={onChange} />)
    expect(field()).toHaveAttribute('placeholder', 'Escribe aquí')
    await userEvent.type(field(), 'Ana')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(field()).toHaveValue('Ana')
  })
})
