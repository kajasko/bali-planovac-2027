import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/bali-planovac-2027/',
  plugins: [react(), tailwindcss()],
  server: { port: 5199, host: true },
})
