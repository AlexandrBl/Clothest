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
    },
    includeHistoryInStore (state, action) {
      if (action.payload.chatId !== undefined) {
        state.chats = state.chats.map((chat) => {
          if (chat.id === action.payload.chatId) {
            chat.ChatMessages = action.payload.messagesHistory
            return chat
          } else {
            return chat
          }
        })
      }
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
      .addCase(updateChat.fulfilled, (state, action) => {
        if (action.payload[0] !== undefined) {
          state.chats = state.chats.map((chat) => {
            if (chat.id === action.payload[0].chatId) {
              chat.ChatMessages = action.payload
              return chat
            } else {
              return chat
            }
          })
        }
      })
      .addCase(updateChat.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export const { switchChat, includeHistoryInStore } = chatsSlice.actions
export default chatsSlice.reducer
