/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 14:02:08
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 10:20:15
 * @ Description: 首页
 */

import React, {
  createContext,
  ForwardedRef,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from 'react'
import {
  Divider,
  DotLoading,
  Empty,
  InfiniteScroll,
  PullToRefresh,
} from 'antd-mobile'
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
import { AppstoreOutline, DownFill, EditSOutline } from 'antd-mobile-icons'
import { ListBillDto, Tag } from '#/api'
import { OneDayBills } from '#/global'
import TagPopup, { TagPopupExpose } from './components/TagPopup'
import DatePopup, { DatePopupExpose } from './components/DatePopup'
import AddBillPopup, { AddBillPopupExpose } from './components/AddBillPopup'
import BillItem from './components/BillItem'
import dayjs from 'dayjs'
import { fetchBillList } from '@/api/bill'
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

export const HomeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh() {},
})

const dateFormate = 'YYYY-MM'
export default function Home() {
  const tagPopupRef = useRef<TagPopupExpose>()
  const datePopupRef = useRef<DatePopupExpose>()
  const addBillPopupRef = useRef<AddBillPopupExpose>()

  const [expense, setExpense] = useState(0) // 总支出
  const [income, setIncome] = useState(0) // 总收入
  const [oneDayBills, setOneDayBills] = useState<OneDayBills[]>([]) // 账单列表
  const [totalPage, setTotalPage] = useState(0) // 分页总数

  const [currentSelect, setCurrentSelect] = useState<Tag>({ id: 'all' }) // 当前筛选类型
  const [date, setDate] = useState(dayjs().format(dateFormate)) // 当前筛选时间
  const [page, setPage] = useState(1) // 分页

  /** 获取账单列表 */
  const getBillList = async () => {
    const params: ListBillDto = {
      date,
      pageInfo: { page, page_size: 10 },
    }
    if (currentSelect.id !== 'all') {
      params.tag_id = currentSelect.id
    }

    const { list, total_page, total_expense, total_income } =
      await fetchBillList(params)
    if (page === 1) {
      setOneDayBills(list)
    } else {
      setOneDayBills(oneDayBills.concat(list))
    }
    setTotalPage(total_page)
    setIncome(total_income)
    setExpense(total_expense)
  }

  useEffect(() => {
    (async () => {
      const params: ListBillDto = {
        date,
        pageInfo: { page, page_size: 10 },
      }
      if (currentSelect.id !== 'all') {
        params.tag_id = currentSelect.id
      }

      const { list, total_page, total_expense, total_income } =
        await fetchBillList(params)
      if (page === 1) {
        setOneDayBills(list)
      } else {
        setOneDayBills(oneDayBills.concat(list))
      }
      setTotalPage(total_page)
      setIncome(total_income)
      setExpense(total_expense)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 下拉刷新 */
  const refresh = async () => {
    if (page !== 1) {
      setPage(1)
    }
    getBillList()
  }

  /** 加载更多 */
  const loadMore = async () => {
    if (page < totalPage) {
      setPage(page + 1)
      getBillList()
    }
  }

  // 筛选类型
  const onTagSelect = async (item: Tag) => {
    setPage(() => 1)
    setCurrentSelect(item)
    getBillList()
  }

  // 筛选时间
  const onDateSelect = (date: Date) => {
    setPage(1)
    setDate(dayjs(date).format(dateFormate))
    getBillList()
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
                <div>
                  总支出<b> ¥ {Number(expense).toFixed(2)}</b>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;总入账<b> ¥ {Number(income).toFixed(2)}</b>
                </div>
              </>
            ) : currentSelect.type === 1 ? (
              <div>
                {currentSelect.name}总支出:<b> ¥ {expense}</b>
              </div>
            ) : (
              <div>
                {currentSelect.name}总入账:<b> ¥ {income}</b>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 账单列表 */}
      <div className={s.list}>
        {oneDayBills.length ? (
          <PullToRefresh
            onRefresh={refresh}
            renderText={(status) => <div>{statusRecord[status]}</div>}
          >
            <HomeContext.Provider value={{ refresh }}>
              {oneDayBills.map((item, index) => (
                <BillItem oneDayBills={item} key={index} />
              ))}
            </HomeContext.Provider>
            <InfiniteScroll loadMore={loadMore} hasMore={page < totalPage} />
          </PullToRefresh>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>

      <div
        className={s.add}
        onClick={() => {
          addBillPopupRef.current?.show()
        }}
      >
        <EditSOutline />
        <span style={{ marginLeft: '.2rem' }}>记一笔</span>
      </div>

      <TagPopup
        ref={tagPopupRef as ForwardedRef<TagPopupExpose>}
        onSelect={onTagSelect}
      />
      <DatePopup
        ref={datePopupRef as ForwardedRef<DatePopupExpose>}
        onSelect={onDateSelect}
      />

      <AddBillPopup
        ref={addBillPopupRef as ForwardedRef<AddBillPopupExpose>}
        refresh={refresh}
      />
    </div>
  )
}
