import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, "src"),
        },
    },
    plugins: [
        vue(),
        vueJsx(),
        WindiCSS(),
        Components({
            resolvers: [
                IconsResolver(),
            ]
        }),
        Icons({ compiler: 'vue3' }),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: '不上茶屋',
                short_name: '不上茶屋',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-250x250.png',
                        sizes: '250x250',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-300x300.png',
                        sizes: '300x300',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-300x300.png',
                        sizes: '300x300',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                ],
            },
        }),
    ]
})
