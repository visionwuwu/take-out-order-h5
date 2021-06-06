import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import lessToJS from 'less-vars-to-js'
import fs from 'fs'

/** 定制vant主题 */
const themeVariables = lessToJS(
  fs.readFileSync(resolve(__dirname, './config/vant-variables.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style/less`
        }
      ]
    })
  ],
  base: './',
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: /^src/, replacement: resolve(__dirname, './src') },
      { find: /^views/, replacement: resolve(__dirname, './src/views') },
      { find: /^layouts/, replacement: resolve(__dirname, './src/layouts') },
      { find: /^apis/, replacement: resolve(__dirname, './src/apis') },
      { find: /^assets/, replacement: resolve(__dirname, './src/assets') },
      { find: /^comps/, replacement: resolve(__dirname, './src/components') },
      { find: /^store/, replacement: resolve(__dirname, './src/store') },
      { find: /^router/, replacement: resolve(__dirname, './src/router') },
      { find: /^directives/, replacement: resolve(__dirname, './src/directives') },
      { find: /^utils/, replacement: resolve(__dirname, './src/utils') },
      { find: /^views/, replacement: resolve(__dirname, './src/views') },
      { find: /^styles/, replacement: resolve(__dirname, './src/styles') },
      { find: /^common/, replacement: resolve(__dirname, './src/common') },
      { find: /^plugins/, replacement: resolve(__dirname, './src/plugins') },
      { find: /^layouts/, replacement: resolve(__dirname, './src/layouts') }
    ]
  },
  server: {
    port: 3001,
    open: false,
    // proxy: {
    //   '/api': 'http://123.56.85.24:5000'
    // },
    cors: true
  }
})
