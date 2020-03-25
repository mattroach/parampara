import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { Session } from 'api/types'
import { AppThunk } from 'store/store'

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
    }
  }
})

const { updateData } = scriptResultsSlice.actions

export default scriptResultsSlice.reducer

export const loadScriptResults = (
  scriptId: string,
  password?: string
): AppThunk<Promise<void>> => async dispatch => {
  const data = await api.getScriptResults(scriptId, password)
  dispatch(updateData(data))
}
