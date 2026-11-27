// Comprobaciones compartidas por las historias Keyboard (regla 2 de docs/accesibilidad.md).
import { expect } from 'storybook/test'

type FocusableComponent = 'button' | 'input'

/** Valor que calcula el navegador para un token, aplicándolo a un elemento de prueba. */
function tokenValue(property: 'color' | 'width', variable: string) {
  const probe = document.createElement('div')
  probe.style.position = 'absolute'
  probe.style[property] = `var(${variable})`
  document.body.append(probe)
  const value = getComputedStyle(probe)[property]
  probe.remove()
  return value
}

function ring(component: FocusableComponent) {
  const width = tokenValue('width', `--component-${component}-border-width-focus`)
  const offset = tokenValue('width', `--component-${component}-focus-offset`)
  return {
    color: tokenValue('color', `--component-${component}-border-focus`),
    outer: tokenValue('color', `--component-${component}-border-focus-outer`),
    width,
    offset,
    /** Lo que sobresale el anillo: separación, anillo de color y anillo blanco. */
    spread: parseFloat(offset) + 2 * parseFloat(width),
  }
}

/** El elemento tiene el foco y se ve el anillo doble con los colores y medidas de sus tokens. */
export async function expectFocusRing(element: Element, component: FocusableComponent) {
  await expect(element).toHaveFocus()
  // Si la ventana está en segundo plano, el navegador no pinta el foco y la prueba no vale.
  if (!element.matches(':focus')) {
    throw new Error('La ventana no tiene el foco. Haz clic en la página y vuelve a ejecutar la prueba.')
  }
  const { color, outer, width, offset, spread } = ring(component)
  // El color del anillo tiene una transición: se quita un momento para medir el color final.
  const target = element as HTMLElement
  const previous = target.style.transition
  target.style.transition = 'none'
  // Se copian los valores antes de devolver la transición, porque el estilo calculado cambia con ella.
  const style = getComputedStyle(target)
  const measured = {
    outlineStyle: style.outlineStyle,
    outlineWidth: style.outlineWidth,
    outlineOffset: style.outlineOffset,
    outlineColor: style.outlineColor,
  }
  const shadow = style.boxShadow
  target.style.transition = previous

  await expect(measured).toEqual({
    outlineStyle: 'solid',
    outlineWidth: width,
    outlineOffset: offset,
    outlineColor: color,
  })
  await expect(shadow).toContain(`${outer} 0px 0px 0px ${spread}px`)
}

/** El anillo entero queda dentro del contenedor, así que nada lo recorta. */
export async function expectRingInside(element: Element, container: Element, component: FocusableComponent) {
  const { spread } = ring(component)
  const inner = element.getBoundingClientRect()
  const outer = container.getBoundingClientRect()
  const room = Math.min(
    inner.left - outer.left,
    inner.top - outer.top,
    outer.right - inner.right,
    outer.bottom - inner.bottom,
  )
  await expect(room).toBeGreaterThanOrEqual(spread)
}

/** Deja el foco fuera de la historia, para que el primer Tab vaya a la primera pieza. */
export function resetFocus() {
  window.focus()
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
}
