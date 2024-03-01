import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'
import AddProductPage from '../Features/AddProduct/components/AddProductPage'
import IncorrectPage from '../Features/Incorrect/components/IncorrectPage'

function App (): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/addProduct' element={<AddProductPage/>}/>
          <Route path='*' element={<IncorrectPage/>}/>
        </Route>
      </Routes>
    </div>

  )
}

export default App
