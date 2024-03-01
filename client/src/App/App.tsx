import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<MainPage/>}/>
        </Route>
      </Routes>
    </div>

  )
}

export default App
