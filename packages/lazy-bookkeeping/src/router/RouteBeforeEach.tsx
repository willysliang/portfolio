/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:05:37
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:19:55
 * @ Description: RouteBeforeEach 路由前置守卫
 */

import React, { ReactNode, Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import { whiteList, Pages } from './constant'
import { IRouteItem } from './route/type'

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

  {
    /* React.lazy 动态加载页面或者组件，建议配合 Suspense 使用再进行渲染 */
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {props?.children || ''}
    </Suspense>
  )
}
