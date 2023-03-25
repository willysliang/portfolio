/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-16 15:23:46
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 19:34:12
 * @ Description: 个人资料 userInfo
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, Form, Input, NavBar, Picker, Toast } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { Storage } from '@willy/utils'
import { USER_INFO } from '@willy/utils/constant'
import { updateUserInfo } from '@/api/user'
import s from '../styles/UerInfo.module.scss'

/** 用户信息 */
interface IUserInfo {
  mobile: number | string
  nickname: string
  /** 性别：0女 1男 2未知 */
  gender: [string]
}

const UserInfo = () => {
  const navigate = useNavigate()

  /** 创建的 form 控制实例 */
  const [form] = Form.useForm()

  /** 性别列表 */
  const genderColumns = [
    [
      { label: '女', value: '0' },
      { label: '男', value: '1' },
      { label: '未知', value: '2' },
    ],
  ]

  const checkMobile = (_, value: string) => {
    const reg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (!value) {
      return Promise.reject(new Error('手机号不能为空!'))
    }
    if (!reg.test(value)) {
      return Promise.reject(new Error('手机号格式错误!'))
    }
    return Promise.resolve()
  }

  const onFinish = (params: IUserInfo) => {
    Dialog.confirm({
      title: '提示',
      content: '是否确认修改个人资料？',
      onConfirm: async () => {
        try {
          await updateUserInfo({ ...params, gender: params.gender[0] })
          Toast.show({
            content: '修改成功',
            icon: 'success',
            duration: 1500,
            maskClickable: false,
          })
          // 缓存用户信息
          Storage.set(USER_INFO, { ...params, gender: params.gender[0] })
          navigate(-1)
        } catch {}
      },
    })
  }

  return (
    <div className={s['container']}>
      <NavBar onBack={() => navigate(-1)}>个人资料</NavBar>

      <Form
        layout="horizontal"
        mode="card"
        form={form}
        onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="small"
            shape="rounded"
          >
            提交
          </Button>
        }
      >
        <Form.Item
          label="用户名"
          name="nickname"
          rules={[{ required: true }]}
          extra={<RightOutline />}
        >
          <Input
            placeholder=""
            style={{ '--text-align': 'right' }}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true }]}
          trigger="onConfirm"
          extra={<RightOutline />}
        >
          <Picker columns={genderColumns}>
            {(items, { open }) => (
              <div onClick={open} style={{ textAlign: 'right' }}>
                {items.every((item) => item === null)
                  ? '未选择'
                  : items.map((item) => item?.label ?? '未选择').join(' - ')}
              </div>
            )}
          </Picker>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          help="手机号"
          required
          rules={[{ validator: checkMobile }]}
          extra={<RightOutline />}
        >
          <Input
            placeholder=""
            maxLength={11}
            style={{ '--text-align': 'right' }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserInfo
