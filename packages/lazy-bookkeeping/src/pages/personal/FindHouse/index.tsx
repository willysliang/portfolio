/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 14:02:14
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 17:12:46
 * @ Description: 找房 FindHouse
 */

import React, { useState } from 'react'
import { Input } from 'antd-mobile'
import { Local, Search } from '@icon-park/react'
import IconPark from '@/components/common/IconPark'
import CTitle from '../components/CTitle'
import FindHouseDrop from './FindHouseDrop'
import s from '../styles/FindHouse.module.scss'

const FindHouse = () => {
  const [search, setSearch] = useState('')

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
      <FindHouseDrop />
      <div className={s['list-box']}></div>
    </div>
  )
}

export default FindHouse
