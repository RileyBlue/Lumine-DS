import { useEffect, useId, useRef, type DialogHTMLAttributes, type ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'
import { Button } from '@/components/Button'

export interface DialogProps
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'onClose' | 'title' | 'children'> {
  /** Si la ventana está abierta. */
  open: boolean
  /** Avisa de que la ventana se cerró. Quien la usa pone `open` en falso. */
  onClose: () => void
  /** Título visible y nombre de la ventana. */
  title: string
  children: ReactNode
  /** Zona de abajo, para los botones. */
  footer?: ReactNode
}

export function Dialog({ open, onClose, title, children, footer, className = '', ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  // Se abre con `showModal()`, no con el atributo `open`: así el navegador lleva el foco dentro,
  // deja inactivo lo de detrás, cierra con Esc y devuelve el foco al cerrar.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      {...props}
      ref={ref}
      aria-labelledby={titleId}
      onClose={(event) => {
        // React también hace llegar aquí el cierre de una ventana que esté dentro de esta.
        if (event.target === event.currentTarget) onClose()
      }}
      // Sin clases de `display`: taparían la regla del navegador que oculta la ventana cerrada.
      className={[
        'm-auto w-11/12 max-w-md rounded-dialog-radius bg-dialog-background-neutral shadow-dialog-elevation',
        'backdrop:bg-dialog-backdrop-background-neutral-overlay',
        className,
      ].join(' ')}
    >
      <div className="flex flex-col gap-dialog-gap-sections p-dialog-padding">
        <div className="flex items-start justify-between gap-dialog-gap-header">
          <h2 id={titleId} className="text-dialog-title text-dialog-title-text-neutral">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            iconStart={IconX}
            aria-label="Cerrar"
            onClick={() => ref.current?.close()}
          />
        </div>
        <div className="text-dialog-content text-dialog-content-text-neutral">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-dialog-footer-gap">{footer}</div>}
      </div>
    </dialog>
  )
}
