import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    // Allow Cloudflare Tunnel hostnames to access the Vite dev server
    // Include the current tunnel hostname and a wildcard for future runs
    allowedHosts: [
      '.trycloudflare.com',
      'vote-how-minimal-pgp.trycloudflare.com',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
});
