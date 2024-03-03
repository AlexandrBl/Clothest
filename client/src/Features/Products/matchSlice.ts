import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { MatchWithoutIdAndMutual, StateMatches } from './type'
import { addMatchFetch } from './api'

const initialState: StateMatches = { matches: [], message: '' }

export const addMatch = createAsyncThunk(
  'match/add',
  async (obj: MatchWithoutIdAndMutual) => await addMatchFetch(obj)
)

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMatch.fulfilled, (state, action) => {
        state.matches.push(action.payload)
        if (action.payload.isMutual) {
          state.message = 'matchanimation'
        }
      })
      .addCase(addMatch.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default matchesSlice.reducer
