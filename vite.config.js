import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
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