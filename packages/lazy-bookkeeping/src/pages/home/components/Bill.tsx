/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:41:21
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 21:16:38
 * @ Description: 账单 Bill
 */

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Divider, SwipeAction, Toast } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { AntOutline } from 'antd-mobile-icons'
import { HomeContext } from '../index'
import { Bill as BillType } from '#/global'
import { deleteBill } from '@/api/bill'
import dayjs from 'dayjs'
import { Pages } from '@/router/constant'
import s from '../styles/Bill.module.scss'

interface Props {
  bill: BillType
}

const rightActions: Action[] = [
  {
    key: 'changeType',
    text: '修改分类',
    color: '#3b3b3b',
  },
  {
    key: 'delete',
    text: '删除',
    color: '#f63940',
  },
]

const typeColor = (type: number) => (type === 1 ? '#35AA62' : '#EBAA2D')

export default function Bill({ bill }: Props) {
  const homeContext = useContext(HomeContext)
  const navigate = useNavigate()

  /** 侧滑动作 */
  const onAction = async (action: Action) => {
    if (action.key === 'delete') {
      Dialog.confirm({
        content: '删除后无法恢复, 是否删除?',
        onConfirm: async () => {
          try {
            await deleteBill(bill.id)
          } catch {}
          homeContext.refresh()
          Toast.show({
            content: '删除成功',
          })
        },
      })
    } else if (action.key === 'changeType') {
      // 修改分类
    }
  }

  // 跳转账单详情
  const goDetail = (id: string) => {
    navigate(`${Pages.DETAIL.path}?id=${id}`)
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions} onAction={onAction}>
      <div className={s.bill} onClick={() => goDetail(bill.id)}>
      <AntOutline color='#76c6b8' />
        <div className={s.right}>
          <div className={s.top}>
            <span>{bill.tag_name}</span>
            {bill.type === 1 ? (
              <span>-{Number(bill.amount).toFixed(2)}</span>
            ) : (
              <span style={{ color: typeColor(bill.type) }}>
                +{Number(bill.amount).toFixed(2)}
              </span>
            )}
          </div>
          <div className={s.bottom}>
            <span className={s.time}>{dayjs(bill.date).format('hh:ss')}</span>
            {bill.remark ? (
              <>
                <Divider direction="vertical" />
                <span className={s.remark}>{bill.remark}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={s.divider}></div>
    </SwipeAction>
  )
}
