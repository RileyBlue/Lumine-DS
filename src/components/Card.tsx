import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'outlined' | 'elevated'

/** La tarjeta no se puede pulsar: lo que solo responde al ratón deja fuera al teclado. */
type PointerEvents = 'onClick' | 'onDoubleClick' | 'onMouseDown' | 'onMouseUp' | 'onPointerDown' | 'onPointerUp'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | PointerEvents> {
  /** Título de la tarjeta. */
  title?: ReactNode
  /** Nivel del encabezado del título, para que los encabezados de la pantalla vayan en orden. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
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

// La cabecera y la zona inferior son `div`: un `header` o un `footer` fuera de `main` o `section`
// los anuncia el lector de pantalla como cabecera y pie de toda la página.
export function Card({
  title,
  headingLevel = 3,
  description,
  footer,
  variant = 'outlined',
  className = '',
  children,
  ...props
}: CardProps) {
  const Heading = `h${headingLevel}` as const

  return (
    <div
      className={['overflow-hidden rounded-card-radius', variants[variant], className].join(' ')}
      {...props}
    >
      <div className="flex flex-col gap-card-gap-sections p-card-padding">
        {(title || description) && (
          <div className="flex flex-col gap-card-gap-header">
            {title && <Heading className="text-card-title text-card-title-text-neutral">{title}</Heading>}
            {description && <p className="text-card-description text-card-description-text-neutral-subtle">{description}</p>}
          </div>
        )}
        {children && <div className="text-card-content text-card-content-text-neutral">{children}</div>}
      </div>
      {footer && (
        <div className="flex items-center justify-end gap-card-footer-gap border-t-card-footer-border-width-default border-card-footer-border-neutral bg-card-footer-background-neutral-subtle px-card-footer-padding-x py-card-footer-padding-y">
          {footer}
        </div>
      )}
    </div>
  )
}
