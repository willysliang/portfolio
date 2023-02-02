/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 14:02:08
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-02 17:48:58
 * @ Description: 首页
 */

import React, { ForwardedRef, useRef, useState } from 'react'
import { Divider } from 'antd-mobile'
import { AppstoreOutline, DownFill } from 'antd-mobile-icons'
import dayjs from 'dayjs'
import { Tag } from '#/api'
import { TagPopupExpose } from './components/TagPopup'
import DatePopup, { DatePopupExpose } from './components/DatePopup'
import s from './styles/index.module.scss'

const dateFormate = 'YYYY-MM'
export default function Home() {
  const tagPopupRef = useRef<TagPopupExpose>()
  const datePopupRef = useRef<DatePopupExpose>()

  /** 总支出 */
  const [expense] = useState(0)
  /** 总收入 */
  const [income] = useState(0)
  // const [oneDayBills, setOneDayBills] = useState<OneDayBills[]>([]) // 账单列表
  // const [totalPage, setTotalPage] = useState(0) // 分页总数

  /** 当前筛选类型 */
  const [currentSelect] = useState<Tag>({ id: 'all' })
  /** 当前筛选时间 */
  const [date, setDate] = useState(dayjs().format(dateFormate))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1) // 分页

  // 筛选时间
  const onDateSelect = (date: Date) => {
    setPage(1)
    setDate(dayjs(date).format(dateFormate))
  }

  return (
    <div className={s['home-pages']}>
      {/* 头部 */}
      <div className={s.header}>
        <div className={s.top} onClick={() => tagPopupRef.current?.show()}>
          <span className={s['tag-name']}>
            {currentSelect.id === 'all' ? '全部类型' : currentSelect.name}
          </span>
          <Divider direction="vertical" />
          <AppstoreOutline />
        </div>

        <div className={s.bottom}>
          <div className={s.left} onClick={() => datePopupRef.current?.show()}>
            <span className={s.time}>
              {dayjs(new Date(date)).format('YYYY年MM月')}
            </span>
            <DownFill fontSize={10} color="#90d4ac" />
          </div>
          <div className={s.right}>
            {currentSelect.id === 'all' ? (
              <>
                <div className={s.expense}>
                  总支出<b> ¥ {Number(expense).toFixed(2)}</b>
                </div>
                <div className={s.income}>
                  总入账<b> ¥ {Number(income).toFixed(2)}</b>
                </div>
              </>
            ) : currentSelect.type === 1 ? (
              <div className={s.expense}>
                {currentSelect.name}总支出:<b> ¥ {expense}</b>
              </div>
            ) : (
              <div className={s.income}>
                {currentSelect.name}总入账:<b> ¥ {income}</b>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 账单列表 */}
      {/* <div className={s.list}>
        {oneDayBills.length ? (
          <PullToRefresh
            onRefresh={refresh}
            renderText={(status) => {
              return <div>{statusRecord[status]}</div>
            }}
          >
            <HomeContext.Provider value={{refresh}}>
              {oneDayBills.map((item, index) => (
                <BillItem oneDayBills={item} key={index} />
              ))}
            </HomeContext.Provider>
            <InfiniteScroll loadMore={loadMore} hasMore={page < totalPage} />
          </PullToRefresh>
        ) : (
          <Empty description='暂无数据' />
        )}
      </div> */}

      <DatePopup
        ref={datePopupRef as ForwardedRef<DatePopupExpose>}
        onSelect={onDateSelect}
      />
    </div>
  )
}
