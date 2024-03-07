import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { MatchWithoutIdAndMutual, StateMatches } from './type'
import { addMatchFetch, initMatchesFetch } from './api'

const initialState: StateMatches = { match: [], matches: [], message: '' }

export const addMatch = createAsyncThunk(
  'match/add',
  async (obj: MatchWithoutIdAndMutual) => await addMatchFetch(obj)
)

export const initMatch = createAsyncThunk(
  'match/init',
  async () => await initMatchesFetch()
)

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearMatchMessage (state) {
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMatch.fulfilled, (state, action) => {
        state.match.push(action.payload.match)
        if (action.payload.match.isMutual) {
          state.message = 'matchanimation'
        }
      })
      .addCase(addMatch.rejected, (state, action) => {
        state.message = action.error.message
      })
      .addCase(initMatch.fulfilled, (state, action) => {
        state.matches = action.payload.matches
      })
      .addCase(initMatch.rejected, (state, action) => {
        state.message = action.error.message
      })
  }
})

export default matchesSlice.reducer

export const { clearMatchMessage } = matchesSlice.actions
