/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:19:12
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 16:21:41
 * @ Description: 头部标题 CTitle
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

/** 头部标题 */
const CTitle = ({ title }: { title: string }) => {
  const navigate = useNavigate()

  return (
    <NavBar
      style={{ borderBottom: '1px solid #eee' }}
      onBack={() => navigate(-1)}
    >
      {title}
    </NavBar>
  )
}

export default CTitle
