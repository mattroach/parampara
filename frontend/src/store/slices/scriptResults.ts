import axios from 'axios'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { Session } from 'api/types'
import api from 'api'

export type ScriptsResultsStore = {
  data?: Session[]
}

let initialState: ScriptsResultsStore = {}

const scriptResultsSlice = createSlice({
  name: 'scriptResults',
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<Session[]>) {
      state.data = action.payload
    },
  }
})

const {
  updateData,
} = scriptResultsSlice.actions

export default scriptResultsSlice.reducer

export const loadScriptResults = (
  scriptId: string
): AppThunk => async dispatch => {
  const data = await api.getScriptResults(scriptId)
  dispatch(updateData(data))
}