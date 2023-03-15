/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 17:27:52
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 17:52:15
 * @ Description: 排行 item
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, SwipeAction, Toast } from 'antd-mobile'
import { AntOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { Bill } from '#/global'
import { deleteBill } from '@/api/bill'
import dayjs from 'dayjs'
import s from '../styles/RankItem.module.scss'

interface Props {
  bill: Bill
  refresh: () => void
}
const rightActions: Action[] = [
  {
    key: 'delete',
    text: '删除',
    color: '#f63940',
  },
]
export default function RankItem({ bill, refresh }: Props) {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAction = async (action: Action, e: React.MouseEvent) => {
    if (action.key === 'delete') {
      Dialog.confirm({
        content: '删除后无法恢复, 是否删除?',
        onConfirm: async () => {
          try {
            await deleteBill(bill.id)
          } catch {}
          refresh()
          Toast.show({
            content: '删除成功',
          })
        },
      })
    }
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions} onAction={onAction}>
      <div className={s.item} onClick={() => navigate(`/detail/${bill.id}`)}>
        <div className={s.left}>
          <AntOutline color={bill.type === 1 ? '#35aa62' : '#dda108'} />
        </div>
        <div className={s.right}>
          <div>
            <span>{bill.tag_name}</span>
            <span>
              {bill.type === 1 ? '-' : '+'}
              {bill.amount}
            </span>
          </div>
          <div>
            <span>{bill.remark}</span>
            <span>{dayjs(bill.date).format('MM月DD日 hh:mm')}</span>
          </div>
        </div>
      </div>
    </SwipeAction>
  )
}
