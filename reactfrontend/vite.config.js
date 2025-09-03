import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ← important
    globals: true,        // allows 'test', 'expect' without import
  },
});
