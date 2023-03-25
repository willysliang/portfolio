/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-24 22:11:35
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 20:32:31
 * @ Description: 房屋详情 Houses
 */

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StarFill, StarOutline } from 'antd-mobile-icons'
import CTitle from '../components/CTitle'
import HousesSwiper from './HouseSwiper'
import HousesInfo from './HousesInfo'
import HouseConfig from '../components/HouseConfig'
import HousesMsg from './HousesMsg'
import { Storage } from '@willy/utils'
import { getHousesDetail } from '@/api/house'
import { IHousesDetail } from '#/house'
import s from '../styles/Houses.module.scss'
import { USER_TOKEN } from '@willy/utils/constant'
import { Dialog } from 'antd-mobile'
import { Pages } from '@/router/constant'

/** 房屋详情 Houses */
const Houses = () => {
  /**
   * 修改导航栏样式
   */
  // 定义父元素 HTMLDivElement
  const [dom, setDom] = useState<HTMLDivElement | null>(null)
  // 动态改变导航栏样式
  const [styleStauts, setStyleStauts] = useState(false)

  /**
   * 获取房屋详情
   */
  const { code } = useParams()
  const [dataInfo, setDataInfo] = useState<IHousesDetail>({
    price: 0,
    roomType: '',
    size: 0,
    oriented: [],
    floor: '一楼',
    room: '普通住宅',
    tags: [],
    supporting: [],
    desc: '',
    userImg: '',
    nickname: '',
    gender: '0',
    authorization: false,
  })
  const getHousesDetailInfo = async () => {
    try {
      const res = await getHousesDetail(code)
      setDataInfo(res)
    } catch {}
  }
  useEffect(() => {
    getHousesDetailInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 底部收藏
   */
  /** 辨别是否已收藏 */
  const [isCollect, setIsCollect] = useState<boolean>(false)
  const navigate = useNavigate()
  /** 添加或者删除收藏操作 */
  const handleCollect = async () => {
    try {
      if (!Storage.get(USER_TOKEN)) {
        Dialog.confirm({
          content: '您还未登录，是否确认去登录？',
          onConfirm: async () => {
            navigate(Pages.LOGIN.path, { state: { type: 'back' } })
          },
        })
        return undefined
      }
      // 判断收藏状态，进行添加或者删除操作
      if (isCollect) {
        // 删除收藏
        // await deleteUserFavorites(code)
        setIsCollect(false)
      } else {
        // 添加收藏
        // await addUserFavorites(code)
        setIsCollect(true)
      }
    } catch {}
  }

  return (
    <div className={s['container']} ref={(dom) => setDom(dom)}>
      {/* 标题 */}
      <CTitle title="房屋详情" styleStauts={styleStauts} />

      <div
        className={s['list-box']}
        onScrollCapture={() =>
          setStyleStauts(dom && dom.scrollTop > 1 ? true : false)
        }
      >
        {/* 轮播图 */}
        <HousesSwiper />

        {/* 房屋信息 */}
        <HousesInfo dataInfo={dataInfo} />

        {/* 房屋配置 */}
        <div className={s['houses-config']}>
          <h3>房屋配置</h3>
          <HouseConfig configItem={dataInfo.supporting} />
        </div>

        {/* 房屋概括 */}
        <HousesMsg dataInfo={dataInfo} />
      </div>

      <div className={s['houses-nav']}>
        <div onClick={handleCollect}>
          {isCollect ? (
            <StarFill color="red" fontSize={20} />
          ) : (
            <StarOutline fontSize={20} />
          )}
          <span>&nbsp;收藏</span>
        </div>
        <div>
          <span>在线咨询</span>
        </div>
        <div>
          <span>电话预约</span>
        </div>
      </div>
    </div>
  )
}

export default Houses
