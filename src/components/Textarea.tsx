import { useId, type TextareaHTMLAttributes } from 'react'

export type TextareaSize = 'sm' | 'md' | 'lg'

interface TextareaBaseProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  /** Ayuda debajo del campo. */
  hint?: string
  /** El valor del campo no es válido: se marca en rojo. */
  invalid?: boolean
  /** Texto que explica el error. Se muestra, en lugar de la ayuda, cuando `invalid` es verdadero. */
  errorMessage?: string
  size?: TextareaSize
}

// El campo necesita un nombre: `label`, que se ve, o `aria-label` cuando no hay texto a la vista.
export type TextareaProps = TextareaBaseProps &
  (
    | {
        /** Texto que se muestra encima del campo. */
        label: string
      }
    | {
        label?: undefined
        /** Texto que leen los lectores de pantalla, porque el campo no tiene `label`. */
        'aria-label': string
      }
  )

const sizes: Record<TextareaSize, string> = {
  sm: 'px-textarea-padding-x-sm py-textarea-padding-y-sm text-textarea-field-sm',
  md: 'px-textarea-padding-x-md py-textarea-padding-y-md text-textarea-field-md',
  lg: 'px-textarea-padding-x-lg py-textarea-padding-y-lg text-textarea-field-lg',
}

export function Textarea({
  label,
  hint,
  invalid = false,
  errorMessage,
  size = 'md',
  rows = 3,
  id,
  className = '',
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const messageId = `${fieldId}-message`
  const showError = invalid && Boolean(errorMessage)
  const message = showError ? errorMessage : hint

  return (
    <div className={['flex flex-col gap-textarea-gap-stack', className].join(' ')}>
      {label && (
        <label htmlFor={fieldId} className="text-textarea-label text-textarea-label-text-neutral">
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={fieldId}
        rows={rows}
        // Lo que llegue de fuera se suma: nunca borra el error ni la ayuda del componente.
        aria-invalid={invalid ? true : ariaInvalid}
        aria-describedby={[describedBy, message ? messageId : undefined].filter(Boolean).join(' ') || undefined}
        className={[
          'w-full resize-y rounded-textarea-radius border-textarea-border-width-default bg-textarea-background-neutral',
          'text-textarea-field-text-neutral placeholder:text-textarea-placeholder-text-neutral-subtle',
          'focus-visible:outline-textarea-border-width-focus focus-visible:outline-offset-textarea-focus-offset focus-visible:outline-textarea-border-focus focus-visible:ring-textarea-focus-outer focus-visible:ring-textarea-border-focus-outer',
          'disabled:cursor-not-allowed disabled:bg-textarea-background-neutral-disabled disabled:text-textarea-field-text-neutral-disabled',
          invalid ? 'border-textarea-border-error' : 'border-textarea-border-neutral-strong',
          sizes[size],
        ].join(' ')}
      />
      {message && (
        <p
          id={messageId}
          className={[
            'text-textarea-message',
            showError ? 'text-textarea-message-text-error' : 'text-textarea-message-text-neutral-subtle',
          ].join(' ')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
