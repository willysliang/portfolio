/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 21:15:03
 * @ Description: 项目配置
 */

import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import { viteMockServe } from 'vite-plugin-mock'

// 判断环境
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    react(),
    /* eslint取消缓存 */
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
    }),
    /* eslint自动校检 */
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,jsx,tsx,js}"',
      },
    }),
    // mock配置
    viteMockServe({
      mockPath: '../../mock', // mock目录地址 demo中创建的是mock
      localEnabled: isDev, // 是否在开发环境中启用
      prodEnabled: !isDev, // 是否在生产环境中启用
      supportTs: true, // 是否支持TS
      watchFiles: true, // 监听文件
      // 添加处理生产环境文件
      injectCode: `
          import { setupProdMockServer } from '../../mock/__mockProdServe.ts';
          setupProdMockServer();
        `,
      // 添加到`src/main.jsx`文件中，比较重要的一步，不然在生产环境不生效
      injectFile: path.resolve(process.cwd(), 'src/main.tsx'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '#': path.resolve(__dirname, './src/types'),
    },
  },
  esbuild: {
    jsxInject: "import React from 'react'", // 为每个 tsx jsx 自动引入 React，不用手动引入了
  },
  build: {
    // es2020 支持 import.meta 语法
    target: 'es2020',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 4002, // 类型： number 指定服务器端口;
    open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    host: '0.0.0.0', // IP配置，支持从IP启动
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mock': {
        target: 'http://localhost:4002/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/var.scss";',
      },
    },
  },
})
