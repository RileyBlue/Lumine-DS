import type { Icon } from '@tabler/icons-react'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger'
export type BadgeSize = 'sm' | 'md'

/** La etiqueta no se puede pulsar: lo que solo responde al ratón deja fuera al teclado. */
type PointerEvents = 'onClick' | 'onDoubleClick' | 'onMouseDown' | 'onMouseUp' | 'onPointerDown' | 'onPointerUp'

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, PointerEvents> {
  variant?: BadgeVariant
  size?: BadgeSize
  /** Icono de Tabler junto al texto. Es decorativo: el significado lo da el texto. */
  icon?: Icon
  /** Texto de la etiqueta. Es obligatorio: sin él, un lector de pantalla no leería nada. */
  children: Exclude<ReactNode, boolean | null | undefined>
}

const variants: Record<BadgeVariant, { box: string; icon: string }> = {
  neutral: {
    box: 'bg-badge-background-neutral-strong text-badge-text-neutral',
    icon: 'text-badge-icon-neutral',
  },
  brand: {
    box: 'bg-badge-background-brand-subtle text-badge-text-brand',
    icon: 'text-badge-icon-brand',
  },
  info: {
    box: 'bg-badge-background-info-subtle text-badge-text-info',
    icon: 'text-badge-icon-info',
  },
  success: {
    box: 'bg-badge-background-success-subtle text-badge-text-success',
    icon: 'text-badge-icon-success',
  },
  warning: {
    box: 'bg-badge-background-warning-subtle text-badge-text-warning',
    icon: 'text-badge-icon-warning',
  },
  // `danger` es el nombre de la variante; su color es el de `error`.
  danger: {
    box: 'bg-badge-background-error-subtle text-badge-text-error',
    icon: 'text-badge-icon-error',
  },
}

const sizes: Record<BadgeSize, { box: string; icon: number }> = {
  sm: {
    box: 'gap-badge-gap-sm px-badge-padding-x-sm py-badge-padding-y-sm text-badge-label-sm',
    icon: 12,
  },
  md: {
    box: 'gap-badge-gap-md px-badge-padding-x-md py-badge-padding-y-md text-badge-label-md',
    icon: 16,
  },
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  icon: IconComponent,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-badge-radius',
        variants[variant].box,
        sizes[size].box,
        className,
      ].join(' ')}
      {...props}
    >
      {IconComponent && (
        <IconComponent size={sizes[size].icon} aria-hidden="true" className={variants[variant].icon} />
      )}
      {children}
    </span>
  )
}
