// "off" or 0 - 关闭这个规则校验
// "warn" or 1 - 开启这个规则校验，但只是提醒，不会退出
// "error" or 2 - 开启这个规则校验，并退出

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {},
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin的推荐规则
    'plugin:import/typescript', // eslint-plugin-import 抛出导入等支持的规则
    'plugin:react-hooks/recommended', // eslint-plugin-react-hooks 的规则
    'plugin:prettier/recommended', // eslint-plugin-prettier 的推荐规则
  ],
  parser: '@typescript-eslint/parser', // 指定解析器
  parserOptions: {
    ecmaVersion: 6, // 允许解析那个版本的特性
    sourceType: 'module', // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
    },
  },
  settings: {
    react: {
      version: 'detect', // 告诉eslint-plugin-react 自动检测 React的版本
    },
  },
  rules: {
    'eslint-disable-next-line': 0,
    'eslint-disable': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'comma-dangle': ['off', 'always'],
    quotes: 'off',
    semi: 'off',
    'no-tabs': 0,
    'func-call-spacing': 'off', // 函数存在意外空格
    '@typescript-eslint/no-non-null-assertion': 'off', // 可使用断言
  },
}
