/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:26:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 15:30:48
 * @ Description: personal 个人中心
 */
import React from 'react'
import CUserInfo from './components/CUserInfo'
import CNav from './components/CNav'
import CGrid from './components/CGrid'
import CProjectDesc from './components/CProjectDesc'
import s from './styles/index.module.scss'

/** 个人中心 */
export default function PersonalCenter() {
  return (
    <div className={s.container}>
      <CUserInfo />
      <CNav />
      <CGrid />
      <CProjectDesc />
    </div>
  )
}
