import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from '@/components'

const card = () => screen.getByTestId('tarjeta')

describe('Card', () => {
  it('title: es un encabezado, por defecto de nivel 3', () => {
    render(<Card title="Ballet clásico" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Ballet clásico' })).toBeInTheDocument()
  })

  it('title: no se pone como atributo title de HTML', () => {
    render(<Card data-testid="tarjeta" title="Ballet clásico" />)
    expect(card()).not.toHaveAttribute('title')
  })

  it('title: sin él no hay encabezado', () => {
    render(<Card>Contenido</Card>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it.each([2, 3, 4, 5, 6] as const)('headingLevel %i: el título usa ese nivel', (level) => {
    render(<Card title="Ballet clásico" headingLevel={level} />)
    expect(screen.getByRole('heading', { level, name: 'Ballet clásico' })).toBeInTheDocument()
  })

  it('description: muestra el texto de apoyo después del título', () => {
    render(<Card title="Ballet clásico" description="Nivel 2" />)
    const description = screen.getByText('Nivel 2')
    expect(description.tagName).toBe('P')
    expect(screen.getByRole('heading').nextElementSibling).toBe(description)
  })

  it('description: sin ella no hay párrafo', () => {
    render(<Card data-testid="tarjeta" title="Ballet clásico" />)
    expect(card().querySelector('p')).toBeNull()
  })

  it('children: es el contenido de la tarjeta', () => {
    render(<Card>Martes, 17:00</Card>)
    expect(screen.getByText('Martes, 17:00')).toHaveClass('text-card-content')
  })

  it('footer: añade la zona inferior después del contenido', () => {
    render(
      <Card data-testid="tarjeta" footer="Pie de la tarjeta">
        Contenido
      </Card>,
    )
    expect(card().children).toHaveLength(2)
    expect(card().lastElementChild).toHaveTextContent('Pie de la tarjeta')
  })

  it('footer: sin él no hay zona inferior', () => {
    render(<Card data-testid="tarjeta">Contenido</Card>)
    expect(card().children).toHaveLength(1)
  })

  it('variant: por defecto es outlined, con borde', () => {
    render(<Card data-testid="tarjeta">Contenido</Card>)
    expect(card()).toHaveClass('border-card-border-neutral')
    expect(card()).not.toHaveClass('shadow-card-elevation')
  })

  it('variant elevated: cambia el borde por sombra', () => {
    render(
      <Card data-testid="tarjeta" variant="elevated">
        Contenido
      </Card>,
    )
    expect(card()).toHaveClass('shadow-card-elevation')
    expect(card()).not.toHaveClass('border-card-border-neutral')
  })

  it('className: se suma a las clases de la tarjeta', () => {
    render(
      <Card data-testid="tarjeta" className="max-w-sm">
        Contenido
      </Card>,
    )
    expect(card()).toHaveClass('max-w-sm', 'rounded-card-radius')
  })
})
