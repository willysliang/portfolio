/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-16 14:47:56
 * @ Description: 页面大框
 */

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes, RouteBeforeEach } from '@/router'
import Tabbar from '@/components/layout/tabbar'
import './assets/styles/index.scss'

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteBeforeEach route={route}>
                  <route.component />
                </RouteBeforeEach>
              }
            />
          )
        })}
      </Routes>

      {/* 导航栏 */}
      <Tabbar />
    </div>
  )
}

export default App
