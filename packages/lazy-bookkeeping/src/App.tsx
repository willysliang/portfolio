import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const NotFound = () => {
  return <div>this is NotFound</div>
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
