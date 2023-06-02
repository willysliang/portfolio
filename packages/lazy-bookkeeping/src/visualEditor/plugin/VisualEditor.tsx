/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-02 09:53:23
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-02 13:34:11
 * @ Description: 编辑器
 */

import React, { useState } from "react"
import { VisualEditorValue } from "../types"
import { VisualEditorConfig } from "./createVisualConfig"

interface VisualEditorProps {
  value: VisualEditorValue,
  config: VisualEditorConfig
  /** 数据发生变化时触发外部函数 */
  onChange: (val:VisualEditorValue) => void
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ value }) => {
  /** 当前处于编辑还是预览状态 */
  const [editing, setEditing] = useState(true)
  // const [preview, setPreview] = useState(true)

  setEditing(true)
  console.log(value, editing)

  /** 拖拽开始和结束事件的监听 */
  // const [dragStart] = useState(() => createEvent())

  return (
    <div>
      
    </div>
  )
}
