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
                },
                {
                    src: 'help.html',
                    dest: '.'
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
                chunkFileNames: 'assets/[name].js',
                assetFileNames: ({ name }) => {
                    if (name.endsWith('.css')) return 'assets/index.css';
                    return 'assets/[name].[ext]';
                },
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        cssCodeSplit: false,
        emptyOutDir: true,
    },
    base: '/mototote-selector/',
    resolve: {
        alias: {
            '@': '/src'
        }
    }
});
