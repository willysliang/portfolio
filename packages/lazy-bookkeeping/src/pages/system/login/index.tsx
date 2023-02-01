/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 15:38:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 18:29:41
 * @ Description: 登录页
 */
import React, { useEffect, useMemo, useState } from 'react'
import { Image } from 'antd-mobile'
import style from './index.module.scss'

export default function Login() {
  const [type, setType] = useState('login')
  const calcType = useMemo(() => {
    if (type === 'login') {
      return {
        title: '登录',
        api: 'login',
        svg: 'loginSVG',
      }
    } else {
      return {
        title: '注册',
        api: 'signup',
        svg: 'signupSVG',
      }
    }
  }, [type])

  useEffect(() => {
    setType('signup')
  }, [])

  return (
    <div className={style['login-pages']}>
      <div className={style['login-svg']}>
        <Image
          src={calcType.svg}
          fit="fill"
          width={'100%'}
          height={300}
          lazy={true}
        />
      </div>
    </div>
  )
}
