import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsConfigPaths()],
    define: {
      // Expose env variables to your application
      'process.env': env
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      // Configure the dev server to handle SPA routing
      proxy: {
        // Redirect all 404s to index.html during development
        '*': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: () => '/index.html',
          bypass: (req) => {
            // Serve static assets directly
            if (req.url && req.url.includes('.')) return req.url;
            return null;
          }
        }
      }
    },
    preview: {
      port: 4173,
      // This is the key part that simulates Vercel's routing behavior
      // It ensures that all routes are redirected to index.html
      // allowing React Router to handle the routing client-side
      strictPort: true,
      headers: {
        'Cache-Control': 'no-store',
      }
    },
  };
});
