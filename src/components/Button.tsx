import type { Icon } from '@tabler/icons-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'error'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icono de Tabler delante del texto. En un botón de solo icono, es el icono que se ve. */
  iconStart?: Icon
  /** Icono de Tabler detrás del texto. */
  iconEnd?: Icon
  /** Hace que el botón ocupe todo el ancho disponible. */
  fullWidth?: boolean
  children?: ReactNode
}

export type ButtonProps = ButtonBaseProps &
  (
    | {
        iconOnly?: false
        /** Texto del botón, que es su nombre. Un botón con solo icono usa `iconOnly`. */
        children: Exclude<ReactNode, boolean | null | undefined>
      }
    | {
        /** Botón cuadrado con solo el icono, sin texto. Exige `iconStart` y `aria-label`. */
        iconOnly: true
        iconStart: Icon
        iconEnd?: undefined
        /** Texto que leen los lectores de pantalla, porque el botón no tiene texto visible. */
        'aria-label': string
      }
  )

const variants: Record<ButtonVariant, { box: string; icon: string }> = {
  primary: {
    box: 'bg-button-background-brand text-button-text-brand-inverted enabled:hover:bg-button-background-brand-hover enabled:active:bg-button-background-brand-pressed disabled:bg-button-background-neutral-disabled',
    icon: 'text-button-icon-brand-inverted',
  },
  secondary: {
    box: 'bg-button-background-brand-subtle text-button-text-brand enabled:hover:bg-button-background-brand-subtle-hover enabled:active:bg-button-background-brand-subtle-pressed disabled:bg-button-background-neutral-disabled',
    icon: 'text-button-icon-brand',
  },
  outline: {
    box: 'border-button-border-width-default border-button-border-neutral-strong bg-button-background-neutral text-button-text-neutral enabled:hover:bg-button-background-neutral-hover enabled:active:bg-button-background-neutral-pressed disabled:bg-button-background-neutral-disabled',
    icon: 'text-button-icon-neutral',
  },
  // ghost no tiene fondo en reposo ni desactivado.
  ghost: {
    box: 'text-button-text-neutral enabled:hover:bg-button-background-neutral-hover enabled:active:bg-button-background-neutral-pressed',
    icon: 'text-button-icon-neutral',
  },
  error: {
    box: 'bg-button-background-error text-button-text-error-inverted enabled:hover:bg-button-background-error-hover enabled:active:bg-button-background-error-pressed disabled:bg-button-background-neutral-disabled',
    icon: 'text-button-icon-error-inverted',
  },
}

// Las alturas usan la escala de Tailwind y el tamaño del icono lo fija cada talla (ADR-003).
const sizes: Record<ButtonSize, { box: string; label: string; square: string; icon: number }> = {
  sm: {
    box: 'h-8 gap-button-gap-sm px-button-padding-x-sm',
    label: 'text-button-label-sm',
    square: 'size-8',
    icon: 16,
  },
  md: {
    box: 'h-10 gap-button-gap-md px-button-padding-x-md',
    label: 'text-button-label-md',
    square: 'size-10',
    icon: 20,
  },
  lg: {
    box: 'h-12 gap-button-gap-lg px-button-padding-x-lg',
    label: 'text-button-label-lg',
    square: 'size-12',
    icon: 24,
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  fullWidth = false,
  iconOnly = false,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const renderIcon = (IconComponent: Icon | undefined) =>
    IconComponent ? (
      <IconComponent
        size={sizes[size].icon}
        aria-hidden="true"
        className={`${variants[variant].icon} group-disabled:text-button-icon-neutral-disabled`}
      />
    ) : null

  return (
    <button
      type={type}
      className={[
        'group inline-flex items-center justify-center rounded-button-radius transition-colors',
        'focus-visible:outline-button-border-width-focus focus-visible:outline-offset-button-focus-offset focus-visible:outline-button-border-focus focus-visible:ring-button-focus-outer focus-visible:ring-button-border-focus-outer',
        'disabled:cursor-not-allowed disabled:text-button-text-neutral-disabled',
        variants[variant].box,
        sizes[size].label,
        iconOnly ? sizes[size].square : sizes[size].box,
        fullWidth && !iconOnly ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {renderIcon(iconStart)}
      {!iconOnly && children}
      {renderIcon(iconEnd)}
    </button>
  )
}
