# Accesibilidad

La accesibilidad engloba muchos criterios; este design system cubre estos cinco: contraste, navegación por teclado, nombre accesible, lectura con lector de pantalla y zona táctil.

La decisión está en el [ADR-005](adr/005-accesibilidad.md). Al final hay una [tabla con lo que no se cubre](#lo-que-no-se-cubre).

## 1. Contraste

El contraste dice cuánto se distingue un color del que tiene detrás. Va de 1:1 (no se distingue) a 21:1 (negro sobre blanco).

- El **texto** necesita al menos **4,5:1**.
- Los **iconos**, los **bordes de los campos** y el **anillo de foco** necesitan al menos **3:1**.

Los controles desactivados quedan fuera de estos mínimos.

**Correcto:** texto `brand.800` sobre blanco (8,77:1), y un campo con borde `border.neutral.strong` sobre blanco (4,84:1). El componente `Input` ya lo usa.

```tsx
<p className="text-body text-text-brand">Clase confirmada</p>
<Input label="Nombre de la alumna" />
```

**Incorrecto:** texto en el rosa `#D08099` del manual de marca sobre blanco (2,90:1), o un campo delimitado con el borde de los divisores, `border.neutral.default` (1,24:1).

```tsx
<input className="border-width-default border-border-neutral" />
```

### Checklist

- [ ] El texto tiene un contraste de al menos 4,5:1 con su fondo.
- [ ] Los iconos y los bordes de los campos tienen al menos 3:1.
- [ ] El anillo de foco tiene al menos 3:1.
- [ ] Lo revisé en todos los estados, incluidos puntero y pulsado.

## 2. Navegación por teclado

Todo lo que se puede hacer con el ratón se puede hacer con el teclado:

| Tecla | Para qué |
| --- | --- |
| Tab y Mayús + Tab | Pasar al siguiente control o volver al anterior |
| Enter | Activar un botón o seguir un enlace |
| Espacio | Activar un botón o marcar una casilla |
| Esc | Cerrar lo que se abrió, como un menú o una ventana |

El orden al pulsar Tab es lógico: el mismo en que se lee la pantalla.

El control que tiene el foco se ve siempre, con un **anillo doble**: uno de color y, por fuera, otro blanco. Entre los dos colores hay al menos **9:1**. Así, sobre cualquier fondo liso, al menos uno de los dos llega a 3:1 ([técnica C40 de WCAG](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)). Cada anillo mide al menos 2px.

`Button` e `Input` ya lo tienen: una separación blanca, el anillo de color (`brand.900`, 10,75:1 con el blanco) y el anillo blanco exterior.

Cada componente tiene en Storybook una historia `Keyboard` que recorre sus partes con Tab y comprueba que el foco se ve. Se ejecuta al abrirla y el resultado aparece en el panel Interactions. `Card` y `Badge` no se pueden pulsar, así que no aceptan eventos de ratón como `onClick`.

**Correcto:** un botón de verdad. Se llega con Tab y se activa con Enter y con Espacio.

```tsx
<Button onClick={inscribir}>Inscribir alumna</Button>
```

**Incorrecto:** un bloque que solo responde al ratón, o un control al que se le quita el foco visible.

```tsx
<div onClick={inscribir}>Inscribir alumna</div>
<button className="focus:outline-none">Inscribir alumna</button>
```

### Checklist

- [ ] Todo se maneja entero con el teclado: Tab, Enter, Espacio y Esc.
- [ ] El orden de Tab sigue el orden de lectura.
- [ ] El foco se ve siempre, con el anillo doble.
- [ ] El foco no queda atrapado: de todo lo que se entra, se puede salir.

## 3. Nombre accesible

Un lector de pantalla lee en voz alta cada control. Para eso, cada componente interactivo necesita un nombre. Puede ser:

- su **texto** visible, como el de un botón;
- su **label**, en un campo;
- un **aria-label**, cuando no hay texto a la vista.

El texto de ejemplo de un campo (`placeholder`) no cuenta: desaparece al escribir.

**Correcto:**

```tsx
<Button>Guardar</Button>
<Button iconOnly icon={IconTrash} aria-label="Eliminar clase" />
<Input label="Buscar alumna" icon={IconSearch} />
```

**Incorrecto:**

```tsx
<button><IconTrash /></button>
<Input placeholder="Buscar alumna" icon={IconSearch} />
```

`Button` obliga a escribir su texto o, si usa `iconOnly`, un `aria-label`. `Input` obliga a escribir `label` o `aria-label`. Sin ellos, el código no compila.

Cada historia de Storybook muestra en el panel **Accessibility** los fallos que detecta una revisión automática (axe), como un control sin nombre o un campo que solo tiene texto de ejemplo. La revisión ocurre al abrir la historia y no juzga si el nombre se entiende: eso se revisa a mano.

### Checklist

- [ ] Cada control tiene un nombre accesible: texto visible, `label` o `aria-label`.
- [ ] El nombre dice qué hace el control («Eliminar clase», no «Icono»).
- [ ] Ningún campo depende solo del `placeholder`.

## 4. Lectura con lector de pantalla

Quien usa un lector de pantalla recorre la página por sus encabezados y escucha lo que hay en ella.

- Los **encabezados van en orden**: `h1`, luego `h2`, luego `h3`, sin saltar niveles. Hay un solo `h1`.
- Cada **icono o imagen con significado** tiene un texto alternativo.
- Los **decorativos se ocultan**, para que no se lean: `aria-hidden="true"` en un icono y `alt=""` en una imagen.

**Correcto:**

```tsx
<h1>Clases</h1>
<h2>Esta semana</h2>
<Card headingLevel={3} title="Ballet clásico, nivel 2" />

<IconAlertTriangle role="img" aria-label="Pago vencido" />
<p><IconCalendar aria-hidden="true" /> Martes, 17:00</p>
<img src={foto} alt="Grupo de nivel 2 en la barra" />
<img src={adorno} alt="" />
```

**Incorrecto:**

```tsx
<h1>Clases</h1>
<h4>Esta semana</h4>

<IconAlertTriangle /> {/* es el único aviso y no dice nada */}
<img src={foto} />
<img src={adorno} alt="imagen" />
```

El título de `Card` es un `h3`. Si la tarjeta va justo debajo del `h1`, usa `headingLevel={2}`.

### Checklist

- [ ] Hay un solo `h1` y los encabezados no saltan niveles.
- [ ] Cada icono o imagen con significado tiene texto alternativo.
- [ ] Los iconos e imágenes decorativos están ocultos.
- [ ] Recorrí la pantalla con un lector de pantalla (en Mac, VoiceOver) y se entiende.

## 5. Zona táctil

Todo lo que se pulsa mide al menos **24 por 24 píxeles**, aunque su icono o su texto sean más pequeños. Así se acierta con el dedo en un móvil y no se pulsa lo de al lado.

**Correcto:** el botón más pequeño del design system mide 32 por 32 píxeles, aunque su icono mide menos.

```tsx
<Button iconOnly size="sm" icon={IconX} aria-label="Cerrar" />
```

**Incorrecto:** un botón del tamaño de su icono, de 16 por 16 píxeles.

```tsx
<button className="size-4" aria-label="Cerrar">
  <IconX size={16} aria-hidden="true" />
</button>
```

### Checklist

- [ ] Los elementos pulsables miden al menos 24 por 24 píxeles.
- [ ] Lo medí en el tamaño más pequeño de cada componente.

## Lo que no se cubre

Estos criterios importan, pero este design system todavía no los comprueba.

| Criterio | Qué es |
| --- | --- |
| No depender solo del color | Que ningún dato se entienda únicamente por su color: un error lleva también texto o icono |
| Texto ampliable al 200 % | Que al doblar el tamaño del texto todo se siga leyendo y usando |
| Pantallas estrechas sin scroll horizontal | Que en un móvil el contenido se reacomode sin tener que desplazarse hacia los lados |
| Movimiento reducido | Que se respete a quien pide a su equipo menos animaciones |
| Tiempo suficiente | Que nada caduque o desaparezca sin dar tiempo a leerlo o terminarlo, o sin poder ampliarlo |
| Subtítulos y transcripciones | Que los videos tengan subtítulos y los audios, su texto escrito |
| Idioma de la página | Que la página declare en qué idioma está, para que el lector de pantalla pronuncie bien |
| Lenguaje sencillo | Que los textos se entiendan con facilidad, sin tecnicismos |
| Sin destellos | Que nada parpadee más de tres veces por segundo, porque puede provocar convulsiones |
| Ayuda con los errores | Que se diga qué campo falló, por qué y cómo corregirlo |
