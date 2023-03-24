/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-24 18:37:25
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 21:48:58
 * @ Description: 百度地图弹出层
 */

import React, { useEffect, useState } from 'react'
import { NavBar, Popup, SpinLoading } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import HouseList from '../components/HouseList'
import { IHouseListItem } from '#/house'
import { getHousesList } from '@/api/house'
import s from '../styles/MapPopup.module.scss'

interface IProps {
  visible: boolean
  changeVisible?: (val: boolean) => void
}

const MapPopup = ({ visible, changeVisible }: IProps) => {
  /** 房子列表 */
  const [houselist, setHouselist] = useState<IHouseListItem[]>([])
  /** 请求获取房屋列表 */
  const getHouses = async (params = {}) => {
    setHouselist([])
    try {
      const res = await getHousesList(params)
      // 模拟请求耗时过程
      setTimeout(() => {
        setHouselist(res)
      }, 1000)
    } catch {}
  }
  useEffect(() => {
    if (visible) getHouses()
  }, [visible])

  return (
    <Popup
      mask={false}
      visible={visible}
      position="right"
      bodyStyle={{ minHeight: '50vh', opacity: '.9', width: '50vw' }}
    >
      <div className={s['container']}>
        <NavBar
          backArrow={
            <CloseOutline
              onClick={() => {
                changeVisible && changeVisible(false)
              }}
              style={{ fontSize: 20 }}
            />
          }
          right={<span>更多房源</span>}
        >
          房屋列表
        </NavBar>

        <div className={s['list-box']}>
          {houselist.length > 0 ? (
            <HouseList list={houselist} />
          ) : (
            <>
              <SpinLoading color="primary" />
              <span style={{ color: '#1677ff', marginTop: '1rem' }}>
                数据加载中...
              </span>
            </>
          )}
        </div>
      </div>
    </Popup>
  )
}

export default MapPopup
