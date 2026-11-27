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
  outlined: 'border-card-border-width-default border-card-border-neutral bg-card-background-neutral',
  elevated: 'bg-card-background-neutral shadow-card-elevation',
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
      className={['overflow-hidden rounded-card-radius', variants[variant], className].join(' ')}
      {...props}
    >
      <div className="flex flex-col gap-card-gap-sections p-card-padding">
        {(title || description) && (
          <header className="flex flex-col gap-card-gap-header">
            {title && <h3 className="text-card-title text-card-title-text-neutral">{title}</h3>}
            {description && <p className="text-card-description text-card-description-text-neutral-subtle">{description}</p>}
          </header>
        )}
        {children && <div className="text-card-content text-card-content-text-neutral">{children}</div>}
      </div>
      {footer && (
        <footer className="flex items-center justify-end gap-card-footer-gap border-t-card-footer-border-width-default border-card-footer-border-neutral bg-card-footer-background-neutral-subtle px-card-footer-padding-x py-card-footer-padding-y">
          {footer}
        </footer>
      )}
    </div>
  )
}
