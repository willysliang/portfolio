/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-25 00:29:45
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 16:25:47
 * @ Description: 房屋信息模块
 */

import React from 'react'
import CTags from '../components/CTags'
import { IHousesDetail } from '#/house'
import s from '../styles/Houses.module.scss'

/** 房屋信息模块 */
const HousesInfo = React.memo(({ dataInfo }: { dataInfo: IHousesDetail }) => {
  /** 判断是否为空对象 */
  const isEmpty = (obj) =>
    Reflect.ownKeys(obj)?.length < 1 && obj.constructor === Object
  if (isEmpty(dataInfo)) {
    return <></>
  }

  return (
    <div className={s['houses-info']}>
      <CTags tags={dataInfo.tags} />
      <div className={s['among-content']}>
        <div>
          <span className={s['time']}>{dataInfo.price}</span>
          <span>租金</span>
        </div>
        <div>
          <span>{dataInfo.roomType}</span>
          <span>房型</span>
        </div>
        <div>
          <span>{dataInfo.size}</span>
          <span>面积</span>
        </div>
      </div>
      <div className={s['bottom-content']}>
        <div>
          <span>装修：</span>
          <span>精装</span>
        </div>
        <div>
          <span>朝向：</span>
          <span>{dataInfo.oriented[0]}</span>
        </div>
        <div>
          <span>楼层：</span>
          <span>{dataInfo.floor}</span>
        </div>
        <div>
          <span>类型：</span>
          <span>{dataInfo.room}</span>
        </div>
      </div>
    </div>
  )
})

HousesInfo.displayName = 'HousesInfo'

export default HousesInfo
