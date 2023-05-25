/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 13:59:56
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-21 13:25:56
 * @ Description: 路由表
 */

import { Pages, PersonalPages, HousePages } from './constant'
import { getPageRoutes } from './router.utils'

const routes = [
  {
    ...Pages.HOME,
    path: '/',
  },
  ...getPageRoutes<any>(),
  ...getPageRoutes<any>(PersonalPages, '/personal'),
  ...getPageRoutes<any>(HousePages),
]

export default routes
