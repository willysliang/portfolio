/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 18:11:44
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 18:13:40
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
