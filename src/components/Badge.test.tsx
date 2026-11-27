import { render, screen } from '@testing-library/react'
import { IconCheck } from '@tabler/icons-react'
import { describe, expect, it } from 'vitest'
import { Badge } from '@/components'

const badge = () => screen.getByText('Asistió')

describe('Badge', () => {
  it('children: muestra el texto de la etiqueta', () => {
    render(<Badge>Asistió</Badge>)
    expect(badge()).toBeInTheDocument()
  })

  it('variant: por defecto es neutral', () => {
    render(<Badge>Asistió</Badge>)
    expect(badge()).toHaveClass('bg-badge-background-neutral-strong', 'text-badge-text-neutral')
  })

  it.each([
    ['neutral', 'bg-badge-background-neutral-strong'],
    ['brand', 'bg-badge-background-brand-subtle'],
    ['info', 'bg-badge-background-info-subtle'],
    ['success', 'bg-badge-background-success-subtle'],
    ['warning', 'bg-badge-background-warning-subtle'],
    ['error', 'bg-badge-background-error-subtle'],
  ] as const)('variant %s: usa el fondo, el texto y el icono de su significado', (variant, background) => {
    render(
      <Badge variant={variant} iconStart={IconCheck}>
        Asistió
      </Badge>,
    )
    expect(badge()).toHaveClass(background, `text-badge-text-${variant}`)
    expect(badge().querySelector('svg')).toHaveClass(`text-badge-icon-${variant}`)
  })

  it('size: por defecto es md', () => {
    render(<Badge iconStart={IconCheck}>Asistió</Badge>)
    expect(badge()).toHaveClass('text-badge-label-md')
    expect(badge().querySelector('svg')).toHaveAttribute('width', '16')
  })

  it.each([
    ['sm', '12'],
    ['md', '16'],
  ] as const)('size %s: cambia la letra, el relleno y el tamaño del icono', (size, icon) => {
    render(
      <Badge size={size} iconStart={IconCheck}>
        Asistió
      </Badge>,
    )
    expect(badge()).toHaveClass(`text-badge-label-${size}`, `px-badge-padding-x-${size}`)
    expect(badge().querySelector('svg')).toHaveAttribute('width', icon)
  })

  it('iconStart: pone un icono decorativo delante del texto', () => {
    render(<Badge iconStart={IconCheck}>Asistió</Badge>)
    const icon = badge().firstElementChild
    expect(icon).toBe(badge().firstChild)
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('iconStart: sin él no hay icono', () => {
    render(<Badge>Asistió</Badge>)
    expect(badge().querySelector('svg')).toBeNull()
  })

  it('className: se suma a las clases de la etiqueta', () => {
    render(<Badge className="ml-auto">Asistió</Badge>)
    expect(badge()).toHaveClass('ml-auto', 'rounded-badge-radius')
  })

  it('el resto de atributos pasa a la etiqueta', () => {
    render(<Badge data-testid="estado">Asistió</Badge>)
    expect(screen.getByTestId('estado')).toBe(badge())
  })
})
