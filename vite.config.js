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
                    src: 'src/index.html',
                    dest: '.'
                },
                {
                    src: 'data/car_data/**/*',
                    dest: 'data/car_data'
                },
                {
                    src: 'data/motorcycle_data/**/*',
                    dest: 'data/motorcycle_data'
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
                main: 'src/index.html',
            },
            output: {
                entryFileNames: 'assets/[name].js',
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
