/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:04:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:19:35
 * @ Description: 路由
 */

import React, { ReactNode, Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import { whiteList, Pages } from './constant'
import routes from './routes'
import { IRouteItem } from './route/type'

/** 路由拦截 */
function RouteBeforeEach(props: { route: IRouteItem; children?: ReactNode }) {
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

  /* if (props.route.path === '/') {
    return <Navigate to={Pages.DEMO.path} replace />
  } */

  {
    /* React.lazy动态加载页面或者组件，建议配合Suspense使用再进行渲染 */
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* 重定向页面，如果设置了重定向，且当前页面不等于重定向页面，则跳转到重定向页面 */}
      {props.route.redirect && props.route.redirect !== pathname && (
        <Navigate to={props.route.redirect} />
      )}
      {props?.children || ''}
    </Suspense>
  )
}

/** 路由列表数据转换 */
const transformRoutes = (
  routes: (IRouteItem & {
    component?: ReactNode | React.LazyExoticComponent<() => JSX.Element>
  })[],
  isChildren?: boolean,
) => {
  const list: any[] = []
  routes.forEach((routeObj) => {
    const route = { ...routeObj }

    if (route.element) {
      route.component = (
        <RouteBeforeEach route={route}>
          <route.element />
          {isChildren && <Outlet />}
        </RouteBeforeEach>
      )
    }

    if (route.children) {
      route.children = transformRoutes(route.children, true)
    }

    list.push({
      element: route.component,
      children: route.children,
      path: route.path,
    })
  })
  return list
}

export default transformRoutes(routes)
