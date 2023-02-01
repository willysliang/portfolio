/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 09:58:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 10:12:57
 * @ Description: mockjs 的请求
 */
import { request } from '@willy/utils'

export const login = async (data) =>
  request(
    {
      url: '/user/login',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )

export const logout = () =>
  request(
    {
      url: '/user/logout',
      method: 'post',
    },
    { prefix: 'mock' },
  )

export const getResouceList = () =>
  request(
    {
      url: '/list/getResouceList',
      method: 'get',
    },
    { prefix: 'mock' },
  )
