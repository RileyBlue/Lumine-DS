import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconSearch } from '@tabler/icons-react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from '@/components'

const field = () => screen.getByRole<HTMLInputElement>('textbox')

describe('Input', () => {
  it('label: se ve y da nombre al campo', () => {
    render(<Input label="Observaciones" />)
    expect(screen.getByText('Observaciones').tagName).toBe('LABEL')
    expect(field()).toHaveAccessibleName('Observaciones')
  })

  it('aria-label: da nombre al campo cuando no hay label', () => {
    const { container } = render(<Input aria-label="Mensaje" />)
    expect(field()).toHaveAccessibleName('Mensaje')
    expect(container.querySelector('label')).toBeNull()
  })

  it('sin ayuda ni error: el campo no tiene descripción ni se marca como no válido', () => {
    render(<Input label="Observaciones" />)
    expect(field()).not.toHaveAttribute('aria-describedby')
    expect(field()).not.toHaveAttribute('aria-invalid')
    expect(field()).toHaveClass('border-input-border-neutral-strong')
  })

  it('hint: muestra la ayuda y la enlaza con el campo', () => {
    render(<Input label="Observaciones" hint="Solo lo ven las maestras." />)
    expect(field()).toHaveAccessibleDescription('Solo lo ven las maestras.')
    expect(screen.getByText('Solo lo ven las maestras.')).toHaveClass('text-input-message-text-neutral-subtle')
  })

  it('invalid: marca el campo como no válido y cambia el borde', () => {
    render(<Input label="Observaciones" invalid />)
    expect(field()).toBeInvalid()
    expect(field()).toHaveClass('border-input-border-error')
  })

  it('invalid con errorMessage: enlaza el mensaje de error, que reemplaza la ayuda', () => {
    render(<Input label="Observaciones" hint="Ayuda" invalid errorMessage="Escribe una frase." />)
    expect(field()).toHaveAccessibleDescription('Escribe una frase.')
    expect(screen.getByText('Escribe una frase.')).toHaveClass('text-input-message-text-error')
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument()
  })

  it('errorMessage sin invalid: no se muestra y la ayuda sigue', () => {
    render(<Input label="Observaciones" hint="Ayuda" errorMessage="Escribe una frase." />)
    expect(screen.queryByText('Escribe una frase.')).not.toBeInTheDocument()
    expect(field()).toHaveAccessibleDescription('Ayuda')
    expect(field()).not.toHaveAttribute('aria-invalid')
  })

  it('invalid sin errorMessage: mantiene la ayuda con su color', () => {
    render(<Input label="Observaciones" hint="Ayuda" invalid />)
    expect(field()).toBeInvalid()
    expect(field()).toHaveAccessibleDescription('Ayuda')
    expect(screen.getByText('Ayuda')).toHaveClass('text-input-message-text-neutral-subtle')
  })

  it('aria-describedby: se suma a la ayuda o al error, no los sustituye', () => {
    render(
      <>
        <p id="norma">Máximo 200 letras.</p>
        <Input label="Observaciones" aria-describedby="norma" invalid errorMessage="Es demasiado largo." />
      </>,
    )
    expect(field()).toHaveAccessibleDescription('Máximo 200 letras. Es demasiado largo.')
  })

  it('aria-describedby: sin ayuda ni error, queda solo el que llega', () => {
    render(<Input label="Observaciones" aria-describedby="norma" />)
    expect(field()).toHaveAttribute('aria-describedby', 'norma')
  })

  it('aria-invalid: con invalid manda el componente', () => {
    render(<Input label="Observaciones" invalid aria-invalid={false} />)
    expect(field()).toHaveAttribute('aria-invalid', 'true')
  })

  it('aria-invalid: sin invalid se respeta el que llega', () => {
    render(<Input label="Observaciones" aria-invalid />)
    expect(field()).toHaveAttribute('aria-invalid', 'true')
  })

  it('id: si no se indica, cada campo recibe uno distinto', () => {
    render(
      <>
        <Input label="Primero" />
        <Input label="Segundo" />
      </>,
    )
    const [first, second] = screen.getAllByRole('textbox')
    expect(first.id).not.toBe('')
    expect(first.id).not.toBe(second.id)
  })

  it('id: si se indica, se usa en el campo, el label y el mensaje', () => {
    render(<Input id="notas" label="Observaciones" hint="Ayuda" />)
    expect(field()).toHaveAttribute('id', 'notas')
    expect(screen.getByText('Observaciones')).toHaveAttribute('for', 'notas')
    expect(field()).toHaveAccessibleDescription('Ayuda')
  })

  it('disabled: desactiva el campo y no deja escribir', async () => {
    render(<Input label="Observaciones" disabled />)
    expect(field()).toBeDisabled()
    await userEvent.type(field(), 'Hola')
    expect(field()).toHaveValue('')
  })

  it('disabled: el icono también se ve desactivado', () => {
    const { container } = render(<Input label="Buscar" iconStart={IconSearch} disabled />)
    expect(container.querySelector('svg')).toHaveClass('text-input-icon-neutral-disabled')
  })

  it('size: por defecto es md', () => {
    render(<Input label="Observaciones" />)
    expect(field()).toHaveClass('h-10', 'text-input-field-md')
  })

  it.each([
    ['sm', 'h-8', '16'],
    ['md', 'h-10', '20'],
    ['lg', 'h-12', '24'],
  ] as const)('size %s: cambia la altura, la letra y el icono', (size, height, icon) => {
    const { container } = render(<Input label="Buscar" size={size} iconStart={IconSearch} />)
    expect(field()).toHaveClass(height, `text-input-field-${size}`, `px-input-padding-x-${size}`)
    expect(field()).not.toHaveAttribute('size')
    expect(container.querySelector('svg')).toHaveAttribute('width', icon)
  })

  it('iconStart: pone un icono decorativo y deja hueco para él', () => {
    const { container } = render(<Input label="Buscar" iconStart={IconSearch} />)
    const icon = container.querySelector('svg')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    // El hueco cuenta con el mismo tamaño que tiene el icono.
    expect(field().getAttribute('style')).toContain('padding-left: calc(')
    expect(field().getAttribute('style')).toContain(`+ ${icon?.getAttribute('width')}px +`)
  })

  it('iconStart: sin él no hay icono ni hueco', () => {
    const { container } = render(<Input label="Buscar" />)
    expect(container.querySelector('svg')).toBeNull()
    expect(field()).not.toHaveAttribute('style')
  })

  it('style: se combina con el hueco del icono', () => {
    render(<Input label="Buscar" iconStart={IconSearch} style={{ textAlign: 'right' }} />)
    expect(field().style.textAlign).toBe('right')
    expect(field().getAttribute('style')).toContain('padding-left')
  })

  it('className: va al contenedor, no al campo', () => {
    const { container } = render(<Input label="Observaciones" className="max-w-sm" />)
    expect(container.firstElementChild).toHaveClass('max-w-sm')
    expect(field()).not.toHaveClass('max-w-sm')
  })

  it('el resto de atributos pasa al campo', async () => {
    const onChange = vi.fn()
    render(<Input label="Observaciones" placeholder="Escribe aquí" onChange={onChange} />)
    expect(field()).toHaveAttribute('placeholder', 'Escribe aquí')
    await userEvent.type(field(), 'Ana')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(field()).toHaveValue('Ana')
  })
})
