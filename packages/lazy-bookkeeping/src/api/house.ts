/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:52:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-21 13:32:55
 * @ Description: 租房接口
 */

import { request } from '@willy/utils'
import type { IHouseListItem } from '#/house'

/** 标签列表 */
/* export const fetchTagList = async (data?: ListBillDto): Promise<ListTagBo> => {
  const res = await request(
    {
      url: '/tag/list',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
} */

/** 获取收藏的房屋信息列表 */
export const getFavoritesList = async (
  params = {},
): Promise<IHouseListItem[]> => {
  const { data } = await request(
    {
      url: `/house/favorites/list`,
      method: 'get',
      params,
    },
    { prefix: 'mock' },
  )
  return data
}

/** 获取已发布房源的列表 */
export const getHousesList = async (
  params = {},
): Promise<IHouseListItem[]> => {
  const { data } = await request(
    {
      url: `/house/houses/list`,
      method: 'get',
      params,
    },
    { prefix: 'mock' },
  )
  return data
}
