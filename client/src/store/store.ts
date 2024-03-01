import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productSlice from '../Features/Products/productSlice'
// import authSlice from '../features/Auth/authSlice';
// import booksSlice from '../features/Books/booksSlice';

const store = configureStore({
  // теперь функция combineReducers не нужна
  reducer: {
  //  auth:authSlice,
  //  books:booksSlice
    products: productSlice
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
