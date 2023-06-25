/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-25 14:00:08
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-25 16:57:56
 * @ Description: 案例首页
 */

import React, { useState } from 'react'
import mockData from '../../plugin/mock.json'
import { VisualEditorValue } from '@/visualEditor/types'
import { VisualEditor } from '@/visualEditor/plugin/VisualEditor'
import { visualConfig } from '@/visualEditor/plugin/visualConfig'

/** 案例首页 */
const DIndex = () => {
  const [editorValue, setEditorValue] = useState(() => {
    const value: VisualEditorValue = mockData
    return value
  })

  return (
    <div className="container" style={{ width: '100vw', height: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>可视化编辑器</h1>
      <VisualEditor
        value={editorValue}
        config={visualConfig}
        onChange={setEditorValue}
      />
      <div style={{ textAlign: 'center' }}>{JSON.stringify(mockData)}</div>
    </div>
  )
}

export default DIndex
