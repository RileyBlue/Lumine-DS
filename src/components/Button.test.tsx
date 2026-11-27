import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconArrowRight, IconPlus } from '@tabler/icons-react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components'

const button = () => screen.getByRole('button')
const icons = () => [...button().querySelectorAll('svg')]

describe('Button', () => {
  it('children: es el texto y el nombre del botón', () => {
    render(<Button>Guardar</Button>)
    expect(button()).toHaveAccessibleName('Guardar')
  })

  it('variant: por defecto es primary', () => {
    render(<Button>Guardar</Button>)
    expect(button()).toHaveClass('bg-button-background-brand', 'text-button-text-brand-inverted')
  })

  it.each([
    ['primary', 'bg-button-background-brand', 'text-button-icon-brand-inverted'],
    ['secondary', 'bg-button-background-brand-subtle', 'text-button-icon-brand'],
    ['outline', 'border-button-border-neutral-strong', 'text-button-icon-neutral'],
    ['ghost', 'text-button-text-neutral', 'text-button-icon-neutral'],
    ['error', 'bg-button-background-error', 'text-button-icon-error-inverted'],
  ] as const)('variant %s: usa las clases de su estilo', (variant, box, icon) => {
    render(
      <Button variant={variant} iconStart={IconPlus}>
        Guardar
      </Button>,
    )
    expect(button()).toHaveClass(box)
    expect(icons()[0]).toHaveClass(icon)
  })

  it.each([
    ['primary', 'brand'],
    ['secondary', 'brand-subtle'],
    ['outline', 'neutral'],
    ['ghost', 'neutral'],
    ['error', 'error'],
  ] as const)('estados hover y pressed de %s: solo se aplican si no está desactivado', (variant, role) => {
    render(<Button variant={variant}>Guardar</Button>)
    expect(button()).toHaveClass(
      `enabled:hover:bg-button-background-${role}-hover`,
      `enabled:active:bg-button-background-${role}-pressed`,
    )
  })

  it('size: por defecto es md', () => {
    render(<Button iconStart={IconPlus}>Guardar</Button>)
    expect(button()).toHaveClass('h-10', 'text-button-label-md')
    expect(icons()[0]).toHaveAttribute('width', '20')
  })

  it.each([
    ['sm', 'h-8', '16'],
    ['md', 'h-10', '20'],
    ['lg', 'h-12', '24'],
  ] as const)('size %s: cambia la altura, la letra y el tamaño del icono', (size, height, icon) => {
    render(
      <Button size={size} iconStart={IconPlus}>
        Guardar
      </Button>,
    )
    expect(button()).toHaveClass(height, `text-button-label-${size}`, `px-button-padding-x-${size}`)
    expect(icons()[0]).toHaveAttribute('width', icon)
  })

  it('iconStart: pone el icono delante del texto', () => {
    render(<Button iconStart={IconPlus}>Guardar</Button>)
    expect(icons()).toHaveLength(1)
    expect(button().firstChild).toBe(icons()[0])
  })

  it('iconEnd: pone el icono detrás del texto', () => {
    render(<Button iconEnd={IconArrowRight}>Continuar</Button>)
    expect(icons()).toHaveLength(1)
    expect(button().lastChild).toBe(icons()[0])
  })

  it('iconStart e iconEnd: pueden ir los dos, cada uno en su lado', () => {
    render(
      <Button iconStart={IconPlus} iconEnd={IconArrowRight}>
        Continuar
      </Button>,
    )
    expect(button().firstChild).toHaveClass('tabler-icon-plus')
    expect(button().lastChild).toHaveClass('tabler-icon-arrow-right')
  })

  it('iconOnly: muestra solo el icono, en un botón cuadrado, con aria-label como nombre', () => {
    render(<Button iconOnly iconStart={IconPlus} aria-label="Añadir" />)
    expect(button()).toHaveAccessibleName('Añadir')
    expect(button()).toHaveTextContent('')
    expect(icons()).toHaveLength(1)
    expect(button()).toHaveClass('size-10')
    expect(button()).not.toHaveClass('px-button-padding-x-md')
  })

  it('iconOnly: no muestra children aunque se pasen', () => {
    render(
      <Button iconOnly iconStart={IconPlus} aria-label="Añadir">
        Texto oculto
      </Button>,
    )
    expect(screen.queryByText('Texto oculto')).not.toBeInTheDocument()
  })

  it('fullWidth: ocupa todo el ancho', () => {
    render(<Button fullWidth>Guardar</Button>)
    expect(button()).toHaveClass('w-full')
  })

  it('fullWidth: por defecto no ocupa todo el ancho', () => {
    render(<Button>Guardar</Button>)
    expect(button()).not.toHaveClass('w-full')
  })

  it('fullWidth: no tiene efecto con iconOnly', () => {
    render(<Button iconOnly fullWidth iconStart={IconPlus} aria-label="Añadir" />)
    expect(button()).not.toHaveClass('w-full')
  })

  it('type: por defecto no envía el formulario', async () => {
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button>Guardar</Button>
      </form>,
    )
    expect(button()).toHaveAttribute('type', 'button')
    await userEvent.click(button())
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('type submit: envía el formulario', async () => {
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Enviar</Button>
      </form>,
    )
    await userEvent.click(button())
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('onClick: se llama al pulsar', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Guardar</Button>)
    await userEvent.click(button())
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('disabled: desactiva el botón y no responde al pulsar', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick} iconStart={IconPlus}>
        Guardar
      </Button>,
    )
    expect(button()).toBeDisabled()
    expect(button()).toHaveClass('disabled:text-button-text-neutral-disabled')
    expect(icons()[0]).toHaveClass('group-disabled:text-button-icon-neutral-disabled')
    await userEvent.click(button())
    expect(onClick).not.toHaveBeenCalled()
  })

  it('className: se suma a las clases del botón', () => {
    render(<Button className="mt-auto">Guardar</Button>)
    expect(button()).toHaveClass('mt-auto', 'rounded-button-radius')
  })
})
