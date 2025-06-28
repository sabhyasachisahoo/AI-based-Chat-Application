import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  define: {
    'process.env': {},        // Fix for "process is not defined"
    global: 'window',         // Fix for some Node libs expecting global
  },
  server:{
    headers: {
      "Cross-Origin-Embedder-Policy":"require-corp",
      "Cross-Origin-Opener-Policy":"same-origin"
    },
    proxy: {
      '/cdn':{
        target: "https://unpkg.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ''),
      }
    }
  }
})
