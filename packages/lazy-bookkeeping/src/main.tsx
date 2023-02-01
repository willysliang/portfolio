/**
 * @ Author: willysliang
 * @ Create Time: 2022-12-12 16:47:33
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 16:49:02
 * @ Description: APP 主入口
 */

import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import App from './App'

/* ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <Suspense>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Suspense>,
)
