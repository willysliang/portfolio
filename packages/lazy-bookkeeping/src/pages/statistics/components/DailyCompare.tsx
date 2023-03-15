/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 14:40:21
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 14:42:41
 * @ Description: 每日对比 DailyCompare
 */

import React from 'react'

interface Props {
  date: string
  type: 1 | 2
}

const DailyCompare = ({ date, type }: Props) => {
  return (
    <div>
      {date}
      {type}
    </div>
  )
}

export default DailyCompare
