// tests/setup.js
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers' // ⬅️ cambio clave

// agrega los matchers de jest-dom a Vitest
expect.extend(matchers)

// limpia el DOM entre tests
afterEach(() => {
  cleanup()
})

// mock opcional de matchMedia si tus estilos lo usan
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
