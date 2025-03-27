// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/github-projects-crm/',
  // base: process.env.NODE_ENV === 'production' ? '/github-projects-crm/' : '/',
  plugins: [react()],
});
