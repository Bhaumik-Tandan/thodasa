import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // served from the custom domain thodasa.com (root path)
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5199 },
})
