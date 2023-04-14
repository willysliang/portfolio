import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'

/** 自定义组件name属性 */
import DefineOptions from 'unplugin-vue-define-options/vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// eslint
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// mockjs
import { viteMockServe } from 'vite-plugin-mock'

// vite 打包压缩 gzip
import viteCompression from 'vite-plugin-compression'

import server from './config/vite/server'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  // cacheDir: './node_modules/.vite', // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite
  build: {
    // es2020 支持 import.meta 语法
    target: 'es2020',
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      // 打包时把所有的模块都区分开
      /*  manualChunks (id) {
        if (id.includes('node_modules')) {
          return id
            .toString()
            .split('node_modules/.pnpm/')[1]
            .split('/')[0]
            .toString()
        }
      }, */
    },
    outDir: './dist', // 指定输出路径
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    cssCodeSplit: true, // 启用 CSS 代码拆分
    cssTarget: '', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
    sourcemap: false, // 构建后是否生成 source map 文件
    manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件
    ssrManifest: false, // 构建不生成 SSR 的 manifest 文件
    ssr: undefined, // 生成面向 SSR 的构建
    minify: 'esbuild', // 指定使用哪种混淆器
    terserOptions: {}, // 传递给 Terser 的更多 minify 选项
    write: true, // 启用将构建后的文件写入磁盘
    emptyOutDir: true, // 构建时清空该目录
    // brotliSize: true, // 启用 brotli 压缩大小报告
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    watch: null, // 设置为 {} 则会启用 rollup 的监听器
  },
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './types'),
      '@comp': path.resolve(__dirname, './src/components'),
      '@view': path.resolve(__dirname, './src/views'),
      '@type': path.resolve(__dirname, './src/types'),
      '@store': path.resolve(__dirname, './src/store'),
      '@api': path.resolve(__dirname, './src/api/module'),
      '@util': path.resolve(__dirname, './src/utils'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], //  默认：['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']导入时想要忽略的扩展名列表 导入时想要省略的扩展名列表。不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
  },
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    /* eslint取消缓存 */
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
    }),
    /* eslint自动校检 */
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,vue}"',
      },
    }),
    /* 配置 element-plus */
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    /* 配置 mockjs */
    viteMockServe({
      mockPath: './mock',
      localEnabled: true,
      prodEnabled: false, // 实际开发请关闭，会影响打包体积
      // https://github.com/anncwb/vite-plugin-mock/issues/9
      injectCode: `
       import { setupProdMockServer } from './mock/_createProdMockServer';
       setupProdMockServer();
       `,
    }),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/var.scss";',
      },
    },
  },
  server,
})
