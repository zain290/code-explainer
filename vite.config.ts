import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5310,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          code: ['@codemirror/lang-javascript', '@codemirror/lang-python', '@codemirror/lang-html', '@codemirror/lang-css', '@codemirror/lang-json', '@codemirror/lang-markdown'],
        },
      },
    },
  },
})
