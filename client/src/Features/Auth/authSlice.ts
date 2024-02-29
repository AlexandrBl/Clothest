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
        state.user = action.payload.user
        state.message = ''
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default authSlice.reducer
