/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 16:19:12
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 22:29:11
 * @ Description: 头部标题 CTitle
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, NavBarProps } from 'antd-mobile'

interface IProps extends NavBarProps {
  title: string
  styleStauts?: boolean
}

const navBarBg1 = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#FFF',
  borderBottom: '1px solid #eee',
}

const navBarBg2 = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  color: '#333',
  borderBottom: '1px solid #eee',
}

/** 头部标题 */
const CTitle = ({ title, ...props }: IProps) => {
  const navigate = useNavigate()

  return (
    <NavBar
      style={props?.styleStauts ? navBarBg1 : navBarBg2}
      onBack={() => navigate(-1)}
      {...props}
    >
      {title}
    </NavBar>
  )
}

export default CTitle
