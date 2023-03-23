/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-16 15:23:46
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 16:01:28
 * @ Description: 我的出租 rental
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import HouseList from '@/components/house/HouseList'
import { IHouseListItem } from '#/house'
import { getHousesList } from '@/api/house'
import { Pages, PersonalPages } from '@/router/constant'
import s from '../styles/Rental.module.scss'

const Rental = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<IHouseListItem[]>([])

  useEffect(() => {
    (async () => {
      try {
        const res = await getHousesList()
        setList(res)
      } catch {}
    })()
  }, [])

  return (
    <div className={s.container}>
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <span
            onClick={() =>
              navigate(Pages.PERSONAL.path + PersonalPages.PUBLISH.path)
            }
          >
            发布房源
          </span>
        }
      >
        我的出租
      </NavBar>
      <div className={s['list-box']}>
        <HouseList list={list} />
      </div>
    </div>
  )
}

export default Rental
