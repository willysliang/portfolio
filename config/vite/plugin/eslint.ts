/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-10 17:28:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-10 17:38:40
 * @ Description: eslint 配置
 */
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

export const createEslintPlugin = () => {
  return [
    /* eslint取消缓存 */
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
    }),
    /* eslint自动校检 */
    checker({
      vueTsc: true,
      eslint: {
        lintCommand:
          'eslint "../../../packages/**/src/**/*.{ts,tsx,css,less,scss,js} ../../../packages/**/src/*.{js,ts,tsx,css,less,scss}"',
      },
    }),
  ]
}
