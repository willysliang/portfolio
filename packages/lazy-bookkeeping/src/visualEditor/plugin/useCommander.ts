/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-30 09:55:01
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-25 17:05:02
 * @ Description: 命令调度者
 */

import { useCallback, useRef, useState } from 'react'
import { keyboardCode } from '../utils/keyboardCode'

/**
 * @desc command 的 execute 执行完之后，需要返回 undo、redo。
 * execute 执行后会立即返回 redo，后续撤销的时候会执行 undo，重做的时候会执行 redo
 */
interface CommandExecute {
  /** 重做：默认执行，重做会调用 */
  redo: () => void
  /** 撤销：撤销会调用 */
  undo?: () => void
}

/**
 * 命令接口
 */
interface Command {
  /** 命令的唯一标识 */
  name: string
  /** 命令执行时所处理的内容 */
  execute: (...args: any[]) => CommandExecute
  /** 命令监听的快捷键 */
  keyboard?: string | string[]
  /** 命令执行之后，是否需要将命令执行得到的 undo，redo 存入命令队列（像全选、撤销、重做这中命令不需要存入命令队列的） */
  followQueue?: boolean
  /** 命令初始化函数，如果返回的，则是一个销毁命令函数 */
  init?: () => (() => void) | undefined
  /** 命令缓存所需的数据信息 */
  data?: any
}

/**
 * 状态接口
 */
interface CommanderState {
  /** 当前命令队列中，最后执行的命令返回的 CommandExecute 对象 */
  current: number
  /** 命令队列容器 */
  queue: CommandExecute[]
  /** 预定义命令的容器 */
  commandList: { current: Command }[]
  /** 
   * 通过 command name 执行 command 动作的一个包装对象
   * commands 结构类型
   * {
   *   undo: () => {},
   *   redo: () => {}，
   *   delete: () => {},
   *   clear: () => {},
   *   placeTop: () => {},
   *   placeBottom: () => {}
   * }
   */
  commands: Record<string, (...args: any[]) => void>
  /** 所有命令在组件销毁之前，需要执行的消除副作用的函数容器 */
  destroyList: ((() => void) | undefined)[]
}

/**
 * 命令调度者 hooks
 */
export function useCommander() {
  const [state] = useState<CommanderState>(() => ({
    current: -1,
    queue: [],
    commandList: [],
    commands: {},
    destroyList: [],
  }))

  /** 注册命令 */
  const useRegistry = useCallback((command: Command) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const commandRef = useRef<Command>(command)
    commandRef.current = command
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(() => {
      // 判断命令是否存在，如果存在则移除该命令，并重新添加到命令列表最后面
      if (state.commands[command.name]) {
        const existIndex = state.commandList.findIndex(
          (item) => item.current.name === command.name,
        )
        state.commandList.splice(existIndex, 1)
      }
      state.commandList.push(commandRef)

      // 对应命令的方法
      state.commands[command.name] = (...args: any[]) => {
        const { redo, undo } = commandRef.current.execute(...args)
        // 默认执行重做
        redo()

        // 如果命令执行后，不需要进入命令队列，就直接结束
        if (commandRef.current.followQueue === false) {
          return void 0
        }

        // 否则，将命令队列中剩余的命令都删除，保留 current 及其之前的命令
        let { queue } = state
        const { current } = state
        if (queue.length > 0) {
          queue = queue.slice(0, current + 1)
          state.queue = queue
        }
        // 将命令队列中最后一个命令为i当前执行的命令
        queue.push({ undo, redo })
        // 索引加 1， 指向队列中的最有一个命令
        state.current = current + 1
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 键盘快捷键 */
  const [keyboardEvent] = useState(() => {
    const onKeydown = (event: KeyboardEvent) => {
      // 对于容器是否在空白区域或时操作某个组件的命令区分操作，比如空白区域时全选或全中所有的组件组件，在操作某个输入框组件时，全选就只会选中输入框中的文字
      if (document.activeElement !== document.body) {
        return undefined
      }
      const { keyCode, shiftKey, altKey, ctrlKey, metaKey } = event

      /** 触发一次快捷键，所按下的键盘键 */
      const keyHash: string[] = []

      if (ctrlKey || metaKey) {
        keyHash.push('ctrl')
      }
      if (shiftKey) {
        keyHash.push('shift')
      }
      if (altKey) {
        keyHash.push('alt')
      }
      keyHash.push(keyboardCode[keyCode])

      // 快捷键格式 'ctrl+alt+s'
      const keyNames = keyHash.join('+')

      state.commandList.forEach(({ current: { keyboard, name } }) => {
        if (!keyboard) return void 0

        const keys = Array.isArray(keyboard) ? keyboard : [keyboard]

        if (keys.indexOf(keyNames) > -1) {
          state.commands[name]() // 执行对应的命令的方法
          // 阻止事件冒泡 & 默认事件触发
          event.stopPropagation()
          event.preventDefault()
        }
      })
    }

    /** 初始化 & 销毁 */
    const init = () => {
      window.addEventListener('keydown', onKeydown, true)
      return () => {
        window.removeEventListener('keydown', onKeydown, true)
      }
    }
    return { init }
  })

  /** 初始化注册命令（useRegistry）时的所有的 command 的 init 的方法 */
  const useInit = useCallback(() => {
    /** 注册所有的 command 的 init 的方法 */
    state.commandList.forEach((command) => {
      command.current.init && state.destroyList.push(command.current.init())
    })
    keyboardEvent.init && state.destroyList.push(keyboardEvent.init())

    /** 注册内置的撤回命令（撤回命令执行的结果是不需要进入命令队列的） */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRegistry({
      name: 'undo',
      keyboard: 'ctrl+z',
      followQueue: false, // 标识不需要进入命令队列
      execute: () => {
        return {
          redo: () => {
            if (state.current === -1) return undefined
            const queueItem = state.queue[state.current]
            if (queueItem) {
              queueItem.undo && queueItem.undo()
              state.current--
            }
          },
        }
      },
    })

    /** 注册内置的重做命令（重做命令执行结果是不需要进入命令队列的） */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRegistry({
      name: 'redo',
      keyboard: ['ctrl+y', 'ctrl+shift+z'],
      followQueue: false,
      execute: () => {
        return {
          redo: () => {
            const queueItem = state.queue[state.current + 1]
            if (queueItem) {
              queueItem.redo()
              state.current++
            }
          },
        }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    state,
    useInit,
    useRegistry,
  }
}
