/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:05:37
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-13 15:38:03
 * @ Description: RouteBeforeEach 路由前置守卫
 */

import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import { whiteList } from './constant'

/** 路由拦截 */
export default function RouteBeforeEach(props: {
  route: {
    path: string
    component: React.LazyExoticComponent<() => JSX.Element>
    meta: Record<string, unknown>
  }
  children?: ReactNode
}) {
  // 页面标题
  if (props.route.meta?.title) {
    document.title = props.route.meta.title as string
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const isLogin = Storage.get(USER_TOKEN, null) !== null
  const { pathname } = useLocation()

  if (isLogin && whiteList.includes(pathname)) {
    return <Navigate to={'/'} replace />
  }

  if (props.route.meta?.needLogin && !isLogin) {
    return <Navigate to={'/login'} replace />
  }

  return <>{props?.children || ''}</>
}
