/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 20:33:35
 * @ Description: 页面大框
 */

import React from 'react'
import { useRoutes } from 'react-router-dom'
import Tabbar from '@/components/layout/tabbar'
import transformRoutes from './router'
import './assets/styles/index.scss'

function App() {
  const elements = useRoutes(transformRoutes)

  return (
    <div className="App">
      {/* 路由 */}
      {elements}

      {/* 导航栏 */}
      <Tabbar />
    </div>
  )
}

export default App
