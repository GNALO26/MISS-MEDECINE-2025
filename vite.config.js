import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Optimisation des assets
    assetsInlineLimit: 4096, // 4kb
  },
  // Optimisation des images
  optimizeDeps: {
    include: ['/.jpg', '/.jpeg', '/.png', '/.webp']
  }
})