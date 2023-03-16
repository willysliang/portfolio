/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 15:38:57
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 18:03:24
 * @ Description: login 登录页
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Form, Image, Input, Toast } from 'antd-mobile'
import {
  CheckCircleFill,
  CheckCircleOutline,
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  UserAddOutline,
} from 'antd-mobile-icons'
import classNames from 'classnames'
import { Storage } from '@willy/utils'
import { USER_TOKEN, USER_INFO, SAVE_LOGIN } from '@willy/utils/constant'
import { useLogin } from '@/api/mock'
import { loginSVG, signupSVG, WxLoginImg } from '@/assets'
import style from './index.module.scss'

const typelist = {
  login: {
    title: '登录',
    key: 'login',
    api: useLogin,
    svg: loginSVG,
  },
  register: {
    title: '注册',
    key: 'register',
    api: useLogin,
    svg: signupSVG,
  },
} as const

export default function Login() {
  /** 创建的 form 控制实例 */
  const [form] = Form.useForm()

  /** 注册 or 登录方式切换 */
  const [type, setType] = useState<'login' | 'register'>(typelist.login.key)
  const trigerType = (newType) => {
    form.setFields([
      { name: 'username', value: '', errors: undefined },
      { name: 'password', value: '', errors: undefined },
    ])
    setType(newType)
  }

  /** 密码是否可见 */
  const [visible, setVisible] = useState(false)

  /** 记住密码 */
  const [savePwd, setSavePwd] = useState(false) // 定义记住密码开关
  useEffect(() => {
    if (Storage.get(SAVE_LOGIN, null)) {
      setSavePwd(true)
      form.setFields([
        {
          name: 'username',
          value: Storage.get(SAVE_LOGIN).username,
          errors: undefined,
        },
        {
          name: 'password',
          value: Storage.get(SAVE_LOGIN).password,
          errors: undefined,
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        const { accessToken, nickname, avatar } = res.data
        // 缓存用户的 token 信息到本地
        Storage.set(USER_TOKEN, accessToken)
        Storage.set(USER_INFO, { nickname, avatar })

        // 判断是否记住密码，缓存到本地，否则清除已缓存的密码
        if (savePwd) {
          Storage.set(SAVE_LOGIN, {
            username,
            password,
          })
        } else {
          Storage.set(SAVE_LOGIN, '')
        }

        // 跳转首页
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
            [style.active]: type === typelist.login.key,
          })}
          onClick={() => trigerType(typelist.login.key)}
        >
          登录
        </span>
        <span
          className={classNames(style.tab, {
            [style.active]: type === typelist.register.key,
          })}
          onClick={trigerType.bind(null, typelist.register.key)}
        >
          注册
        </span>
      </div>

      <div className={style['login-form']}>
        <Form
          layout="horizontal"
          mode="default"
          form={form}
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" shape="rounded">
              {type === 'login' ? '登录' : '注册'}
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
            extra={
              <div className={style.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请输入密码"
              clearable
              type={visible ? 'text' : 'password'}
            />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span onClick={() => setSavePwd(!savePwd)}>
                {savePwd ? (
                  <CheckCircleFill fontSize={16} style={{ color: '#1677ff' }} />
                ) : (
                  <CheckCircleOutline fontSize={16} style={{ color: '#999' }} />
                )}
                <span style={{ marginLeft: '.5rem' }}>记住密码</span>
              </span>
              <span
                style={{ color: '#1677ff' }}
                onClick={() => setType(typelist.register.key)}
              >
                立即注册~
              </span>
            </div>
          </Form.Item>
        </Form>

        <Divider>其它登录方式</Divider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={WxLoginImg}
            width={40}
            height={40}
            fit="cover"
            style={{ borderRadius: 20 }}
          />
        </div>
      </div>
    </div>
  )
}
