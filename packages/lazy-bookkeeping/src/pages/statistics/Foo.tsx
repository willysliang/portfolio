/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:29:54
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-06 11:49:22
 * @ Description: statistics 统计
 */

import React, { useContext } from 'react'
import { Context } from '.'

const Foo = () => {
  const name = useContext(Context)

  console.log(Context)

  return (
    <div>Bar{name}</div>
  )
}

export default Foo
