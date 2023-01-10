import React, { createContext, useContext, FC } from 'react'
import { Button } from 'antd'
import 'antd/dist/reset.css'

/** 创建 Context 对象 */
const Context = createContext('')

function Bar() {
  /** 底层组件通过 useContext 函数获取数据 */
  const name = useContext(Context)
  return <div>Bar1121 {name}</div>
}

const Foo: FC = () => {
  return (
    <>
      <div>
        Foo <Bar />
      </div>
      <Button type="primary">Button</Button>
    </>
  )
}

function App() {
  return (
    // 顶层组件通过 Provider 提供数据
    <Context.Provider value={'this is name'}>
      <div>
        <Foo />
      </div>
    </Context.Provider>
  )
}

export default App
