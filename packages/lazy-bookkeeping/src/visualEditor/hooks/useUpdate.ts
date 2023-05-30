/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-29 14:00:05
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-29 14:00:56
 * @ Description: 缓存数据，并返回可更新的依赖项 - hooks
 */

import { useMemo, useState } from 'react'

export function useUpdate() {
  const [count, setCount] = useState(0)
  return useMemo(() => ({ froceUpdate: () => setCount(count + 1) }), [count])
}
