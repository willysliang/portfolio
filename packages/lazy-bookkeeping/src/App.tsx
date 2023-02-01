/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 17:46:52
 * @ Description: 页面大框
 */

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes, RouteBeforeEach } from '@/router'
import './assets/styles/index.scss'
import Tabbar from '@/components/layout/tabbar'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
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
        </Route>
      </Routes>

      {/* 导航栏 */}
      <Tabbar />
    </div>
  )
}

export default App
