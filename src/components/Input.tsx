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

const sizes: Record<InputSize, { box: string; icon: number; withIcon: string }> = {
  sm: { box: 'h-8 px-3 text-sm', icon: 16, withIcon: 'pl-9' },
  md: { box: 'h-10 px-3 text-base', icon: 20, withIcon: 'pl-10' },
  lg: { box: 'h-12 px-4 text-lg', icon: 24, withIcon: 'pl-12' },
}

export function Input({
  label,
  hint,
  error,
  icon: IconComponent,
  size = 'md',
  id,
  className = '',
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-mensaje`
  const message = error ?? hint

  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-800">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <IconComponent
            size={sizes[size].icon}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'w-full rounded-lg border bg-white text-gray-900 placeholder:text-gray-400',
            'focus:outline-2 focus:outline-offset-0',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
            error
              ? 'border-red-500 focus:outline-red-500'
              : 'border-gray-300 focus:border-rose-500 focus:outline-rose-500',
            sizes[size].box,
            IconComponent ? sizes[size].withIcon : '',
          ].join(' ')}
          {...props}
        />
      </div>
      {message && (
        <p id={messageId} className={['text-sm', error ? 'text-red-600' : 'text-gray-500'].join(' ')}>
          {message}
        </p>
      )}
    </div>
  )
}
