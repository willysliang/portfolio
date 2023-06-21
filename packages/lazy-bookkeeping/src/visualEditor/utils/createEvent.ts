/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-09 13:11:11
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-13 13:27:28
 * @ Description: 创建事件总线
 */

type CustomEventListener = () => void

/** 事件总线的回调 */
export interface CreateEventReturnType {
  on: (cb: CustomEventListener) => void
  off: (cb: CustomEventListener) => void
  emit: () => void
}

/** 创建事件总线 */
export const createEvent = (): CreateEventReturnType => {
  const listeners: Array<CustomEventListener> = []
  return {
    /** 接收事件 */
    on: (cb: CustomEventListener) => {
      listeners.push(cb)
    },
    /** 关闭事件 */
    off: (cb: CustomEventListener) => {
      const index = listeners.indexOf(cb)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    },
    /** 发送事件 */
    emit: () => {
      // 循环触发事件
      listeners.forEach((listener) => listener())
    },
  }
}
