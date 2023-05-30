/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-15 18:23:24
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-15 18:24:21
 * @ Description: 案例入口 dmo
 */

import React from 'react'
import { Outlet } from 'react-router-dom'

const Demo = () => {
  return (
    <div className='demo-page'>
      <Outlet />
    </div>
  )
}

export default Demo
