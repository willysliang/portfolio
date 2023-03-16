/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:26:18
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 13:21:29
 * @ Description: personal 个人中心
 */
import React from 'react'
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { Storage } from '@willy/utils'
import { USER_TOKEN } from '@willy/utils/constant'
import { userLogout } from '@/api/mock'
import s from './index.module.scss'

export default function PersonalCenter() {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      await userLogout()
      Storage.set(USER_TOKEN, null)
      navigate('/')
    } catch {}
  }

  return (
    <div className={s.container}>
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

      <Button block color="warning" onClick={logout}>
        退出登录
      </Button>
    </div>
  )
}
