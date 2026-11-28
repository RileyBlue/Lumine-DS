// Genera docs/figma-map.md: qué propiedad de Figma le toca a cada prop del código.
//   npm run figma-map              escribe el archivo
//   npm run figma-map -- --check   solo comprueba que está al día; no escribe nada
// Lee contracts/ y figma/reglas.json. Falla si una prop no encaja en ninguna regla y no tiene excepción.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => readFileSync(join(root, file), 'utf8')
const json = (file) => JSON.parse(read(file))
const output = 'docs/figma-map.md'

const FIGMA_TYPES = ['VARIANT', 'BOOLEAN', 'TEXT', 'INSTANCE_SWAP']
const { rules, figmaOnly } = json('figma/reglas.json')
const problems = []

for (const rule of rules) {
  for (const property of rule.properties) {
    if (!FIGMA_TYPES.includes(property.type)) problems.push(`Regla ${rule.id}: tipo de Figma desconocido ${property.type}`)
  }
}

const conditions = {
  type: (value, prop) => prop.type === value,
  typePattern: (value, prop) => new RegExp(value).test(prop.type),
  names: (value, prop) => value.includes(prop.name),
  namePattern: (value, prop) => new RegExp(value).test(prop.name),
  inherited: (value, prop) => prop.inherited === value,
  required: (value, prop) => prop.required === value,
  anatomyPart: (value, prop, contract) => contract.anatomy.some((item) => item.part === value),
}

function matches(rule, prop, contract) {
  return rule.match.some((option) =>
    Object.entries(option).every(([condition, value]) => {
      if (!conditions[condition]) throw new Error(`Regla ${rule.id}: condición desconocida ${condition}`)
      return conditions[condition](value, prop, contract)
    }),
  )
}

/** Los valores de un tipo como 'sm' | 'md' o 2 | 3. */
const literals = (type) => type.split('|').map((part) => part.trim().replace(/^'|'$/g, ''))

const code = (text) => `\`${text}\``
const cell = (text) => String(text).replaceAll('|', '\\|')
const list = (values) => (values ? values.map(code).join(', ') : '—')

function propRows(prop, contract) {
  const exception = (contract.exceptions ?? []).find((item) => item.prop === prop.name)
  if (exception) return [[code(prop.name), '—', '—', '—', code('exception'), exception.reason]]
  const rule = rules.find((candidate) => matches(candidate, prop, contract))
  if (!rule) {
    problems.push(`${contract.name}.${prop.name} (${prop.type}) no encaja en ninguna regla y no tiene excepción`)
    return []
  }
  const properties = rule.properties.filter((property) => !(property.onlyIfOptional && prop.required))
  if (!properties.length) return [[code(prop.name), '—', '—', '—', code(rule.id), rule.why]]
  return properties.map((property) => {
    const values =
      property.values === 'fromType' ? literals(prop.type)
      : property.values ?? (property.type === 'BOOLEAN' ? ['false', 'true'] : undefined)
    const name = property.name.replace('{prop}', prop.name)
    return [code(prop.name), code(name), code(property.type), list(values), code(rule.id), rule.why]
  })
}

function figmaOnlyRows(contract) {
  return figmaOnly.flatMap((property) => {
    const declared = contract.states.intrinsic
    const values = property.values.filter((value) => value === 'default' || declared.includes(value))
    if (values.length < 2) return []
    return [['—', code(property.name), code(property.type), list(values), code(property.id), property.why]]
  })
}

function section(contract) {
  for (const { prop } of contract.exceptions ?? []) {
    if (prop && !contract.props.some((item) => item.name === prop)) {
      problems.push(`${contract.name}: hay una excepción para la prop ${prop}, que no existe`)
    }
  }
  const rows = [...contract.props.flatMap((prop) => propRows(prop, contract)), ...figmaOnlyRows(contract)]
  const names = rows.map((row) => row[1]).filter((name) => name !== '—')
  const repeated = names.filter((name, index) => names.indexOf(name) !== index)
  if (repeated.length) problems.push(`${contract.name}: propiedades de Figma repetidas ${repeated.join(', ')}`)
  const table = rows.map((row) => `| ${row.map(cell).join(' | ')} |`).join('\n')
  return `## ${contract.name}

| Prop en el código | Propiedad de Figma | Tipo | Valores | Regla | Por qué |
| --- | --- | --- | --- | --- | --- |
${table}

Capas: ${contract.anatomy.map((item) => code(item.part)).join(', ')}.
`
}

const contracts = readdirSync(join(root, 'contracts'))
  .filter((file) => file.endsWith('.json') && file !== 'contract.schema.json')
  .sort()
  .map((file) => json(`contracts/${file}`))

const document = `<!-- Generado desde contracts/ y figma/reglas.json con \`npm run figma-map\`. No editar a mano. -->

# Props en Figma

Qué propiedad de Figma le toca a cada prop del código, según [\`figma/reglas.json\`](../figma/reglas.json). Las props van en el orden de su contrato; con «—», la prop no pasa a Figma. Las capas son las partes de \`anatomy\`.

${contracts.map(section).join('\n')}`

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}

const args = process.argv.slice(2)
const unknown = args.filter((arg) => arg !== '--check')
if (unknown.length) {
  console.error(`Opción desconocida: ${unknown.join(' ')}. Solo existe --check.`)
  process.exit(1)
}

if (args.includes('--check')) {
  let current = null
  try {
    current = read(output)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (current !== document) {
    console.error(`${output} está desactualizado: ejecuta \`npm run figma-map\`.`)
    process.exit(1)
  }
  console.log('El mapa de Figma está al día.')
} else {
  writeFileSync(join(root, output), document)
  console.log(`Escrito ${output}`)
}
