/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:19:12
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 22:02:21
 * @ Description: 头部标题 CTitle
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, NavBarProps } from 'antd-mobile'

interface IProps extends NavBarProps {
  title: string
}

/** 头部标题 */
const CTitle = ({ title, ...props }: IProps) => {
  const navigate = useNavigate()

  return (
    <NavBar
      style={{ borderBottom: '1px solid #eee' }}
      onBack={() => navigate(-1)}
      {...props}
    >
      {title}
    </NavBar>
  )
}

export default CTitle
