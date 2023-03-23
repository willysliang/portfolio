/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 15:17:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 15:21:25
 * @ Description: 菜单模块
 */

import React from 'react'
import { Grid, Image } from 'antd-mobile'
import { Nav1, Nav2, Nav3, Nav4 } from '@/assets'
import s from '../styles/index.module.scss'

const CNav = (): JSX.Element => {
  const navData = [
    { label: '整租', icons: Nav1, path: '' },
    { label: '合租', icons: Nav2, path: '' },
    { label: '地图找房', icons: Nav3, path: '' },
    { label: '去出租', icons: Nav4, path: '' },
  ] as const

  return (
    <Grid columns={4} gap={20} className={s['grid']}>
      {navData.map((item, index) => (
        <Grid.Item key={index} className={s['grid-item']}>
          <Image
            src={item.icons}
            lazy
            width={48}
            height={48}
            style={{ borderRadius: 24 }}
          />
          <span className={s['grid-item-label']}>{item.label}</span>
        </Grid.Item>
      ))}
    </Grid>
  )
}

export default CNav
