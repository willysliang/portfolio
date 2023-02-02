/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 09:58:16
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-02 15:41:42
 * @ Description: mockjs 的请求
 */
import { request } from '@willy/utils'

/** 登录 */
export const useLogin = async (data) =>
  request(
    {
      url: '/user/login',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )

export const userLogout = () =>
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
