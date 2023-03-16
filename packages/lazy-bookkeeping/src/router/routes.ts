/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 13:59:56
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 15:29:04
 * @ Description: 路由表
 */

import { Pages, DemoPages } from './constant'
import { getPageRoutes } from './router.utils'

const routes = [
  {
    ...Pages.HOME,
    path: '/',
  },
  ...getPageRoutes(),
  /** 插入 demo路由 */
  {
    path: DemoPages.DEMO.path,
    meta: DemoPages.DEMO.meta,
    component: DemoPages.DEMO.component,
  },
]

export default routes
