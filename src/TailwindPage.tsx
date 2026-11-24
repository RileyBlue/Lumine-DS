import {
  IconAlertTriangle,
  IconBell,
  IconCalendar,
  IconCheck,
  IconSearch,
  IconSettings,
  IconUser,
  IconX,
} from '@tabler/icons-react'

const colors = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
  'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'mauve', 'olive',
  'mist', 'taupe',
]
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const spacing = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24,
  28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
]

const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
const textSizes = [
  'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
  '8xl', '9xl',
]

const icons = [
  { name: 'IconAlertTriangle', Icon: IconAlertTriangle },
  { name: 'IconBell', Icon: IconBell },
  { name: 'IconCalendar', Icon: IconCalendar },
  { name: 'IconCheck', Icon: IconCheck },
  { name: 'IconSearch', Icon: IconSearch },
  { name: 'IconSettings', Icon: IconSettings },
  { name: 'IconUser', Icon: IconUser },
  { name: 'IconX', Icon: IconX },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  )
}

export default function TailwindPage() {
  return (
    <div className="mx-auto max-w-6xl p-8 text-gray-900">
      <h1 className="text-4xl font-bold">Tailwind</h1>
      <p className="mb-10 mt-2 text-gray-600">
        Valores por defecto de Tailwind CSS v4. No son los de Lumine-DS.
      </p>

      <Section title="Paleta de color">
        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <span className="w-24 shrink-0" />
            {shades.map((shade) => (
              <span key={shade} className="flex-1 text-center text-xs text-gray-500">
                {shade}
              </span>
            ))}
          </div>
          {colors.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-sm font-medium">{color}</span>
              {shades.map((shade) => (
                <div
                  key={shade}
                  title={`${color}-${shade}`}
                  className="h-10 flex-1 rounded"
                  style={{ backgroundColor: `var(--color-${color}-${shade})` }}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Escala de espaciado">
        <p className="mb-4 text-sm text-gray-600">
          Cada paso equivale a 0,25 rem (4 px) multiplicado por el número.
        </p>
        <div className="space-y-1">
          {spacing.map((n) => (
            <div key={n} className="flex items-center gap-3 text-sm">
              <span className="w-12 shrink-0 text-right font-mono">{n}</span>
              <span className="w-20 shrink-0 text-gray-500">{n * 4} px</span>
              <div
                className="h-4 rounded-sm bg-blue-500"
                style={{ width: `calc(var(--spacing) * ${n})` }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radios">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r} className="text-center text-sm">
              <div
                className="mb-2 size-20 border-2 border-blue-600 bg-blue-100"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <span className="font-mono">rounded-{r}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tamaños de texto">
        <div className="space-y-2">
          {textSizes.map((t) => (
            <div key={t} className="flex items-baseline gap-4">
              <span className="w-20 shrink-0 font-mono text-sm text-gray-500">text-{t}</span>
              <span className="truncate" style={{ fontSize: `var(--text-${t})` }}>
                Clase de ballet
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Iconos de Tabler">
        <div className="flex flex-wrap gap-6">
          {icons.map(({ name, Icon }) => (
            <div key={name} className="flex w-36 flex-col items-center gap-2 text-center">
              <Icon size={32} stroke={1.5} />
              <span className="font-mono text-xs">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
