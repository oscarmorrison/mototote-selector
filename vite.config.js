import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'public', // Output directory set to 'public'
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
                assetFileNames: 'assets/[name].[ext]', // Organize assets inside public/assets
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
            },
        },
        emptyOutDir: false, // Prevents Vite from clearing out the 'public' folder, so existing files like index.html won't be deleted
    },
    base: 'mototote-selector', // Update this to the actual GitHub Pages repository name
});