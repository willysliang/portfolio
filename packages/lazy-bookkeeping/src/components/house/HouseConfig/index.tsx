/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 10:46:29
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-22 11:43:33
 * @ Description: 房屋配置
 */

import React, { useState, useEffect } from 'react'
import { Grid } from 'antd-mobile'
import {
  Bedside,
  WashingMachine,
  AirConditioning,
  Endocrine,
  Refrigerator,
  Terrace,
  MonitorOne,
  ShowerHead,
  Wifi,
  Sofa,
} from '@icon-park/react'
import IconPark from '@/components/common/IconPark'
// import './index.scss'

const data = [
  { label: '衣柜', icon: Bedside },
  { label: '洗衣机', icon: WashingMachine },
  { label: '空调', icon: AirConditioning },
  { label: '天然气', icon: Endocrine },
  { label: '冰箱', icon: Refrigerator },
  { label: '暖气', icon: Terrace },
  { label: '电视', icon: MonitorOne },
  { label: '热水器', icon: ShowerHead },
  { label: '宽带', icon: Wifi },
  { label: '沙发', icon: Sofa },
]

interface IProps {
  configItem: string
  handConfig?: (val: string) => void
}

const HouseConfig = (props: IProps) => {
  const [houseConfig, sethouseConfig] = useState<Array<string>>([])

  useEffect(() => {
    sethouseConfig(props.configItem.split('|'))
  }, [props])

  /** 根据颜色来渲染 */
  const fillColor = (label) =>
    houseConfig.indexOf(label) === -1 ? '#C0C4CC' : '#1677ff'

  /** 触发 item 的选择 */
  const handlerItem = (val) => {
    // 判断 props 是否存在 handConfig 属性
    if (!props.handConfig) return undefined
    // 对数组深拷贝
    const configItem = JSON.parse(JSON.stringify(houseConfig))
    // 判断数组中是否存在某个值，不存在就添加到数组中，否则删除
    if (configItem.indexOf(val.label) != -1)
      configItem.splice(configItem.indexOf(val.label), 1)
    else configItem.push(val.label)

    sethouseConfig(configItem)
    // 回调函数到父组件
    props.handConfig(configItem.join('|'))
  }

  return (
    <Grid columns={5} gap={10}>
      {data.map((item) => (
        <Grid.Item
          key={item.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={() => handlerItem(item)}
        >
          <IconPark icon={item.icon} size={25} fill={fillColor(item.label)} />
          <span style={{ color: fillColor(item.label), fontSize: '.8rem' }}>
            {item.label}
          </span>
        </Grid.Item>
      ))}
    </Grid>
  )
}

export default HouseConfig
