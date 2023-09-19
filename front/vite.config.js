import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'/',
  plugins: [react()],
  build: {

    outDir: 'dist',


    minify: true,


    sourcemap: true,


    rollupOptions: {
      input: 'src/main.jsx',
    },
  },
});