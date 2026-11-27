// Comprueba el contraste de las parejas que salen de tokens/contrast-pairs.json
// y escribe el resultado en docs/contraste.md.
//   npm run contrast
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listTokens } from './token-classes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (file) => JSON.parse(readFileSync(join(root, file), 'utf8'))
const tokens = new Map(listTokens(readJson('tokens/tokens.json')).map((token) => [token.path.join('.'), token]))
const config = readJson('tokens/contrast-pairs.json')

function fail(message) {
  console.error(`Error en tokens/contrast-pairs.json: ${message}`)
  process.exit(1)
}

/** Los nombres de las reglas son de la capa semantic, sin el prefijo. */
const colorNames = [...tokens.values()]
  .filter((token) => token.path[0] === 'semantic' && token.type === 'color')
  .map((token) => token.path.slice(1).join('.'))

const isAlias = (value) => typeof value === 'string' && value.startsWith('{')

function resolve(name) {
  const token = tokens.get(name)
  if (!token) fail(`no existe el token ${name}`)
  return isAlias(token.value) ? resolve(token.value.slice(1, -1)) : token.value
}

/** Luminancia relativa de WCAG. Los colores fuera de sRGB se recortan. */
function luminance(name) {
  const { colorSpace, components, alpha = 1 } = resolve(`semantic.${name}`)
  if (alpha !== 1) fail(`${name} tiene transparencia: su contraste depende de lo que haya detrás`)
  const clamp = (x) => Math.min(Math.max(x, 0), 1)
  let linear
  if (colorSpace === 'oklch') {
    const [L, C, H] = components
    const a = C * Math.cos((H * Math.PI) / 180)
    const b = C * Math.sin((H * Math.PI) / 180)
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
    linear = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
  } else if (colorSpace === 'srgb') {
    linear = components.map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  } else {
    fail(`${name}: espacio de color sin regla: ${colorSpace}`)
  }
  const [r, g, b] = linear.map(clamp)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(foreground, background) {
  const [high, low] = [luminance(foreground), luminance(background)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

// Cada fondo semántico está en un grupo, y solo en uno.
const groups = Object.fromEntries(Object.entries(config.backgrounds).map(([id, group]) => [id, group.tokens]))
const grouped = Object.values(groups).flat()
for (const name of grouped) {
  if (!colorNames.includes(name) || !name.startsWith('color.background.')) {
    fail(`${name} está en un grupo de fondos y no es un fondo semántico`)
  }
  if (grouped.indexOf(name) !== grouped.lastIndexOf(name)) fail(`${name} está dos veces en los grupos`)
}
const ungrouped = colorNames.filter((name) => name.startsWith('color.background.') && !grouped.includes(name))
if (ungrouped.length) fail(`faltan fondos por agrupar: ${ungrouped.join(', ')}`)

const covered = new Set()
const rules = config.rules.map((rule) => {
  const exceptions = new Map((rule.except ?? []).map(({ token, reason }) => [token, reason]))
  for (const [token, reason] of exceptions) {
    if (!reason?.trim()) fail(`la excepción ${token} de la regla ${rule.id} no tiene motivo`)
  }
  const used = new Set()
  const pairs = rule.pairs.flatMap(({ foreground, inverted, backgrounds }) => {
    if (!groups[backgrounds]) fail(`la regla ${rule.id} usa un grupo que no existe: ${backgrounds}`)
    const matches = colorNames.filter(
      (name) =>
        name.startsWith(`${foreground}.`) &&
        (inverted === undefined || name.split('.').includes('inverted') === inverted),
    )
    if (!matches.length) fail(`la regla ${rule.id} no encuentra ningún token para ${foreground}`)
    return matches.flatMap((name) => {
      covered.add(name)
      if (exceptions.has(name)) used.add(name)
      return groups[backgrounds].map((background) => {
        const ratio = contrast(name, background)
        return { foreground: name, background, ratio, minimum: rule.minimum, passes: ratio >= rule.minimum }
      })
    })
  })
  // Una excepción que no coincide con nada suele ser un nombre mal escrito.
  const unused = [...exceptions.keys()].filter((token) => !used.has(token))
  if (unused.length) fail(`la regla ${rule.id} exceptúa tokens que no revisa: ${unused.join(', ')}`)
  return {
    ...rule,
    results: pairs.filter((pair) => !exceptions.has(pair.foreground)),
    exempt: pairs.filter((pair) => exceptions.has(pair.foreground)),
  }
})
const uncovered = colorNames.filter(
  (name) => /^color\.(text|icon|border)\./.test(name) && !covered.has(name),
)

const all = rules.flatMap((rule) => rule.results)
const failing = all.filter((pair) => !pair.passes)
const exempt = rules.flatMap((rule) => rule.exempt)
const total = all.length + exempt.length

// Se trunca, no se redondea: 4,497 no debe leerse como 4,50.
const show = (ratio) => `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`
const code = (name) => `\`${name}\``
const table = (rows) =>
  [
    '| Delante | Fondo | Contraste | Mínimo | Resultado |',
    '| --- | --- | --- | --- | --- |',
    ...rows.map(
      (pair) =>
        `| ${code(pair.foreground)} | ${code(pair.background)} | ${show(pair.ratio)} | ${pair.minimum}:1 | ${pair.passes ? 'Pasa' : '**No pasa**'} |`,
    ),
  ].join('\n')

/** Una excepción: por qué no se exige y cuánto contraste tiene en cada fondo. */
const exemptSections = rules
  .flatMap((rule) =>
    (rule.except ?? []).map(({ token, reason }) => {
      const rows = rule.exempt.filter((pair) => pair.foreground === token)
      const lines = rows.map((pair) => `| ${code(pair.background)} | ${show(pair.ratio)} |`).join('\n')
      return `### ${token}

${reason}

<details>
<summary>Contraste en sus ${rows.length} parejas</summary>

| Fondo | Contraste |
| --- | --- |
${lines}

</details>
`
    }),
  )
  .join('\n')

/** Qué hay que saber de un token que falla: a qué apunta y quién lo usa. */
function failureSection(name) {
  const target = tokens.get(`semantic.${name}`).value
  const users = [...tokens.values()]
    .filter((token) => token.path[0] === 'component' && token.value === `{semantic.${name}}`)
    .map((token) => code(token.path.join('.')))
  const rows = failing.filter((pair) => pair.foreground === name)
  return `### ${name}

- Apunta a ${code(target.slice(1, -1))}.
- Lo usan: ${users.length ? users.join(', ') : 'ningún token de componente'}.

${table(rows)}
`
}

const summary = rules
  .map((rule) => {
    const bad = rule.results.filter((pair) => !pair.passes).length
    const checked = rule.results.length
    return `| ${rule.description} | ${rule.kind} | ${rule.minimum}:1 | ${checked + rule.exempt.length} | ${checked - bad} | ${bad} | ${rule.exempt.length} |`
  })
  .join('\n')

const report = `<!-- Generado con \`npm run contrast\` desde tokens/tokens.json y tokens/contrast-pairs.json. No editar a mano. -->

# Contraste

${total} parejas: ${all.length - failing.length} pasan, ${failing.length} no pasan y ${exempt.length} están exentas.

| Regla | Tipo | Mínimo | Parejas | Pasan | No pasan | Exentas |
| --- | --- | --- | --- | --- | --- | --- |
${summary}

Los valores se truncan a dos decimales. Los colores fuera de sRGB se recortan antes de calcular.

## Sin regla

${uncovered.length ? uncovered.map((name) => `- ${code(name)}`).join('\n') : 'Todos los textos, iconos y bordes semánticos entran en alguna regla.'}

## Parejas que no pasan

${failing.length ? [...new Set(failing.map((pair) => pair.foreground))].map(failureSection).join('\n') : 'Todas pasan.\n'}
## Exentas

${exemptSections || 'Ninguna.\n'}
## Todas las parejas que se exigen

${rules.map((rule) => `<details>\n<summary>${rule.description} (${rule.results.length})</summary>\n\n${table(rule.results)}\n\n</details>`).join('\n\n')}
`

writeFileSync(join(root, 'docs/contraste.md'), report)
console.log(`${total} parejas: ${all.length - failing.length} pasan, ${failing.length} no pasan, ${exempt.length} exentas.`)
if (uncovered.length) console.log(`Sin regla: ${uncovered.join(', ')}`)
console.log('Escrito docs/contraste.md')
