import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent } from 'storybook/test'
import { expectFocusRing, expectRingInside, resetFocus } from '../stories/keyboard'
import { Button, Card } from '@/components'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    title: 'Ballet clásico, nivel 2',
    description: 'Martes y jueves, 17:00',
    children: 'Grupo de 12 alumnas con la maestra Lucía.',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = { args: { variant: 'outlined' } }
export const Elevated: Story = { args: { variant: 'elevated' } }
export const WithFooter: Story = {
  args: {
    footer: (
      <>
        <Button variant="ghost" size="sm">Cancelar</Button>
        <Button size="sm">Ver grupo</Button>
      </>
    ),
  },
}
export const HeadingLevel: Story = { args: { headingLevel: 2 } }
export const OnlyContent: Story = { args: { title: undefined, description: undefined } }

/** Recorre los botones de dentro de la tarjeta. El resultado se ve en el panel Interactions. */
export const Keyboard: Story = {
  args: {
    children: <Button variant="outline" fullWidth>Ver horario</Button>,
    footer: (
      <>
        <Button variant="ghost" size="sm">Cancelar</Button>
        <Button size="sm">Ver grupo</Button>
      </>
    ),
  },
  play: async ({ canvas }) => {
    const card = canvas.getByRole('heading').closest('.overflow-hidden')!
    resetFocus()
    // Primero el contenido y después la zona inferior, como se leen.
    for (const name of ['Ver horario', 'Cancelar', 'Ver grupo']) {
      const button = canvas.getByRole('button', { name })
      await userEvent.tab()
      await expectFocusRing(button, 'button')
      await expectRingInside(button, card, 'button')
    }
  },
}
