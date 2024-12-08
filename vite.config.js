import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
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
                }
            ]
        }),
        EnvironmentPlugin({
            NODE_ENV: 'production'
        }),
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'src/main.jsx',
            },
            output: {
                entryFileNames: 'assets/mototote-widget.js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        emptyOutDir: true,
    },
    base: '/mototote-selector/',
    resolve: {
        alias: {
            '@': '/src'
        }
    }
});
