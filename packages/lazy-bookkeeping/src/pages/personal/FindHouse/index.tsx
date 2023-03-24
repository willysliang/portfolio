/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 14:02:14
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 10:48:57
 * @ Description: 找房 FindHouse
 */

import React, { useEffect, useState } from 'react'
import { Input } from 'antd-mobile'
import { Local, Search } from '@icon-park/react'
import IconPark from '@/components/common/IconPark'
import CTitle from '../components/CTitle'
import HouseList from '../components/HouseList'
import FindHouseDrop from './FindHouseDrop'
import s from '../styles/FindHouse.module.scss'
import { IHouseListItem } from '#/house'
import { getHousesList } from '@/api/house'

const FindHouse = () => {
  const [search, setSearch] = useState('')

  /** 房子列表 */
  const [houselist, setHouselist] = useState<IHouseListItem[]>([])

  const getHouses = async (isMore = true, params = {}) => {
    try {
      const res = await getHousesList(params)
      setHouselist(isMore ? houselist.concat(res) : res)
    } catch {}
  }
  useEffect(() => {
    getHouses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 筛选查询 */
  const handleSearch = (params) => {
    getHouses(false, params)
  }

  return (
    <div className={s.container}>
      <CTitle title="找房" />
      <div className={s['search']}>
        <IconPark icon={Search} size={20} fill="#ccc" />
        <Input
          value={search}
          onChange={setSearch}
          className={s['search-input']}
        />
        <IconPark icon={Local} size={20} fill="#1677ff" />
      </div>
      <FindHouseDrop onSearch={handleSearch} />
      <div className={s['list-box']}>
        <HouseList list={houselist} />
      </div>
    </div>
  )
}

export default FindHouse
