/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:04:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-21 10:21:45
 * @ Description: 路由
 */

import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { IRouteItem } from './constant'
import RouteBeforeEach from './RouteBeforeEach'

/** 路由列表数据转换 */
export const transformRoutes = (
  routes: (IRouteItem & {
    component?: ReactNode | React.LazyExoticComponent<() => JSX.Element>
  })[],
) => {
  const list: any[] = []
  routes.forEach((routeObj) => {
    const route = { ...routeObj }

    if (route.redirect) {
      route.component = <Navigate to={route.redirect} replace={true} />
    }

    if (route.element) {
      route.component = (
        <RouteBeforeEach route={route}>
          <route.element />
        </RouteBeforeEach>
      )
    }

    if (route.children) {
      route.children = transformRoutes(route.children)
    }

    list.push({
      element: route.component,
      children: route.children,
      path: route.path,
    })
  })
  return list
}

export default transformRoutes
