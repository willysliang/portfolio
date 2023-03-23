/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-16 15:23:46
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 16:00:55
 * @ Description: 我的收藏 favorites
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import HouseList from '@/components/house/HouseList'
import { IHouseListItem } from '#/house'
import { getFavoritesList } from '@/api/house'
import s from '../styles/Favorites.module.scss'

const Favorites = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<IHouseListItem[]>([])

  useEffect(() => {
    (async () => {
      try {
        const res = await getFavoritesList()
        setList(res)
      } catch {}
    })()
  }, [])

  return (
    <div className={s.container}>
      <NavBar onBack={() => navigate(-1)}>我的收藏</NavBar>
      <div className={s['list-box']}>
        <HouseList list={list} />
      </div>
    </div>
  )
}

export default Favorites
