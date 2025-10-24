import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../src/styles/Registro.module.css', () => ({ default: new Proxy({}, { get: () => '' }) }))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => mockNavigate }
})

// factories inline para assets (evita TDZ)
vi.mock('../../src/assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Cheesecake Factory Cheesecake.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Empanadas de Manzana.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Galletas de Avena con 3 ingredientes - Loli….jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Orange Cake with Zesty Cream Cheese Frosting.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Tiramisu Classique _ Recette Originale.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/torta circular de manjar.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/torta circular de vainilla.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/torta cuadrada chocolate.jpg', () => ({ default: 'mock://asset.jpg' }))
vi.mock('../../src/assets/torta cuadrada de frutas.jpg', () => ({ default: 'mock://asset.jpg' }))

const LS_KEY = 'pms_users'
let Register

beforeEach(async () => {
  localStorage.clear()
  mockNavigate.mockReset()
  Register = (await import('../../src/pages/Registro.jsx')).default
})

function setup() {
  return render(
    <MemoryRouter initialEntries={['/registro']}>
      <Register />
    </MemoryRouter>
  )
}

describe('<Registro />', () => {
  it('renderiza labels/inputs y botón', () => {
    setup()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^contraseña$/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regístrate/i })).toBeInTheDocument()
  })

  it('valida contraseñas distintas y no guarda', () => {
    setup()
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'nuevo@duoc.cl' } })
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Nuevo' } })
    fireEvent.change(screen.getByLabelText(/^contraseña$/i, { selector: 'input' }), { target: { value: 'abcd1234' } })
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'abcd123X' } })
    fireEvent.submit(screen.getByRole('button', { name: /regístrate/i }).closest('form'))

    const users = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    expect(users.length).toBe(0)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('correo ya registrado -> muestra error y no duplica', () => {
    localStorage.setItem(LS_KEY, JSON.stringify([{ email: 'existe@duoc.cl', nombre: 'Existe', pass: 'abcd1234' }]))
    setup()
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'existe@duoc.cl' } })
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Otra' } })
    fireEvent.change(screen.getByLabelText(/^contraseña$/i, { selector: 'input' }), { target: { value: 'abcd1234' } })
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'abcd1234' } })
    fireEvent.submit(screen.getByRole('button', { name: /regístrate/i }).closest('form'))

    const users = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    expect(users).toHaveLength(1)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('registro exitoso: guarda en localStorage y navega a /login', () => {
  setup()

  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'nuevo@duocuc.cl' } })
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Nuevo' } })
  fireEvent.change(screen.getByLabelText(/^contraseña$/i, { selector: 'input' }), { target: { value: 'abcd1234' } })
  fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'abcd1234' } })

 
  const terms = screen.queryByRole('checkbox')
  if (terms) fireEvent.click(terms)

  fireEvent.submit(screen.getByRole('button', { name: /regístrate/i }).closest('form'))

  const users = JSON.parse(localStorage.getItem('pms_users') || '[]')
  expect(users).toEqual([{ email: 'nuevo@duocuc.cl', nombre: 'Nuevo', pass: 'abcd1234' }])
  expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
})


})
