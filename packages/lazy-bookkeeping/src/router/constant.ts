/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:06:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 18:07:02
 * @ Description: 路由常量
 */

import { lazy } from 'react'
import { IRouteItem } from './types'

/** 路由表集合 */
export const Pages: Record<string, IRouteItem> = {
  HOME: {
    path: '/home',
    meta: {
      title: '首页',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/home')),
  },
  STATICSTICS: {
    path: '/Statistics',
    meta: {
      title: '统计',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/statistics')),
  },
  PERSONAL: {
    path: '/personal',
    meta: {
      title: '我的',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/personal')),
  },
  LOGIN: {
    path: '/login',
    meta: {
      title: '登录',
      needLogin: false,
    },
    component: lazy(() => import('@/pages/system/login')),
  },
}

/** 路由白名单 */
export const whiteList = [Pages.LOGIN.path]

/** 获取各模块的所有路由 */
export const getPageRoutes = () => {
  const pageRoutes: any = []
  for (const [, value] of Object.entries(Pages)) {
    const { path, meta, component } = value
    pageRoutes.push({
      path,
      meta,
      component,
    })
  }
  return pageRoutes
}
