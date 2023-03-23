/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 11:41:28
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 13:51:05
 * @ Description: 联系咨询模块 Enquire
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Image } from 'antd-mobile'
import { INewsItem } from '#/house'
import { getHouseNews } from '@/api/house'
import { baseImgUrl } from '@willy/utils/constant'
import s from '../styles/Enquire.module.scss'

const Enquire = () => {
  const navigate = useNavigate()

  const [newsList, setList] = useState<INewsItem[]>([])

  /** 获取咨询列表 */
  const getNews = async () => {
    try {
      const res = await getHouseNews({ area: '22' })
      setList(res)
    } catch {}
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <div className={s.container}>
      <NavBar onBack={() => navigate(-1)}>我的收藏</NavBar>
      <div className={s['list-box']}>
        {newsList.map((news) => (
          <div key={news.id} className={s['list-box-item']}>
            <Image
              src={baseImgUrl + news.imgSrc}
              lazy
              width={80}
              height={60}
              style={{ borderRadius: '.5rem', overflow: 'hidden' }}
            />
            <div className={s['list-box-item-right']}>
              <div style={{ fontWeight: '600' }}>{news.title}</div>
              <div className={s['justify-between']}>
                <span>{news.from}</span>
                <span>{news.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Enquire
