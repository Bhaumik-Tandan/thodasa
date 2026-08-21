import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // served from https://<user>.github.io/thodasa/
  base: '/thodasa/',
  plugins: [react(), tailwindcss()],
  server: { port: 5199 },
})
