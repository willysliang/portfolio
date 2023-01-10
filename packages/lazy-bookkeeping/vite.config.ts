/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-09 16:50:08
 * @ Description: 项目配置
 */

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
