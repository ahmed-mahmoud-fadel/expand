import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  base: "/api/v1/engine/",
  build: {
    outDir: "../backend/engine",
    emptyOutDir: true,
  },
})
