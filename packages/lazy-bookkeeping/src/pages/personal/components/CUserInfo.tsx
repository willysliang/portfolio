/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 15:28:45
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 15:56:49
 * @ Description: 用户信息 CUserInfo
 */

import React from 'react'
import { Button, Dialog, Toast, Image } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN, USER_INFO } from '@willy/utils/constant'
import { Pages } from '@/router/constant'
import { userLogout } from '@/api/mock'
import { UserBgImg, avactorImg } from '@/assets'
import s from '../styles/index.module.scss'

/** 用户信息 */
const CUserInfo = (): JSX.Element => {
  const userInfo = Storage.get(USER_INFO, {})
  const isEmpty = (obj) => JSON.stringify(obj) === '{}'
  const navigate = useNavigate()

  // 登录&&登出
  const handlerOut = () => {
    // 判断本地是否存在用户数据，没有则跳转到登录页面，否则弹出登录退出
    if (isEmpty(userInfo)) navigate(Pages.LOGIN.path)
    else {
      Dialog.confirm({
        content: '是否确认退出登录？',
        onConfirm: async () => {
          try {
            await userLogout()
            Toast.show({ icon: 'success', content: '退出成功' })
            Storage.set(USER_TOKEN, null)
            navigate(Pages.LOGIN.path)
          } catch {}
        },
      })
    }
  }

  return (
    <div className={s.userInfo}>
      <div className={s.bg}>
        <Image src={UserBgImg} width="100%" height="100%" fit="cover" />
      </div>

      <div className={s['user-content']}>
        <div className={s['user-avactor']}>
          <Image
            src={userInfo.avatar ?? avactorImg}
            width="100%"
            height="100%"
            fit="cover"
          />
        </div>
        <div className={s['user-font']}>{userInfo.nickname ?? '未登录'}</div>
        <Button
          block
          shape="rounded"
          size="small"
          color="primary"
          onClick={handlerOut}
        >
          {isEmpty(userInfo) ? '点击登录' : '退出登录'}
        </Button>
      </div>
    </div>
  )
}

export default CUserInfo
