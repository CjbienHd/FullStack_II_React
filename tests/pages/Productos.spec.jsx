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
vi.mock('../../src/assets/Empanadas de Manzana.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/Galletas de Avena con 3 ingredientes - Loli….jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg', () => ({ default: 'mock://img.jpg' }))
vi.mock('../../src/assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg', () => ({ default: 'mock://img.jpg' }))

let Productos
beforeEach(async () => {
  Productos = (await import('../../src/pages/Productos.jsx')).default
})

describe('<Productos />', () => {
  it('renderiza Nav, Main y Footer y pasa props a Main', () => {
    render(<Productos />)

    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()

    const propsJson = within(screen.getByTestId('main')).getByTestId('main-props').textContent
    const props = JSON.parse(propsJson || '{}')

    // ✅ Acepta que showHero no exista; si existe debe ser booleano
    if (Object.prototype.hasOwnProperty.call(props, 'showHero')) {
    expect(typeof props.showHero).toBe('boolean')
    }

    expect(Array.isArray(props.productos)).toBe(true)
    expect(props.productos.length).toBeGreaterThanOrEqual(1)

  })
})
