import { createAsyncThunk } from '@reduxjs/toolkit'
import { Favorite, type StateFavorites } from './type'
import * as api from './api'

const initialState: StateFavorites = { favorites: [], message: '' }

export const initFavorites = createAsyncThunk(
  'favorites/init',
  async () => await api.initFavoritesFetch()
)

export const initFavoritesFetch = async (): Promise<Favorite[]> => {
  const res = await fetch('/api/products/userProducts')
  const data = await res.json()
  return data
}
