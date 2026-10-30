import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/laboratoriobio-github-actions/',
  build: {
    outDir: 'www',
    emptyOutDir: true
  }
});