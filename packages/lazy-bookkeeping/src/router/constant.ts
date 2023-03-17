/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:06:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-17 19:01:14
 * @ Description: 路由常量
 */

import { FC, lazy, ReactNode, SVGProps } from 'react'
import { getPageRoutes } from './router.utils'
import { AntOutline, HandPayCircleOutline, StarOutline, UserContactOutline } from 'antd-mobile-icons'

/** 路由子集 */
export interface IRouteItem {
  path: string
  element: ReactNode | React.LazyExoticComponent<() => JSX.Element> | any
  children?: IRouteItem[]
  redirect?: string
  meta: {
    /** 标题 */
    title: string
    /** 是否需要登录 */
    needLogin?: boolean
    /** 图标 */
    icons?: FC<SVGProps<SVGSVGElement>>
    /** 是否不需要懒加载 */
    unLazy?: boolean
  } & Record<string, unknown>
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
    element: lazy(() => import('@/views/index')),
  },
}

/** personal 子路由表集合 */
export const PersonalPages: IRouteObj = {
  FAVORITES: {
    path: '/favorites',
    meta: {
      title: '我的收藏',
      needLogin: true,
      icons: StarOutline,
    },
    element: lazy(() => import('@/pages/personal/favorites')),
  },
  RENTAL: {
    path: '/rental',
    meta: {
      title: '我的出租',
      needLogin: true,
      icons: AntOutline,
    },
    element: lazy(() => import('@/pages/personal/rental')),
  },
  PUBLISH: {
    path: '/publish',
    meta: {
      title: '发布房源',
      needLogin: true,
      icons: HandPayCircleOutline,
    },
    element: lazy(() => import('@/pages/personal/publish')),
  },
  USER_INFO: {
    path: '/userInfo',
    meta: {
      title: '个人资料',
      needLogin: true,
      icons: UserContactOutline,
    },
    element: lazy(() => import('@/pages/personal/userInfo')),
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
    path: '/personal',
    meta: {
      title: '我的',
      needLogin: true,
    },
    element: lazy(() => import('@/pages/personal')),
    children: getPersonalPages,
  },
  LOGIN: {
    path: '/login',
    meta: {
      title: '登录',
      needLogin: false,
    },
    element: lazy(() => import('@/pages/system/login')),
  },
}

/** 路由白名单 */
export const whiteList = [Pages.LOGIN.path]
