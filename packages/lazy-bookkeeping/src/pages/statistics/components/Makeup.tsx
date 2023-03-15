/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 14:26:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 15:04:28
 * @ Description: 支出/收入构成图 MakeUp
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, ProgressBar } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { MakeupBillBo } from '#/api'
import s from '../styles/Makeup.module.scss'

interface Props {
  type: 1 | 2 // 1支出 2入账
  date: string // 年月 2023-03
  setTotal: (val: number) => void
}

const Makeup = ({ type, date, setTotal }: Props) => {
  console.log(date, setTotal)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<MakeupBillBo[]>([])

  const navigate = useNavigate()
  const goRank = ({id, name}: {id: string; name: string}) => {
    const url = `/rank?date=${date}&type=${type}&tag_id=${id}&tag_name=${name}`
    navigate(url)
  }

  return (
    <div className={s.container}>
      <div className={s.title}>{type === 1 ? '支出' : '入账'}构成</div>
      <div id='chart' className={s.chart}></div>
      <div className={s.list}>
        {list.map((item) => (
          <div className={s.item} key={item.tag_id}>
            {/* <SvgIcon
              icon={item.tag_icon}
              size={25}
              color={type === 1 ? '#35AA62' : '#EBAA2D'}
            /> */}
            <span className={s.name}>{item.tag_name}</span>
            <ProgressBar
              className={s.progress}
              percent={(item.total / list[0].total) * 100}
              style={{
                '--fill-color': type === 1 ? '#35AA62' : '#EBAA2D',
                '--track-width': '4px',
                '--track-color': '#fff',
              }}
            />
            <span
              className={s.total}
              onClick={() => goRank({id: item.tag_id, name: item.tag_name})}
            >
              ¥
              {Number(item.total) > 10000
                ? `${Number(item.total / 10000).toFixed(2)}万`
                : Number(item.total).toFixed(2)}
              <RightOutline />
            </span>
          </div>
        ))}
      </div>
      <Divider />
    </div>
  )
}

export default Makeup
