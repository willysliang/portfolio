/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 10:32:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 11:47:04
 * @ Description: 记账标签
 */

import { request } from '@willy/utils'
import type { ListBillDto, ListTagBo, Tag } from '#/api'

/** 标签列表 */
export const fetchTagList = async (data?: ListBillDto): Promise<ListTagBo> => {
  const res = await request(
    {
      url: '/tag/list',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 获取标签 */
export const getTag = async (id: string): Promise<Tag> => {
  const { data } = await request(
    {
      url: `/tags/${id}`,
      method: 'get',
    },
    { prefix: 'mock' },
  )
  return data
}
