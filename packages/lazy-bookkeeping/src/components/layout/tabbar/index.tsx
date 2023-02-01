/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 16:30:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 17:54:10
 * @ Description: 标签导航栏
 */
import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  TravelOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { Pages } from '@/router/constant'

/** 标签导航数据子集约束 */
interface ItabItem {
  key: string
  title: string
  icon: ReactNode | ((active: boolean) => ReactNode)
  badge?: React.ReactNode | typeof Badge.dot
}

/** 标签导航数据 */
const tablist: ItabItem[] = [
  {
    key: Pages.HOME.path,
    title: Pages.HOME.meta.title,
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: Pages.STATICSTICS.path,
    title: Pages.STATICSTICS.meta.title,
    icon: (active: boolean) =>
      !active ? <TravelOutline /> : <UnorderedListOutline />,
    badge: '5',
  },
  {
    key: Pages.PERSONAL.path,
    title: Pages.PERSONAL.meta.title,
    icon: <UserOutline />,
  },
]

/** 标签导航组件 */
const Tabbar = () => {
  const [activeKey, setActiveKey] = useState(Pages.HOME.path)

  const navigate = useNavigate()
  const setRouteActive = (value: string) => {
    setActiveKey(value)
    navigate(value, {
      replace: false,
      state: {
        title: value,
      },
    })
  }

  return (
    <div className="tabbar">
      <TabBar
        safeArea
        activeKey={activeKey}
        onChange={(value) => setRouteActive(value)}
        style={{ width: '100%' }}
      >
        {tablist.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </div>
  )
}
export default Tabbar
