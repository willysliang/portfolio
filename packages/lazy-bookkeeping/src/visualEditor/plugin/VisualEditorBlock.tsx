/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-01 13:20:40
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-25 16:45:32
 */

import React, { useEffect, useMemo, useRef } from 'react'
import { VisualEditorBlockData } from '../types'
import { VisualEditorConfig } from './createVisualConfig'
import classNames from 'classnames'
import classModule from '../styles/VisualEditorBlock.module.scss'
import { useUpdate } from '../hooks/useUpdate'

interface VisualEditorBlockProps {
  block: VisualEditorBlockData
  config: VisualEditorConfig
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void
  editing?: boolean
  preview?: boolean
}

export const VisualEditorBlock: React.FC<VisualEditorBlockProps> = ({
  block,
  config,
  preview,
  editing,
  onMouseDown,
  onContextMenu,
}) => {
  const elementRef = useRef({} as HTMLDivElement)

  /** 内联样式 */
  const style = useMemo(
    () => ({
      top: block.style.top,
      left: block.style.left,
      zIndex: block.style.zIndex,
      opacity: block.controller.adjustPosition ? 0 : '', //  解决调整拖拽结束时组件闪动 BUG
    }),
    [
      block.controller.adjustPosition,
      block.style.left,
      block.style.top,
      block.style.zIndex,
    ],
  )

  /** 类样式 */
  const classes = useMemo(
    () =>
      classNames([
        classModule['visual-editor__block'],
        { [classModule['editor-block__mask']]: preview ? false : editing },
        {
          [classModule['editor-block__active']]: preview
            ? false
            : editing
            ? block.controller.focus
            : false,
        },
      ]),
    [block.controller.focus, editing, preview],
  )

  /** 获取组件 */
  const component = config.componentMap[block.componentKey]
  let render: any = null
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!component) {
    render = component.render({} as any)
  }

  // 强制更新一次
  const { froceUpdate } = useUpdate()
  useEffect(() => {
    if (block.controller.adjustPosition) {
      // 设置首次拖到容器中是否调整位置居于鼠标点
      const { top, left } = block.style
      const blockComp = elementRef.current
      const { width, height } = blockComp.getBoundingClientRect()
      block.controller.adjustPosition = false
      block.style.top = top - height / 2
      block.style.left = left - width / 2

      // 记录 block 组件的宽高
      block.style.width = blockComp.offsetWidth
      block.style.height = blockComp.offsetHeight

      // 需要引用一次才可以更新视图
      froceUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={style}
      className={classes}
      ref={elementRef}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      {render}
    </div>
  )
}
