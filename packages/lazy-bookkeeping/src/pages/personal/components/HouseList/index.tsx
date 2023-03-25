/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 10:34:49
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 15:53:50
 * @ Description: 房子列表 HouseList
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd-mobile'
import CTags from '../CTags'
import { HousesPath } from '@/router/constant'
import { IHouseListItem } from '#/house'
import { baseImgUrl } from '@willy/utils/constant'
import s from './index.module.scss'

/** 房子列表 */
const HouseList = ({ list }: { list: Array<IHouseListItem> }) => {
  const navigate = useNavigate()

  return (
    <div className={s['houses-list']}>
      {list.map((item, index) => (
        <div
          className={s['houses-list-item']}
          key={index}
          onClick={() => navigate(`${HousesPath}/${item.id}`)}
        >
          <Image
            src={baseImgUrl + item.houseImg}
            lazy
            width={106}
            height={80}
          />
          <div className={s['right-content']}>
            <div className={s['title']}>{item.title}</div>
            <div className={s['desc']}>{item.desc}</div>
            <CTags tags={item.tags} />
            <div className={s['price_']}>
              <span>{item.price}</span> 元/月
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HouseList
