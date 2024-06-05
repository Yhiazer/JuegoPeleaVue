import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/guardarDatos': {
        target: 'http://localhost:3000', // Cambia esto por la URL de tu servidor
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/guardarDatos/, '/guardarDatos'),
      },
      '/menorTiempoDeCombate': 'http://localhost:3000'
    }
  }
})
