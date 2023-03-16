/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:06:20
 * @ Modified by: Your name
 * @ Modified time: 2023-03-16 18:43:22
 * @ Description: 路由常量
 */

import { lazy, ReactNode } from 'react'
import { getPageRoutes } from './router.utils'

/** 路由子集 */
export interface IRouteItem {
  path: string
  meta: {
    title: string
    icons?: ReactNode
    needLogin: boolean
  }
  component: ReactNode | React.LazyExoticComponent<() => JSX.Element>
  children?: IRouteItem[]
}

/** 路由表对象 */
export type IRouteObj = Record<string, IRouteItem>

/** 案例路由集合 */
export const DemoPages: IRouteObj = {
  DEMO: {
    path: '/demo',
    meta: {
      title: '案例',
      needLogin: false,
    },
    component: lazy(() => import('@/views/index')),
  },
}

/** personal 子路由表集合 */
export const PersonalPages: IRouteObj = {
  FAVORITES: {
    path: '/favorites',
    meta: {
      title: '我的收藏',
      needLogin: true,
      icons: <UserContactOutline />,
    },
    component: lazy(() => import('@/pages/personal/favorites')),
  },
  RENTAL: {
    path: '/rental',
    meta: {
      title: '我的出租',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/personal/rental')),
  },
  PUBLISH: {
    path: '/publish',
    meta: {
      title: '发布房源',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/personal/publish')),
  },
  USER_INFO: {
    path: '/userInfo',
    meta: {
      title: '个人资料',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/personal/userInfo')),
  },
}

/** 获取个人的路由 */
export const getPersonalPages: IRouteItem[] = getPageRoutes(PersonalPages).map(
  (item) => ({
    ...item,
    path: `/personal${item.path}`,
  }),
)

/** 路由表集合 */
export const Pages: IRouteObj = {
  HOME: {
    path: '/home',
    meta: {
      title: '首页',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/home')),
  },
  DETAIL: {
    path: '/detail',
    meta: {
      title: '账单详情',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/detail')),
  },
  STATICSTICS: {
    path: '/Statistics',
    meta: {
      title: '统计',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/statistics')),
  },
  RANK: {
    path: '/Rank',
    meta: {
      title: '排行',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/rank')),
  },
  PERSONAL: {
    path: '/personal',
    meta: {
      title: '我的',
      needLogin: true,
    },
    component: lazy(() => import('@/pages/personal')),
    children: getPersonalPages,
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
