/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 11:52:13
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 13:48:35
 * @ Description: 租房接口
 */

import { request } from '@willy/utils'
import type {
  IAreaCommunityItem,
  IAreaItem,
  IAreaMapItem,
  IHouseListItem,
  IHousesDetail,
  INewsItem,
} from '#/house'

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
export const getHousesList = async (params = {}): Promise<IHouseListItem[]> => {
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

/** 查询房屋具体信息 */
export const getHousesDetail = async (
  areaCode: number | string = 0,
): Promise<IHousesDetail> => {
  const { data } = await request(
    {
      url: `/house/houses/details?code=${areaCode}`,
      method: 'get',
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

/** 获取城市区域数据 */
export const getAreaChildList = async (params: {
  id: string | number
}): Promise<IAreaItem[]> => {
  const { data } = await request(
    {
      url: `/house/area/city`,
      method: 'get',
      params,
    },
    { prefix: 'mock' },
  )
  return data
}

/** 查询房源数据 */
export const getAreaMap = async (params: {
  id: string | number
}): Promise<IAreaMapItem[]> => {
  const { data } = await request(
    {
      url: `/house/area/map`,
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

/** 信息咨询 */
export const getHouseNews = async (
  params: { area: string } = { area: '' },
): Promise<INewsItem[]> => {
  const { data } = await request(
    {
      url: `/house/news/list`,
      method: 'get',
      params,
    },
    { prefix: 'mock' },
  )
  return data
}
