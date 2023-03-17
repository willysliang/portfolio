/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 13:59:56
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-17 19:03:44
 * @ Description: 路由表
 */

import { Pages, DemoPages, PersonalPages } from './constant'
import { getPageRoutes } from './router.utils'

const routes = [
  {
    ...Pages.HOME,
    path: '/',
  },
  ...getPageRoutes<any>(),
  /** 插入 demo路由 */
  {
    path: DemoPages.DEMO.path,
    meta: DemoPages.DEMO.meta,
    element: DemoPages.DEMO.element,
  },
  ...getPageRoutes<any>(PersonalPages, '/personal'),
]

export default routes
