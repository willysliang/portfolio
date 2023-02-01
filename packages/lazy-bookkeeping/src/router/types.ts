/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:24:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 17:25:16
 * @ Description: 路由相关的类型规范
 */

import { ReactNode } from "react"

/** 路由子集 */
export interface IRouteItem {
  path: string
  meta: {
    title: string
    needLogin: boolean
  }
  component: ReactNode | React.LazyExoticComponent<() => JSX.Element>
}