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
            src: 'scrape-cars/output/*',
            dest: 'data/car_data'
          },
          {
            src: 'scrape-motorcycles/motorcycle_data/*',
            dest: 'data/motorcycle_data'
          },
          {
            src: 'src/data/mototote_carrier_metrics.csv',
            dest: 'data'
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
            input: './index.html' // or wherever your test HTML is
          }
        }
      : {
          // Production library build (UMD) for embedding
          outDir: 'dist',
          lib: {
            entry: 'src/main.jsx',
            name: 'MotoToteWidget', // Global name in UMD
            formats: ['umd'],
            fileName: () => 'mototote-widget.js'
          },
          rollupOptions: {
            // If you want everything bundled (including React), leave external empty
            external: []
          },
          cssCodeSplit: false,
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
