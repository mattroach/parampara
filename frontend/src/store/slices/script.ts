
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as api from '../../api'
import { Script } from '../../types/scriptTypes'
import { AppThunk } from '../store'


export type ScriptStore = {
  script?: Script
}

let initialState: ScriptStore = {}

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    updateScript(state, action: PayloadAction<Script>) {
      state.script = action.payload
    },
  }
})

const {
  updateScript,
} = scriptSlice.actions

export default scriptSlice.reducer

export const loadScript = (
  scriptId: string
): AppThunk => async dispatch => {
  const script = await api.getScript(scriptId, 'latest')
  dispatch(updateScript(script))
}