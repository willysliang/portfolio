/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-02 09:53:23
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-15 21:47:57
 * @ Description: 编辑器
 */

import React, { useMemo, useRef, useState } from 'react'
import {
  VisualEditorBlockData,
  VisualEditorComponent,
  VisualEditorValue,
} from '../types'
import { VisualEditorConfig, createVisualBlock } from './createVisualConfig'
import { createEvent } from '../utils/createEvent'
import { useCallbackRef } from '../hooks/useCallbackRef'

interface VisualEditorProps {
  value: VisualEditorValue
  config: VisualEditorConfig
  /** 数据发生变化时触发外部函数 */
  onChange: (val: VisualEditorValue) => void
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  value,
  onChange,
}) => {
  /** 当前处于编辑还是预览状态 */
  const [editing, setEditing] = useState(true)
  const [preview, setPreview] = useState(true)

  const innerMethods = {
    // 切换编辑和运行状态
    toggleEditing: () => {
      setEditing((oldEditing) => !oldEditing)
    },
    // 切换编辑和预览状态
    togglePreview: () => {
      setPreview((oldPreviw) => !oldPreviw)
    },
  }

  /** 拖拽开始和结束事件的监听 */
  const [dragStart] = useState(() => createEvent())
  const [dragEnd] = useState(() => createEvent())

  /** 当前选中 block 组件元素的索引 */
  const [selectIndex, setSelectIndex] = useState(-1) // 默认 -1 没选中
  const selectBlock = useMemo(
    () => value.blocks[selectIndex],
    [value.blocks, selectIndex],
  )

  /** 存储数据中选中状态和未选中状态的数据 */
  const focusData = useMemo(() => {
    const focus: Array<VisualEditorBlockData> = []
    const unFocus: Array<VisualEditorBlockData> = []

    value.blocks.forEach((block) => {
      ;(block.controller.focus ? focus : unFocus).push(block)
    })

    return {
      focus,
      unFocus,
    }
  }, [value.blocks])

  /** 对外暴露的方法 */
  const expostMethods = {
    /**
     * 更新 block 数据，触发视图重新渲染
     * @param blocks
     */
    updateBlocks: (blocks: VisualEditorBlockData[]) => {
      onChange({
        ...value,
        blocks: [...blocks],
      })
    },
    /**
     * 更新整个画布容器的数据（所有 block 数据）
     * @param value
     */
    updateValue: (value: VisualEditorValue) => {
      onChange({ ...value })
    },
    /**
     * 清空选中的数据
     */
    clearFocus: (external?: VisualEditorBlockData) => {
      let blocks = [...value.blocks]
      if (!blocks.length) return undefined
      if (external) {
        blocks = blocks.filter((item) => item !== external)
      }
      blocks.forEach((block) => (block.controller.focus = false))
      expostMethods.updateBlocks(value.blocks)
    },
    /**
     * 查看（导出）数据
     * @param block
     */
    showBlockData: (block: VisualEditorBlockData) => {
      //
    },
    /**
     * 导入数据
     * @param block
     */
    importBlockData: async (block: VisualEditorBlockData) => {
      /* const text = await $$dialog.textarea("", {
        title: "请输入需要导入的节点数据JSON字符串",
      });
      try {
        const data = JSON.parse(text || "");
        commander.updateBlock(data, block);
      } catch (e) {
        console.error(e);
        notification.open({
          type: "error",
          message: "导入失败！",
          description: "导入的数据格式不正常，请检查！",
        });
      } */
    },
  }

  /** 画布容器 */
  const containerRef = useRef({} as HTMLDivElement)
  const containerStyles = useMemo(
    () => ({
      width: value.container.style.width,
      height: value.container.style.height,
    }),
    [value.container.style.height, value.container.style.width],
  )

  /** 左侧菜单拖拽到画布容器区域内 */
  const menuDraggier = (() => {
    const dragData = useRef({
      // 左侧组件去拖拽的当前组件
      dragComponent: null as null | VisualEditorComponent,
    })

    const container = {
      dragenter: useCallbackRef((e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'move'
      }),
      dragover: useCallbackRef((e: DragEvent) => {
        e.preventDefault()
      }),
      dragleve: useCallbackRef((e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'none'
      }),
      drop: useCallbackRef((e: DragEvent) => {
        // 在容器画布添加组件
        expostMethods.updateBlocks([
          ...value.blocks,
          createVisualBlock({
            top: e.offsetY,
            left: e.offsetX,
            component: dragData.current.dragComponent!,
          }),
        ])

        // 拖拽结束后，等页面渲染完毕，才执行，否则拖拽后就不会在页面正常显示
        const t = setTimeout(() => {
          dragEnd.emit() // 触发事件
          clearTimeout(t)
        })
      }),
    }

    const block = {
      dragStart: useCallbackRef((dragComponent: VisualEditorComponent) => {
        containerRef.current.addEventListener('dragenter', container.dragenter)
        containerRef.current.addEventListener('dragover', container.dragover)
        containerRef.current.addEventListener('dragleave', container.dragleve)
        containerRef.current.addEventListener('drop', container.drop)

        dragData.current.dragComponent = dragComponent

        // 触发事件
        dragStart.emit()
      }),
      dragEnd: useCallbackRef((e: React.DragEvent<HTMLDivElement>) => {
        containerRef.current.addEventListener('dragenter', container.dragenter)
        containerRef.current.addEventListener('dragover', container.dragover)
        containerRef.current.addEventListener('dragleave', container.dragleve)
        containerRef.current.addEventListener('drop', container.drop)
      }),
    }

    return block
  })()

  /** 画布容器组件的拖拽 */
  const blockDraggier = (() => {
    const [mark, setMark] = useState({
      x: null as null | number,
      y: null as null | number,
    })

    const mousedown = useCallbackRef(
      (e: React.MouseEvent<HTMLDivElement>, block: VisualEditorBlockData) => {
        //
      },
    )
    return {
      mousedown,
      mark,
    }
  })()

  /** 画布容器中 block 组件选中 */
  const focusHandler = (() => {
    const mousedownBlock = (
      e: React.MouseEvent<HTMLDivElement>,
      block: VisualEditorBlockData,
      index: number,
    ) => {
      // 限制默认事件
      e.stopPropagation()
      e.preventDefault()

      // 预览模式不往下执行
      if (preview) return undefined

      // 右键不做处理，防止右键时可以拖动
      if (e.button === 2) return undefined

      if (e.shiftKey) {
        // 按中 shift 键，且此时没有选中的 block，则选中 block，否则使该 block 的数据中状态取反
        if (focusData.focus.length <= 1) {
          block.controller.focus = true
        } else {
          block.controller.focus = !block.controller.focus
        }
        expostMethods.updateBlocks(value.blocks)
      } else {
        // 如果点击的这个 block 没被选中，才清空这个其他选中的block，否则不做任何事情。放置拖拽多个 block，取消其他 block 的选中状态
        if (!block.controller.focus) {
          block.controller.focus = true
          expostMethods.clearFocus(block)
        }
      }

      setSelectIndex(block.controller.focus ? index : -1)

      // 使用延时器保证，数据时渲染后的正确数据，否则有 BUG
      setTimeout(() => {
        blockDraggier.mousedown(e, block)
      })
    }

    const mousedownContainer = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      e.preventDefault()

      // 预览模式不往下执行
      if (preview) return undefined

      // 判断不是点击了 container 容器就返回
      if (e.target !== e.currentTarget) return undefined

      if (!e.shiftKey) {
        // 点击空白出清空所有的选中的 block
        expostMethods.clearFocus()
        setSelectIndex(-1)
      }
    }

    return {
      block: mousedownBlock,
      container: mousedownContainer,
    }
  })()

  return <div ref={containerRef} style={containerStyles}></div>
}
