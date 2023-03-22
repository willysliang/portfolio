/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 10:34:49
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-21 11:54:56
 * @ Description: 房子列表 HouseList
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd-mobile'
import { HousePages } from '@/router/constant'
import { IHouseListItem } from '#/house'
import cx from 'classnames'
import s from './index.module.scss'

const HouseList = ({ list }: { list: Array<IHouseListItem> }) => {
  const navigate = useNavigate()
  const baseUrl = '/'

  return (
    <div className={s['houses-list']}>
      {list.map((item, index) => (
        <div
          className={s['houses-list-item']}
          key={index}
          onClick={() =>
            navigate(HousePages.HOUSES.path, {
              state: { code: item.houseCode },
            })
          }
        >
          <Image src={baseUrl + item.houseImg} lazy width={106} height={80} />
          <div className={s['right-content']}>
            <div className={s['title']}>{item.title}</div>
            <div className={s['desc']}>{item.desc}</div>
            <div className={s['tags']}>
              {item.tags?.map((tag, index) => (
                <span
                  className={cx({
                    [s['tag_']]: true,
                    [s[['tag_' + index].join(' ')]]: true,
                  })}
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
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
