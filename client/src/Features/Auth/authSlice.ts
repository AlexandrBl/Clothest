import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { StateAuth, UserAndCpassword, UserWithoutName } from './type'
import * as api from './api'

const initialState: StateAuth = { user: null, message: '' }

export const authRegistration = createAsyncThunk(
  'auth/registration',
  async (obj: UserAndCpassword) => await api.registrationFetch(obj))

export const authCheck = createAsyncThunk(
  'auth/check',
  async () => await api.checkFetch())

export const authLogin = createAsyncThunk(
  'auth/login',
  async (obj: UserWithoutName) => await api.logFetch(obj))

export const authLogout = createAsyncThunk(
  'auth/logout',
  async () => await api.logoutFetch())

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegistration.fulfilled, (state, action) => {
        state.user = action.payload
        state.message = ''
      })
      .addCase(authRegistration.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
      .addCase(authCheck.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.user = action.payload
        state.message = ''
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.user = null
        state.message = ''
        window.location.reload()
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default authSlice.reducer
