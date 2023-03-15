/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 17:00:06
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 18:05:52
 * @ Description: 排行 Rank
 */

import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Divider,
  DotLoading,
  Empty,
  InfiniteScroll,
  PullToRefresh,
} from 'antd-mobile'
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
import Header from '@/components/layout/header'
import RankItem from './components/RankItem'
import { Bill } from '#/global'
import { RankBillDto } from '#/api'
import qs from 'qs'
import dayjs from 'dayjs'
import { rankBill } from '@/api/bill'
import cx from 'classnames'
import s from './styles/index.module.scss'

const statusRecord: Record<PullStatus, string | ReactNode> = {
  pulling: '用力拉',
  canRelease: '松开吧',
  refreshing: (
    <div>
      玩命加载中
      <DotLoading />
    </div>
  ),
  complete: '好啦',
}

const Rank = () => {
  const location = useLocation()
  const search = qs.parse(location.search.slice(1))
  const date = search.date as string
  const type = Number(search.type) as 1 | 2
  const tag_id = search.tag_id as string
  const tag_name = search.tag_name as string

  // 按金额排序 还是按时间排序
  const [orderBy, setOrderBy] = useState<'amount' | 'date'>('amount')
  // 分页
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [list, setList] = useState<Bill[]>([])

  const getData = async () => {
    try {
      const params: RankBillDto = {
        date,
        type,
        orderBy,
        pageInfo: { page, page_size: 10 },
      }
      if (tag_id) {
        params.tag_id = tag_id
      }
      const res = await rankBill(params)
      if (page === 1) {
        setList(res.list)
      } else {
        setList(list.concat(res.list))
      }
      setAmount(res.total_amount)
      setTotalPage(res.total_page)
    } catch {}
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, orderBy])

  /** 下拉刷新 */
  const refresh = async () => {
    if (page !== 1) {
      setPage(1)
    } else {
      getData()
    }
  }

  /** 加载更多 */
  const loadMore = async () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <div className={s.container}>
      <Header title="账单排行" />

      <div className={s.header}>
        <span className={s.top}>
          {dayjs(date).format('MM月')}&nbsp;
          <span style={{ color: '#e89a9a' }}>{tag_name}</span>
          &nbsp;共{Number(type) === 1 ? '支出' : '收入'}
        </span>
        <span className={s.amount}>¥&nbsp;{Number(amount).toFixed(2)}</span>
      </div>
      <div className={s.divider} />
      <div className={s.body}>
        <div
          className={cx({
            [s.filter]: true,
            [s.expense]: type === 1,
            [s.income]: type === 2,
          })}
        >
          <span
            className={cx({ [s.active]: orderBy === 'amount' })}
            onClick={() => setOrderBy('amount')}
          >
            按金额
          </span>
          <span
            className={cx({ [s.active]: orderBy === 'date' })}
            onClick={() => setOrderBy('date')}
          >
            按时间
          </span>
        </div>
        <Divider />
        <div className={s.list}>
          {list.length ? (
            <PullToRefresh
              onRefresh={refresh}
              renderText={(status) => {
                return <div>{statusRecord[status]}</div>
              }}
            >
              {list.map((item) => (
                <RankItem bill={item} refresh={refresh} key={item.id} />
              ))}
              <InfiniteScroll loadMore={loadMore} hasMore={page < totalPage} />
            </PullToRefresh>
          ) : (
            <Empty description="暂无数据" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Rank
