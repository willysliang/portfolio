// "off" or 0 - 关闭这个规则校验
// "warn" or 1 - 开启这个规则校验，但只是提醒，不会退出
// "error" or 2 - 开启这个规则校验，并退出

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // 'plugin:vue/recommended',
    // 'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  overrides: [],
  plugins: ['vue'],
  globals: {
    document: false,
    navigator: false,
    window: false,
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
    "no-tabs": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
    "vue/no-v-html": "off", // 关闭 v-html 的校验
    'no-extend-native': 'off', // 原型中可添加属性
    'func-call-spacing': 'off', // 函数存在意外空格
    // '@typescript-eslint/no-non-null-assertion': 'off', // 可使用断言
    // '@typescript-eslint/no-var-requires': 'off', // 可使用 require
  },
}
