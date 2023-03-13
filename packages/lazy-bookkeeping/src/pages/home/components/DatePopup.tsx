/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-02 16:45:55
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-13 18:11:02
 * @ Description: DatePopup 日期选择弹层
 */

import React, {
  useState,
  forwardRef,
  MutableRefObject,
  ForwardedRef,
  ReactNode,
} from 'react'
import { DatePicker } from 'antd-mobile'
import { Precision } from 'antd-mobile/es/components/date-picker/date-picker-utils'

/** 日期选择弹层暴露的方法接口 */
export type DatePopupExpose = {
  show: () => void
  close: () => void
}

interface Props {
  onSelect: (selected: Date) => void
  precision?: Precision
}

const renderLabel = (type: Precision | 'now', data: number): ReactNode => {
  switch (type) {
    case 'year':
      return data + '年'
    case 'month':
      return data + '月'
    case 'day':
      return data + '日'
    default:
      return data
  }
}

const DatePopup = forwardRef(
  (
    { onSelect, precision = 'month' }: Props,
    ref: ForwardedRef<DatePopupExpose>,
  ) => {
    const [show, setShow] = useState(false) // 控制显示隐藏
    const [date] = useState<Date>(new Date())

    if (ref) {
      (ref as MutableRefObject<DatePopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }
    return (
      <DatePicker
        title="请选择"
        value={date}
        visible={show}
        precision={precision}
        renderLabel={renderLabel}
        onConfirm={(date) => {
          setShow(false)
          onSelect(date)
        }}
        onClose={() => {
          setShow(false)
        }}
      />
    )
  },
)

DatePopup.displayName = 'DatePopup'

export default DatePopup
