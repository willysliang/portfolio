import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getResouceList } from './api/mock'

const NotFound = () => {
  // 社区资源
  const [communityList, setCommunityList] = useState([])
  // 学习社区资源
  const [studyCommunityList, setStudyCommunityList] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res1 = await getResouceList()
      const { list, studyList } = res1.data
      setCommunityList(list)
      setStudyCommunityList(studyList)

      // const res = await request({
      //   url: 'api/a',
      //   method: 'get',
      // })
      // console.log('a', res)
    } catch {}
  }

  return (
    <div>
      this is NotFound{JSON.stringify(communityList)}
      {JSON.stringify(studyCommunityList)}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
