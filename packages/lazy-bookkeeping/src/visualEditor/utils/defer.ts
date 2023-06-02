/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-06-02 09:49:09
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-06-02 09:52:38
 * @ Description: 延迟
 */

interface Defer {
  (): {
    resolve: () => void
    reject: () => void
    promise: Promise<void>
  }

  <T>(): {
    resolve: (val: T) => void
    reject: () => void
    promise: Promise<T>
  }
}

export const defer: Defer = () => {
  const dfd: any = {}

  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })

  return dfd
}
