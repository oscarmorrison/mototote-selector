import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/webpage/index.html',
            dest: '.'
          },
          {
            src: 'src/data/mototote_carrier_metrics.csv',
            dest: '.'
          },
          {
            src: 'src/data/index.json',
            dest: '.'
          },
          {
            src: 'src/data/vehicle_*.json',
            dest: '.'
          },
          {
            src: 'src/data/motorcycle_*.json',
            dest: '.'
          },
          {
            src: 'help.html',
            dest: '.'
          }
        ]
      }),
      EnvironmentPlugin({
        NODE_ENV: isDev ? 'development' : 'production'
      })
    ],

    // If you want to test HMR, run `npm run dev` or `vite dev`.
    // This config automatically chooses dev or production build.
    build: isDev
      ? {
          // Normal dev build (still served via `vite dev`).
          // Usually, Vite's dev server is used, so this might be minimal:
          outDir: 'dist-dev',
          rollupOptions: {
            input: './index.html'
          }
        }
      : {
          // Production build with stable filenames
          outDir: 'dist',
          assetsDir: '',
          cssCodeSplit: false,
          rollupOptions: {
            input: {
              'widget-main': 'src/widget-main.js',
              'mototote-widget': 'src/widget-main.jsx'
            },
            output: {
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',
              assetFileNames: (info) => {
                const n = info.name || '';
                if (/\.(json|csv|css)$/i.test(n)) return n;
                return '[name][extname]';
              }
            }
          },
          emptyOutDir: true
        },

    // If you’re deploying under a specific path, keep `base`
    base: '/mototote-selector/',

    resolve: {
      alias: {
        '@': '/src'
      }
    },

    // Optionally auto-open browser in dev mode
    server: {
      open: true
    }
  }
})
