/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 15:22:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 15:24:55
 * @ Description: 宫格模块
 */

import React, { FC, SVGProps } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Grid } from 'antd-mobile'
import { AntOutline, MovieOutline, TravelOutline } from 'antd-mobile-icons'
import { getPersonalPages, Pages } from '@/router/constant'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import s from '../styles/index.module.scss'

/** 宫格模块 */
const CGrid = (): JSX.Element => {
  /** 宫格表 */
  interface IGridItem {
    label: string
    icons: FC<SVGProps<SVGSVGElement>>
    path: string
  }
  const gridData: IGridItem[] = [
    ...getPersonalPages.map((item) => ({
      label: item.meta.title,
      icons: item.meta?.icons || AntOutline,
      path: item.path,
    })),
    { label: '看房记录', icons: MovieOutline, path: '' },
    { label: '成为房主', icons: TravelOutline, path: '' },
  ]

  const navigate = useNavigate()
  const handlerGrid = (val) => {
    if (!Storage.get(USER_TOKEN)) {
      Dialog.confirm({
        content: '您还未登录，是否确认去登录？',
        onConfirm: async () => {
          navigate(Pages.LOGIN.path, { state: { type: 'back' } })
        },
      })
      return
    } else navigate(val)
  }

  return (
    <Grid columns={4} gap={20} className={s['grid']}>
      {gridData.map((item, index) => (
        <Grid.Item
          key={index}
          className={s['grid-item']}
          onClick={() => handlerGrid(item.path)}
        >
          <item.icons color="#76c6b8" style={{ fontSize: 32 }} />
          <span className={s['grid-item-label']}>{item.label}</span>
        </Grid.Item>
      ))}
    </Grid>
  )
}

export default CGrid
