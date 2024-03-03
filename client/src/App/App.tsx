import React, { useEffect } from 'react'
import { authCheck } from '../Features/Auth/authSlice'
import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'

import RegLog from '../Features/Auth/components/RegLog'
import { useAppDispatch } from '../store/store'

import AddProductPage from '../Features/AddProduct/components/AddProductPage'
import IncorrectPage from '../Features/Incorrect/components/IncorrectPage'
import DragDrop from '../Features/AddProduct/components/DragDrop'
import UserProfile from '../Features/userProfile/components/userProfile'

function App (): JSX.Element {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authCheck()).catch(console.log)
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<MainPage/>}/>

          <Route path='auth' element={<RegLog/>}/>
          <Route path='profile' element={<UserProfile/>}/>
          <Route path='/addproduct' element={<AddProductPage/>}/>
          <Route path='/dragdrop' element={<DragDrop/>}/>
          <Route path='*' element={<IncorrectPage/>}/>

        </Route>
      </Routes>
    </div>

  )
}

export default App
