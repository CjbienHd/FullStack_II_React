import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'

vi.mock('../../src/components/Nav.jsx', () => ({ default: () => <div data-testid="nav">NAV</div> }))
vi.mock('../../src/components/Main.jsx', () => ({
  default: (props) => (
    <div data-testid="main">
      <div data-testid="main-props">{JSON.stringify(props)}</div>
    </div>
  ),
}))
vi.mock('../../src/components/Footer.jsx', () => ({ default: () => <div data-testid="footer">FOOTER</div> }))

// factories inline para assets (evita TDZ)
vi.mock('../../src/assets/torta cuadrada chocolate.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/torta cuadrada de frutas.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/torta circular de vainilla.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/torta circular de manjar.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/Tiramisu Classique _ Recette Originale.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/Orange Cake with Zesty Cream Cheese Frosting.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/Cheesecake Factory Cheesecake.jpg', () => ({ default: 'mock://img.jpg' }))

let Home
beforeEach(async () => {
  Home = (await import('../../src/pages/Home.jsx')).default
})

describe('<Home />', () => {
  it('renderiza Nav, Main y Footer y pasa props a Main', () => {
    render(<Home />)

    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()

    const propsJson = within(screen.getByTestId('main')).getByTestId('main-props').textContent
    const props = JSON.parse(propsJson || '{}')

    expect(props.showHero).toBe(true)
    expect(Array.isArray(props.productos)).toBe(true)
    expect(props.productos.length).toBe(2)
    expect(Array.isArray(props.productos[0])).toBe(true)
    expect(Array.isArray(props.productos[1])).toBe(true)
  })
})
