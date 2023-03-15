/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:03:58
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 17:21:41
 * @ Description: bill 账单
 */

import { request } from '@willy/utils'
import type {
  ListBillBo,
  ListBillDto,
  CreateBillDto,
  UpdateBillDto,
  MakeupBillDto,
  MakeupBillBo,
  RankBillBo,
  RankBillDto,
} from '#/api'
import { Bill } from '#/global'

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

/** 获取账单 */
export const getBill = async (id: string | null): Promise<Bill> => {
  const { data } = await request(
    {
      url: `/bills/${id}`,
      method: 'get',
    },
    { prefix: 'mock' },
  )
  return data
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

/** 账单构成 */
export const makeupBill = async (
  data: MakeupBillDto,
): Promise<MakeupBillBo[]> => {
  const res = await request(
    {
      url: '/bill/makeup',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 每日账单 */
export const dailyCompare = async (
  data: MakeupBillDto,
): Promise<{ date: string; total: number }[]> => {
  const res = await request(
    {
      url: '/bill/dailyCompare',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 账单排行 */
export const rankBill = async (data: RankBillDto): Promise<RankBillBo> => {
  const res = await request(
    {
      url: '/bill/rank',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}
