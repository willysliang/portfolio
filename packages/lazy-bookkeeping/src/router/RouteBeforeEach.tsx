/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:05:37
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-17 18:47:15
 * @ Description: RouteBeforeEach 路由前置守卫
 */

import React, { ReactNode, Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import { whiteList, IRouteItem, Pages } from './constant'

/** 路由拦截 */
export default function RouteBeforeEach(props: {
  route: IRouteItem
  children?: ReactNode
}) {
  // 页面标题
  if (props.route.meta?.title) {
    document.title = props.route.meta.title as string
  }

  const isLogin = Storage.get(USER_TOKEN, null) !== null
  const { pathname } = useLocation()

  if (isLogin && whiteList.includes(pathname)) {
    return <Navigate to={'/'} replace />
  }

  if (props.route.meta?.needLogin && !isLogin) {
    return <Navigate to={Pages.LOGIN.path} replace />
  }

  return <Suspense fallback={<div></div>}>{props?.children || ''}</Suspense>
}
