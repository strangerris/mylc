import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import {ArcoResolver} from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({

  base:'/mylc/',
  plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n','pinia',
        // 对于 Typescript 类型的自动引入，则需要用以下方式：
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true
        },
      ],
        eslintrc: {
            enabled: false, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Icons({
          // compiler: 'vue3',
          // autoInstall: true
      }),
      Components({
          dirs: ['src/components/'],
          // 配置需要将哪些后缀类型的文件进行自动按需引入
          extensions: ['vue'],
          resolvers:[
            ArcoResolver(),
            IconsResolver()
          ]
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
