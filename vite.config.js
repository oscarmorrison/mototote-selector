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
                    dest: 'data'
                }
            ]
        }),
        EnvironmentPlugin({
            NODE_ENV: 'production'
        }),
    ],
    build: {
        outDir: 'public',
        lib: {
            entry: 'src/main.jsx',
            name: 'mototote-widget',
            fileName: 'mototote-widget.js',
        },
        rollupOptions: {
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                assetFileNames: 'assets/[name].[ext]',
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
            },
        },
        emptyOutDir: true,
    },
    base: '/mototote-selector/',
});