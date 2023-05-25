/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-16 15:28:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:18:34
 * @ Description: 路由工具包
 */

import { IRouteItem, IRouteObj } from './route/type'
import { Pages } from './constant'

/** 获取各模块的所有路由 */
export const getPageRoutes = <T = IRouteItem>(
  PagesObj: IRouteObj = Pages,
  basePath = '',
): T[] => {
  const pageRoutes: any = []
  for (const [, value] of Object.entries(PagesObj)) {
    const { path, meta, element, children, redirect } = value
    pageRoutes.push({
      path: `${basePath}${path}`,
      meta,
      element,
      children,
      redirect,
    })
  }
  return pageRoutes
}
