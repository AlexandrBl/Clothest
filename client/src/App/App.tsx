import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authCheck } from '../Features/Auth/authSlice'
import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'

import RegLog from '../Features/Auth/components/RegLog'
import { type RootState, useAppDispatch } from '../store/store'

import IncorrectPage from '../Features/Incorrect/components/IncorrectPage'
import AddProduct from '../Features/AddProduct/components/AddProduct'
import UserProfile from '../Features/userProfile/components/UserPage'
import UserProducts from '../Features/userProfile/components/UserProductsList'
import { userProducts, initProducts } from '../Features/Products/productSlice'
import FavoritesList from '../Features/Favorite/components/FavoritesList'

function App (): JSX.Element {
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.products.message)

  useEffect(() => {
    dispatch(authCheck()).catch(console.log)
    dispatch(userProducts()).catch(console.log)
  }, [message])

  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [scrollCount, setscrollCount] = useState(1)

  useEffect(() => {
    if (fetching) {
      dispatch(initProducts(currentPage)).catch(console.log)
      setFetching(false)
      setCurrentPage((prev) => prev + 8)
    }
  }, [fetching])

  useEffect(() => {
    const container = document.querySelector('.products__list')

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (container) {
      container.addEventListener('scroll', scrollHendler)
    }

    return function () {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (container) {
        container.removeEventListener('scroll', scrollHendler)
      }
    }
  }, [])

  const scrollHendler = (e: any): void => {
    if (e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight * scrollCount) <= 1) {
      setFetching(true)
      setscrollCount((prev) => prev + 1)
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route index element={<MainPage/>}/>
          <Route path='auth' element={<RegLog/>}/>
          <Route path='profile' element={<UserProfile/>}/>
          <Route path='profile/edit' element={<UserProducts/>}/>
          <Route path='profile/myproducts' element={<UserProducts/>}/>
          <Route path='favorites' element={<FavoritesList/>}/>
          <Route path='/newproduct' element={<AddProduct/>}/>
          <Route path='*' element={<IncorrectPage/>}/>

        </Route>
      </Routes>
    </div>

  )
}

export default App
