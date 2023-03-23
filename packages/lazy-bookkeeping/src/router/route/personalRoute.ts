/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 11:23:21
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:30:45
 * @ Description: 个人中心子路由
 */

import { lazy } from 'react'
import {
  AntOutline,
  HandPayCircleOutline,
  StarOutline,
  UserContactOutline,
} from 'antd-mobile-icons'
import { IRouteItem, IRouteObj } from './type'
import { getPageRoutes } from '../router.utils'

/** 个人中心 path */
export const PersonPath = '/personal'

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

/** house 路由表 */
export const HousePages: IRouteObj = {
  HOUSES: {
    path: '/houses',
    meta: {
      title: '房屋详情',
      needLogin: true,
      icons: StarOutline,
    },
    element: lazy(() => import('@/pages/personal/favorites')),
  },
}

/** 获取个人中心可展示的路由 */
export const getPersonalPages: IRouteItem[] = getPageRoutes(
  PersonalPages,
  PersonPath,
)

/** 获取个人中心的所有子路由 */
export const getPersonalChildrenPages: IRouteItem[] = [
  ...getPageRoutes(PersonalPages, PersonPath),
  ...getPageRoutes(HousePages, PersonPath),
]
