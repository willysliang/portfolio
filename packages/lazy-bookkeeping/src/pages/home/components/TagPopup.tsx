/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-02 16:34:28
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-03 16:19:12
 * @ Description: 账单类型选择弹层
 */

import React, {
  ForwardedRef,
  forwardRef,
  Fragment,
  MutableRefObject,
  useEffect,
  useState,
} from 'react'
import { Popup } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import { Tag } from '#/api'
import { fetchTagList } from '@/api/tag'
import cx from 'classnames'
import s from '../styles/TagPopup.module.scss'

/** 账单类型选择弹层暴露的方法接口 */
export type TagPopupExpose = {
  show: () => void
  close: () => void
}

/** 标签 hooks */
export function useTag(fetch = false) {
  interface IWraplist {
    title: string
    list: Tag[]
  }

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

  return wraplist
}

interface Props {
  onSelect: (selected: Tag) => void
}

const TagPopup = forwardRef(
  ({ onSelect }: Props, ref: ForwardedRef<TagPopupExpose>) => {
    const [show, setShow] = useState(false) // 控制显示隐藏
    const [active, setActive] = useState<string | number>('all')
    const wraplist = useTag(show)

    const choseType = (item: Tag | { id: 'all' }) => {
      setActive(item.id)
      setShow(false)
      onSelect(item)
    }

    if (ref) {
      (ref as MutableRefObject<TagPopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }

    return (
      <Popup
        visible={show}
        onMaskClick={() => setShow(false)}
        bodyStyle={{
          borderTopLeftRadius: '2rem',
          borderTopRightRadius: '2rem',
        }}
      >
        <div className={s.container}>
          <div className={s.header}>
            请选择类型
            <div className={s.cross} onClick={() => setShow(false)}>
              <CloseOutline fontSize={20} />
            </div>
          </div>
          <div className={s.content}>
            <div
              onClick={() => choseType({ id: 'all' })}
              className={cx({ [s.all]: true, [s.active]: active == 'all' })}
            >
              全部类型
            </div>
            {wraplist.map((item, index) => (
              <Fragment key={index}>
                <div className={s.title}>{item.title}</div>
                <div className={s['wrap-item']}>
                  {item.list.map((wrap, i) => (
                    <p
                      key={i}
                      onClick={() => choseType(wrap)}
                      className={cx({ [s.active]: active == wrap.id })}
                    >
                      {wrap.name}
                    </p>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Popup>
    )
  },
)

TagPopup.displayName = 'TagPopup'

export default TagPopup
