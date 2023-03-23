/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 15:27:08
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 15:28:20
 * @ Description: 项目描述 CProjectDesc
 */

import React from 'react'
import { Card, Collapse } from 'antd-mobile'
import s from '../styles/index.module.scss'

/** 项目描述 */
const CProjectDesc = (): JSX.Element => {
  return (
    <div className={s['card']}>
      <Card
        headerStyle={{
          color: '#1677ff',
        }}
        bodyStyle={{ color: 'var(--adm-color-success)' }}
        title="项目信息"
      >
        <Collapse accordion>
          <Collapse.Panel key="1" title="关于项目">
            这是一个模仿微信记账小程序的前后端分离全栈项目,共经历了需求分析,表结构设计,api接口设计,技术选型,前端开发,接口联调,生产环境部署上线等流程.
            模拟了真实项目从无到有的流程。
          </Collapse.Panel>
          <Collapse.Panel key="2" title="后端技术选型">
            NestJS, PostgreSQL, TypeScript, TypeORM, Docker
          </Collapse.Panel>
          <Collapse.Panel key="3" title="前端技术选型">
            React(hooks), React Router, Ant Design Mobile, TypeScript, Echarts
          </Collapse.Panel>
        </Collapse>
      </Card>
    </div>
  )
}

export default CProjectDesc
