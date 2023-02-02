/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-02 16:34:28
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-02 19:02:32
 * @ Description: 账单类型选择弹层
 */

import React, { ForwardedRef, forwardRef, MutableRefObject } from 'react'
import { Tag } from '@/types/api'

/** 账单类型选择弹层暴露的方法接口 */
export type TagPopupExpose = {
  show: () => void
  close: () => void
}

interface Props {
  onSelect: (selected: Tag) => void
}

const TagPopup = forwardRef(
  ({ onSelect }: Props, ref: ForwardedRef<TagPopupExpose>) => {
    const [show, setShow] = useState(false) // 控制显示隐藏

    if (ref) {
      (ref as MutableRefObject<TagPopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }

    return <div>shjk</div>
  },
)

TagPopup.displayName = 'TagPopup'

export default TagPopup
