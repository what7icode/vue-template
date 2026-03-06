import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // mode可以像 command 一样解构函数参数获得
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' }), IconsResolver({ prefix: 'i' })],
        dts: 'src/components.d.ts',
      }),
      Icons({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: false,
        watchFiles: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 配置代理跨域，解决开发环境下的跨域问题
    server: {
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
