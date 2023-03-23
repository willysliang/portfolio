/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 12:06:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 11:35:57
 * @ Description: 路由常量
 */

import { DemoPages } from './route/demoRoute'
import { Pages } from './route/pageRoute'
import {
  PersonalPages,
  HousePages,
  PersonPath,
  getPersonalPages,
} from './route/personalRoute'

/** 路由白名单 */
const whiteList = [Pages.LOGIN.path]

export {
  /** 路由白名单 */
  whiteList,
  /** 页面路由 */
  Pages,
  /** 案例路由 */
  DemoPages,
  /** 个人中心路由 */
  PersonalPages,
  PersonPath,
  getPersonalPages,
  /** 房屋路由 */
  HousePages,
}
