// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,              // ✅ hace globales describe/it/expect
    setupFiles: './tests/setup.js',
    css: true,
  },
})
