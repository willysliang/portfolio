/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 20:33:35
 * @ Description: 页面大框
 */

import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import Tabbar from '@/components/layout/tabbar'
import './assets/styles/index.scss'
import routes from './router/routes'
// import RouteBeforeEach from './router/RouteBeforeEach'
import transformRoutes from './router'

function App() {
  const elements = useRoutes(transformRoutes(routes))

  return (
    <div className="App">
      {/* <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteBeforeEach route={route}>
                  <route.element />
                </RouteBeforeEach>
              }
            />
          )
        })}
      </Routes> */}
      {elements}

      {/* 子路由的存放位置 */}
      <Outlet />

      {/* 导航栏 */}
      <Tabbar />
    </div>
  )
}

export default App
