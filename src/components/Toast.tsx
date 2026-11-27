import { useEffect, useState, type HTMLAttributes, type ReactNode } from 'react'
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconX,
  type Icon,
} from '@tabler/icons-react'
import { Button } from './Button'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClose' | 'role'> {
  variant?: ToastVariant
  /** El mensaje. */
  children: Exclude<ReactNode, boolean | null | undefined>
  /** Avisa de que se pulsó «Cerrar». Quien lo usa quita el aviso. */
  onClose: () => void
}

const variants: Record<
  ToastVariant,
  { icon: Icon; name: string; role: 'status' | 'alert'; box: string; iconClass: string }
> = {
  info: {
    icon: IconInfoCircle,
    name: 'Información',
    role: 'status',
    box: 'border-toast-border-info',
    iconClass: 'text-toast-icon-info',
  },
  success: {
    icon: IconCircleCheck,
    name: 'Correcto',
    role: 'status',
    box: 'border-toast-border-success',
    iconClass: 'text-toast-icon-success',
  },
  warning: {
    icon: IconAlertTriangle,
    name: 'Advertencia',
    role: 'status',
    box: 'border-toast-border-warning',
    iconClass: 'text-toast-icon-warning',
  },
  error: {
    icon: IconAlertCircle,
    name: 'Error',
    role: 'alert',
    box: 'border-toast-border-error',
    iconClass: 'text-toast-icon-error',
  },
}

// Toast no tiene tallas: el icono mide lo mismo que en la talla `md` (issue #52).
const iconSize = 20

// Un lector de pantalla suele callar si la zona que se anuncia aparece ya con su texto.
const announceDelay = 100

export function Toast({ variant = 'info', children, onClose, className = '', ...props }: ToastProps) {
  const { icon: VariantIcon, name, role, box, iconClass } = variants[variant]
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), announceDelay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      {...props}
      className={[
        'flex items-start gap-toast-gap-icon rounded-toast-radius border-toast-border-width-default bg-toast-background-neutral p-toast-padding shadow-toast-elevation',
        box,
        className,
      ].join(' ')}
    >
      <div role={role} className="flex min-h-8 flex-1 items-center gap-toast-gap-icon">
        {ready && (
          <>
            <VariantIcon size={iconSize} role="img" aria-label={name} className={`shrink-0 ${iconClass}`} />
            <div className="text-toast text-toast-text-neutral">{children}</div>
          </>
        )}
      </div>
      <Button variant="ghost" size="sm" iconOnly iconStart={IconX} aria-label="Cerrar" onClick={onClose} />
    </div>
  )
}
