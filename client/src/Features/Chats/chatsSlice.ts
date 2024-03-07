import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type StateChats } from './type'
import { chatCheckFetch, initChatsFetch, updChatFetch } from './api'

const initialState: StateChats = { chats: [], message: '', currentChat: null }

export const initChats = createAsyncThunk(
  'chats/init',
  async () => await initChatsFetch()
)

export const updateChat = createAsyncThunk(
  'chat/upd',
  async (id: number) => await updChatFetch(id)
)

export const checkChat = createAsyncThunk(
  'chat/check',
  async (userIds: number[]) => await chatCheckFetch(userIds)

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
    },
    clear3: (state) => {
      state.chats = []
      state.message = ''
      state.currentChat = null
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
      .addCase(checkChat.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(checkChat.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export const { switchChat, includeHistoryInStore, clear3 } = chatsSlice.actions
export default chatsSlice.reducer
