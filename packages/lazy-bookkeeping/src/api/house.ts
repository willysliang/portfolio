/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:52:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 16:29:59
 * @ Description: 租房接口
 */

import { request } from '@willy/utils'
import type { IAreaCommunityItem, IHouseListItem } from '#/house'

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

/** 获取区域列表 */
export const getAreaCommunity = async (
  params = {},
): Promise<IAreaCommunityItem[]> => {
  const { data } = await request(
    {
      url: `/house/areaCommunity/list`,
      method: 'get',
      params,
    },
    { prefix: 'mock' },
  )
  return data
}

/** 发布房源 */
export const upUserHouses = async (data): Promise<any> => {
  const res = await request(
    {
      url: '/house/houses',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}