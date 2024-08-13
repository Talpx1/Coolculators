import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnheadVite from '@unhead/addons/vite'
import Sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnheadVite(),
        Sitemap({
            dynamicRoutes: [
                '/it',
                '/en',
                '/it/indice-massa-corporea-calcolatore',
                '/en/body-mass-index-calculator'
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
