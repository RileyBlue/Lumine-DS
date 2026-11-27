// Genera los archivos de tokens a partir de tokens/tokens.json.
//   npm run tokens              escribe los archivos
//   npm run tokens -- --check   solo comprueba que están al día; no escribe nada
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { classesByToken, cssVariable, listTokens, themeEntries } from './token-classes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const doc = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))
const tokens = listTokens(doc)
const known = new Set(tokens.map((token) => token.path.join('.')))
const NOTICE = 'Generado desde tokens/tokens.json con `npm run tokens`. No editar a mano.'

function cssValue(value, type, name) {
  if (typeof value === 'string' && value.startsWith('{')) {
    const target = value.slice(1, -1)
    if (!known.has(target)) throw new Error(`${name} apunta a un token que no existe: ${target}`)
    return `var(${cssVariable(target.split('.'))})`
  }
  if (type === 'color') {
    const { colorSpace, components, alpha = 1 } = value
    const opacity = alpha === 1 ? '' : ` / ${alpha}`
    if (colorSpace === 'oklch') return `oklch(${components.join(' ')}${opacity})`
    if (colorSpace === 'srgb') {
      return `rgb(${components.map((part) => Math.round(part * 255)).join(' ')}${opacity})`
    }
    throw new Error(`${name}: espacio de color sin regla: ${colorSpace}`)
  }
  if (type === 'dimension') return `${value.value}${value.unit}`
  if (type === 'fontWeight') return String(value)
  if (type === 'fontFamily') {
    return [value].flat().map((family) => (family.includes(' ') ? `"${family}"` : family)).join(', ')
  }
  if (type === 'shadow') {
    const pieces = [
      ['offsetX', 'dimension'],
      ['offsetY', 'dimension'],
      ['blur', 'dimension'],
      ['spread', 'dimension'],
      ['color', 'color'],
    ]
    return pieces.map(([piece, pieceType]) => cssValue(value[piece], pieceType, name)).join(' ')
  }
  throw new Error(`${name}: tipo sin regla: ${type}`)
}

function assertUnique(names, what) {
  const repeated = names.filter((name, index) => names.indexOf(name) !== index)
  if (repeated.length) throw new Error(`${what} repetidas: ${[...new Set(repeated)].join(', ')}`)
}

function tokensCss() {
  assertUnique(tokens.map((token) => cssVariable(token.path)), 'Variables')
  const lines = tokens.map(
    ({ path, type, value }) => `  ${cssVariable(path)}: ${cssValue(value, type, path.join('.'))};`,
  )
  return `/* ${NOTICE} */\n:root {\n${lines.join('\n')}\n}\n`
}

function themeCss() {
  const entries = themeEntries(doc)
  assertUnique(entries.map((entry) => entry.key), 'Variables del tema')
  // Dos tokens solo pueden compartir clase si son las partes de un mismo estilo de texto.
  const owners = new Map()
  for (const { token, key, classes } of entries) {
    const isTextStyle = key.startsWith('--text-') && token.type !== 'color' && !key.startsWith('--text-color-')
    const owner = isTextStyle ? 'estilo de texto' : token.path.join('.')
    for (const className of classes) {
      if (owners.has(className) && owners.get(className) !== owner) {
        throw new Error(`La clase ${className} sale de dos tokens distintos`)
      }
      owners.set(className, owner)
    }
  }
  const variables = new Set(tokens.map((token) => cssVariable(token.path)))
  const lines = entries.map(({ key, token, value, uses = [] }) => {
    const missing = uses.filter((name) => !variables.has(name))
    if (missing.length) throw new Error(`${key} necesita tokens que no existen: ${missing.join(', ')}`)
    return `  ${key}: ${value ?? `var(${cssVariable(token.path)})`};`
  })
  return `/* ${NOTICE} */\n@theme inline {\n${lines.join('\n')}\n}\n`
}

function tokensDoc() {
  const classes = classesByToken(doc)
  const table = (level, group) => {
    const rows = Object.entries(classes)
      .filter(([name]) => name.startsWith(`${level}.${group}.`))
      .map(([name, list]) => `| \`${name}\` | ${list.map((item) => `\`${item}\``).join(', ')} |`)
    return `### ${group}\n\n| Token | Clase de Tailwind |\n| --- | --- |\n${rows.join('\n')}\n`
  }
  const section = (level) =>
    Object.keys(doc[level])
      .filter((group) => !group.startsWith('$'))
      .map((group) => table(level, group))
      .join('\n')
  return `<!-- ${NOTICE} -->

# Tokens y sus clases

Cada fila dice qué clase de Tailwind usa un token. Los tokens \`primitive\` no tienen clase: los
componentes no los usan directamente.

- El tamaño, el interlineado y el peso de un mismo estilo de texto comparten una clase.
- Las clases de color y espaciado admiten los prefijos de Tailwind (\`hover:\`, \`disabled:\`…).
- Un token de espaciado sirve también con otras utilidades de medida, como \`left-\`.
- Un grosor de borde sirve también para un solo lado, como \`border-t-\`.

## semantic

${section('semantic')}
## component

${section('component')}`
}

const outputs = {
  'src/styles/tokens.css': tokensCss(),
  'src/styles/theme.css': themeCss(),
  'docs/tokens.md': tokensDoc(),
}

const read = (file) => {
  try {
    return readFileSync(join(root, file), 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

const args = process.argv.slice(2)
const unknown = args.filter((arg) => arg !== '--check')
if (unknown.length) {
  console.error(`Opción desconocida: ${unknown.join(' ')}. Solo existe --check.`)
  process.exit(1)
}

if (args.includes('--check')) {
  const stale = Object.keys(outputs).filter((file) => read(file) !== outputs[file])
  if (stale.length) {
    console.error(`Archivos desactualizados:\n${stale.map((file) => `  ${file}`).join('\n')}`)
    console.error('Ejecuta `npm run tokens` y guarda los cambios.')
    process.exit(1)
  }
  console.log('Los archivos generados están al día.')
} else {
  for (const [file, content] of Object.entries(outputs)) {
    mkdirSync(dirname(join(root, file)), { recursive: true })
    writeFileSync(join(root, file), content)
    console.log(`Escrito ${file}`)
  }
}
