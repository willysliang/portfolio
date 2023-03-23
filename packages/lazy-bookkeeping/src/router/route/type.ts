/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 11:15:50
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:16:56
 * @ Description: 类型约束
 */

import { FC, ReactNode, SVGProps } from 'react'

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
