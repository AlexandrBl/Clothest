import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlice from '../Features/Auth/authSlice'
import productSlice from '../Features/Products/productSlice'
import matchSlice from '../Features/Products/matchSlice'
import favoriteSlice from '../Features/Favorite/favoriteSlice'
import chatsSlice from '../Features/Chats/chatsSlice'

const store = configureStore({

  reducer: {
    auth: authSlice,
    products: productSlice,
    matches: matchSlice,
    favorites: favoriteSlice,
    chats: chatsSlice
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
