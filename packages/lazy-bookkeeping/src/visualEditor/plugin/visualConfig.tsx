/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-30 09:50:57
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-25 17:37:27
 * @ Description: visualConfig - 模拟的组件数据项配置
 */

import React from 'react'
// import { Button, Input } from 'antd-mobile'
import { Button, Input } from "antd"
import { createVisualConfig } from './createVisualConfig'

/** 模拟的组件 */
export const mockCompConfigList = [
  {
    key: 'text',
    label: '文本',
    preview: () => <span>预览文本</span>,
    render: () => <span>渲染文本</span>,
  },
  {
    key: 'button',
    label: '按钮',
    preview: () => <Button type="primary">预览按钮</Button>,
    render: () => <Button type="primary">渲染按钮</Button>,
  },
  {
    key: 'input',
    label: '输入框',
    preview: () => <Input placeholder="预览输入框" />,
    render: () => <Input placeholder="渲染输入框" />,
  },
] as const

export const visualConfig = createVisualConfig()

/** 遍历生成相应的组件块 */
mockCompConfigList.forEach((compConfig) => {
  visualConfig.registryComponent(compConfig.key, compConfig)
})
