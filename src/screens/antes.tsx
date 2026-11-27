import { IconMessageCircle, IconSend } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Badge, Button, Input } from '../components'

type Message = { id: number; role: 'user' | 'assistant'; text: string }

const suggestions = [
  '¿Qué clases tengo hoy?',
  '¿Qué alumnas tienen pagos pendientes?',
  'Resume la asistencia de esta semana',
]

export default function Antes() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  function send(text: string) {
    const clean = text.trim()
    if (!clean) return
    setMessages((current) => [
      ...current,
      { id: current.length, role: 'user', text: clean },
      {
        id: current.length + 1,
        role: 'assistant',
        text: 'Esta es una respuesta de ejemplo. Todavía no hay un asistente conectado.',
      },
    ])
    setDraft('')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    send(draft)
  }

  return (
    <section className="mx-auto flex h-full max-w-3xl flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <IconMessageCircle size={48} stroke={1.25} className="text-gray-400" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold">Aún no hay mensajes</h2>
              <p className="mt-1 text-gray-500">Escribe abajo o prueba con una de estas preguntas.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <Button key={suggestion} variant="outline" size="sm" onClick={() => send(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ol className="flex flex-col gap-4">
            {messages.map((message) => (
              <li
                key={message.id}
                className={['flex flex-col gap-1', message.role === 'user' ? 'items-end' : 'items-start'].join(' ')}
              >
                <Badge size="sm" variant={message.role === 'user' ? 'brand' : 'neutral'}>
                  {message.role === 'user' ? 'Tú' : 'Asistente'}
                </Badge>
                <p
                  className={[
                    'max-w-[85%] rounded-2xl px-4 py-2',
                    message.role === 'user' ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-900',
                  ].join(' ')}
                >
                  {message.text}
                </p>
              </li>
            ))}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-gray-200 p-4">
        <Input
          className="flex-1"
          aria-label="Mensaje"
          placeholder="Escribe un mensaje"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <Button type="submit" iconOnly iconStart={IconSend} aria-label="Enviar" disabled={!draft.trim()} />
      </form>
    </section>
  )
}
