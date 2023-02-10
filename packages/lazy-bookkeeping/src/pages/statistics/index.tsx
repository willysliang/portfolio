/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 17:29:54
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-06 11:48:57
 * @ Description: statistics 统计
 */

import React, { createContext } from 'react'
import Foo from './Foo'

export const Context = createContext('aaaa')

const Statistics = () => {
  return (
    <Context.Provider value={'this/name'}>
      <div>
        <Foo />
      </div>
    </Context.Provider>
  )
}

export default Statistics
