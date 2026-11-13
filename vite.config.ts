import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static build with relative paths so dist/ can be hosted anywhere (Cloudflare Pages, Netlify, Vercel).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5320, strictPort: true },
  preview: { port: 5321, strictPort: true },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom', 'react-router-dom', 'dexie', 'dexie-react-hooks'] } } },
  },
});
