/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 14:01:24
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-31 14:15:24
 * @ Description: 给编辑器赋予指令
 */

import { useRef } from 'react'
import { VisualEditorBlockData, VisualEditorValue } from '../types'
import { useCommander } from './useCommander'
import { cloneDeep } from 'lodash'
import { useCallbackRef } from '../hooks/useCallbackRef'

/** 拖拽的回调函数 */
interface DragCallback {
  on: (cb: () => void) => void
  off: (cb: () => void) => void
}

/** 编辑器的命令 */
interface VisualCommand {
  focusData: {
    focus: VisualEditorBlockData[]
    unFocus: VisualEditorBlockData[]
  }
  value: VisualEditorValue
  updateBlocks: (blocks: VisualEditorBlockData[]) => void
  updateValue: (value: VisualEditorValue) => void
  dragStart: DragCallback
  dragEnd: DragCallback
}

export function useVisualCommand({
  focusData,
  value,
  updateBlocks,
  updateValue,
  dragStart,
  dragEnd,
}: VisualCommand) {
  const commander = useCommander()

  /** 注册删除命令操作 */
  commander.useRegistry({
    name: 'delete',
    keyboard: ['delete', 'ctrl+d', 'backspace'],
    execute: () => {
      const data = {
        before: (() => cloneDeep(value.blocks))(),
        after: (() => cloneDeep(focusData.unFocus))(),
      }
      return {
        // 重做
        redo: () => {
          updateBlocks(cloneDeep(data.after))
        },
        // 撤销
        undo: () => {
          updateBlocks(cloneDeep(data.before))
        },
      }
    },
  })

  /** 注册清空命令操作 */
  commander.useRegistry({
    name: 'clear',
    execute: () => {
      const data = {
        before: cloneDeep(value.blocks),
        after: cloneDeep([]),
      }
      return {
        redo: () => {
          updateBlocks(cloneDeep(data.after))
        },
        undo: () => {
          updateBlocks(cloneDeep(data.before))
        },
      }
    },
  })

  /** 注册全选快捷键命令 */
  commander.useRegistry({
    name: 'selectAll',
    keyboard: ['ctrl+a'],
    followQueue: false,
    execute: () => {
      return {
        redo: () => {
          value.blocks.forEach((block) => (block.controller.focus = true))
          updateBlocks(value.blocks)
        },
      }
    },
  })

  /** 注册置顶命令 */
  commander.useRegistry({
    name: 'placeTop',
    keyboard: 'ctrl+up',
    execute: () => {
      const data = {
        before: (() => cloneDeep(value.blocks))(),
        after: (() =>
          cloneDeep(() => {
            const { focus, unFocus } = focusData
            // 计算出 focus 选中的最大的 zIndex 值，unFocus 未选中的最小的 zIndex 值，计算它们的差值就是当前元素置顶的 zIndex 值
            const maxUnFocusIndex = unFocus.reduce((prev, item) => {
              return Math.max(prev, item.style.zIndex)
            }, -Infinity)
            const minFocusIndex = focus.reduce((prev, item) => {
              return Math.min(prev, item.style.zIndex)
            }, Infinity)
            let dur = maxUnFocusIndex - minFocusIndex + 1
            if (dur >= 0) {
              dur++
              focus.forEach(
                (block) => (block.style.zIndex = block.style.zIndex + dur),
              )
            }
            return value.blocks
          }))()(),
      }
      return {
        redo: () => updateBlocks(cloneDeep(data.after) || []),
        undo: () => updateBlocks(cloneDeep(data.before)),
      }
    },
  })

  /** 注册置底命令 */
  commander.useRegistry({
    name: 'placeBottom',
    keyboard: 'ctrl+down',
    execute: () => {
      const data = {
        before: (() => cloneDeep(value.blocks))(),
        after: (() =>
          cloneDeep(() => {
            const { focus, unFocus } = focusData
            // 计算出 focus 选中的最大的 zIndex 值，unFocus 未选中的最小的 zIndex 值，计算它们的差值就是当前元素置顶的 zIndex 值
            const minUnFocusIndex = unFocus.reduce((prev, item) => {
              return Math.min(prev, item.style.zIndex)
            }, Infinity)
            const maxFocusIndex = focus.reduce((prev, item) => {
              return Math.max(prev, item.style.zIndex)
            }, -Infinity)
            const minFocusIndex = focus.reduce((prev, item) => {
              return Math.min(prev, item.style.zIndex)
            }, Infinity)
            let dur = maxFocusIndex - minUnFocusIndex + 1
            if (dur >= 0) {
              dur++
              focus.forEach(
                (block) => (block.style.zIndex = block.style.zIndex - dur),
              )
              if (minFocusIndex - dur < 0) {
                dur = dur - minFocusIndex
                value.blocks.forEach(
                  (block) => (block.style.zIndex = block.style.zIndex + dur),
                )
              }
            }
            return value.blocks
          }))()(),
      }

      return {
        redo: () => updateBlocks(cloneDeep(data.after)),
        undo: () => updateBlocks(cloneDeep(data.before)),
      }
    },
  })

  /**
   * 注册拖拽命令
   * 适用于如下三种情况：
   * 1. 从左侧菜单拖拽组件到容器画布；
   * 2. 在容器中拖拽组件调整位置；
   * 3. 拖动调整组件的高度和宽度。
   */
  const dragData = useRef({ before: null as null | VisualEditorBlockData[] })
  const handler = {
    // 拖拽开始或结束就会通过已经订阅的事件来触发这个 dragstart、dragend 函数，执行对应的函数逻辑
    dragstart: useCallbackRef(
      () => (dragData.current.before = cloneDeep(value.blocks)),
    ),
    dragend: useCallbackRef(() => commander.state.commands.drag()),
  }
  commander.useRegistry({
    name: 'drag',
    init: () => {
      dragData.current = { before: null }
      dragStart.on(handler.dragstart)
      dragEnd.on(handler.dragend)
      return () => {
        dragStart.off(handler.dragstart)
        dragEnd.off(handler.dragend)
      }
    },
    execute: () => {
      const data = {
        before: cloneDeep(dragData.current.before),
        after: cloneDeep(value.blocks),
      }
      return {
        redo: () => {
          updateBlocks(cloneDeep(data.after))
        },
        undo: () => {
          updateBlocks(cloneDeep(data.before) || [])
        },
      }
    },
  })

  /** 注册导入数据时，更新数据命令 */
  commander.useRegistry({
    name: 'updateValue',
    execute: (newModelValue: VisualEditorValue) => {
      const data = {
        before: cloneDeep(value),
        after: cloneDeep(newModelValue),
      }
      return {
        redo: () => updateValue(data.after),
        undo: () => updateValue(data.before),
      }
    },
  })

  /** 注册导入节点数据时，更新节点数据命令 */
  commander.useRegistry({
    name: 'updateBlock',
    execute: (
      newBlock: VisualEditorBlockData,
      oldBlock: VisualEditorBlockData,
    ) => {
      let blocks = cloneDeep(value.blocks)
      const data = {
        before: blocks,
        after: (() => {
          blocks = [...blocks]
          const index = value.blocks.indexOf(oldBlock)
          if (index > -1) {
            blocks.splice(index, 1, newBlock)
          }
          return cloneDeep(blocks)
        })(),
      }
      return {
        redo: () => {
          updateBlocks(cloneDeep(data.after))
        },
        undo: () => {
          updateBlocks(cloneDeep(data.before))
        },
      }
    },
  })

  /** 初始内置的命令 undo，redo */
  commander.useInit() // 在底部调用

  return {
    delete: () => commander.state.commands.delete(),
    clear: () => commander.state.commands.clear(),
    undo: () => commander.state.commands.undo(),
    redo: () => commander.state.commands.redo(),
    placeBottom: () => commander.state.commands.placeBottom(),
    placeTop: () => commander.state.commands.placeTop(),
    updateValue: (newModelValue: VisualEditorValue) =>
      commander.state.commands.updateValue(newModelValue),
    updateBlock: (
      newModelValue: VisualEditorValue,
      oldModelValue: VisualEditorBlockData,
    ) => commander.state.commands.updateBlock(newModelValue, oldModelValue),
  }
}
