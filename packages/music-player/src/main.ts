/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-14 12:41:36
 * @ Description: 入口文件
 */

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { setupI18n } from './locales'
import {
  setupAssets,
  setupElementUI,
  setupCustomComponents,
  setupGlobalMethods,
} from '@/config/plugins'
import 'element-plus/dist/index.css'

const app = createApp(App)

function setupPlugins () {
  /** 引入静态资源 */
  setupAssets()

  /** 引入 element UI 组件库 */
  setupElementUI(app)

  /** 挂载全局组件 */
  setupCustomComponents(app)

  /** 注入全局方法 */
  setupGlobalMethods(app)
}

async function setupApp () {
  app.use(store)

  /** 挂载 i18n 语言国际化 */
  await setupI18n(app)

  app.use(router)

  app.mount('#app')
}

setupPlugins()
setupApp()
