import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: './src/webpage/index.html', // Source index.html
                    dest: '.'          // Destination is the root of the 'public' folder
                },
                {
                    src: 'scrape/output/**/*', // Source all files in 'scrape/output' directory
                    dest: 'data'               // Destination is 'data' in the 'public' folder
                }
            ]
        })
    ],
    build: {
        outDir: 'public', // Set output to 'public'
        lib: {
            entry: 'src/main.jsx',
            name: 'mototote-widget',
            fileName: 'mototote-widget.js',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                assetFileNames: 'assets/[name].[ext]', // Organize assets inside 'assets'
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
            },
        },
        emptyOutDir: true, // Clear the 'public' folder before each build (except copied files)
    },
    base: '/mototote-selector/', // Update with the actual GitHub Pages repository name
});
