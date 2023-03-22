/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 11:00:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 11:06:44
 * @ Description: IconPark 图标
 */

import React from 'react'
import { Icon } from '@icon-park/react/lib/runtime'

interface IIconPark {
  icon: Icon // icon-park 图标
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color' // 图标风格：线性、填充、双色、多色
  size?: number | string // 图标大小
  spin?: boolean
  fill?: string | string[] // 图标填充的颜色
  strokeLinecap?: 'butt' | 'round' | 'square' // 端点类型
  strokeLinejoin?: 'miter' | 'round' | 'bevel' // 拐点类型
  strokeWidth?: number // 线段粗细
}

const IconPark = ({ icon: Icon, ...props }: IIconPark) => {
  return <Icon {...props} />
}

export default IconPark
