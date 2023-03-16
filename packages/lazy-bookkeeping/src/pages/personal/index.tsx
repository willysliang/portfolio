/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:26:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 18:18:51
 * @ Description: personal 个人中心
 */
import React, { ReactNode } from 'react'
import { Button, Dialog, Toast, Image, Grid } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN, USER_INFO } from '@willy/utils/constant'
import { getPersonalPages, Pages } from '@/router/constant'
import { userLogout } from '@/api/mock'
import { UserBgImg, avactorImg } from '@/assets'
import s from './styles/index.module.scss'

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

export default function PersonalCenter() {
  /** 宫格表 */
  interface IGridItem {
    label: string
    icons: ReactNode
    path: string
  }
  const gridData: IGridItem[] = [
    ...getPersonalPages.map((item) => ({
      label: item.meta.title,
      icons: item.meta?.icons || <></>,
      path: item.path,
    })),
    { label: '看房记录', icons: <></>, path: '' },
    { label: '成为房主', icons: <></>, path: '' },
    { label: '联系我们', icons: <></>, path: '' },
  ]

  const navigate = useNavigate()

  const handlerGrid = (val) => {
    if (!Storage.get(USER_TOKEN)) {
      Dialog.confirm({
        content: '您还未登录，是否确认去登录？',
        onConfirm: async () => {
          navigate(Pages.LOGIN.path, { state: { type: 'back' } })
        },
      })
      return
    } else navigate(val)
  }

  return (
    <div className={s.container}>
      <CUserInfo />

      <Grid columns={3} gap={20}>
        {gridData.map((item) => (
          <Grid.Item
            key={item.label}
            className=""
            onClick={() => handlerGrid(item.path)}
          >
            {item.icons}
            <span className="mg-t-5">{item.label}</span>
          </Grid.Item>
        ))}
      </Grid>

      <div className={s.card}>
        <div className={s.header}>项目信息</div>
        <div className={s.about}>
          <h2>关于项目</h2>
          <article>
            这是一个模仿微信记账小程序的前后端分离全栈项目,共经历了需求分析,表结构设计,api接口设计,技术选型,前端开发,接口联调,生产环境部署上线等流程.
            模拟了真实项目从无到有的流程.
          </article>
          <p>关于技术选型</p>
          <article>
            后端: NestJS, PostgreSQL, TypeScript, TypeORM, Docker
          </article>
          <article>
            前端: React(hooks), React Router, Ant Design Mobile, TypeScript,
            Echarts
          </article>
        </div>
      </div>
    </div>
  )
}
