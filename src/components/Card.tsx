import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'outlined' | 'elevated'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Título de la tarjeta. */
  title?: ReactNode
  /** Texto de apoyo debajo del título. */
  description?: ReactNode
  /** Zona inferior, normalmente con botones. */
  footer?: ReactNode
  variant?: CardVariant
  children?: ReactNode
}

const variants: Record<CardVariant, string> = {
  outlined: 'border border-gray-200 bg-white',
  elevated: 'bg-white shadow-md',
}

export function Card({
  title,
  description,
  footer,
  variant = 'outlined',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={['overflow-hidden rounded-xl', variants[variant], className].join(' ')}
      {...props}
    >
      <div className="flex flex-col gap-4 p-6">
        {(title || description) && (
          <header className="flex flex-col gap-1">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </header>
        )}
        {children && <div className="text-gray-700">{children}</div>}
      </div>
      {footer && (
        <footer className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3">
          {footer}
        </footer>
      )}
    </div>
  )
}
