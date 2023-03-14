/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:29:54
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 10:15:36
 * @ Description: statistics 统计
 */

import React, { useContext } from 'react'
import { Context } from '.'

const Foo = () => {
  const name = useContext(Context)

  return (
    <div>Bar{name}</div>
  )
}

export default Foo
