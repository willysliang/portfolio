/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:03:58
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-03 16:05:36
 * @ Description: bill 账单
 */

import { request } from '@willy/utils'
import { ListBillBo, ListBillDto } from '#/api'

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
