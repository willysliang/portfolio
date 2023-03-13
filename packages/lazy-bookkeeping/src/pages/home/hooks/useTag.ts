/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-13 18:06:47
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-13 18:08:06
 * @ Description: 标签 hook
 */

import { useEffect, useState } from 'react'
import { Tag } from '@/types/api'
import { fetchTagList } from '@/api/tag'

interface IWraplist {
  title: string
  list: Tag[]
}

export function useTag(fetch = false) {
  // 标签列表 & 数据
  const [wraplist, setWraplist] = useState<IWraplist[]>([])

  useEffect(() => {
    (async () => {
      if (fetch) {
        try {
          const data = await fetchTagList()
          const expense = data.filter((i) => i.type === 1) // 支出类型标签
          const income = data.filter((i) => i.type === 2) // 收入类型标签
          const other = data.filter((i) => i.type !== 1 && i.type !== 2) // 其他类型标签
          setWraplist([
            { title: '支出', list: expense },
            { title: '收入', list: income },
            { title: '其他', list: other },
          ])
        } catch {}
      }
    })()
  }, [fetch])

  return {
    wraplist,
  }
}
