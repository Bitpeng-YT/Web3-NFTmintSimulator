import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import { nodePolyfills } from '@bangjelkoski/vite-plugin-node-polyfills';

  export default defineConfig({
    plugins: [react(), nodePolyfills()],
    server: {
      port: 5173,
      open: true
    }
  });
