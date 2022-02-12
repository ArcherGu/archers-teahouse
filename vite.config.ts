import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

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
    ]
})
