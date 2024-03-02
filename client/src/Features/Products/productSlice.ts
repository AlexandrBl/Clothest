import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { StateProducts } from './type'
import * as api from './api'
import { addProductFetch } from '../AddProduct/api'

const initialState: StateProducts = { products: [], message: '' }

export const initProducts = createAsyncThunk(
  'products/init',
  async () => await api.initProductsFetch()
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
        state.products = action.payload
      })
      .addCase(initProducts.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default productsSlice.reducer
