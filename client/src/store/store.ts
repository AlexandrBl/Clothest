import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authSlice from '../Features/Auth/authSlice'
import productSlice from '../Features/Products/productSlice'

const store = configureStore({

  reducer: {
    auth: authSlice,
    products: productSlice
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
