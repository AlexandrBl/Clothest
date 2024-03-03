import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { StateProducts } from './type'
import * as api from './api'
import { addProductFetch } from '../AddProduct/api'

const initialState: StateProducts = { products: [], userProducts: [], message: '' }

export const initProducts = createAsyncThunk(
  'products/init',
  async (currentPage: number) => await api.initProductsFetch(currentPage)
)
export const userProducts = createAsyncThunk(
  'userProducts/init',
  async () => await api.initUserProductsFetch()
)

export const addProduct = createAsyncThunk(
  'product/add',
  async (obj: FormData) => await addProductFetch(obj)
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initProducts.fulfilled, (state, action) => {
        state.products.push(...action.payload)
      })
      .addCase(initProducts.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(userProducts.fulfilled, (state, action) => {
        if (action.payload.length > 0) { state.userProducts.push(...action.payload) }
      })
      .addCase(userProducts.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default productsSlice.reducer
