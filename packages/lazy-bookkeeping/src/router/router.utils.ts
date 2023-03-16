/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-16 15:28:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 16:24:36
 * @ Description: 路由工具包
 */

import { IRouteItem, IRouteObj, Pages } from "./constant"

/** 获取各模块的所有路由 */
export const getPageRoutes = (PagesObj: IRouteObj = Pages): IRouteItem[] => {
  const pageRoutes: any = []
  for (const [, value] of Object.entries(PagesObj)) {
    const { path, meta, component } = value
    pageRoutes.push({
      path,
      meta,
      component,
    })
  }
  return pageRoutes
}
