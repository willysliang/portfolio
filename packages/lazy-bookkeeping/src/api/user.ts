/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 18:11:44
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 10:58:45
 * @ Description: 用户接口
 */

import { request } from '@willy/utils'
import { LoginDto, SignupDto } from '#/api'

export const fetchLogin = async (data: LoginDto): Promise<any> => {
  const res = await request(
    {
      url: '/auth/login',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

export const fetchSignup = async (data: SignupDto): Promise<any> => {
  const res = await request(
    {
      url: '/user/register',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}

/** 更新用户信息 */
export const updateUserInfo = async (data): Promise<any> => {
  const res = await request(
    {
      url: '/user/update',
      method: 'post',
      data,
    },
    { prefix: 'mock' },
  )
  return res.data
}
