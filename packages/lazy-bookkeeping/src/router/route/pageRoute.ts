/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 11:33:30
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:34:04
 * @ Description: 页面展现的路由
 */

import { lazy } from 'react'
import { getPersonalChildrenPages, PersonPath } from './personalRoute'
import { IRouteObj } from './type'
import { DemoPages } from './demoRoute'
import { getPageRoutes } from '../router.utils'

/** 路由表集合 */
export const Pages: IRouteObj = {
  HOME: {
    path: '/home',
    meta: {
      title: '首页',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/home')),
  },
  DETAIL: {
    path: '/detail',
    meta: {
      title: '账单详情',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/detail')),
  },
  STATICSTICS: {
    path: '/Statistics',
    meta: {
      title: '统计',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/statistics')),
  },
  RANK: {
    path: '/Rank',
    meta: {
      title: '排行',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/rank')),
  },
  PERSONAL: {
    path: `${PersonPath}`,
    meta: {
      title: '我的',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/personal')),
    children: getPersonalChildrenPages,
  },
  LOGIN: {
    path: '/login',
    meta: {
      title: '登录',
      needLogin: false,
    },
    element: lazy(() => import('@/pages/system/login')),
  },
  DEMO: {
    path: '/demo',
    meta: {
      title: '案例',
      needLogin: false,
    },
    element: lazy(() => import('@/views/index')),
    redirect: `/demo/${DemoPages.INDEX.path}`,
    children: getPageRoutes<any>(DemoPages),
  },
}
