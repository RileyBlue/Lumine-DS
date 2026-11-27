import type { Icon } from '@tabler/icons-react'
import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Texto que se muestra encima del campo. */
  label?: string
  /** Ayuda que se muestra debajo del campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca en rojo y reemplaza la ayuda. */
  error?: string
  /** Icono de Tabler dentro del campo, a la izquierda. */
  icon?: Icon
  size?: InputSize
}

// Las alturas usan la escala de Tailwind y el tamaño del icono lo fija cada talla (ADR-003).
const sizes: Record<InputSize, { box: string; icon: number; iconPosition: string }> = {
  sm: {
    box: 'h-8 px-input-padding-x-sm text-input-field-sm',
    icon: 16,
    iconPosition: 'left-input-padding-x-sm',
  },
  md: {
    box: 'h-10 px-input-padding-x-md text-input-field-md',
    icon: 20,
    iconPosition: 'left-input-padding-x-md',
  },
  lg: {
    box: 'h-12 px-input-padding-x-lg text-input-field-lg',
    icon: 24,
    iconPosition: 'left-input-padding-x-lg',
  },
}

export function Input({
  label,
  hint,
  error,
  icon: IconComponent,
  size = 'md',
  id,
  className = '',
  style,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-mensaje`
  const message = error ?? hint
  // Con icono, el texto empieza después del relleno, el icono y la separación entre ambos.
  const iconIndent = IconComponent
    ? {
        paddingLeft: `calc(var(--component-input-padding-x-${size}) + ${sizes[size].icon}px + var(--component-input-gap-icon))`,
      }
    : undefined

  return (
    <div className={['flex flex-col gap-input-gap-stack', className].join(' ')}>
      {label && (
        <label htmlFor={inputId} className="text-input-label text-input-label-text-neutral">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <IconComponent
            size={sizes[size].icon}
            aria-hidden="true"
            className={[
              'pointer-events-none absolute top-1/2 -translate-y-1/2',
              sizes[size].iconPosition,
              props.disabled ? 'text-input-icon-neutral-disabled' : 'text-input-icon-neutral-subtle',
            ].join(' ')}
          />
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'w-full rounded-input-radius border-input-border-width-default bg-input-background-neutral',
            'text-input-field-text-neutral placeholder:text-input-placeholder-text-neutral-subtle',
            'focus:outline-input-border-width-focus focus:outline-offset-input-focus-offset focus:outline-input-border-focus',
            'disabled:cursor-not-allowed disabled:bg-input-background-neutral-disabled disabled:text-input-field-text-neutral-disabled',
            error ? 'border-input-border-error' : 'border-input-border-neutral-strong',
            sizes[size].box,
          ].join(' ')}
          style={{ ...iconIndent, ...style }}
          {...props}
        />
      </div>
      {message && (
        <p
          id={messageId}
          className={[
            'text-input-message',
            error ? 'text-input-message-text-error' : 'text-input-message-text-neutral-subtle',
          ].join(' ')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
