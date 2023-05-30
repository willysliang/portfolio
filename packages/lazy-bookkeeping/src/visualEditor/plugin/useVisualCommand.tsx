/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 14:01:24
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-30 09:55:32
 * @ Description: 编辑器的命令
 */

import { VisualEditorBlockData, VisualEditorValue } from "../types"
import { useCommander } from "./useCommander"

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
  console.log(
    focusData,
    value,
    updateBlocks,
    updateValue,
    dragStart,
    dragEnd,
    commander,
  )
}
