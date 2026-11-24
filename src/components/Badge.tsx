import type { Icon } from '@tabler/icons-react'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  /** Icono de Tabler junto al texto. */
  icon?: Icon
  children?: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-gray-100 text-gray-700',
  brand: 'bg-rose-100 text-rose-800',
  info: 'bg-sky-100 text-sky-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
}

const sizes: Record<BadgeSize, { box: string; icon: number }> = {
  sm: { box: 'gap-1 px-2 py-0.5 text-xs', icon: 12 },
  md: { box: 'gap-1.5 px-2.5 py-1 text-sm', icon: 16 },
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
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size].box,
        className,
      ].join(' ')}
      {...props}
    >
      {IconComponent && <IconComponent size={sizes[size].icon} aria-hidden="true" />}
      {children}
    </span>
  )
}
