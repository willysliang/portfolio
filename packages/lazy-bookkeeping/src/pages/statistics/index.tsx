/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:29:54
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 14:43:35
 * @ Description: statistics 统计
 */

import React, { useRef, useState } from 'react'
import type { ForwardedRef } from 'react'
import { CalendarOutline } from 'antd-mobile-icons'
import DatePopup, { DatePopupExpose } from '../home/components/DatePopup'
import Makeup from './components/Makeup'
import dayjs from 'dayjs'
import cx from 'classnames'
import s from './styles/index.module.scss'
import DailyCompare from './components/DailyCompare'

const dateFormate = 'YYYY-MM'
const Statistics = () => {
  const datePopupRef = useRef<DatePopupExpose>()

  const [type, setType] = useState<1 | 2>(1) // 1 支出 2 入账
  const [date, setDate] = useState(dayjs().format(dateFormate)) // 日期
  const [total, setTotal] = useState(0)

  // 筛选时间
  const onDateSelect = (date: Date) => {
    setDate(dayjs(date).format(dateFormate))
  }

  return (
    <div className={s.container}>
      {/* 头部 */}
      <div
        className={cx({
          [s.header]: true,
          [s.expense]: type === 1,
          [s.income]: type === 2,
        })}
      >
        <div className={s.top}>
          <div className={s.time} onClick={() => datePopupRef.current?.show()}>
            <span>{dayjs(date).format('YYYY年MM月')}</span>
            <CalendarOutline />
          </div>
          <div className={s.type}>
            <span
              className={cx({ [s.active]: type === 1 })}
              onClick={() => setType(1)}
            >
              支出
            </span>
            <span
              className={cx({ [s.active]: type === 2 })}
              onClick={() => setType(2)}
            >
              入账
            </span>
          </div>
        </div>
        <div className={s.bottom}>
          <span>共{type === 1 ? '支出' : '入账'}</span>
          <span>¥&nbsp;{Number(total).toFixed(2)}</span>
        </div>
      </div>

      {/* 主内容 */}
      <div className={s.body}>
        <Makeup type={type} date={date} setTotal={setTotal} />
        <DailyCompare type={type} date={date} />
      </div>

      <DatePopup
        onSelect={onDateSelect}
        ref={datePopupRef as ForwardedRef<DatePopupExpose>}
      />
    </div>
  )
}

export default Statistics
