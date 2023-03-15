/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 16:30:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 18:27:49
 * @ Description: 标签导航栏
 */
import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Badge, TabBar } from 'antd-mobile'
import {
  AntOutline,
  AppOutline,
  TravelOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { Pages, DemoPages } from '@/router/constant'

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
    key: DemoPages.DEMO.path,
    title: DemoPages.DEMO.meta.title,
    icon: <AntOutline />,
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

  /** 标签导航跳转 */
  const setRouteActive = (value: string) => {
    setActiveKey(value)
    navigate(value, {
      replace: false,
      state: {
        title: value,
      },
    })
  }

  /** 当为登录页时导航栏隐藏 */
  const { pathname } = useLocation()
  const [isHidden, setIsHidden] = useState<boolean>(false)
  useEffect(() => {
    if (pathname === Pages.LOGIN.path) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  }, [pathname])

  return (
    <div className="tabbar" style={{ display: isHidden ? 'none' : 'block' }}>
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
