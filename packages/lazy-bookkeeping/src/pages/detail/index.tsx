/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-14 10:03:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 11:55:36
 * @ Description: 账单详情
 */
import React, { useEffect, useState, useRef, ForwardedRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Dialog, Divider, Toast } from 'antd-mobile'
import { AntOutline, DeleteOutline, EditSOutline } from 'antd-mobile-icons'
import Header from '@/components/layout/header'
import AddBillPopup, {
  AddBillPopupExpose as EditBillPopupExpose,
} from '../home/components/AddBillPopup'
import { Bill } from '#/global'
import { Tag } from '@/types/api'
import { getTag } from '@/api/tag'
import { deleteBill, getBill } from '@/api/bill'
import dayjs from 'dayjs'
import cx from 'classnames'
import s from './index.module.scss'

export default function Detail() {
  const [search] = useSearchParams()
  const id = search.get('id')

  const editBillPopupRef = useRef<EditBillPopupExpose>()

  const [bill, setBill] = useState<Bill>()
  const [tag, setTag] = useState<Tag>()

  const getDetail = async () => {
    try {
      /** 获取订单详情 */
      const res = await getBill(id)
      setBill(res)

      /** 获取订单标签详情 */
      const res1 = await getTag(res.tag_id)
      setTag(res1)
    } catch {}
  }

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()
  const onDelete = () => {
    Dialog.confirm({
      content: '删除后无法恢复, 是否删除?',
      onConfirm: async () => {
        await deleteBill(bill!.id)
        Toast.show({
          content: '删除成功',
        })
        navigate(-1)
      },
    })
  }

  return (
    <>
      <Header title={`账单详情${id}`} />
      <div className={s.detail}>
        <div className={s.card}>
          <div className={s.type}>
            {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}
            <span
              className={cx({
                [s.expense]: bill?.type == 1,
                [s.income]: bill?.type == 2,
              })}
            >
              <AntOutline color="#76c6b8" />
            </span>
            <span>{tag?.name || ''}</span>
          </div>
          {bill?.type === 1 ? (
            <div className={cx(s.amount, s.expense)}>-{bill.amount}</div>
          ) : (
            <div className={cx(s.amount, s.incom)}>+{bill?.amount}</div>
          )}
          <div className={s.info}>
            <div className={s.time}>
              <span>记录时间</span>
              <span>{dayjs(bill?.date).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            <div className={s.remark}>
              <span>备注</span>
              <span>{bill?.remark || '-'}</span>
            </div>
          </div>
          <Divider
            direction="horizontal"
            style={{ width: '100%', color: '#dfdfdf' }}
          />
          <div className={s.operation}>
            <span onClick={onDelete}>
              <DeleteOutline />
              删除
            </span>

            <span
              onClick={() => {
                setBill({ ...bill! })
                editBillPopupRef.current?.show()
              }}
            >
              <EditSOutline />
              编辑
            </span>
          </div>
        </div>
      </div>

      <AddBillPopup
        ref={editBillPopupRef as ForwardedRef<EditBillPopupExpose>}
        detail={bill}
        refresh={getDetail}
      />
    </>
  )
}
