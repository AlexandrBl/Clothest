import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type Favorite, type StateFavorites } from './type'
import * as api from './api'

const initialState: StateFavorites = { products: [], message: '' }

export const initFavorites = createAsyncThunk(
  'favorites/init',
  async () => await api.initFavoritesFetch()
)

export const newFavoriteProduct = createAsyncThunk(
  'favorite/add',
  async (obj: Favorite) => await api.addFavoriteFetch(obj)
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newFavoriteProduct.fulfilled, (state, action) => {
        
        state.message = action.payload.message
      })
      .addCase(newFavoriteProduct.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(initFavorites.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(initFavorites.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default favoritesSlice.reducer
