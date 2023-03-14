/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-14 10:23:21
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 10:30:10
 * @ Description: 头部
 */

import React from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import s from './index.module.scss'

/**
 * 内页公共头部组件
 */
interface Props {
  title?: string
}

export default function Header({ title = '' }: Props) {
  const navigateTo = useNavigate()
  return (
    <div className={s['header-warp']}>
      <NavBar className={s.header} onBack={() => navigateTo(-1)}>
        {title}
      </NavBar>
    </div>
  )
}
