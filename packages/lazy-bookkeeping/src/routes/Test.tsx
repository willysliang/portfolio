import { createContext, useContext } from 'react'

/** 创建 Context 对象 */
const Context = createContext('')

function Bar() {
  /** 底层组件通过 useContext 函数获取数据 */
  const name = useContext(Context)
  return <div>Bar {name}</div>
}

function Foo() {
  return <div>Foo <Bar /></div>
}

function App() {
  return (
    // 顶层组件通过 Provider 提供数据
    <Context.Provider value={'this is name'}>
      <div><Foo /></div>
    </Context.Provider>
  )
}

export default App