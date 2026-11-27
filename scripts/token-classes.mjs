// Regla única para nombrar las variables CSS y las clases de Tailwind de cada token.
// La usan scripts/build-tokens.mjs y la página Fundamentos/Semánticos, así que no importa nada de Node.

const TYPE_PROPERTIES = ['font-size', 'line-height', 'font-weight']
const THEME_SUFFIX = { 'font-size': '', 'line-height': '--line-height', 'font-weight': '--font-weight' }
const SPACING_UTILITIES = { padding: 'p', 'padding-x': 'px', 'padding-y': 'py', gap: 'gap' }

/** Recorre el árbol de tokens y devuelve cada uno con su ruta y su tipo. */
export function listTokens(doc) {
  const list = []
  const walk = (node, path, inheritedType) => {
    for (const [name, child] of Object.entries(node)) {
      if (name.startsWith('$')) continue
      const type = child.$type ?? inheritedType
      if (child.$value === undefined) walk(child, [...path, name], type)
      else list.push({ path: [...path, name], type, value: child.$value })
    }
  }
  walk(doc, [], undefined)
  return list
}

export const cssVariable = (path) => `--${path.join('-')}`

const withoutDefault = (parts) => (parts.at(-1) === 'default' ? parts.slice(0, -1) : parts)

/** Variable del tema y clase para un color. `name` ya es el nombre que verá la clase. */
function colorUtility(element, isFocus, name) {
  if (element === 'background') return { key: `--background-color-${name}`, classes: [`bg-${name}`] }
  if (element === 'text' || element === 'icon') {
    return { key: `--text-color-${name}`, classes: [`text-${name}`] }
  }
  if (element === 'border' && isFocus) {
    return { key: `--outline-color-${name}`, classes: [`outline-${name}`] }
  }
  if (element === 'border') return { key: `--border-color-${name}`, classes: [`border-${name}`] }
  return null
}

function semanticUtilities([group, ...rest], type) {
  const last = rest.at(-1)
  if (group === 'color' && type === 'color') {
    const color = colorUtility(rest[0], last === 'focus', withoutDefault(rest).join('-'))
    return color && [color]
  }
  if (group === 'font-family') {
    return [{ key: `--font-family-${last}`, classes: [`font-family-${last}`] }]
  }
  if (group === 'space') {
    return [{ key: `--spacing-space-${last}`, classes: [`p-space-${last}`, `m-space-${last}`, `gap-space-${last}`] }]
  }
  if (group === 'radius') {
    return [{ key: `--radius-radius-${last}`, classes: [`rounded-radius-${last}`] }]
  }
  if (group === 'border-width') {
    const border = { key: `--border-width-width-${last}`, classes: [`border-width-${last}`] }
    if (last !== 'focus') return [border]
    return [border, { key: `--outline-width-width-${last}`, classes: [`outline-width-${last}`] }]
  }
  if (group === 'elevation') {
    return [{ key: `--shadow-elevation-${last}`, classes: [`shadow-elevation-${last}`] }]
  }
  return null
}

function componentUtilities(parts, type) {
  const last = parts.at(-1)
  const name = parts.join('-')
  if (type === 'color') {
    const element = parts.find((part) => ['background', 'text', 'icon', 'border'].includes(part))
    const color = colorUtility(element, last === 'focus', withoutDefault(parts).join('-'))
    return color && [color]
  }
  if (parts.includes('border-width')) {
    if (last === 'focus') return [{ key: `--outline-width-${name}`, classes: [`outline-${name}`] }]
    return [{ key: `--border-width-${name}`, classes: [`border-${name}`] }]
  }
  if (last === 'focus-offset') {
    return [{ key: `--outline-offset-${name}`, classes: [`outline-offset-${name}`] }]
  }
  if (last === 'radius') return [{ key: `--radius-${name}`, classes: [`rounded-${name}`] }]
  if (last === 'elevation') return [{ key: `--shadow-${name}`, classes: [`shadow-${name}`] }]
  const property = parts.findLast((part) => part in SPACING_UTILITIES)
  if (property) {
    return [{ key: `--spacing-${name}`, classes: [`${SPACING_UTILITIES[property]}-${name}`] }]
  }
  return null
}

/**
 * Los tres tokens de un estilo de texto (tamaño, interlineado y peso) forman una sola clase.
 * Un peso sin talla vale para todas las tallas de su parte.
 */
function typographyEntries(tokens) {
  const styles = new Map()
  const shared = []
  for (const token of tokens) {
    const [level, ...rest] = token.path
    const at = rest.findIndex((part) => TYPE_PROPERTIES.includes(part))
    if (at === -1) continue
    const owner = rest.slice(level === 'semantic' ? 1 : 0, at)
    const size = rest[at + 1]
    const item = { token, property: rest[at], owner: owner.join('-'), name: [...owner, ...(size ? [size] : [])].join('-') }
    if (!size && tokens.some((other) => other.path.join('.').startsWith(`${[level, ...rest.slice(0, at)].join('.')}.font-size.`))) {
      shared.push(item)
      continue
    }
    if (!styles.has(item.name)) styles.set(item.name, { owner: item.owner, items: [] })
    styles.get(item.name).items.push(item)
  }
  const entries = []
  for (const [name, style] of styles) {
    const items = [...style.items, ...shared.filter((item) => item.owner === style.owner)]
    for (const { token, property } of items) {
      entries.push({ token, key: `--text-${name}${THEME_SUFFIX[property]}`, classes: [`text-${name}`] })
    }
  }
  return entries
}

/** Una entrada por cada variable del tema: de qué token sale y qué clases crea. */
export function themeEntries(doc) {
  const tokens = listTokens(doc).filter((token) => token.path[0] !== 'primitive')
  const typography = typographyEntries(tokens)
  const typed = new Set(typography.map((entry) => entry.token))
  const others = tokens
    .filter((token) => !typed.has(token))
    .flatMap((token) => {
      const [level, ...rest] = token.path
      const utilities = level === 'semantic' ? semanticUtilities(rest, token.type) : componentUtilities(rest, token.type)
      if (!utilities) throw new Error(`No hay regla para dar una clase a ${token.path.join('.')}`)
      return utilities.map((utility) => ({ token, ...utility }))
    })
  const order = new Map(tokens.map((token, index) => [token, index]))
  return [...others, ...typography].sort((a, b) => order.get(a.token) - order.get(b.token))
}

/** { "semantic.color.text.brand.default": ["text-text-brand"], … } */
export function classesByToken(doc) {
  const result = {}
  for (const { token, classes } of themeEntries(doc)) {
    const name = token.path.join('.')
    result[name] = [...new Set([...(result[name] ?? []), ...classes])]
  }
  return result
}
