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
                    src: './src/webpage/index.html',
                    dest: '.'
                },
                {
                    src: 'scrape/output/**/*',
                    dest: 'data/car_data'
                },
                {
                    src: 'scrape-motorcycles/motorcycle_data/**/*',
                    dest: 'data/motorcycle_data'
                }
            ]
        }),
        EnvironmentPlugin({
            NODE_ENV: 'production'
        }),
    ],
    build: {
        outDir: 'public',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/mototote-widget.js', // Specify the output filename
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        emptyOutDir: true,
    },
    base: '/mototote-selector/',
});
