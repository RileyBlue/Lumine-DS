import { useSyncExternalStore } from 'react'
import type { ComponentType } from 'react'
import TailwindPage from './TailwindPage'

type Route = { path: string; label: string; Component: ComponentType }

// Cada archivo de src/screens/ es una pantalla y se añade solo al menú.
// El nombre del archivo es su dirección: src/screens/antes.tsx se abre en #/antes.
const screenModules = import.meta.glob<{ default: ComponentType }>('./screens/*.tsx', {
  eager: true,
})

const screens: Route[] = Object.entries(screenModules)
  .map(([file, module]) => {
    const path = file.replace('./screens/', '').replace('.tsx', '')
    return { path, label: path.charAt(0).toUpperCase() + path.slice(1), Component: module.default }
  })
  .sort((a, b) => a.path.localeCompare(b.path))

const routes: Route[] = [{ path: 'tailwind', label: 'Tailwind', Component: TailwindPage }, ...screens]

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function currentPath() {
  return window.location.hash.replace(/^#\/?/, '') || 'tailwind'
}

export default function App() {
  const path = useSyncExternalStore(subscribe, currentPath)
  const route = routes.find((r) => r.path === path)

  return (
    <div className="flex h-screen flex-col bg-white text-gray-900">
      <header className="flex shrink-0 items-center gap-6 border-b border-gray-200 px-6 py-3">
        <a href="#/tailwind" className="text-lg font-semibold">
          Lumine-DS
        </a>
        <nav aria-label="Pantallas" className="flex gap-1">
          {routes.map((r) => (
            <a
              key={r.path}
              href={`#/${r.path}`}
              aria-current={r.path === path ? 'page' : undefined}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                r.path === path
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-gray-600 hover:bg-gray-100',
              ].join(' ')}
            >
              {r.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="min-h-0 flex-1 overflow-auto">
        {route ? (
          <route.Component />
        ) : (
          <p className="p-8 text-gray-600">
            No existe la pantalla «{path}». Elige una del menú.
          </p>
        )}
      </main>
    </div>
  )
}
