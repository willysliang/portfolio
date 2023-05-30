/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 13:53:03
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-29 14:00:14
 * @ Description: 把组件缓存的 hooks
 */

import { useCallback, useRef } from 'react'

/**
 * 需要得到一个不变的函数引用，但是这个不变的函数执行的时候，执行的是传递的最新的函数
 * @param callback 传递最新的函数
 * @returns 返回不变的函数
 */
export function useCallbackRef<T extends (...args: any[]) => void>(
  callback: T,
): T {
  const refCallback = useRef(callback)
  refCallback.current = callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    ((...args: any[]) => refCallback.current(...args)) as T,
    [],
  )
}
