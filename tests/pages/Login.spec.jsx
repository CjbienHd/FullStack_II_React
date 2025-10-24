// tests/pages/Login.spec.jsx
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// 🔧 Mock del CSS Module EXACTO que importa la página
vi.mock('../../src/styles/Login.module.css', () => ({ default: new Proxy({}, { get: () => '' }) }))

// 🔧 Mock de useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => mockNavigate }
})

// 🔧 Evita que fallen los imports de imágenes en componentes hijos si llegaran a cargarse
const IMG = (p) => ({ default: 'mock://asset.jpg' })
vi.mock('../../src/assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg', () => IMG())
vi.mock('../../src/assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg', () => IMG())
vi.mock('../../src/assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg', () => IMG())
vi.mock('../../src/assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg', () => IMG())
vi.mock('../../src/assets/Cheesecake Factory Cheesecake.jpg', () => IMG())
vi.mock('../../src/assets/Empanadas de Manzana.jpg', () => IMG())
vi.mock('../../src/assets/Galletas de Avena con 3 ingredientes - Loli….jpg', () => IMG())
vi.mock('../../src/assets/Orange Cake with Zesty Cream Cheese Frosting.jpg', () => IMG())
vi.mock('../../src/assets/Tiramisu Classique _ Recette Originale.jpg', () => IMG())
vi.mock('../../src/assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg', () => IMG())
vi.mock('../../src/assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg', () => IMG())
vi.mock('../../src/assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg', () => IMG())
vi.mock('../../src/assets/torta circular de manjar.jpg', () => IMG())
vi.mock('../../src/assets/torta circular de vainilla.jpg', () => IMG())
vi.mock('../../src/assets/torta cuadrada chocolate.jpg', () => IMG())
vi.mock('../../src/assets/torta cuadrada de frutas.jpg', () => IMG())

// ⚙️ Claves usadas en tu Login.jsx
const LS_USERS_KEY = 'pms_users'
const LS_LOGGED_KEY = 'pms_logged_user'

// ⛳️ Carga diferida del componente para que agarren los mocks
let Login
beforeEach(async () => {
  localStorage.clear()
  mockNavigate.mockReset()
  Login = (await import('../../src/pages/Login.jsx')).default
})

// Helper render
function setup() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Login />
    </MemoryRouter>
  )
}

describe('<Login />', () => {
  it('renderiza formulario, labels, inputs, botón y link a registro', () => {
    setup()
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    // ⛑ evita conflicto con el ícono usando selector: 'input'
    expect(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /regístrate/i })).toHaveAttribute('href', '/registro')
  })

  it('toggle de visibilidad de contraseña: click y teclado', () => {
    setup()
    const passInput = screen.getByLabelText(/^Contraseña$/i, { selector: 'input' })
    const toggle = screen.getByRole('button', { name: /mostrar contraseña|ocultar contraseña/i })

    // estado inicial es password
    expect(passInput).toHaveAttribute('type', 'password')

    // click -> text
    fireEvent.click(toggle)
    expect(passInput).toHaveAttribute('type', 'text')

    // teclado (Enter) -> password
    fireEvent.keyDown(toggle, { key: 'Enter' })
    expect(passInput).toHaveAttribute('type', 'password')
  })

  it('valida campos vacíos y alerta sin navegar ni guardar', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    setup()
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }).closest('form'))
    expect(alertSpy).toHaveBeenCalledWith('Completa correo y contraseña.')
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(localStorage.getItem(LS_LOGGED_KEY)).toBeNull()
    alertSpy.mockRestore()
  })

  it('correo no registrado -> alerta y no navega', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    setup()
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'no@existe.com' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), { target: { value: '12345678' } })
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }).closest('form'))
    expect(alertSpy).toHaveBeenCalledWith('Ese correo no está registrado.')
    expect(mockNavigate).not.toHaveBeenCalled()
    alertSpy.mockRestore()
  })

  it('contraseña incorrecta -> alerta y no navega', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    localStorage.setItem(LS_USERS_KEY, JSON.stringify([{ email: 'test@gmail.com', nombre: 'Test', pass: 'correcta123' }]))
    setup()
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@gmail.com' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), { target: { value: '12345678' } })
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }).closest('form'))
    expect(alertSpy).toHaveBeenCalledWith('Contraseña incorrecta.')
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(localStorage.getItem(LS_LOGGED_KEY)).toBeNull()
    alertSpy.mockRestore()
  })

  it('flujo exitoso: guarda sesión y navega a /home', () => {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify([{ email: 'user@duocuc.cl', nombre: 'User', pass: 'abcd1234' }]))
    setup()
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'user@duocuc.cl' } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i, { selector: 'input' }), { target: { value: 'abcd1234' } })
    fireEvent.submit(screen.getByRole('button', { name: /ingresar/i }).closest('form'))

    const saved = JSON.parse(localStorage.getItem(LS_LOGGED_KEY) || 'null')
    expect(saved).toEqual({ email: 'user@duocuc.cl', nombre: 'User' })
    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true })
  })
})
