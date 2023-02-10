/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 15:38:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-06 10:47:17
 * @ Description: login 登录页
 */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Image, Input, Toast } from 'antd-mobile'
import { LockOutline, UserAddOutline } from 'antd-mobile-icons'
import classNames from 'classnames'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import style from './index.module.scss'
import { loginSVG, signupSVG } from '@/assets/svg'
import { useLogin } from '@/api/mock'

const typelist = {
  login: {
    title: '登录',
    api: useLogin,
    svg: loginSVG,
  },
  register: {
    title: '注册',
    api: useLogin,
    svg: signupSVG,
  },
} as const

export default function Login() {
  /** 创建的 form 控制实例 */
  const [form] = Form.useForm()

  /** 注册 or 登录方式切换 */
  const [type, setType] = useState<'login' | 'register'>('login')
  const trigerType = (newType) => {
    form.setFields([
      { name: 'username', value: '', errors: undefined },
      { name: 'password', value: '', errors: undefined },
    ])
    setType(newType)
  }

  /** 表单提交 */
  const navigate = useNavigate()
  const onFinish = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    const res = await typelist[type].api({ username, password })
    if (res.code === 200) {
      Toast.show({ icon: 'success', content: `${typelist[type].title}成功` })
      if (type === 'login') {
        Storage.set(USER_TOKEN, res.data.accessToken)
        navigate('/')
      } else {
        trigerType(type)
      }
    } else {
      Toast.show({
        icon: 'fail',
        content: `${typelist[type].title}失败：${res.msg}`,
      })
    }
  }

  return (
    <div className={style['login-pages']}>
      <div className={style['login-svg']}>
        <Image
          src={typelist[type].svg}
          fit="fill"
          width={'100%'}
          height={300}
          lazy={true}
        />
      </div>

      <div className={style.tabs}>
        <span
          className={classNames(style.tab, {
            [style.active]: type === 'login',
          })}
          onClick={() => trigerType('login')}
        >
          登录
        </span>
        <span
          className={classNames(style.tab, {
            [style.active]: type === 'register',
          })}
          onClick={trigerType.bind(null, 'register')}
        >
          注册
        </span>
      </div>

      <div className={style['login-form']}>
        <Form
          layout="horizontal"
          mode="card"
          form={form}
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="success" size="large">
              提交
            </Button>
          }
        >
          <Form.Item
            name="username"
            label={<UserAddOutline className={style['icon-lable']} />}
            rules={[{ required: true, message: '姓名不能为空!' }]}
            help="登录账号"
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<LockOutline className={style['icon-lable']} />}
            rules={[{ required: true, message: '密码不能为空!' }]}
            help="登录密码"
          >
            <Input placeholder="请输入密码" type={'password'} />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
