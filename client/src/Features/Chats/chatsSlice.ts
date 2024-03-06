import { createSlice } from '@reduxjs/toolkit'
import { type StateChats } from './type'

const initialState: StateChats = { messagesHistory: [] }

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addToHistory (state, action: {type}) {
      state.messagesHistory.push(action.payload)
    }
  }
})

export const { addToHistory } = chatsSlice.actions
