import type { Icon } from '@tabler/icons-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icono de Tabler que se muestra junto al texto. */
  icon?: Icon
  iconPosition?: 'left' | 'right'
  /** Hace que el botón ocupe todo el ancho disponible. */
  fullWidth?: boolean
  children?: ReactNode
}

export type ButtonProps = ButtonBaseProps &
  (
    | { iconOnly?: false }
    | {
        /** Botón redondo con solo el icono, sin texto. Exige `icon` y `aria-label`. */
        iconOnly: true
        icon: Icon
        /** Texto que leen los lectores de pantalla, porque el botón no tiene texto visible. */
        'aria-label': string
      }
  )

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800',
  secondary: 'bg-rose-100 text-rose-800 hover:bg-rose-200 active:bg-rose-300',
  outline: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
}

const sizes: Record<ButtonSize, { box: string; square: string; icon: number }> = {
  sm: { box: 'h-8 gap-1.5 px-4 text-sm', square: 'size-8', icon: 16 },
  md: { box: 'h-10 gap-2 px-5 text-base', square: 'size-10', icon: 20 },
  lg: { box: 'h-12 gap-2.5 px-7 text-lg', square: 'size-12', icon: 24 },
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  fullWidth = false,
  iconOnly = false,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const icon = IconComponent ? <IconComponent size={sizes[size].icon} aria-hidden="true" /> : null

  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-full font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        iconOnly ? sizes[size].square : sizes[size].box,
        fullWidth && !iconOnly ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {!iconOnly && children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
