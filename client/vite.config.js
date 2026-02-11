import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Built-in Node module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});