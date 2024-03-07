import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authCheck } from '../Features/Auth/authSlice'
import { Route, Routes } from 'react-router-dom'
import Main from '../Features/Main/components/Main'
import MainPage from '../Features/Main/components/MainPage'
import RegLog from '../Features/Auth/components/RegLog'
import { type RootState, useAppDispatch } from '../store/store'

import IncorrectPage from '../Features/Incorrect/components/IncorrectPage'
import AddProduct from '../Features/ProductForms/components/AddProduct'
import ChangeProduct from '../Features/ProductForms/components/ChangeProduct'
import UserProfile from '../Features/userProfile/components/UserPage'
import UserProducts from '../Features/userProfile/components/UserProductsList'
import MatchesPage from '../Features/Mathces/Components/MathcesPage'

import { userProducts, initProducts, initCategories, clearMessage } from '../Features/Products/productSlice'
import FavoritesList from '../Features/Favorite/components/FavoritesList'

import { initFavorites } from '../Features/Favorite/favoriteSlice'
import ChatPage from '../Features/Chats/components/ChatPage'

function App (): JSX.Element {
  const dispatch = useAppDispatch()
  const message = useSelector((store: RootState) => store.products.message)
  const products = useSelector((store: RootState) => store.products.products)
  const user = useSelector((store: RootState) => store.auth.user)

  useEffect(() => {
    if (products.length < 9) {
      setFetching(true)
    }
  }, [products])

  useEffect(() => {
    dispatch(authCheck()).catch(console.log)
  }, [])

  useEffect(() => {
    dispatch(userProducts()).catch(console.log)
    dispatch(initCategories()).catch(console.log)
    if (user !== null) {
      dispatch(initFavorites()).catch(console.log)
    }
  }, [message, user])

  const [fetching, setFetching] = useState(false)
  const [scrollCount, setscrollCount] = useState(1)
  const [isNotifyAlive, setNotifyAlive] = useState(false)

  useEffect(() => {
    if (message !== '') {
      setNotifyAlive(true)
      setTimeout(() => {
        dispatch(clearMessage())
        setNotifyAlive(false)
      }, 5000)
    }
  }, [message])

  useEffect(() => {
    if (fetching) {
      dispatch(initProducts(products.length)).catch(console.log)
      setFetching(false)
    }
  }, [fetching, userProducts])

  useEffect(() => {
    const container = document.querySelector('.products__list')

    if (container !== null) {
      container.addEventListener('scroll', scrollHendler)
    }

    return function () {
      if (container !== null) {
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
        <Route path='/' element={<Main isNotifyAlive={isNotifyAlive} />}>
          <Route index element={<MainPage/>}/>
          <Route path='auth' element={<RegLog/>}/>
          <Route path='profile' element={<UserProfile/>}/>
          <Route path='matches' element={<MatchesPage/>}/>
          <Route path='profile/edit' element={<UserProducts/>}/>
          <Route path='profile/myproducts' element={<UserProducts/>}/>
          <Route path='profile/myproducts/:id/edit' element={<ChangeProduct />}/>
          <Route path='favorites' element={<FavoritesList/>}/>

          <Route path='matches/chats' element={<ChatPage />}/>

          <Route path='/newproduct' element={<AddProduct/>}/>
          <Route path='*' element={<IncorrectPage/>}/>

        </Route>
      </Routes>
    </div>

  )
}

export default App
