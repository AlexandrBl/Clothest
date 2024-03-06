import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type StateChats } from './type'
import { initChatsFetch, updChatFetch } from './api'

const initialState: StateChats = { chats: [], message: '', currentChat: null }

export const initChats = createAsyncThunk(
  'chats/init',
  async () => await initChatsFetch()
)

export const updateChat = createAsyncThunk(
  'chat/upd',
  async (id: number) => await updChatFetch(id)
)

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    switchChat (state, action) {
      state.currentChat = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initChats.fulfilled, (state, action) => {
        state.chats = action.payload
      })
      .addCase(initChats.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export const { switchChat } = chatsSlice.actions
export default chatsSlice.reducer
