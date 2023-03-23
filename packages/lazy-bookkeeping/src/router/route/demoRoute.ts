/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 11:20:56
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:21:25
 * @ Description: 案例的路由
 */

import { lazy } from 'react'
import { IRouteObj } from './type'

/** 案例路由集合 */
export const DemoPages: IRouteObj = {
  DEMO: {
    path: '/demo',
    meta: {
      title: '案例',
      needLogin: false,
    },
    element: lazy(() => import('@/views/index')),
  },
}
