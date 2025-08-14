import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development'
  const isWidget = process.env.BUILD_TARGET === 'widget'

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
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
          },
          ...(!isWidget ? [{
            src: 'index.html',
            dest: '.'
          }] : [])
        ]
      }),
      EnvironmentPlugin({
        NODE_ENV: isDev ? 'development' : 'production'
      })
    ],

    build: isDev
      ? {
          outDir: 'dist-dev',
          rollupOptions: {
            input: './dev.html'
          }
        }
      : isWidget
      ? {
          outDir: 'dist',
          lib: {
            entry: 'src/widget-entry.js',
            name: 'MotoToteWidget',
            formats: ['umd'],
            fileName: () => 'widget.js'
          },
          rollupOptions: {
            external: [],
            output: {
              inlineDynamicImports: true
            }
          },
          cssCodeSplit: false,
          emptyOutDir: false
        }
      : {
          outDir: 'dist',
          rollupOptions: {
            input: 'src/demo.html'
          },
          emptyOutDir: false
        },

    base: '/mototote-selector/',

    resolve: {
      alias: {
        '@': '/src'
      }
    },

    server: {
      open: true
    }
  }
})
