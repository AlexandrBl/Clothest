import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authCheck } from '../Features/Auth/authSlice'
import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'

import RegLog from '../Features/Auth/components/RegLog'
import { type RootState, useAppDispatch } from '../store/store'

import AddProductPage from '../Features/AddProduct/components/AddProductPage'
import IncorrectPage from '../Features/Incorrect/components/IncorrectPage'
import DragDrop from '../Features/AddProduct/components/DragDrop'
import UserProfile from '../Features/userProfile/components/UserPage'
import UserProducts from '../Features/userProfile/components/UserProductsList'
import { userProducts } from '../Features/Products/productSlice'

function App (): JSX.Element {
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.products.message)

  useEffect(() => {
    dispatch(authCheck()).catch(console.log)
    dispatch(userProducts()).catch(console.log)

  }, [message])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<MainPage/>}/>

          <Route path='auth' element={<RegLog/>}/>
          <Route path='profile' element={<UserProfile/>}/>
            <Route path='profile/edit' element={<UserProducts/>}/>
            <Route path='profile/myproducts' element={<UserProducts/>}/>

          <Route path='/addproduct' element={<AddProductPage/>}/>
          <Route path='/dragdrop' element={<DragDrop/>}/>
          <Route path='*' element={<IncorrectPage/>}/>

        </Route>
      </Routes>
    </div>

  )
}

export default App
