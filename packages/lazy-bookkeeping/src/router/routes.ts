/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 13:59:56
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 18:10:16
 * @ Description: 路由表
 */

import { Pages, getPageRoutes } from './constant'

const routes = [
  {
    ...Pages.HOME,
    path: '/',
  },
  ...getPageRoutes(),
]

export default routes
