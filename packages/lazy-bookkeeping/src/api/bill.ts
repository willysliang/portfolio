/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:03:58
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-13 17:53:30
 * @ Description: bill 账单
 */

import { request } from '@willy/utils'
import type {
  ListBillBo,
  ListBillDto,
  CreateBillDto,
  UpdateBillDto,
} from '#/api'

/** 获取账单列表 */
export const fetchBillList = async (
  data?: ListBillDto,
): Promise<ListBillBo> => {
  const res = await request(
    {
      url: '/bill/list',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 创建账单 */
export const createBill = async (data: CreateBillDto) => {
  const res = await request(
    {
      url: '/bill/create',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 更新账单 */
export const updateBill = async (data: UpdateBillDto) => {
  const res = await request(
    {
      url: '/bill/update',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 删除账单 */
export const deleteBill = async (id: string) => {
  const res = await request(
    {
      url: `/bill/${id}`,
      method: 'delete',
    },
    { prefix: 'mock' },
  )
  return res.data
}
