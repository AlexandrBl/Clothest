import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { StateProducts } from './type'
import * as api from './api'

import { addFavoriteFetch } from '../../Features/Favorite/api'
import { type Favorite } from '../Favorite/type'

import { addProductFetch } from '../ProductForms/api'

const initialState: StateProducts = { products: [], userProducts: [], categories: [], message: '' }

export const initProducts = createAsyncThunk(
  'products/init',
  async (currentPage: number) => await api.initProductsFetch(currentPage)
)

export const initCategories = createAsyncThunk(
  'categories/init',
  async () => await api.initCategoriesFetch()
)

export const userProducts = createAsyncThunk(
  'userProducts/init',
  async () => await api.initUserProductsFetch()
)
export const userProductDelete = createAsyncThunk(
  'userProduct/delete',
  async (id: number) => await api.deleteUserProductsFetch(id)
)
export const addProduct = createAsyncThunk(
  'product/add',
  async (obj: FormData) => await addProductFetch(obj)
)

export const dislikeProduct = createAsyncThunk(
  'product/dislike',
  async (id: number) => await api.addDislikefetch(id)
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    delProd (state, action) {
      state.products = state.products.filter((el) => el.id !== action.payload)
    },
    clearMessage (state) {
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initProducts.fulfilled, (state, action) => {
        state.products.push(...action.payload)
      })
      .addCase(initProducts.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(userProducts.fulfilled, (state, action) => {
        if (action.payload.length > 0) { state.userProducts = action.payload }
      })
      .addCase(userProducts.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.userProducts.push(action.payload.product)
        state.message = action.payload.message
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(userProductDelete.fulfilled, (state, action) => {
        state.userProducts = state.userProducts.filter((product) => product.id !== action.payload.id)
      })
      .addCase(userProductDelete.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(dislikeProduct.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(dislikeProduct.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(initCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(initCategories.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export const { delProd, clearMessage } = productsSlice.actions
export default productsSlice.reducer
